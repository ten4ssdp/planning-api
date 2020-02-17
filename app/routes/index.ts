import express from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/User';

const router = express.Router({ mergeParams: true });

async function verifyCredentials(req, res, next): void {
  console.log(req.params);
  // let found = user.findOne({
  //   where: {
  //     email: req.params.email,
  //     password: req.params.password,
  //   }
  // });
  res.send('oui');
  return;
  if (found) {
    req.user = found;
    next();
  } else {
    // mauvais credentials
    req.status(401).send('Email ou Mot de Passe incorrect.');
  }
}

// Générer un token
router.post('/login', verifyCredentials, async function(req, res) {
  //console.log(req.user)
  return;
  try {
    jwt.sign(
      {
        email: req.params.email,
        password: req.params.password,
      },
      'secretKey',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          res.sendStatus(401);
        } else {
          res.json({ token });
        }
      },
    );
  } catch (err) {}
});

// Index de l'api
router.get('/', async function(req, res) {
  res.json({
    message: "Bienvenue sur l'api SSDP",
    description:
      "Elle contient l'ensemble des données utiles pour l'application du samu social de paris",
  });
});

export default router;
