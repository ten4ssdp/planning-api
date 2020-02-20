import User from './models/User';
import Role from './models/Role';
import Sector from './models/Sector';
import { Sequelize } from 'sequelize';
import Team from './models/Team';
import TeamComposition from './models/TeamComposition';
import Hotel from './models/Hotel';
import Visit from './models/Visit';
import moment = require('moment');
import { getNumberOfWeek } from './utils';

const USERS_BY_TEAM = 2;
const VISITS_BY_DAY = 5;
const WEEK_DAYS = 4;

export const getUsersBySector = async (): Promise<any> => {
  return await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;
      const users = await User.findAll({
        order: [Sequelize.fn('RANDOM')],
        include: [
          {
            model: Role,
            where: {
              name: 'Intervenant Terrain',
            },
          },
          {
            model: Sector,
            where: {
              name: sector,
            },
          },
        ],
      });
      // const visits = await Visit.findAll();
      const sectorsRows = users;
      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
};

/**
 * Generates a score from hotels visits and rate
 * @param hotel An hotel object with visits
 */
const calculateHotelScore = (hotel: Hotel): number => {
  try {
    let score = 0;
    if (hotel.visits?.length === 0) {
      score += 30;
    } else {
      const rate = hotel.visits?.[0]?.rate || 0;
      const currentDate = new Date().getTime();
      const fiveMonthAgo = currentDate - new Date().setMonth(-6);
      const threeMonthAgo = currentDate - new Date().setMonth(-4);
      const lastVisit = hotel?.visits?.[0];
      const lastVisitDate = new Date(lastVisit?.date || 1).getTime();
      const visitOffset = currentDate - lastVisitDate;

      if (visitOffset > fiveMonthAgo) {
        score += 10;
      } else if (visitOffset > threeMonthAgo) {
        score += 5;
      } else if (visitOffset < threeMonthAgo && lastVisit?.status === 0) {
        score += 30;
      } else if (visitOffset < threeMonthAgo) {
        score += 1;
      }

      if (rate > 50) {
        score += 15;
      } else if (rate > 30) {
        score += 10;
      } else if (rate > 20) {
        score += 5;
      } else if (rate < 20) {
        score += 1;
      }
    }
    return score;
  } catch (e) {
    console.error(e);
    return -1;
  }
};

export const getHotelsAndVisits = async (): Promise<any> => {
  return await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;

      const hotels = await Hotel.findAll({
        include: [
          {
            model: Visit,
          },
          {
            model: Sector,
            where: {
              name: sector,
            },
          },
        ],
        order: [
          [Visit, 'date', 'DESC NULLS FIRST'],
          [Visit, 'status', 'ASC'],
        ],
      });

      const sectorsRows = hotels
        .map(hotel => ({
          ...hotel.dataValues,
          score: calculateHotelScore(hotel),
        }))
        .sort((a, b) => b.score - a.score);

      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
};

export const createTeamsBySector = sectors => {
  Object.keys(sectors).map(async key => {
    const users = [...sectors[key]];
    const teamsCount = (users.length - (users.length % 2)) / 2;

    for (let i = 0; i < teamsCount; i++) {
      const teamName = `team${i + 1} ${key}`;
      const binome = users.splice(0, USERS_BY_TEAM);
      const sectorId = binome[0].sectorId;
      const today = new Date();
      const date: Date = new Date(
        today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7)),
      );
      const team = await Team.create({
        name: teamName,
        date,
        sectorId,
      });
      binome.map(async ({ id: userId }) => {
        await TeamComposition.create({
          userId,
          teamId: team.id,
        });
      });
    }
  });
};

export const getTeamsGroupedBySector = async () => {
  return await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;

      const teams = await Team.findAll({
        include: [
          {
            model: Sector,
            where: {
              name: sector,
            },
          },
        ],
        raw: true,
      });

      const sectorsRows = teams;
      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
};

