import Sector from '../../models/Sector';
import Hotel from '../../models/Hotel';
import { Op } from 'sequelize';
import Visit from '../../models/Visit';
import { calculateHotelScore } from './hotels';
import { WEEK_DAYS, VISITS_BY_DAY } from '../constants';
import User from '../../models/User';
import Team from '../../models/Team';

export const getHotelsAndVisits = async (): Promise<any> => {
  return await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;
      const hotels = await Hotel.findAll({
        where: {
          roomCount: {
            [Op.not]: 0,
          },
        },
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

/**
 * Generates visits by dispatching hotels to team
 * @param teams
 * @param hotels
 */
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

export const setUsersToVisits = async (teams): Promise<any[]> => {
  const returnedValue = await teams.map(async (team: any) => {
    const users = await User.findAll({
      attributes: ['name', 'lastname'],
      include: [
        {
          model: Team,
          where: { id: team.id },
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      ...team,
      users,
    };
  });
  return await Promise.all(returnedValue);
};

export const getVisitsByTeam = async (teamId): Promise<Visit[]> => {
  return await Visit.findAll({
    where: {
      teamId,
    },
  });
};

export const wipeVisits = async (date): Promise<any> => {
  return await Visit.destroy({
    where: {
      date,
    },
  });
};
