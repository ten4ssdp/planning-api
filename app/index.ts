import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import kebabCase from 'lodash.kebabCase';
import moment from 'moment';
import db from './connexion';
import Hotel from './models/Hotel';
import hotelsJSON from './models/json/hotels.json';
import rolesJSON from './models/json/roles.json';
import sectorsJSON from './models/json/sectors.json';
import usersJSON from './models/json/users.json';
import vehiclesJSON from './models/json/vehicles.json';
import visitsJSON from './models/json/visits.json';
import Role from './models/Role';
import Sector from './models/Sector';
import User from './models/User';
import Vehicle from './models/Vehicle';
import Visit from './models/Visit';
import hotelRoutes from './routes/hotel';
import indexRoutes from './routes/index';
import sectorRoutes from './routes/sector';
import userRoutes from './routes/user';
import vehicleRoutes from './routes/vehicle';

const app = express();
const PORT = process.env.PORT || '5000';

app.use(cors());
app.use(bodyParser());

db.authenticate()
  .then(() => console.log('Database connected ...'))
  .catch(err => console.log('Unable to connect to the database', err));

db.sync()
  .then(() => {
    // add roles to DB
    rolesJSON.map(role => {
      Role.create({
        ...role,
      });
    });

    // add sectors to DB
    sectorsJSON.map(sector => {
      Sector.create({
        ...sector,
      });
    });

    // add users to DB
    usersJSON.map(user => {
      User.create({
        ...user,
        email: `${kebabCase(user.name)}.${kebabCase(user.lastname)}@ssdp.net`,
        password: '1234',
      });
    });

    // add hotels to DB
    hotelsJSON.map(hotel => {
      Hotel.create({
        ...hotel,
      });
    });

    // add visits to DB
    visitsJSON.map(visit => {
      const date = moment(visit.date, 'D/M/YYYY')
        .utc()
        .valueOf();

      Visit.create({
        ...visit,
        date,
        rate: parseFloat(visit.rate.toString().replace(',', '.')),
      });
    });

    vehiclesJSON.map(vehicle => {
      Vehicle.create({
        ...vehicle,
      });
    });
  })
  .catch(err => {
    throw err;
  });

// routes
app.use('/api', indexRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/sector', sectorRoutes);

app.listen(PORT, () => console.log(`| INFO | SERVER STARTED AT PORT ${PORT}.`));