export const dispatchHotelsToTeams = (teams, hotels: Hotel[]) => {
  hotels = hotels.slice(0, WEEK_DAYS * (VISITS_BY_DAY * teams.length));
  let visits: any = [];
  if (hotels.length) {
    while (hotels.length > 0) {
      visits = [
        ...visits,
        ...teams.map(team => {
          const hotel = hotels.shift();
          return {
            teamId: team?.id,
            hotelId: hotel?.id,
          };
        }),
      ];
    }
  }
  return visits.reduce((mutatedVisits, visit) => {
    return {
      ...mutatedVisits,
      [visit.teamId]: [...(mutatedVisits[visit.teamId] || []), visit],
    };
  }, {});
};

/**
 * Returns planned visits grouped by sectors
 * @param hotels hotels grouped by sectors
 * @param teams teams grouped by sectors
 */
export const getVisits = async (hotels, teams) => {
  const sectors = await Sector.findAll({
    group: ['sector.id'],
  }).map(sector => sector.name);
  const visits = sectors.reduce((sectorsMutated, sectorName) => {
    const sectorsHotel = hotels[sectorName];
    const sectorsTeams = teams[sectorName];
    return {
      ...sectorsMutated,
      [sectorName]: {
        ...(sectorsMutated[sectorName] || []),
        ...dispatchHotelsToTeams(sectorsTeams, sectorsHotel),
      },
    };
  }, {});
  return visits;
};

/**
 * Create visits into DB
 * @param visits visits grouped by sectors and teams
 */
export const createVisits = async visits => {
  const createVisit = async (hotel, teamId, date): Promise<any> => {
    try {
      await Visit.create({
        teamId,
        hotelId: hotel.hotelId,
        date,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
  const sectorsNames = Object.keys(visits);
  const today: Date = new Date();
  const date = new Date(
    today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7)),
  );
  sectorsNames.map(sectorName => {
    const teams = Object.keys(visits[sectorName]);
    teams.map(teamId => {
      visits[sectorName][teamId].map(hotel => {
        return createVisit(hotel, teamId, date);
      });
    });
  });
};

export const getWeeksTeamsFromDate = async (
  date = new Date(),
): Promise<Team[]> => {
  const teamsGroupedBySector = await getTeamsGroupedBySector();
  const teams = [
    ...Object.keys(teamsGroupedBySector).flatMap(
      sector => teamsGroupedBySector[sector],
    ),
  ].filter(
    team =>
      getNumberOfWeek(new Date(date)) === getNumberOfWeek(new Date(team.date)),
  );
  return teams;
};

export const getVisitsByTeam = async (teamId): Promise<Visit[]> => {
  return await Visit.findAll({
    where: {
      teamId,
    },
  });
};

export const generatesPlanning = (visits: Visit[]) => {
  const today: Date = new Date();
  const nextMonday: Date = new Date(
    today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7)),
  );
  let currentDay: Date = nextMonday;
  let plannedVisits: any = [];
  while (visits.length > 0) {
    const dayVisits = visits.splice(0, VISITS_BY_DAY);
    let hour = 9;
    currentDay = new Date(currentDay.setHours(hour, 0));
    // for each visit of a day
    for (let i = 0; i < dayVisits.length; i++) {
      const visit = dayVisits[i];
      plannedVisits = [
        ...plannedVisits,
        {
          ...visit,
          start: new Date(currentDay),
          end: new Date(currentDay.setHours(hour + 2, 0)),
        },
      ];
      hour += 2;
      if (hour === 13) {
        hour += 1; // pause midi
      }
      currentDay = new Date(currentDay.setHours(hour, 0));
    }
    // TODO: ajouter le jour de repos
    currentDay = new Date(
      moment(currentDay)
        .add(1, 'days')
        .valueOf(),
    );
  }
  return plannedVisits;
};

async function init(): Promise<any> {
  const sectors = await getUsersBySector();
  createTeamsBySector(sectors);

  const hotels = await getHotelsAndVisits();
  const teams = await getTeamsGroupedBySector();
  const visits = await getVisits(hotels, teams);
  createVisits(visits);

  return { sectors };
}

export default {
  init,
};
