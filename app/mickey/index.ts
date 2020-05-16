import {
  getUsersBySector,
  createTeamsBySector,
  getTeamsGroupedBySector,
  wipeTeams,
} from './functions/teams';
import {
  getHotelsAndVisits,
  getVisits,
  createVisits,
  wipeVisits,
} from './functions/visits';
import { getWeekNumber, getNextMonday } from '../utils';

async function init(nextMonday = getNextMonday()): Promise<any> {
  await wipeVisits(nextMonday);
  await wipeTeams(nextMonday);
  const sectors = await getUsersBySector();
  const weekNumber = getWeekNumber(nextMonday);
  createTeamsBySector(sectors, weekNumber);

  const hotels = await getHotelsAndVisits();
  const teams = await getTeamsGroupedBySector();
  const visits = await getVisits(hotels, teams);
  createVisits(visits);

  return { sectors };
}

export default { init };
