require('dotenv').config({ silent: true });

const HOST_DB = process.env.DB_HOST;
const PORT_DB = process.env.DB_PORT;
const DATABASE_DB = process.env.DATABASE;
const USER_DB = process.env.DB_USER;
const PASSWORD_DB = process.env.DB_PASSWORD;

module.exports = {
  host: HOST_DB,
  port: PORT_DB,
  database: DATABASE_DB,
  username: USER_DB,
  password: PASSWORD_DB,
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true,
  },
  dialectOptions: {
    timezone: 'Z', // Use 'Z' para UTC ou ajuste para sua região
  },
  timezone: '-03:00', // Define o timezone para o Sequelize
  migrationStorageTableName: 'sequelize_meta',
  migrations: {
    path: './database/migrations',
  },
};
