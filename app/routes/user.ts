import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../helpers/verifyToken';
import User from '../models/User';

const router = express.Router();

// vérifier le token pour chaque route
router.use(verifyToken);

// supprimer un user
router.delete('/:id', (req, res) => {
  res.send('delete user');
});

// modifier un user
router.put('/:id', (req, res) => {
  res.send('modify user');
});

router.get('/:id', (req, res) => {
  res.send('affciher un user');
});

// créer un user
router.post('/create', (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, decoded) => {
    if (err) {
      res.status(403);
    } else {
      console.log(decoded);
    }
  });

  User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    roleId: req.body.role,
    sectorId: req.body.sector,
  })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(error => res.status(400).send(error));
});

// Récupérer la liste des users (par défaut)
router.get('/', async function(req, res) {
  try {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Liste des Users',
          authData,
        });
      }
    });
  } catch (err) {}
});

export default router;
