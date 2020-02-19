import User from './models/User';
import Role from './models/Role';
import Sector from './models/Sector';
import { Sequelize } from 'sequelize';
import Team from './models/Team';
import TeamComposition from './models/TeamComposition';
import Hotel from './models/Hotel';
import Visit from './models/Visit';

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
      const rate = hotel.visits?.[0]?.rate;
      const currentDate = new Date().getTime();
      const fiveMonthAgo = currentDate - new Date().setMonth(-6);
      const threeMonthAgo = currentDate - new Date().setMonth(-4);
      const lastVisitDate = new Date(hotel.visits?.[0]?.date || 1).getTime();
      const visitOffset = currentDate - lastVisitDate;

      if (visitOffset > fiveMonthAgo) {
        score += 10;
      } else if (visitOffset > threeMonthAgo) {
        score += 5;
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
        order: [[Visit, 'date', 'ASC NULLS FIRST']],
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
      const date = new Date();
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
      [visit.teamId]: [...(mutatedVisits[visit.teamId] || []), visit.hotelId],
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
  const createVisit = async (hotelId, teamId, date): Promise<any> => {
    await Visit.create({
      teamId,
      hotelId,
      date,
    });
  };
  const sectorsNames = Object.keys(visits);
  const date = new Date();
  sectorsNames.map(sectorName => {
    const teams = Object.keys(visits[sectorName]);
    teams.map(teamId => {
      visits[sectorName][teamId].map(hotelId =>
        createVisit(hotelId, teamId, date),
      );
    });
  });
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

try {
  init();
} catch (error) {
  console.log(error);
}

export default {
  init,
};
