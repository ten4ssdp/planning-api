import { Sequelize } from 'sequelize';

export default new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@db:${process.env.DB_PORT}/ssdp`,
  {
    sync: { force: true },
  },
);
