const knex = require('knex');

module.exports = () => knex({
  client: 'pg',
  connection: 'postgres://root:root@127.0.0.1/games_db'
});