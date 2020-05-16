import express from 'express';
import Mickey from '../mickey/index';
import Visit from '../models/Visit';
import Hotel from '../models/Hotel';
import { getWeekNumber } from '../utils';
import Team from '../models/Team';
import User from '../models/User';
import { getWeeksTeamsFromDate } from '../mickey/functions/teams';
import { generatesPlanning } from '../mickey/functions/planning';
import { setUsersToVisits } from '../mickey/functions/visits';

const router = express.Router();
/**
 * @api {post} /mickey
 * @apiName Launch Mickey
 * @apiGroup Mickey
 *
 * @apiSuccess {String} mickey result
 */
router.post('/', (req, res) => {
  Mickey.init();
  res.send({ mickey: 'ok' });
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
      status: 0,
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
      attributes: ['name', 'lastname'],
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
/**
 * @api {get} /mickey/visits/:teamId/:date Get visits by team
 * @apiName GetVisitsByTeam
 * @apiGroup Mickey
 *
 * @apiParam {Number} teamId Team unique id.
 * @apiParam {Number} date Date of the week
 *
 * @apiSuccess {Number} id ID of the visit.
 * @apiSuccess {Number} rate Rate of the visit.
 * @apiSuccess {Number} status Status of the visit.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 * @apiSuccess {Number} teamId Visit's teamId.
 * @apiSuccess {Number} hotelId Visit's hotelId.
 * @apiSuccess {Object} hotel Hotels of the visit.
 * @apiSuccess {Number} hotel.id ID of the Hotel.
 * @apiSuccess {String} hotel.name Name of the Hotel.
 * @apiSuccess {String} hotel.address Address of the Hotel.
 * @apiSuccess {Number} hotel.zipCode Zip code of the Hotel.
 * @apiSuccess {String} hotel.city City of the Hotel.
 * @apiSuccess {String} hotel.createdAt Hotel row creation date.
 * @apiSuccess {String} hotel.updatedAt Hotel row update date.
 * @apiSuccess {String} start Visit's start date string.
 * @apiSuccess {String} end Visit's end date string.
 *
 */
router.get('/visits/:teamId/:date', async (req, res) => {
  if (!req.params.date) throw new Error('No date');
  if (!req.params.teamId) throw new Error('No teamId');
  let plannedVisits: any = [];
  let visits = await Visit.findAll({
    where: {
      status: 0,
      teamId: req.params.teamId,
    },
    include: [
      {
        model: Hotel,
      },
    ],
    raw: true,
    nest: true,
  });

  visits = visits.filter(
    // get next week's team
    visit =>
      getWeekNumber(new Date(req.params.date)) ===
      getWeekNumber(new Date(visit.date)),
  );
  plannedVisits = [...plannedVisits, ...generatesPlanning(visits)];
  res.send(plannedVisits);
});

export default router;
