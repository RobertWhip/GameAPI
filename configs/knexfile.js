require('dotenv').config({ path: '../.env' })

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD
  },
  migrations: {
    directory: `${__dirname}/../migrations`,
    tableName: 'knex_migrations'
  }
};
