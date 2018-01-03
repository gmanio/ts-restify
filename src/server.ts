import * as restify from 'restify';
import { employees } from './db';

const server = restify.createServer();

server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.pre((req, res, next) => {
  req.headers.accept = 'application/json';
  res.contentType = 'json';
  next();
});

server.get('/employees', employees.getEmployee.bind(employees));
server.get('/employees/page/:pageNumber', employees.getEmployeeByPage.bind(employees));
server.get('/employees/:id', employees.getEmployeeById.bind(employees));
server.post('/employees/update/:id', employees.setEmployeeById.bind(employees));

server.listen(2000, () => {
  console.log('%s listening at %s', server.name, server.url);
});