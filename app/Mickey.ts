import User from './models/User';
import Role from './models/Role';
import Sector from './models/Sector';
import Hotel from './models/Hotel';
import { Sequelize } from 'sequelize';
import Visit from './models/Visit';
import Team from './models/Team';
import TeamComposition from './models/TeamComposition';

interface Binome {
  users: User[];
  hotels: Hotel[];
}

const USERS_BY_TEAM = 2;

const getUsersBySector = async (): Promise<any> => {
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

const getHotelsAndVisits = async (): Promise<any> => {
  return await Hotel.findAll({
    include: [
      {
        model: Visit,
      },
    ],
    order: [[Visit, 'date', 'ASC NULLS FIRST']],
  });
};

const createBinomesBySector = sectors => {
  Object.keys(sectors).map(async key => {
    const users = [...sectors[key]];
    const teamsCount = (users.length - (users.length % 2)) / 2;

    for (let i = 0; i < teamsCount; i++) {
      const teamName = `Team ${key} ${i}`;
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

async function init(): Promise<any> {
  const sectors = await getUsersBySector();
  const hotels = await getHotelsAndVisits();
  createBinomesBySector(sectors);
  return { sectors, hotels };
}

try {
  init();
} catch (error) {
  console.log(error);
}

export default {
  init,
};
