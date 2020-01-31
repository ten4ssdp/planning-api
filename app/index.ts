const express = require('express');
const app = express();
const createConnexion = require('./connexion');
const jwt = require('jsonwebtoken');
const verifyToken = require('./helpers/verifyToken');

const username = process.env.DB_ROOT_USERNAME;
const pwd = process.env.DB_ROOT_PASSWORD;

const db = createConnexion(username, pwd);

db.authenticate()
  .then(() => console.log('Database connected ...'))
  .catch(err => console.log('Unable to connect to the database', err));

app.get('/api', (req, res) => {
  res.json({
    message: "Bienvenue sur l'api du samu social de paris",
  });
});

app.get('/api/planning', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'planning de la semaine',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  jwt.sign(
    {
      email: req.params.email,
      password: req.params.password,
    },
    'secretKey',
    (err, token) => {
      if (err) {
        res.sendStatus(401);
      } else {
        res.json({ token });
      }
    },
  );
});

const PORT = process.env.PORT || '5000';

app.listen(PORT, console.log('server started at port ' + PORT));
