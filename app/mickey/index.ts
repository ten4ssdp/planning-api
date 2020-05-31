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
import { getNextMonday } from '../utils';

async function init(nextMonday = getNextMonday()): Promise<any> {
  await wipeVisits(nextMonday);
  await wipeTeams(nextMonday);
  const sectors = await getUsersBySector();
  createTeamsBySector(sectors, nextMonday);

  const hotels = await getHotelsAndVisits();
  const teams = await getTeamsGroupedBySector();
  const visits = await getVisits(hotels, teams);
  createVisits(visits, new Date(nextMonday));

  return { sectors };
}

export default { init };
