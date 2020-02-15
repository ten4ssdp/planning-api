import express from 'express';
import db from './connexion';
import indexRoutes from './routes/index';
import userRoutes from './routes/user';

const app = express();
const PORT = process.env.PORT || '5000';

db.authenticate()
  .then(() => console.log('Database connected ...'))
  .catch(err => console.log('Unable to connect to the database', err));

// routes
app.use('/api', indexRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
