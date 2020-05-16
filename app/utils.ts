import moment from 'moment';

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
