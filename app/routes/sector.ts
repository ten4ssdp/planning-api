import express from 'express';
import Sector from '../models/Sector';
import Team from '../models/Team';
import Hotel from '../models/Hotel';
import User from '../models/User';
import { FindOptions } from 'sequelize/types';

const router = express.Router();

/**
 * @api {get} /sectors Request all sectors
 * @apiName GetSectors
 * @apiGroup Sector
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} name Name of the sector.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Object[]} teams Teams of the sector.
 * @apiSuccess {Object[]} hotels Hotels of the sector.
 * @apiSuccess {Number} hotels.id ID of the Hotel.
 * @apiSuccess {String} hotels.name Name of the Hotel.
 * @apiSuccess {String} hotels.address Address of the Hotel.
 * @apiSuccess {Number} hotels.zipCode Zip code of the Hotel.
 * @apiSuccess {String} hotels.city City of the Hotel.
 * @apiSuccess {String} hotels.createdAt Hotel row creation date.
 * @apiSuccess {String} hotels.updatedAt Hotel row update date.
 *
 */
router.get('/sectors', async (req, res) => {
  try {
    const findOptions: FindOptions | any = {
      include: [
        {
          model: Team,
        },
        {
          model: Hotel,
        },
        {
          model: User,
        },
      ],
      ...(req.query.limit && { limit: Number(req.query.limit) }),
    };
    const sectors = await Sector.findAll(findOptions);
    res.send(sectors);
  } catch (error) {
    res.status(404).send({ error });
  }
});

/**
 * @api {get} /sector/:id Request a sector
 * @apiName GetSector
 * @apiGroup Sector
 *
 * @apiParam {Number} id Sector unique ID.
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} name Name of the sector.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Object[]} teams Teams of the sector.
 * @apiSuccess {Object[]} hotels Hotels of the sector.
 * @apiSuccess {Object[]} hotels Hotels of the sector.
 * @apiSuccess {Number} hotels.id ID of the Hotel.
 * @apiSuccess {String} hotels.name Name of the Hotel.
 * @apiSuccess {String} hotels.address Address of the Hotel.
 * @apiSuccess {Number} hotels.zipCode Zip code of the Hotel.
 * @apiSuccess {String} hotels.city City of the Hotel.
 * @apiSuccess {String} hotels.createdAt Hotel row creation date.
 * @apiSuccess {String} hotels.updatedAt Hotel row update date.
 *
 */
router.get('/sector/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const sector = await Sector.findByPk(req.params.id, {
      include: [
        {
          model: Team,
        },
        {
          model: Hotel,
        },
        {
          model: User,
        },
      ],
    });
    if (!sector) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(sector);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {put} /sector/:id Update a sector
 * @apiName UpdateSector
 * @apiGroup Sector
 *
 * @apiParam {Number} id Sector unique ID.
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} name Name of the sector.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 *
 */
router.put('/sector/:id(\\d+)', async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No ID');

    const sector = await Sector.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
        validate: true,
      },
    );
    if (!sector[0]) throw new Error(`ID ${req.params.id} does not exist`);

    res.send(sector);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {post} /sector Add a sector
 * @apiName AddSector
 * @apiGroup Sector
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} name Name of the sector.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 *
 */
router.post('/sector', async (req, res) => {
  try {
    const sector = await Sector.create(
      {
        ...req.body,
      },
      {
        validate: true,
      },
    );

    res.send(sector);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {delete} /sector/:id Delete a sector
 * @apiName DeleteSector
 * @apiGroup Sector
 *
 * @apiParam {Number} id Sector unique ID.
 *
 * @apiSuccess {Number} id ID of the sector.
 * @apiSuccess {String} name Name of the sector.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 *
 */
router.delete('/sector/:id(\\d+)', async (req, res) => {
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
    res.status(404).send({ error: error.message });
  }
});

export default router;
