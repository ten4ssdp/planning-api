import express from 'express';
import Hotel from '../models/Hotel';
import Visit from '../models/Visit';
import Sector from '../models/Sector';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      include: [
        {
          model: Visit,
        },
        {
          model: Sector,
        },
      ],
      ...(req.query.limit && { limit: req.query.limit }),
      order: [
        ['name', 'ASC'],
        [Visit, 'date', 'ASC NULLS FIRST'],
      ],
    });
    res.send(hotels);
  } catch (error) {
    res.header(400).send({ error });
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(hotel);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const hotel = await Hotel.create(
      {
        ...req.body,
      },
      {
        validate: true,
      },
    );

    res.send(hotel);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.put('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const hotel = await Hotel.update({ ...req.body },{
      where: { id: req.params.id },
      returning: true,
      validate: true
    });
    if (!hotel[0]) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(hotel);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
})

router.delete('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) throw new Error(`ID ${req.params.id} does not exist`);

    const isDeleted = await Hotel.destroy({
      where: { id: req.params.id },
    });
    if (!isDeleted) throw new Error(`ID ${req.params.id} not delete`);

    res.send(hotel);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

export default router;
