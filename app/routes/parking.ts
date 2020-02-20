import express from 'express';
import Parking from '../models/Parking';
import Vehicle from '../models/Vehicle';

const router = express.Router();

/**
 * @api {get} /parkings Request all parkings
 * @apiName GetParkings
 * @apiGroup Parking
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} address Address of the parking.
 * @apiSuccess {Number} zipCode Zip code of the parking.
 * @apiSuccess {String} city City of the parking.
 * @apiSuccess {String} createdAt Parking row creation date.
 * @apiSuccess {String} updatedAt Parking row update date.
 * @apiSuccess {Object[]} vehicles Vehicle of the parking.
 * @apiSuccess {Number} vehicle.id ID of the vehicle.
 * @apiSuccess {String} vehicle.numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} vehicle.type Model of the vehicle.
 * @apiSuccess {String} vehicle.createdAt Row creation date.
 * @apiSuccess {String} vehicle.updatedAt Row update date.
 * @apiSuccess {Number} vehicle.parkingId ID of the linked parking row.
 * @apiSuccess {Number} vehicle.teamId ID of the linked team row.
 */
router.get('/parkings', async (req, res) => {
  try {
    const parkings = await Parking.findAll({
      include: [
        {
          model: Vehicle,
        },
      ],
      ...(req.query.limit && { limit: req.query.limit }),
      order: [['address', 'ASC']],
    });
    res.send(parkings);
  } catch (error) {
    res.status(404).send({ error });
  }
});

/**
 * @api {get} /parking/:id Request a parking
 * @apiName GetParking
 * @apiGroup Parking
 *
 * @apiParam {Number} id Parking unique ID.
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} address Address of the parking.
 * @apiSuccess {Number} zipCode Zip code of the parking.
 * @apiSuccess {String} city City of the parking.
 * @apiSuccess {String} createdAt Parking row creation date.
 * @apiSuccess {String} updatedAt Parking row update date.
 * @apiSuccess {Object[]} vehicles Vehicle of the parking.
 * @apiSuccess {Number} vehicle.id ID of the vehicle.
 * @apiSuccess {String} vehicle.numberPlate NumberPlate of the vehicle.
 * @apiSuccess {String} vehicle.type Model of the vehicle.
 * @apiSuccess {String} vehicle.createdAt Row creation date.
 * @apiSuccess {String} vehicle.updatedAt Row update date.
 * @apiSuccess {Number} vehicle.parkingId ID of the linked parking row.
 * @apiSuccess {Number} vehicle.teamId ID of the linked team row.
 */
router.get('/parking/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const parking = await Parking.findByPk(req.params.id, {
      include: [
        {
          model: Vehicle,
        },
      ],
    });
    if (!parking) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(parking);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {put} /parking/:id Update a parking
 * @apiName UpdateParking
 * @apiGroup Parking
 *
 * @apiParam {Number} id Parking unique ID.
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} address Address of the parking.
 * @apiSuccess {Number} zipCode Zip code of the parking.
 * @apiSuccess {String} city City of the parking.
 * @apiSuccess {String} createdAt Parking row creation date.
 * @apiSuccess {String} updatedAt Parking row update date.
 */
router.put('/parking/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const parking = await Parking.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
        validate: true,
      },
    );
    if (!parking[0]) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(parking);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {post} /parking Add a parking
 * @apiName AddParking
 * @apiGroup Parking
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} address Address of the parking.
 * @apiSuccess {Number} zipCode Zip code of the parking.
 * @apiSuccess {String} city City of the parking.
 * @apiSuccess {String} createdAt Parking row creation date.
 * @apiSuccess {String} updatedAt Parking row update date.
 */
router.post('/parking', async (req, res) => {
  try {
    const parking = await Parking.create(
      {
        ...req.body,
      },
      {
        validate: true,
      },
    );

    res.send(parking);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {delete} /parking/:id Delete a parking
 * @apiName DeleteParking
 * @apiGroup Parking
 *
 * @apiParam {Number} id Parking unique ID.
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} address Address of the parking.
 * @apiSuccess {Number} zipCode Zip code of the parking.
 * @apiSuccess {String} city City of the parking.
 * @apiSuccess {String} createdAt Parking row creation date.
 * @apiSuccess {String} updatedAt Parking row update date.
 */
router.delete('/parking/:id(\\d+)', async (req, res) => {
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
    res.status(404).send({ error: error.message });
  }
});

export default router;
