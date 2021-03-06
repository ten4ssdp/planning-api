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
import notificationsRoutes from './routes/notifications';
import bcrypt from 'bcrypt';
import path from 'path';
import socketIO from 'socket.io';
import { getUserIdFromToken } from './utils';
import nodemailer from 'nodemailer';
import http from 'http';
import redisAdapter from 'socket.io-redis';

const app = express();
export const server = http.createServer(app);
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
app.use('/api', verify, notificationsRoutes);
app.use('/api/user', verify, userRoutes);
app.use('/api', verify, vehicleRoutes);
app.use('/api', verify, hotelRoutes);
app.use('/api', verify, sectorRoutes);
app.use('/api', verify, parkingRoutes);
app.use('/api', verify, teamsRoutes);
app.use('/api', verify, visitsRoutes);
app.use('/api/mickey', verify, mickeyRoutes);

db.authenticate()
  .then(() => console.log('Database connected at ' + new Date().getTime()))
  .catch(err => console.log('Unable to connect to the database', err));

db.sync()
  .then(async () => {
    // add roles to DB
    await Promise.all(
      rolesJSON.map(async role => {
        return await Role.create({
          ...role,
        });
      }),
    );

    // add parking to DB
    await Promise.all(
      parkingsJSON.map(async parking => {
        return await Parking.create({
          ...parking,
        });
      }),
    );

    // add sectors to DB
    await Promise.all(
      sectorsJSON.map(async sector => {
        return await Sector.create({
          ...sector,
        });
      }),
    );

    // add users to DB
    await Promise.all(
      usersJSON.map(async user => {
        return await User.create({
          ...user,
          ...(!user.email && {
            email: `${kebabCase(user.name)}.${kebabCase(
              user.lastname,
            )}@ssdp.net`,
          }),
          password: user.password
            ? await bcrypt.hash(user.password, 10)
            : await bcrypt.hash('1234', 10),
        });
      }),
    );

    // add hotels to DB
    await Promise.all(
      hotelsJSON.map(async hotel => {
        return await Hotel.create({
          ...hotel,
        });
      }),
    );

    // add visits to DB
    await Promise.all(
      visitsJSON.map(async visit => {
        const date = moment(visit.date, 'D/M/YYYY')
          .utc()
          .valueOf();

        return await Visit.create({
          ...visit,
          date,
          status: 1,
          rate: parseFloat(visit.rate.toString().replace(',', '.')),
        });
      }),
    );

    // add vehicles to DB
    await Promise.all(
      vehiclesJSON.map(async vehicle => {
        return await Vehicle.create({
          ...vehicle,
        });
      }),
    );

    return;
  })
  .then(() => {
    console.log('tables created at ' + new Date().getTime());
    server.emit('dbinit');
  })
  .catch(err => {
    throw err;
  });

// gestion des erreurs
// app.use((err, req, res, next) => {
//   handleError(err, req);
// });

export const io = socketIO(server);
const REDIS_HOST = process.env.REDIS_URL || 'redis-cache';
const REDIS_PORT =
  parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379') || 6379;

io.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));

export const connectedUser = {};

io.on('connection', socket => {
  socket.on('join', function(token) {
    const userId = getUserIdFromToken(token);
    socket.join(userId);
    io.emit('messages', JSON.stringify(socket.rooms));
  });
  // https://socket.io/docs/rooms-and-namespaces/

  socket.on('disconnect', function() {
    io.emit('messages', JSON.stringify(connectedUser));
  });
});

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

server.listen(PORT, () => console.log('APP RUNNING'));
server.on('close', () => {
  db.close();
});
export default server;
