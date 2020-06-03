import moment from 'moment';
import jwt from 'jsonwebtoken';
import { getUsersFromTeam } from './mickey/functions/teams';
import { connectedUser, io } from './index';

export const pipe = (...fns) => (x): any => fns.reduce((v, f) => f(v), x);

export const getWeekNumber = (refDate = new Date()): number => {
  const firstDayOfYear = new Date(refDate.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (refDate.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const getNextMonday = (): Date =>
  moment()
    .day(8)
    .toDate();

export const sendNotification = (socket, data) => {
  socket.emit('notification', data);
};

export const getUserIdFromToken = token => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    const { id } = decodedToken;
    return id;
  } catch (err) {
    return err;
  }
};

export const sendEmergencyVisit = async (visit): Promise<void> => {
  if (visit.isUrgent === true) {
    const teamsUsers = await getUsersFromTeam(visit.teamId);
    const usersId: Array<number | string> = teamsUsers.map(tc => tc?.user?.id);
    usersId.forEach(id => {
      if (connectedUser.hasOwnProperty(id)) {
        connectedUser[id].forEach(socketId => {
          io.to(socketId).emit('emergency', visit);
        });
      }
    });
  }
};
