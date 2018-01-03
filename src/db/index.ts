import * as Knex from 'knex';
import Employees from './employees';

interface DBConfig {
  host: string
  user: string
  password: string
  database: string
}

const config: DBConfig = require('../../dbconfig.json');

const db: Knex = Knex({
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