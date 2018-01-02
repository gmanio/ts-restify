import * as Knex from 'knex';
import Employees from './employees';

const config = require('../../dbconfig.json');

const db = Knex({
  client: 'mysql',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
});

const employees = new Employees(db);

export { employees };