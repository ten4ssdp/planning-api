(function(){
    var Sequelize = require('sequelize');
    
    module.exports = new Sequelize(`postgres://${process.env.DB_ROOT_USERNAME}:${process.env.DB_ROOT_PASSWORD}@db:5432/ssdp`);
})()




// problème de connexion à la bdd 
//  peut etre c'est TypeScript qui compile mal ce qui entraine des bugs dans les modules depuis index.ts
//  peut etre c'est les variables d'environnement
//  peut etre c'est autre chose
//  en tout cas le console log ne s'affiche pas ICI, 
//  et la connexion plante une fois sur 2 quand on fait docker-compose
//  le mystère reste entier