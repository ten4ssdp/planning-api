import { Sequelize } from 'sequelize';

// pour avoir une base de données différente pour l'environement de test

let db_name = process.env.NODE_ENV === "test" ? "ssdp-test" : process.env.DB_NAME;

export default new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${db_name}`,
  {
    sync: { force: true },
  },
);
