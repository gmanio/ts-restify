import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import { masterDB, slaveDB } from './db';
import Employees from './controller/employees';
import Article from './controller/article';
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

const server = restify.createServer();

const employeesController = new Employees();
const articleController = new Article();

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
server.get('/employees', async (req, res) => res.send(await employeesController.getEmployee(slaveDB)));
server.get('/employees/page',
  async (req, res) => {
    const size = req.query.size ? req.query.size : 20;
    const start = req.query.start ? req.query.start * size : 1;
    res.send(await employeesController.getEmployeeByPage(slaveDB, { start, size }));
  });
server.get('/employees/:id', async (req, res) => {
  const id = req.params.id;
  res.send(await employeesController.getEmployeeById(slaveDB, id));
});
server.get('/employees/search/:name', async (req, res) => {
  const name = req.params.name;
  res.send(await employeesController.getEmployeeByName(slaveDB, name));
});
server.post('/employees/update/:id', async (req, res) => {
  res.send(await employeesController.setEmployeeById(masterDB, { id: req.params.id, data: JSON.parse(req.body) }));
});

/**
 * Article Table
 */
server.get('/article/:id', async (req, res) => {
  const id = req.params.id;
  res.send(await articleController.getArticle(slaveDB, { id }));
});

server.get('/article', async (req, res) => {
  res.send(await articleController.getArticleList(slaveDB));
});

server.post('/article/save', async (req, res) => {
  const params = {
    title: req.body.title,
    content: JSON.stringify(req.body.content)
  }

  res.send(await articleController.setArticle(masterDB, params));
});


server.listen(7777, () => {
  console.log('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', function (req, res, route, err) {
  // this event will be fired, with the error object from above:
  // ReferenceError: x is not defined
  console.log(err);
  res.send(err);
});