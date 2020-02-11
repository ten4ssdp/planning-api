(function() {
  const express = require('express');
  const app = express();
  const db = require('./connexion');
//  const userRoutes = require('./routes/user');

  db.authenticate()
    .then(() => console.log('Database connected ...'))
    .catch(err => console.log('Unable to connect to the database', err));

  app.get('/api', (req, res) => {
    res.json({
      message: "Bienvenue sur l'api SSDP",
      description:
        "Elle contient l'ensemble des données utiles pour l'application du samu social de paris",
    });
  });

  app.get('/api/user/', (req, res) => {
    res.json([{ name: 'Toto' }]);
  });

  //app.use('/api/user', userRoutes);

  const PORT = process.env.PORT || '5000';

  app.listen(PORT, console.log('server started at port ' + PORT));
})();
