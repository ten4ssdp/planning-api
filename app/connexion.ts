const Sequelize = require('sequelize');

function connectDB(username: string, pwd: string): void {
  return new Sequelize(`postgres://${username}:${pwd}@db:5432/ssdp`);
}

module.exports = connectDB;
