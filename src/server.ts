import * as restify from 'restify';
import { employees } from './db';

const server = restify.createServer();

server.pre((req, res, next) => {
  req.headers.accept = 'application/json';
  res.contentType = 'json';
  next();
});

server.get('/employees', employees.getEmployee.bind(employees));
server.get('/employees/page/:pageNumber', employees.getEmployeeByPage.bind(employees));
server.get('/employees/:id', employees.getEmployeeById.bind(employees));

server.listen(2000, () => {
  console.log('%s listening at %s', server.name, server.url);
});