import express from 'express';
import Hotel from '../models/Hotel';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.findAll({ order: [['id', 'DESC']] });
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
    const [hotel] = await Hotel.upsert(
      {
        ...req.body,
      },
      {
        returning: true,
        validate: true,
      },
    );

    res.send(hotel);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

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
