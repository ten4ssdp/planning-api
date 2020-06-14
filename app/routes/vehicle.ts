import express from 'express';
import Vehicle from '../models/Vehicle';
import Parking from '../models/Parking';
import Team from '../models/Team';
import { FindOptions } from 'sequelize/types';

const router = express.Router();

/**
 * @api {get} /vehicles Request all vehicles
 * @apiName GetVehicles
 * @apiGroup Vehicle
 *
 * @apiSuccess {Number} id ID of the vehicle.
 * @apiSuccess {String} numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} type Model of the vehicle.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Number} parkingId ID of the linked parking row.
 * @apiSuccess {Number} teamId ID of the linked team row.
 * @apiSuccess {Object} parking Parking information.
 * @apiSuccess {Number} parking.id ID of the Parking.
 * @apiSuccess {String} parking.address Address of the Parking.
 * @apiSuccess {Number} parking.zipCode Zip code of the Parking.
 * @apiSuccess {String} parking.city City of the Parking.
 * @apiSuccess {String} parking.createdAt Parking row creation date.
 * @apiSuccess {String} parking.updatedAt Parking row update date.
 * @apiSuccess {Object} team Team information.
 *
 */
router.get('/vehicles', async (req, res) => {
  try {
    const findOptions: FindOptions | any = {
      include: [
        {
          model: Parking,
        },
        {
          model: Team,
        },
      ],
      ...(req.query.limit && { limit: req.query.limit }),
      order: [['numberPlate', 'ASC']],
    };
    const vehicles = await Vehicle.findAll(findOptions);
    res.send(vehicles);
  } catch (error) {
    res.status(404).send({ error });
  }
});

/**
 * @api {get} /vehicle/:id Request a vehicle
 * @apiName GetVehicle
 * @apiGroup Vehicle
 *
 * @apiParam {Number} id Vehicle unique ID.
 *
 * @apiSuccess {Number} id ID of the vehicle.
 * @apiSuccess {String} numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} type Model of the vehicle.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Number} parkingId ID of the linked parking row.
 * @apiSuccess {Number} teamId ID of the linked team row.
 * @apiSuccess {Object} parking Parking information.
 * @apiSuccess {Number} parking.id ID of the Parking.
 * @apiSuccess {String} parking.address Address of the Parking.
 * @apiSuccess {Number} parking.zipCode Zip code of the Parking.
 * @apiSuccess {String} parking.city City of the Parking.
 * @apiSuccess {String} parking.createdAt Parking row creation date.
 * @apiSuccess {String} parking.updatedAt Parking row update date.
 * @apiSuccess {Object} team Team information.
 *
 */
router.get('/vehicle/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [
        {
          model: Parking,
        },
        {
          model: Team,
        },
      ],
    });
    if (!vehicle) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(vehicle);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {put} /vehicle/:id Update a vehicle
 * @apiName UpdateVehicle
 * @apiGroup Vehicle
 *
 * @apiParam {Number} id Vehicle unique ID.
 *
 * @apiSuccess {Number} id ID of the vehicle.
 * @apiSuccess {String} numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} type Model of the vehicle.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Number} parkingId ID of the linked parking row.
 * @apiSuccess {Number} teamId ID of the linked team row.
 *
 */
router.put('/vehicle/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const vehicle = await Vehicle.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
        validate: true,
      },
    );
    if (!vehicle[0]) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(vehicle);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {post} /vehicle Add a vehicle
 * @apiName AddVehicle
 * @apiGroup Vehicle
 *
 * @apiSuccess {Number} id ID of the vehicle.
 * @apiSuccess {String} numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} type Model of the vehicle.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Number} parkingId ID of the linked parking row.
 * @apiSuccess {Number} teamId ID of the linked team row.
 *
 */
router.post('/vehicle', async (req, res) => {
  try {
    const vehicle = await Vehicle.create(
      {
        ...req.body,
      },
      {
        validate: true,
      },
    );

    res.send(vehicle);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {delete} /vehicle/:id Delete a vehicle
 * @apiName DeleteVehicle
 * @apiGroup Vehicle
 *
 * @apiParam {Number} id Vehicle unique ID.
 *
 * @apiSuccess {Number} id ID of the vehicle.
 * @apiSuccess {String} numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} type Model of the vehicle.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Number} parkingId ID of the linked parking row.
 * @apiSuccess {Number} teamId ID of the linked team row.
 *
 */
router.delete('/vehicle/:id(\\d+)', async (req, res) => {
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
    res.status(404).send({ error: error.message });
  }
});

export default router;
