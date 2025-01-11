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
  dialect: 'mariadb',
  logging: false,
	define: {
		timestamps: true,
	},
	dialectOptions: {
		useUTC: false,
		options: { requestTimeout: 300000 },
	},
	timezone: '-03:00'
}
