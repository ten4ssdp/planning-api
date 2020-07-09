import moment from 'moment';
import jwt from 'jsonwebtoken';
import { getUsersFromTeam } from './mickey/functions/teams';
import { io, transporter } from './index';
import Visit from './models/Visit';
import { usersToNotified } from './routes/notifications';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

interface Message {
  to: string;
  sound: string;
  body: string;
  data: object;
}

const expo = new Expo();

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
    const messages: Array<ExpoPushMessage> = [];
    const users = await getUsersFromTeam(visit.teamId);
    if (users.length > 0) {
      users.forEach(userObject => {
        const userIdToNotify = userObject.user.id;
        io.to(`${userIdToNotify}`).emit('emergency', visit);
      });
    }
    usersId.forEach(id => {
      const currentUser = usersToNotified.find(user => user.id === id);
      if (currentUser) {
        if (!Expo.isExpoPushToken(currentUser.token)) {
          console.error(
            `Push token ${currentUser.token} is not a valid Expo push token`,
          );
        }

        messages.push({
          to: currentUser.token,
          sound: 'default',
          body: `URGENCE: ${visit.hotel.name}`,
        });
      }
    });

    const chunks = expo.chunkPushNotifications(messages);
    const tickets: Array<ExpoPushTicket> = [];
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }

    const receiptIds: Array<string> = [];
    for (const ticket of tickets) {
      if ('id' in ticket && ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const receiptId in receipts) {
          const { status, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            const e = receipts[receiptId];
            console.error(
              `There was an error sending a notification: ${'message' in e &&
                e.message}`,
            );
            if (details && 'error' in details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export const sendVisitCancellationMail = (visit: Visit | any): void => {
  if (visit.status === -1) {
    console.log({ visit });
    const mailOptions = {
      from: 'ten4ssdp@gmail.com',
      to: 'ten4ssdp@gmail.com',
      subject: `Annulation de la visite de l'hotel ${visit.hotel.name}`,
      html: /* html */ `
        <p>Le binôme <strong>${
          visit.team.name
        }</strong> a annulé la visite du ${visit.date} à l'hôtel ${
        visit.hotel.name
      }.<br/>Retrouvez cette annulation sur le <strong>backoffice</strong> dans le planning du binôme.</p>
        <br/>
        ${
          visit?.description
            ? /* html */ `
          <p>Commentaire du binome :</p>
          <p>
            ${visit.description}
          </p>
        `
            : ''
        }
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      error ? console.log(error) : console.log(`email sent: ${info.response}`);
    });
  }
};
