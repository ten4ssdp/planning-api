import { Sequelize } from 'sequelize';

// pour avoir une base de données différente pour l'environement de test
let db_name = process.env.NODE_ENV === "test" ? "ssdp-test" : "ssdp";

export default new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@db:${process.env.DB_PORT}/${db_name}`,
  {
    sync: { force: true },
  },
);
