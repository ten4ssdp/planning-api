import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../helpers/verifyToken';

const router = express.Router();

// vérifier le token pour chaque route
router.use(verifyToken);

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
