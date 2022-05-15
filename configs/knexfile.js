
module.exports = {
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    port: '5432',
    database: 'games_db',
    user: 'root',
    password: 'root',
  },
  migrations: {
    directory: `${__dirname}/../migrations`,
    tableName: 'knex_migrations'
  }
};
