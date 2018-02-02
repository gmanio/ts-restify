import * as Knex from 'knex';
import Employees from './employees';
import Article from './article';

interface DBConfig {
  host: string
  user: string
  password: string
  database: string
}

const config: DBConfig = require('../../dbconfig.json');

const db: Knex = Knex({
  // debug: true,
  client: 'mysql',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
});

const employeesController = new Employees(db);
const articleController = new Article(db);

export { employeesController, articleController };