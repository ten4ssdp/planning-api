import Sector from '../../models/Sector';
import User from '../../models/User';
import Role from '../../models/Role';
import Team from '../../models/Team';
import TeamComposition from '../../models/TeamComposition';

import { Sequelize } from 'sequelize';
import { USERS_BY_TEAM } from '../constants';
import { getWeekNumber, getNextMonday } from '../../utils';

export const getUsersBySector = async (): Promise<any> => {
  return await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;
      const users = await User.findAll({
        order: [Sequelize.fn('RANDOM')],
        include: [
          {
            model: Role,
            where: {
              name: 'Intervenant Terrain',
            },
          },
          {
            model: Sector,
            where: {
              name: sector,
            },
          },
        ],
      });
      // const visits = await Visit.findAll();
      const sectorsRows = users;
      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
};

export const createTeamsBySector = (sectors, weekNumber) => {
  Object.keys(sectors).map(async key => {
    const users = [...sectors[key]];
    const teamsCount = (users.length - (users.length % 2)) / 2;

    for (let i = 0; i < teamsCount; i++) {
      const teamName = `team${i + 1} ${key}`;
      const binome = users.splice(0, USERS_BY_TEAM);
      const sectorId = binome[0].sectorId;
      const date: Date = getNextMonday();
      const team = await Team.create({
        name: teamName,
        date,
        sectorId,
        weekNumber,
      });
      binome.map(async ({ id: userId }) => {
        await TeamComposition.create({
          userId,
          teamId: team.id,
        });
      });
    }
  });
};

export const getTeamsGroupedBySector = async () => {
  return await Sector.findAll({
    group: ['sector.id'],
  })
    .map(sector => sector.name)
    .reduce(async (sectorsPromise, sector) => {
      const sectorsMutated = await sectorsPromise;

      const teams = await Team.findAll({
        include: [
          {
            model: Sector,
            where: {
              name: sector,
            },
          },
        ],
        raw: true,
        nest: true,
      });

      const sectorsRows = teams;
      sectorsMutated[sector] = [
        ...(sectorsMutated[sector] || []),
        ...sectorsRows,
      ];

      return sectorsMutated;
    }, {});
};

export const getWeeksTeamsFromDate = async (
  date = new Date(),
): Promise<Team[]> => {
  const teamsGroupedBySector = await getTeamsGroupedBySector();
  const teams = [
    ...Object.keys(teamsGroupedBySector).flatMap(
      sector => teamsGroupedBySector[sector],
    ),
  ].filter(
    team =>
      getWeekNumber(new Date(date)) === getWeekNumber(new Date(team.date)),
  );
  return teams;
};

export const wipeTeams = async (date): Promise<any> => {
  return await Team.destroy({
    where: {
      date,
    },
  });
};
