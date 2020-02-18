import express from 'express';
import User from '../models/User';
import Role from '../models/Role';
import Sector from '../models/Sector';
import { Sequelize } from 'sequelize';
import Mickey, {
  getHotelsAndVisits,
  dispatchHotelsToTeams,
  getTeamsGroupedBySector,
  getVisits,
  createVisits,
} from '../Mickey';
import Team from '../models/Team';
import Visit from '../models/Visit';
import Hotel from '../models/Hotel';

const router = express.Router();

router.get('/', async (req, res) => {
  const users: User[] = await User.findAll({
    include: [
      {
        model: Role,
        where: {
          name: 'Intervenant Terrain',
        },
      },
    ],
  });
  return res.send(users);
});
router.get('/sector', async (req, res) => {
  const sectors = await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;

      const sectorsRows = await User.findAll({
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

      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
  return res.send(sectors);
});

router.get('/hotels', async (req, res) => {
  const hotels = await getHotelsAndVisits();
  res.send(hotels);
});
router.get('/teams', async (req, res) => {
  const teams = await getTeamsGroupedBySector();
  res.send(teams);
});
router.get('/visits', async (req, res) => {
  const visits = await Visit.findAll({
    where: {
      status: 0,
    },
    order: ['date'],
  });
  res.send(visits);
});
router.get('/main', (req, res) => {
  Mickey.init();
  res.send({ yolo: 'yolo' });
});

export default router;
