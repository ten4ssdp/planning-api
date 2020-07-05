import { Sequelize } from 'sequelize';

// pour avoir une base de données différente pour l'environement de test
const dbName =
  process.env.NODE_ENV === 'test' ? 'postgres' : process.env.DB_NAME;

export default new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`,
  {
    sync: { force: true },
    logging: false,
  },
);
