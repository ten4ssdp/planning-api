import express from 'express';
import Vehicle from '../models/Vehicle';
import Parking from '../models/Parking';
import Team from '../models/Team';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ 
      include: [
        {
          model: Parking
        },
        {
          model: Team
        }
      ],
      order: [['numberPlate', 'ASC']]
    });
    res.send(vehicles);
  } catch (error) {
    res.header(400).send({ error });
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(vehicle);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const [vehicle] = await Vehicle.upsert(
      {
        ...req.body,
      },
      {
        returning: true,
        validate: true,
      },
    );

    res.send(vehicle);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

router.delete('/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) throw new Error(`ID ${req.params.id} does not exist`);

    const isDeleted = await Vehicle.destroy({
      where: { id: req.params.id },
    });
    if (!isDeleted) throw new Error(`ID ${req.params.id} not delete`);

    res.send(vehicle);
  } catch (error) {
    res.header(400).send({ error: error.message });
  }
});

export default router;
