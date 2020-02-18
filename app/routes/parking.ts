import express from 'express';
import Parking from '../models/Parking';
import Vehicle from '../models/Vehicle';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const parkings = await Parking.findAll({ 
      include: [
        {
          model: Vehicle
        }
      ],
      order: [['address', 'ASC']]
    });
    res.send(parkings);
  } catch (error) {
    res.header(400).send({ error });
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const parking = await Parking.findByPk(req.params.id);
    if (!parking) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(parking);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const [parking] = await Parking.upsert(
      {
        ...req.body,
      },
      {
        returning: true,
        validate: true,
      },
    );

    res.send(parking);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.delete('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const parking = await Parking.findByPk(req.params.id);
    if (!parking) throw new Error(`ID ${req.params.id} does not exist`);

    const isDeleted = await Parking.destroy({
      where: { id: req.params.id },
    });
    if (!isDeleted) throw new Error(`ID ${req.params.id} not delete`);

    res.send(parking);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

export default router;
