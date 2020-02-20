import express from 'express';
import User from '../models/User';
import Role from '../models/Role';
import Sector from '../models/Sector';
import { Sequelize } from 'sequelize';
import Mickey, {
  getHotelsAndVisits,
  generatesPlanning,
  getTeamsGroupedBySector,
  getVisits,
  getWeeksTeamsFromDate,
} from '../Mickey';
import Visit from '../models/Visit';
import Hotel from '../models/Hotel';
import Team from '../models/Team';
import { getNumberOfWeek } from '../utils';

const router = express.Router();

router.get('/visits', async (req, res) => {
  const hotels = await getHotelsAndVisits();
  const teams = await getTeamsGroupedBySector();
  const visits = await getVisits(hotels, teams);
  res.send(visits);
});

router.get('/teams/', async (req, res) => {
  const teams = await getTeamsGroupedBySector();
  res.send(teams);
});

router.get('/teams/:date', async (req, res) => {
  if (!req.params.date) throw new Error('No date');
  const teams = await getWeeksTeamsFromDate(new Date(req.params.date));
  res.send(teams);
});

router.get('/visits/:teamId/:date', async (req, res) => {
  if (!req.params.date) throw new Error('No date');
  if (!req.params.teamId) throw new Error('No teamId');
  let plannedVisits: any = [];
  const visits = await Visit.findAll({
    where: {
      status: 0,
      teamId: req.params.teamId,
    },
    raw: true,
  }).filter(
    // get next week's team
    visit =>
      getNumberOfWeek(new Date(req.params.date)) ===
      getNumberOfWeek(new Date(visit.date)),
  );
  const teams = await getWeeksTeamsFromDate(new Date(req.params.date));
  teams.map(team => {
    if (
      getNumberOfWeek(new Date(team.date) || new Date()) ===
      getNumberOfWeek(new Date()) + 1
    ) {
      plannedVisits = [...plannedVisits, ...generatesPlanning(visits)];
    }
  });
  res.send(plannedVisits);
});

router.get('/main', (req, res) => {
  Mickey.init();
  res.send({ yolo: 'yolo' });
});

export default router;
