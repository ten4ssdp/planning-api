(function() {
  
  const express = require('express');
  const app = express();
  const db = require('./connexion');

  const indexRoutes = require('./routes/index');
  const userRoutes = require('./routes/user');

  db.authenticate()
    .then(() => console.log('Database connected ...'))
    .catch(err => console.log('Unable to connect to the database', err));

  // routes
  app.use('/api', indexRoutes);
  app.use('/api/user', userRoutes);

  const PORT = process.env.PORT || '5000';

  app.listen(PORT, console.log('server started at port ' + PORT));

})();
