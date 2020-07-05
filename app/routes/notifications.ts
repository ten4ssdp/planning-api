import express from 'express';
const router = express.Router();

interface UserToNotified {
  token: string;
  id: number;
}

export let usersToNotified: Array<UserToNotified> = [];

router.post('/notifications/subscribe', (req, res) => {
  const { token, userId: id } = req.body;

  // Remove token if exist in array
  usersToNotified = usersToNotified.filter(user => user.token !== token);

  // Add token to the array
  usersToNotified.push({
    token,
    id,
  });

  res.send({ result: 'success' });
});

export default router;
