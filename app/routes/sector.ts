import express from 'express';
import Sector from '../models/Sector';
import Team from '../models/Team';
import Hotel from '../models/Hotel';
import User from '../models/User';

const router = express.Router();

/**
 * TODO: Check associations
 * TODO: add user & hotel
 */

router.get('/', async (req, res) => {
  try {
    const sectors = await Sector.findAll({
      include: [
        {
          model: Team
        },
        {
          model: Hotel
        },
        {
          model: User
        },
      ]
    });
    res.send(sectors);
  } catch (error) {
    res.header(400).send({ error });
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const sector = await Sector.findByPk(req.params.id);
    if (!sector) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(sector);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const [sector] = await Sector.upsert(
      {
        ...req.body,
      },
      {
        returning: true,
        validate: true,
      },
    );

    res.send(sector);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.delete('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const sector = await Sector.findByPk(req.params.id);
    if (!sector) throw new Error(`ID ${req.params.id} does not exist`);

    const isDeleted = await Sector.destroy({
      where: { id: req.params.id },
    });
    if (!isDeleted) throw new Error(`ID ${req.params.id} not delete`);

    res.send(sector);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

export default router;
