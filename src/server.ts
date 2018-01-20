import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
// const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*']
  // allowHeaders: ['API-Token'],
  // exposeHeaders: ['API-Token-Expiry']
})

import { employees } from './db';

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.pre((req, res, next) => {
  req.headers.accept = 'application/json';
  res.contentType = 'json';
  next();
});

/**
 * Employee Table
 */
server.get('/employees', employees.getEmployee.bind(employees));
server.get('/employees/page/:pageNumber', employees.getEmployeeByPage.bind(employees));
server.get('/employees/:id', employees.getEmployeeById.bind(employees));
server.get('/employees/search/:name', employees.getEmployeeByName.bind(employees));
server.post('/employees/update/:id', employees.setEmployeeById.bind(employees));

/**
 * Article Table
 */
server.get('/article/:id', employees.getArticle.bind(employees));
server.post('/article/save', employees.setArticle.bind(employees));


server.listen(2500, () => {
  console.log('%s listening at %s', server.name, server.url);
});