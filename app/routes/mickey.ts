import express from 'express';
import Mickey from '../mickey/index';
import Visit from '../models/Visit';
import Hotel from '../models/Hotel';
import Team from '../models/Team';
import User from '../models/User';
import { getWeeksTeamsFromDate } from '../mickey/functions/teams';
import { setUsersToVisits } from '../mickey/functions/visits';
import { Op } from 'sequelize';

const router = express.Router();

/**
 * @api {post} /mickey/
 * @apiName Launch Mickey for next week
 * @apiGroup Mickey
 *
 * @apiSuccess {String} mickey result
 */
router.post('/', async (req, res) => {
  try {
    await Mickey.init();
    res.send({ mickey: 'ok' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/**
 * @api {post} /mickey/:date
 * @apiName Launch Mickey for a specified week
 * @apiGroup Mickey
 *
 * @apiParam {String} date the mon day of the week to generate (MM-DD-YYYY).
 *
 * @apiSuccess {String} mickey result
 */
router.post('/:date', async (req, res) => {
  try {
    if (req.params.date) {
      await Mickey.init(new Date(req.params.date));
      res.send({ mickey: 'ok' });
    } else {
      res.send({ mickey: 'undefined date' });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/**
 * @api {get} /mickey/teams/:date Get Teams by date
 * @apiName GetTeamsByDate
 * @apiGroup Mickey
 *
 * @apiParam {Number} date Date of the week
 *
 * @apiSuccess {Number} id ID of the visit.
 * @apiSuccess {String} name Name of the sector.
 * @apiSuccess {String} createdAt Team creation date.
 * @apiSuccess {String} updatedAt Team update date.
 * @apiSuccess {Number} sectorId Team update date.
 * @apiSuccess {Object} sector Sector Object.
 * @apiSuccess {Number} sector.id Sector's id.
 * @apiSuccess {String} sector.name Sector's name.
 * @apiSuccess {String} sector.createdAt Sector creation date.
 * @apiSuccess {String} sector.updatedAt Sector update date.
 */
router.get('/teams/:date', async (req, res) => {
  if (!req.params.date) throw new Error('No date');
  let teams = await getWeeksTeamsFromDate(new Date(req.params.date));

  teams = await setUsersToVisits(teams);

  res.send(teams);
});
router.get('/visits', async (req, res) => {
  let visits = await Visit.findAll({
    where: {
      status: {
        [Op.or]: [{ status: 0 }, { status: -1 }, { status: 1 }],
      },
    },
    include: [
      Hotel,
      {
        model: Team,
      },
    ],
    raw: true,
    nest: true,
  });

  visits = visits.map(async visit => {
    const users = await User.findAll({
      attributes: ['id', 'name', 'lastname'],
      include: [
        {
          model: Team,
          where: { id: visit.teamId },
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      ...visit,
      users,
    };
  });

  res.send(visits);
});

export default router;
