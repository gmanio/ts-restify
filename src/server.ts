import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import { employeesRoutes } from './routes/employees';
import { articleRoutes } from './routes/article';

const user: number = 0;

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
});

const server = restify.createServer();

server.use(cors.actual);
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.pre(cors.preflight);
server.pre(restify.plugins.pre.dedupeSlashes());
server.pre((req, res, next) => {
  this.user = user + 1;
  console.log('connected :: ' + this.user);
  req.headers.accept = 'application/json';
  next();
});

employeesRoutes(server);
articleRoutes(server);

server.listen(80, () => {
  console.log('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', (req, res, route, err) => {
  // this event will be fired, with the error object from above:
  // ReferenceError: x is not defined
  console.log('uncaughtException : ' + err);
  res.send(err);
});


