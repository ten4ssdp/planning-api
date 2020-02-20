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
    const hash = await bcrypt.hash(req.body.password, 10);

    const result = await User.update(
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

    const [rowsUpdate, [updatedUser]] = result;

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({ error: "Cet utilisateur n'existe pas." });
    }
  } catch (err) {
    res.status(500);
  }
});

router.get(
  '/:id(\\d+)',
  async (req, res): Promise<void> => {
    try {
      const userFound: User = await User.findOne({
        where: { id: req.params.id },
        include: [
          { model: Sector, attributes: ['id', 'name'] },
          { model: Role, attributes: ['id', 'name'] },
        ],
        attributes: ['id', 'name', 'lastname', 'address'],
        raw: true,
        nest: true,
      });

      if (!userFound) {
        res.status(501).json({ error: "Cet utilisateur n'existe pas." });
      }

      res.status(200).json(userFound);
    } catch (err) {
      res.status(500);
    }
  },
);

// créer un user
router.post(
  '/create',
  async (req, res): Promise<void> => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);

      const result = await User.findOrCreate({
        where: { email: req.body.email },
        raw: true,
        attributes: [
          'id',
          'name',
          'lastname',
          'address',
          'email',
          'roleId',
          'sectorId',
        ],
        defaults: {
          name: req.body.name,
          lastname: req.body.lastname,
          address: req.body.address,
          email: req.body.email,
          password: hash,
          roleId: req.body.roleId,
          sectorId: req.body.sectorId,
        },
      });

      const [model, created] = result;

      if (created === false) {
        res.status(500).json({ error: 'Utilisateur déjà existant.' });
      } else {
        res.status(201).json({
          created: {
            id: model.dataValues.id,
            name: model.dataValues.name,
            lastname: model.dataValues.lastname,
            email: model.dataValues.lastname,
            roleId: model.dataValues.roleId,
            sectorId: model.dataValues.sectorId,
          },
        });
      }
    } catch (err) {
      res.status(500);
    }
  },
);

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
