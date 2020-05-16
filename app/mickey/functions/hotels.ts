import Hotel from '../../models/Hotel';

export const calculateHotelScore = (hotel: Hotel): number => {
  try {
    let score = 0;
    if (hotel.visits?.length === 0) {
      score += 30;
    } else {
      const rate = hotel.visits?.[0]?.rate || 0;
      const currentDate = new Date().getTime();
      const fiveMonthAgo = currentDate - new Date().setMonth(-6);
      const threeMonthAgo = currentDate - new Date().setMonth(-4);
      const lastVisit = hotel?.visits?.[0];
      const lastVisitDate = new Date(lastVisit?.date || 1).getTime();
      const visitOffset = currentDate - lastVisitDate;

      if (visitOffset > fiveMonthAgo) {
        score += 10;
      } else if (visitOffset > threeMonthAgo) {
        score += 5;
      } else if (visitOffset < threeMonthAgo && lastVisit?.status === 0) {
        score += 30;
      } else if (visitOffset < threeMonthAgo) {
        score += 1;
      }

      if (rate > 50) {
        score += 15;
      } else if (rate > 30) {
        score += 10;
      } else if (rate > 20) {
        score += 5;
      } else if (rate < 20) {
        score += 1;
      }
    }
    return score;
  } catch (e) {
    console.error(e);
    return -1;
  }
};
