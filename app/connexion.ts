(function(){
    var Sequelize = require('sequelize');
    module.exports = new Sequelize(`postgres://${process.env.DB_ROOT_USERNAME}:${process.env.DB_ROOT_PASSWORD}@db:5432/ssdp`);
})()

