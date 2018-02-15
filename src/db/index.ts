import * as Knex from 'knex';

const config = require('../../dbconfig.json');
const masterDB = () => Knex({
  // debug: true,
  client: 'mysql',
  connection: {
    host: config.master.host,
    user: config.master.user,
    password: config.master.password,
    database: config.master.database
  },
  pool: {
    min: 0, max: 10
  },
  acquireConnectionTimeout: 10000
});

const slaveDB = () => Knex({
  // debug: true,
  client: 'mysql',
  connection: {
    host: config.slave.host,
    user: config.slave.user,
    password: config.slave.password,
    database: config.slave.database
  },
  pool: {
    min: 0, max: 10
  },
  acquireConnectionTimeout: 10000
});

export { masterDB, slaveDB };