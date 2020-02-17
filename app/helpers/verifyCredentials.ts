import User from '../models/User';

export default function verifyCredentials(req, res, next): void {
  const { email, password } = req.body;
  if (typeof email !== 'undefined' && typeof password !== 'undefined') {
    User.findOne({ where: { email, password } }).then(user => {
      if (null !== user) {
        const result = user.dataValues;
        req.user = result;
        next();
      } else {
        res.status(401).send('User not found');
      }
    });
  } else {
    // Forbiden
    res.status(401).send('bad credentials');
  }
}
