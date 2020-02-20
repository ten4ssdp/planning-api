import express from 'express';
import Hotel from '../models/Hotel';
import Visit from '../models/Visit';
import Sector from '../models/Sector';

const router = express.Router();

/**
 * @api {get} /hotels Request all hotels
 * @apiName GetHotels
 * @apiGroup Hotel
 *
 * @apiSuccess {Number} id ID of the hotel.
 * @apiSuccess {String} address Address of the hotel.
 * @apiSuccess {Number} zipCode Zip code of the hotel.
 * @apiSuccess {String} city City of the hotel.
 * @apiSuccess {String} createdAt Hotel row creation date.
 * @apiSuccess {String} updatedAt Hotel row update date.
 * @apiSuccess {Number} sectorId Hotel sector ID.
 * @apiSuccess {Object[]} visits Visits of the hotel.
 * @apiSuccess {Number} visits.id ID of the visit.
 * @apiSuccess {Number} visits.rate Rate of the visit.
 * @apiSuccess {String} visits.createdAt Row creation date.
 * @apiSuccess {String} visits.updatedAt Row update date.
 * @apiSuccess {Object} sector ID of the sector.
 * @apiSuccess {Number} sector.id ID of the sector.
 * @apiSuccess {String} sector.name Name of the sector.
 * @apiSuccess {String} sector.createdAt Row creation date.
 * @apiSuccess {String} sector.updatedAt Row update date.
 */
router.get('/hotels', async (req, res) => {
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
    res.status(404).send({ error });
  }
});

/**
 * @api {get} /hotel/:id Request an hotel
 * @apiName GetHotel
 * @apiGroup Hotel
 *
 * @apiParam {Number} id Hotel unique ID.
 *
 * @apiSuccess {Number} id ID of the hotel.
 * @apiSuccess {String} address Address of the hotel.
 * @apiSuccess {Number} zipCode Zip code of the hotel.
 * @apiSuccess {String} city City of the hotel.
 * @apiSuccess {String} createdAt Hotel row creation date.
 * @apiSuccess {String} updatedAt Hotel row update date.
 * @apiSuccess {Number} sectorId Hotel sector ID.
 * @apiSuccess {Object[]} visits Visits of the hotel.
 * @apiSuccess {Number} visits.id ID of the visit.
 * @apiSuccess {Number} visits.rate Rate of the visit.
 * @apiSuccess {String} visits.createdAt Row creation date.
 * @apiSuccess {String} visits.updatedAt Row update date.
 * @apiSuccess {Object} sector ID of the sector.
 * @apiSuccess {Number} sector.id ID of the sector.
 * @apiSuccess {String} sector.name Name of the sector.
 * @apiSuccess {String} sector.createdAt Row creation date.
 * @apiSuccess {String} sector.updatedAt Row update date.
 */
router.get('/hotel/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(hotel);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {post} /hotel Add an hotel
 * @apiName AddHotel
 * @apiGroup Hotel
 *
 * @apiSuccess {Number} id ID of the hotel.
 * @apiSuccess {String} address Address of the hotel.
 * @apiSuccess {Number} zipCode Zip code of the hotel.
 * @apiSuccess {String} city City of the hotel.
 * @apiSuccess {String} createdAt Hotel row creation date.
 * @apiSuccess {String} updatedAt Hotel row update date.
 * @apiSuccess {Number} sectorId Hotel sector ID.
 */
router.post('/hotel', async (req, res) => {
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
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {put} /hotel/:id Update an hotel
 * @apiName UpdateHotel
 * @apiGroup Hotel
 *
 * @apiParam {Number} id Hotel unique ID.
 *
 * @apiSuccess {Number} id ID of the hotel.
 * @apiSuccess {String} address Address of the hotel.
 * @apiSuccess {Number} zipCode Zip code of the hotel.
 * @apiSuccess {String} city City of the hotel.
 * @apiSuccess {String} createdAt Hotel row creation date.
 * @apiSuccess {String} updatedAt Hotel row update date.
 * @apiSuccess {Number} sectorId Hotel sector ID.
 */
router.put('/hotel/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const hotel = await Hotel.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
        validate: true,
      },
    );
    if (!hotel[0]) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(hotel);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {delete} /hotel/:id Delete an hotel
 * @apiName DeleteHotel
 * @apiGroup Hotel
 *
 * @apiParam {Number} id Hotel unique ID.
 *
 * @apiSuccess {Number} id ID of the hotel.
 * @apiSuccess {String} address Address of the hotel.
 * @apiSuccess {Number} zipCode Zip code of the hotel.
 * @apiSuccess {String} city City of the hotel.
 * @apiSuccess {String} createdAt Hotel row creation date.
 * @apiSuccess {String} updatedAt Hotel row update date.
 * @apiSuccess {Number} sectorId Hotel sector ID.
 */
router.delete('/hotel/:id(\\d+)', async (req, res) => {
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
    res.status(404).send({ error: error.message });
  }
});

export default router;
