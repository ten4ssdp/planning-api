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

      const sectorsRows = hotels;
      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
};

export const createBinomesBySector = sectors => {
  Object.keys(sectors).map(async key => {
    const users = [...sectors[key]];
    const teamsCount = (users.length - (users.length % 2)) / 2;

    for (let i = 0; i < teamsCount; i++) {
      const teamName = `team${i + 1} ${key}`;
      const binome = users.splice(0, USERS_BY_TEAM);
      const sectorId = binome[0].sectorId;
      const team = await Team.create({
        name: teamName,
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
  hotels = hotels.slice(0, WEEK_DAYS * VISITS_BY_DAY);
  let visits: any = [];
  while (hotels.length > 0) {
    const hotel = hotels.shift();
    console.log(hotel);
    visits = [
      ...visits,
      ...teams.map(team => ({
        teamId: team.id,
        hotelId: hotel?.id,
      })),
    ];
  }
  return visits;
};

async function init(): Promise<any> {
  const sectors = await getUsersBySector();
  createBinomesBySector(sectors);
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
