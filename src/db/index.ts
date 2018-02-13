import * as Knex from 'knex';

const config = require('../../dbconfig.json');

const masterDB = (() => Knex({
  debug: true,
  client: 'mysql',
  connection: {
    host: config.master.host,
    user: config.master.user,
    password: config.master.password,
    database: config.master.database,
    connectTimeout: 1000
  },
  pool: { min: 0, max: 7 }
}))();

const slaveDB = (() => Knex({
  debug: true,
  client: 'mysql',
  connection: {
    host: config.slave.host,
    user: config.slave.user,
    password: config.slave.password,
    database: config.slave.database,
    connectTimeout: 1000
  },
  pool: { min: 0, max: 7 }
}))();

export { masterDB, slaveDB };