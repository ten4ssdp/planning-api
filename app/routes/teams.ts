import express from 'express';
import User from '../models/User';
import Team from '../models/Team';
import { setUsersToVisits } from '../mickey/functions/visits';
import { getUsersFromTeam } from '../mickey/functions/teams';
import TeamComposition from '../models/TeamComposition';

const router = express.Router();

/**
 * @api {get} /teams/:userId Get team by user id
 * @apiName GetTeamsByUserId
 * @apiGroup Team
 *
 * @apiParam {Number} userId Sector unique ID.
 *
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} date
 * @apiSuccess {Number} weekNumber
 * @apiSuccess {Date} createdAt
 * @apiSuccess {Date} updatedAt
 * @apiSuccess {Number} sectorId
 * @apiSuccess {Object[]} teamComposition UserObject
 * @apiSuccess {Number} teamComposition.user.id
 * @apiSuccess {String} teamComposition.user.name
 * @apiSuccess {String} teamComposition.user.lastname
 * @apiSuccess {String} teamComposition.user.email
 * @apiSuccess {String} teamComposition.user.sectorId
 * @apiSuccess {String} teamComposition.user.roleId
 */
router.get('/teams/:userId(\\d+)', async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) throw new Error('please provide an id');

  try {
    const teams = await Team.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
        },
      ],
      raw: true,
      nest: true,
    });
    if (!teams) throw new Error(`ID ${userId} does not exists`);
    const teamsWithUsersPromise = await teams.map(team => {
      return getUsersFromTeam(team.id);
    });
    const teamWithUsers: any = await Promise.all(teamsWithUsersPromise);
    const teamsWithUsers = teams.map((t: Team, i: number) => ({
      ...t,
      users: teamWithUsers[i].map(t => t.user),
    }));
    res.send(teamsWithUsers);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/**
 * @api {get} /teams/:userId/:date Get team by user id
 * @apiName GetTeamByUserIdAndDate
 * @apiGroup Team
 *
 * @apiParam {Number} userId Sector unique ID.
 * @apiParam {String} date date with (mm-dd-yyyy) format.
 *
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} date
 * @apiSuccess {Number} weekNumber
 * @apiSuccess {Date} createdAt
 * @apiSuccess {Date} updatedAt
 * @apiSuccess {Number} sectorId
 * @apiSuccess {Object[]} users
 * @apiSuccess {Number} users.id
 * @apiSuccess {String} users.name
 * @apiSuccess {String} users.lastname
 * @apiSuccess {String} users.email
 * @apiSuccess {String} users.sectorId
 * @apiSuccess {String} users.roleId
 */
router.get('/teams/:userId(\\d+)/:date', async (req, res) => {
  const {
    params: { userId, date },
  } = req;
  if (!userId) throw new Error('please provide an id');

  try {
    const teams = await Team.findAll({
      where: { date },
      include: [
        {
          model: User,
          where: { id: userId },
        },
      ],
      raw: true,
      nest: true,
    });
    if (!teams) throw new Error(`ID ${userId} does not exists`);
    const teamsWithUsersPromise = await teams.map(team => {
      return getUsersFromTeam(team.id);
    });
    const teamWithUsers: any = await Promise.all(teamsWithUsersPromise);
    const teamsWithUsers = teams.map((t: Team, i: number) => ({
      ...t,
      users: teamWithUsers[i].map(t => t.user),
    }));
    res.send(teamsWithUsers);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

export default router;
