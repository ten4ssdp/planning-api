import express from 'express';
import Visit from '../models/Visit';
import Hotel from '../models/Hotel';
import { getWeekNumber, sendEmergencyVisit } from '../utils';
import { generatesPlanning } from '../mickey/functions/planning';
import { Op } from 'sequelize';

const router = express.Router();

/**
 * @api {get} /visits Request all visits
 * @apiName GetVisits
 * @apiGroup Visit
 *
 * @apiSuccess {Object[]}  - List of visits
 * @apiSuccess {Number}    -.id ID of the visit.
 * @apiSuccess {Number}    -.rate Visit rate.
 * @apiSuccess {String}    -.status Status of the visit.
 * @apiSuccess {Boolean}   -.isUrgent Urgence of visit.
 * @apiSuccess {Number}    -.teamId ID of the linked team row.
 * @apiSuccess {Number}    -.hotel ID of the linked hotel row.
 * @apiSuccess {String}    -.createdAt Row creation date.
 * @apiSuccess {String}    -.updatedAt Row update date.
 *
 */
router.get('/visits', async (req, res) => {
  try {
    const visits = await Visit.findAll();
    res.send(visits);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

/**
 * @api {get} /visits/:teamId/:date Get visits by team
 * @apiName GetVisitsByTeam
 * @apiGroup Visit
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
  const date = new Date(req.params.date);
  let plannedVisits: any = [];
  let visits = await Visit.findAll({
    where: {
      status: 0,
      teamId: req.params.teamId,
      isUrgent: {
        [Op.not]: true,
      },
    },
    include: [
      {
        model: Hotel,
      },
    ],
    raw: true,
    nest: true,
  });

  const emergencies = await Visit.findAll({
    where: {
      teamId: req.params.teamId,
      isUrgent: true,
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
  plannedVisits = [...plannedVisits, ...generatesPlanning(visits, date)];
  res.send({ visits: plannedVisits, emergencies });
});

/**
 * @api {post} /visit Add a visit
 * @apiName AddVisit
 * @apiGroup Visit
 * @apiParamExample {json} Request-Example:
 *    {
 *      "hotelId": 25778400,
 *      "teamId": 1,
 *      "rate": 0,
 *      "date": "06-06-2020",
 *      "isUrgent": true,
 *      "description": "wesh ils datent eux"
 *    }
 *
 * @apiSuccess {Number} id ID of the visit.
 * @apiSuccess {Number} rate Visit rate.
 * @apiSuccess {String} status Status of the visit.
 * @apiSuccess {Boolean} isUrgent Urgence of visit.
 * @apiSuccess {Number} teamId ID of the linked team row.
 * @apiSuccess {Number} hotel ID of the linked hotel row.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 *
 */
router.post('/visit', async (req, res) => {
  try {
    const createdVisit = await Visit.create(
      {
        ...req.body,
      },
      {
        raw: true,
      },
    );
    const visit = await Visit.findByPk(createdVisit.dataValues.id, {
      raw: true,
      nest: true,
      include: [Hotel],
    });
    sendEmergencyVisit(visit);
    res.send(visit);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

/**
 * @api {put} /visit/:id/ Update a Visit
 * @apiName UpdateVisit
 * @apiGroup Visit
 *
 * @apiParam {Number} id the unique ID of the selected User
 *
 * @apiParam {Object} body              shape of the request body.
 * @apiParam {String} body.rate         rate of the Visit.
 * @apiParam {String} body.date         date of the Visit.
 * @apiParam {Number} body.status       status of the Visit.
 * @apiParam {Boolean} body.isUrgent    urgence of the Visit.
 * @apiParam {String} body.description  description of the Visit.
 *
 * @apiSuccess {Number} id ID of the visit.
 * @apiSuccess {Number} rate Visit rate.
 * @apiSuccess {String} status Status of the visit.
 * @apiSuccess {Boolean} isUrgent Urgence of visit.
 * @apiSuccess {Number} teamId ID of the linked team row.
 * @apiSuccess {Number} hotel ID of the linked hotel row.
 * @apiSuccess {String} createdAt Row creation date.
 * @apiSuccess {String} updatedAt Row update date.
 *
 */
router.put('/:id(\\d+)', async (req, res) => {
  const { body } = req;
  try {
    const result = await Visit.update(body, {
      where: { id: req.params.id },
      returning: true,
      validate: true,
    });

    const visit = await Visit.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Hotel],
    });
    sendEmergencyVisit(visit);

    const [rowsUpdate, [updatedVisit]] = result;

    if (updatedVisit) {
      res.status(200).json(updatedVisit);
    } else {
      res.status(400).json({ error: "Visit doesn't exists." });
    }
  } catch (err) {
    res.status(500);
  }
});

/**
 * @api {delete} /user/:id/ Delete a Visit
 * @apiName DeleteVisit
 * @apiGroup Visit
 *
 * @apiParam {Number} id    (param) ID of the selected Visit
 *
 * @apiParam {Number} count  number of deleted rows
 */
router.delete('/:id(\\d+)', async (req, res) => {
  try {
    const visit = await Visit.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!visit) throw new Error(`ID ${req.params.id} not delete`);

    res.send(visit);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default router;
