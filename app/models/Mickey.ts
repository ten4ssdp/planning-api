import userData from './fakeUsers.json';
import sectorData from './fakeSectors.json';
import hotelData from './fakeHotels.json';
import { pipe } from '../utils';

interface User {
  nom: string;
  prenom: string;
  fonction: string;
  secteur: number;
  adresse: string;
}

interface Hotel {
  uid: number;
  nom: string;
  adresse: string;
  cp: number;
  secteur: number;
  ville: string;
  statut: number;
  nbChambre: number;
}

interface Sector {
  id: number;
  name: string;
}

interface Binome {
  users: User[];
  hotels: Hotel[];
}

const HOTELS_BY_DAY = 5;
const USERS_BY_TEAM = 2;
/**
 * Format JSON User key
 *
 * @param {User[]} users
 * @returns {User[]}
 */
function formatUsersObject(users: User[]): User[] {
  return users.map(user => ({
    nom: user['Nom'],
    prenom: user['Prénom'],
    fonction: user['Fonction'],
    secteur: user['Secteur'],
    adresse: user['Adresse'],
  }));
}

/**
 * Get only User with `Intervenant Terrain` function
 *
 * @param {User[]} users
 * @returns {User[]}
 */
function getIntervenant(users: User[]): User[] {
  const isIntervenant = (user): boolean =>
    user.fonction === 'Intervenant Terrain';
  return users.filter(isIntervenant);
}

/**
 * Retrieve User or Hotel from a given Sector
 *
 * @param {(Hotel[] | User[])} entity
 * @param {Sector} sector
 * @returns {(Hotel[] | User[])}
 */
function isHisSector(entity, sector: Sector): Hotel[] | User[] {
  return entity.filter((e: Hotel | User) => e.secteur === sector.id);
}

/**
 * Shuffle an array
 *
 * @param {*} array
 * @returns {any[]}
 */
function shuffle(array: any[]): any[] {
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i++) {
    const r = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[r]] = [newArray[r], newArray[i]];
  }

  return newArray;
}

/**
 * Create Binomes
 *
 * @param {Hotel[]} hotels
 * @returns
 */
function createBinomes(hotels: Hotel[]) {
  return (users: User[]): Binome[] => {
    const binomes: Binome[] = [];
    const usersCopy: User[] = users;
    const max: number = (usersCopy.length - (usersCopy.length % 2)) / 2;

    for (let i = 0; i < max; i++) {
      const binome: Binome = {
        ['users']: usersCopy.splice(0, USERS_BY_TEAM),
        ['hotels']: hotels,
      };
      binomes.push(binome);
    }

    return binomes;
  };
}

function distributeHotelsToBinomes(hotels, binomes): {} {
  const hotelsCopy = [...hotels];
  return binomes.map(binome => {
    binome.hotels = hotelsCopy.splice(0, HOTELS_BY_DAY);
    return binome;
  });
}

/**
 * Create random binomes for each sector
 *
 * @param {*} sectors
 * @returns {{}}
 */
function shuffleUserAndCreateBinomesInSectors(sectors): {} {
  return Object.keys(sectors).reduce((sectorsMutated, key) => {
    const current = { ...sectors[key] };
    const binomes = pipe(shuffle, createBinomes(current.hotels))(current.users);

    current.binomes = distributeHotelsToBinomes(current.hotels, binomes);
    sectorsMutated[key] = {
      ...current,
    };

    return sectorsMutated;
  }, {});
}

/**
 * Create Sectors
 *
 * @param {*} sectors
 * @param {User[]} users
 * @param {Hotel[]} hotels
 * @returns {{}}
 */
function createSectors(sectors, users: User[], hotels: Hotel[]): {} {
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

/**
 * Init the algo
 *
 */
function init(): void {
  const users = pipe(formatUsersObject, getIntervenant)(userData);
  const sectors = pipe(shuffleUserAndCreateBinomesInSectors)(
    createSectors(sectorData, users, hotelData),
  );

  console.log(JSON.stringify(sectors, null, '\t'));
}

/**
 * TODO: Ajouter les plages horaire des secteurs
 * TODO: Attribution des hotels aux binomes
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
