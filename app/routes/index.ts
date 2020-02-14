(function() {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const router = express.Router();
  
    // Générer un token
    router.post('/login', async function(req, res) {
      try {
        jwt.sign(
          {
            email: req.params.email,
            password: req.params.password,
          },
          'secretKey',
          {expiresIn: "24h"},
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
  
    module.exports = router;
  })();
  