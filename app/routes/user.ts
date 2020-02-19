import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../helpers/verifyToken';
import User from '../models/User';
import paginate from '../helpers/paginate';
import ErrorHandler from '../helpers/error';
import bcrypt from 'bcrypt';

const router = express.Router();

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
router.post('/create', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      address: req.body.address,
      email: req.body.email,
      password: hash,
      roleId: req.body.roleId,
      sectorId: req.body.sectorId,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500);
    //throw new ErrorHandler(500, err);
  }
});

// Récupérer la liste des users (par défaut)
router.get('/', async function(req, res): Promise<void> {
  const page: string = req.query.page || '0';
  const pageSize: string = req.query.pageSize || '20';

  const users: User[] = await User.findAndCountAll({
    ...paginate(parseInt(page), parseInt(pageSize)),
  });

  res.send(users);
});

export default router;
