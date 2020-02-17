import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import verifyToken from '../helpers/verifyToken';
import verifyCredentials from '../helpers/verifyCredentials';

const router = express.Router({ mergeParams: true });

// Générer un token
router.post('/login', verifyCredentials, (req, res) => {
  try {
    jwt.sign(
      {
        ...req.user,
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
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
