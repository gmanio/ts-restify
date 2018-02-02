import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
// const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: [
    '*',
    // 'http://myapp.com',
    // 'http://*.myapp.com',
    // /^https?:\/\/myapp.com(:[\d]+)?$/,
  ]
  // allowHeaders: ['API-Token'],
  // exposeHeaders: ['API-Token-Expiry']
})

import { articleController, employeesController } from './db';

const server = restify.createServer();

server.pre(cors.preflight);
server.pre((req, res, next) => {
  req.headers.accept = 'application/json';
  next();
});
server.use(cors.actual);
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false }));


/**
 * Employee Table
 */
server.get('/employees', employeesController.getEmployee.bind(employeesController));
server.get('/employees/page/:pageNumber', employeesController.getEmployeeByPage.bind(employeesController));
server.get('/employees/:id', employeesController.getEmployeeById.bind(employeesController));
server.get('/employees/search/:name', employeesController.getEmployeeByName.bind(employeesController));
server.post('/employees/update/:id', employeesController.setEmployeeById.bind(employeesController));

/**
 * Article Table
 */
server.get('/article/:id', articleController.getArticle.bind(employeesController));
server.post('/article/save', articleController.setArticle.bind(employeesController));


server.listen(2200, () => {
  console.log('%s listening at %s', server.name, server.url);
});