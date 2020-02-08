import userData from './fakeUsers.json';
import sectorData from './fakeSectors.json';
import hotelData from './fakeHotels.json';
import { pipe } from '../utils';

function formatUsersObject(users): [] {
  return users.map(user => ({
    nom: user['Nom'],
    prenom: user['Prénom'],
    fonction: user['Fonction'],
    secteur: user['Secteur'],
    adresse: user['Adresse'],
  }));
}

function getIntervenant(users): [] {
  const isIntervenant = (user): boolean =>
    user.fonction === 'Intervenant Terrain';
  return users.filter(isIntervenant);
}

function isHisSector(entity: any[], sector: { id: string }): any[] {
  return entity.filter((e): boolean => e.secteur === sector.id);
}

function shuffle(array): any[] {
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i++) {
    const r = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[r]] = [newArray[r], newArray[i]];
  }

  return newArray;
}

function createBinomes(hotels) {
  return users => {
    const binomes: any[] = [];
    const usersCopy = users;
    const max = (usersCopy.length - (usersCopy.length % 2)) / 2;

    for (let i = 0; i < max; i++) {
      const binome = {};
      binome['users'] = usersCopy.splice(0, 2);
      binome['hotels'] = hotels;
      binomes.push(binome);
    }

    return binomes;
  };
}

function shuffleUserAndCreateBinomesInSectors(sectors): {} {
  return Object.keys(sectors).reduce((sectorsMutated, key) => {
    const current = { ...sectors[key] };
    current.binomes = pipe(
      shuffle,
      createBinomes(current.hotels),
    )(current.users);

    sectorsMutated[key] = {
      ...current,
    };

    return sectorsMutated;
  }, {});
}

function createSectors(sectors, users, hotels): {} {
  return sectors.reduce((sectors, sector) => {
    const SectorUsers = isHisSector(users, sector);
    const SectorHotels = isHisSector(hotels, sector);

    sectors[sector.id] = {
      users: SectorUsers,
      hotels: SectorHotels,
    };

    return sectors;
  }, {});
}

function init(): void {
  const users = pipe(formatUsersObject, getIntervenant)(userData);
  const sectors = pipe(shuffleUserAndCreateBinomesInSectors)(
    createSectors(sectorData, users, hotelData),
  );

  console.log(JSON.stringify(sectors, null, '\t'));
}

/**
 * TODO: Creer les binomes
 * TODO: Ajouter les plages horaire des secteurs
 * TODO: Binomes par secteurs
 * TODO: Attribution des hotels aux teams
 */

try {
  init();
} catch (error) {
  console.log(error);
}

export default {
  init,
  getIntervenant,
};
