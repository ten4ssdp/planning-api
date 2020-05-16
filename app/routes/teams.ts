import express from 'express';

const router = express.Router();

/**
 * @api {get} /teams/:userId/:weekNumber Get team by user id and week number
 * @apiName GetTeamByUserIdAndWeekNumber
 * @apiGroup Team
 *
 * @apiParam {Number} userId Sector unique ID.
 * @apiParam {Number} weekNumber Sector unique ID.
 *
 */
router.get('/teams/:userId(\\d+)/:weekNumber(\\d+)', (req, res) => {
  const {
    params: { userId, weekNumber },
  } = req;
  if (!userId || !weekNumber)
    throw new Error('please provide an id and a weeknumber');
});
