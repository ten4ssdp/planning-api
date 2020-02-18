import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../helpers/verifyToken';
import User from '../models/User';
import paginate from '../helpers/paginate';
import ErrorHandler from '../helpers/error';

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
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      throw new ErrorHandler(403, 'Le token est invalide.');
    } else {
      console.log(authData);
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
    .catch(error => {
      throw new ErrorHandler(500, error);
    });
});

// Récupérer la liste des users (par défaut)
router.get('/', async function(req, res): Promise<void> {
  const page: string = req.query.page || '0';
  const pageSize: string = req.query.pageSize || '20';

  await jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      throw new ErrorHandler(403, 'Le token est invalide.');
    } else {
    }
  });

  const users: User[] = await User.findAndCountAll({
    ...paginate(parseInt(page), parseInt(pageSize)),
  });

  res.send(users);
});

export default router;
