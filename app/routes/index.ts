import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import ErrorHandler from '../helpers/error';
import Role from '../models/Role';
import Sector from '../models/Sector';
import bcrypt from 'bcrypt';

const router = express.Router({ mergeParams: true });

router.post(
  '/login',
  async (req, res): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ error: 'Veuillez entrer un Mot de passe et un Email valide.' });
    }

    let userFound = await User.findOne({
      include: [{ model: Role }, { model: Sector }],
      where: { email },
      raw: true,
    });

    let matchPwd = await bcrypt.compare(password, userFound.password);

    if (!userFound || !matchPwd) {
      res.status(400).json({ error: 'Email ou Mot de passe invalide.' });
    }

    let token = jwt.sign(
      {
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
      },
      process.env.JWTSECRET,
    );

    res.status(200).json({ token });
  },
);

// Index de l'api
router.get('/', async function(req, res) {
  res.json({
    message: "Bienvenue sur l'api SSDP",
    description:
      "Elle contient l'ensemble des données utiles pour l'application du samu social de paris",
  });
});

export default router;
