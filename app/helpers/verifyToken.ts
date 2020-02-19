import jwt from 'jsonwebtoken';

function verify(req, res, next): void {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) return res.status(400).json({ error: 'Accès refusé' });

  const token = bearerHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWTSECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Mauvais token' });
  }
}

export default verify;
