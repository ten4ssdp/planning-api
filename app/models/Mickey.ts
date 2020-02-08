import userData from './fakeUsers.json';
import sectorData from './fakeSectors.json';
import hotelData from './fakeHotels.json';

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

function createSectors(sectors, users, hotels): [] {
  return sectors.reduce((sectors, sector) => {
    const isHisSector = (entity): boolean => entity.secteur === sector.id;
    const SectorUsers = users.filter(isHisSector);
    const SectorHotels = hotels.filter(isHisSector);

    sectors[sector.id] = {
      users: SectorUsers,
      hotels: SectorHotels,
    };

    return sectors;
  }, {});
}

function init(): void {
  const intervenants = createSectors(
    sectorData,
    getIntervenant(formatUsersObject(userData)),
    hotelData,
  );

  console.log(JSON.stringify(intervenants, null, '\t'));
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
