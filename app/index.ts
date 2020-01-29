const express = require('express');
const app = express();
const createConnexion = require('./connexion');

const username = process.env.DB_ROOT_USERNAME;
const pwd = process.env.DB_ROOT_PASSWORD;

const db = createConnexion(username, pwd);

db.authenticate()
  .then(() => console.log('Database connected ...'))
  .catch(err => console.log('Unable to connect to the database', err));

app.get('/', (req, res) => {
  res.send('ok');
});

const PORT = process.env.PORT || '5000';

app.listen(PORT, console.log('server started at port ' + PORT));
