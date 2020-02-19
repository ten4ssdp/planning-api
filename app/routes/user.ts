import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../helpers/verifyToken';
import User from '../models/User';
import paginate from '../helpers/paginate';
import ErrorHandler from '../helpers/error';
import bcrypt from 'bcrypt';
import verifyPermission from '../helpers/verifyPermission';
import Sector from '../models/Sector';
import Role from '../models/Role';

const router = express.Router();

router.use(verifyPermission);

// supprimer un user
router.delete('/:id', async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500);
  }
});

// modifier un user
router.put('/:id(\\d+)', async (req, res) => {
  try {
    const userFound = await User.findOne({
      where: { id: req.params.id },
      raw: true,
    });

    const hash = await bcrypt.hash(req.body.password, 10);

    if (!userFound) {
      res.status(501).json({ error: "Cet utilisateur n'existe pas." });
    } else {
      const updatedUser = await User.update(
        {
          name: req.body.name,
          lastname: req.body.lastname,
          address: req.body.address,
          email: req.body.email,
          password: hash,
          roleId: req.body.roleId,
          sectorId: req.body.sectorId,
        },
        { where: { id: req.params.id }, returning: true },
      );

      res.status(200);
    }
  } catch (err) {
    res.status(500);
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  try {
    const userFound: User = await User.findByPk(req.params.id, { raw: true });

    if (!userFound) {
      res.status(501).json({ error: "Cet utilisateur n'existe pas." });
    }

    res.status(200).json({
      name: userFound.name,
      lastname: userFound.lastname,
      role: {
        id: userFound['role.id'],
        name: userFound['role.name'],
        level: userFound['role.level'],
      },
      sector: {
        id: userFound['sector.id'],
        name: userFound['sector.name'],
      },
    });
  } catch (err) {
    res.status(500);
  }
});

// créer un user
router.post('/create', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      res.status(501).send('Utilisateur déjà existant.');
    } else {
      const createdUser = await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        address: req.body.address,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        sectorId: req.body.sectorId,
      });

      res.status(201).send(createdUser);
    }
  } catch (err) {
    res.status(500);
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
