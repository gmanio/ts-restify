import * as Knex from 'knex';

const config = require('../../dbconfig.json');
const masterDB = () => Knex({
  // debug: true,
  client: 'mysql2',
  connection: {
    host: config.master.host,
    user: config.master.user,
    password: config.master.password,
    database: config.master.database
  },
  pool: {
    min: 2,
    max: 10
  }
});

const puppeteerDB = () => Knex({
  client: 'mysql2',
  connection: {
    host: config.puppeteer.host,
    user: config.puppeteer.user,
    password: config.puppeteer.password,
    database: config.puppeteer.database
  },
  pool: {
    min: 2,
    max: 10
  }
})

const slaveDB = () => Knex({
  // debug: true,
  client: 'mysql2',
  connection: {
    host: config.slave.host,
    user: config.slave.user,
    password: config.slave.password,
    database: config.slave.database
  },
  pool: {
    min: 2,
    max: 10
  }
});

const financeDB = () => Knex({
  // debug: true,
  client: 'mysql2',
  connection: {
    host: config.finance.host,
    user: config.finance.user,
    password: config.finance.password,
    database: config.finance.database
  },
  pool: {
    min: 2,
    max: 10
  }
});

export { masterDB, slaveDB, puppeteerDB, financeDB };