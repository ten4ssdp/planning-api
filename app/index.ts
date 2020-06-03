import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import kebabCase from 'lodash/kebabCase';
import moment from 'moment';
import db from './connexion';
import verify from './helpers/verifyToken';
import Hotel from './models/Hotel';
import hotelsJSON from './models/json/hotels.json';
import parkingsJSON from './models/json/parkings.json';
import rolesJSON from './models/json/roles.json';
import sectorsJSON from './models/json/sectors.json';
import usersJSON from './models/json/users.json';
import vehiclesJSON from './models/json/vehicles.json';
import visitsJSON from './models/json/visits.json';
import Parking from './models/Parking';
import Role from './models/Role';
import Sector from './models/Sector';
import User from './models/User';
import Vehicle from './models/Vehicle';
import Visit from './models/Visit';
import hotelRoutes from './routes/hotel';
import indexRoutes from './routes/index';
import mickeyRoutes from './routes/mickey';
import parkingRoutes from './routes/parking';
import sectorRoutes from './routes/sector';
import userRoutes from './routes/user';
import teamsRoutes from './routes/teams';
import visitsRoutes from './routes/visits';
import vehicleRoutes from './routes/vehicle';
import bcrypt from 'bcrypt';
import path from 'path';
import socketIO from 'socket.io';
import { getUserIdFromToken } from './utils';

const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || '5000';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(
  '/documentation',
  express.static(path.resolve(__dirname + '/../apidoc')),
);
app.use('/api', indexRoutes);
app.use('/api/user', verify, userRoutes);
app.use('/api', verify, vehicleRoutes);
app.use('/api', verify, hotelRoutes);
app.use('/api', verify, sectorRoutes);
app.use('/api', verify, parkingRoutes);
app.use('/api', verify, teamsRoutes);
app.use('/api', verify, visitsRoutes);
app.use('/api/mickey', verify, mickeyRoutes);

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

    // add parking to DB
    parkingsJSON.map(parking => {
      Parking.create({
        ...parking,
      });
    });

    // add sectors to DB
    sectorsJSON.map(sector => {
      Sector.create({
        ...sector,
      });
    });

    // add users to DB
    usersJSON.map(async user => {
      User.create({
        ...user,
        ...(!user.email && {
          email: `${kebabCase(user.name)}.${kebabCase(user.lastname)}@ssdp.net`,
        }),
        password: user.password
          ? await bcrypt.hash(user.password, 10)
          : await bcrypt.hash('1234', 10),
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
        status: 1,
        rate: parseFloat(visit.rate.toString().replace(',', '.')),
      });
    });

    // add vehicles to DB
    vehiclesJSON.map(vehicle => {
      Vehicle.create({
        ...vehicle,
      });
    });
  })
  .catch(err => {
    throw err;
  });

// gestion des erreurs
// app.use((err, req, res, next) => {
//   handleError(err, req);
// });

export const io = socketIO(server);

export const connectedUser = {};

io.on('connection', socket => {
  socket.on('join', function(token) {
    const userId = getUserIdFromToken(token);
    connectedUser[userId] = [...(connectedUser[userId] || []), socket.id];
    console.log({ connectedUser });
    io.emit('messages', JSON.stringify(connectedUser));
  });

  // https://socket.io/docs/rooms-and-namespaces/

  socket.on('disconnect', function() {
    console.log('leave' + socket.id);
    Object.keys(connectedUser).map(key => {
      if (connectedUser[key].includes(socket.id)) {
        connectedUser[key] = connectedUser[key].filter(id => id !== socket.id);
      }
    });
    io.emit('messages', JSON.stringify(connectedUser));
  });
});

server.listen(PORT, () => console.log('APP RUNNING'));
