import * as Knex from 'knex';
import * as restify from 'restify';
import Employees from './employees';
import * as querystring from 'querystring';

const config = require('../../dbconfig.json');

const conn = Knex({
  client: 'mysql',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
});

const employees = new Employees(conn);

const getEmployees = async (req: restify.Request, res: restify.Response, next: restify.Next) => {
  const id = req.params.id;
  const queryParams = querystring.parse(req.getQuery());
  const result = await employees.getEmployee();
  res.contentType = 'json';
  res.send(result);
  next();
};

const getEmployeeById = async (req: restify.Request, res: restify.Response, next: restify.Next) => {
  const result = await employees.getEmployeeById(req.params.id);
  res.contentType = 'json';
  res.send(result);
  next();
}

const updateEmployee = async (req: restify.Request, res: restify.Response, next: restify.Next) => {
  const result = await employees.getEmployeeById(req.params.id);
  res.contentType = 'json';
  res.send(result);
  next();
}


export { getEmployees, getEmployeeById };