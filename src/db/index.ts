import * as Knex from 'knex';

const config = require('../../dbconfig.json');

// interface DBConfig {
//   host: string
//   user: string
//   password: string
//   database: string
// }

const masterDB = Knex({
  // debug: true,
  client: 'mysql',
  connection: {
    host: config.master.host,
    user: config.master.user,
    password: config.master.password,
    database: config.master.database
  },
  pool: { min: 0, max: 7 }
})

const slaveDB: Knex = Knex({
  // debug: true,
  client: 'mysql',
  connection: {
    host: config.slave.host,
    user: config.slave.user,
    password: config.slave.password,
    database: config.slave.database
  },
  pool: { min: 0, max: 7 }
});

export { masterDB, slaveDB };

// const employeesController = new Employees(db);
// const articleController = new Article(db);

// export { employeesController, articleController };