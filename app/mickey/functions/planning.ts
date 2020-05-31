import { VISITS_BY_DAY } from '../constants';
import moment from 'moment';
import Visit from '../../models/Visit';

export const generatesPlanning = (visits: Visit[], firstDay: Date) => {
  let currentDay: Date = firstDay;
  let plannedVisits: any = [];
  while (visits.length > 0) {
    const dayVisits = visits.splice(0, VISITS_BY_DAY);
    let hour = 9;
    currentDay = new Date(currentDay.setHours(hour, 0));
    // for each visit of a day
    for (let i = 0; i < dayVisits.length; i++) {
      const visit = dayVisits[i];
      plannedVisits = [
        ...plannedVisits,
        {
          ...visit,
          start: new Date(currentDay),
          end: new Date(currentDay.setHours(hour + 2, 0)),
        },
      ];
      hour += 2;
      if (hour === 13) {
        hour += 1; // pause midi
      }
      currentDay = new Date(currentDay.setHours(hour, 0));
    }
    // TODO: ajouter le jour de repos
    currentDay = new Date(
      moment(currentDay)
        .add(1, 'days')
        .valueOf(),
    );
  }
  return plannedVisits;
};
