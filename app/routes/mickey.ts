import express from 'express';
import User from '../models/User';
import Role from '../models/Role';
import Sector from '../models/Sector';
import { Sequelize } from 'sequelize';
import Visit from '../models/Visit';
import Hotel from '../models/Hotel';
import Mickey from '../Mickey';

const router = express.Router();

router.get('/', async (req, res) => {
  let users: User[];
  (async (): Promise<User[]> => {
    users = await User.findAll({
      include: [
        {
          model: Role,
          where: {
            name: 'Intervenant Terrain',
          },
        },
      ],
    });
    res.send(users);
    return users;
  })();
});
router.get('/sector', (req, res) => {
  (async (): Promise<Sector[]> => {
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
    res.send(sectors);
    return sectors;
  })();
});

router.get('/hotels', (req, res) => {
  (async (): Promise<Visit[]> => {
    const hotels = await Hotel.findAll({
      include: [
        {
          model: Visit,
        },
      ],
      order: [[Visit, 'date', 'ASC NULLS FIRST']],
    });
    res.send(hotels);
    return hotels;
  })();
});
router.get('/main', (req, res) => {
  Mickey.init();
  res.send({ yolo: 'yolo' });
});

export default router;
