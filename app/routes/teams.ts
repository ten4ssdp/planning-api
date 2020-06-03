import express from 'express';
import User from '../models/User';
import Team from '../models/Team';

const router = express.Router();

/**
 * @api {get} /teams/:userId Get team by user id
 * @apiName GetTeamByUserIdAndWeekNumber
 * @apiGroup Team
 *
 * @apiParam {Number} userId Sector unique ID.
 * @apiParam {Number} weekNumber Sector unique ID.
 *
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
          attributes: [],
          where: { id: userId },
        },
      ],
    });
    if (!teams) throw new Error(`ID ${userId} does not exists`);
    res.send(teams);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

export default router;
