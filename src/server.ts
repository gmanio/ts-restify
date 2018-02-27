import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import { employeesRoutes } from './routes/employees';
import { articleRoutes } from './routes/article';
import { puppeteerRoutes } from './routes/puppeteer';
import { getFetchStockData } from './batch/finance';
import { financeRoutes } from './routes/finance';

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
const work = 'test';
const server = restify.createServer();

server.use(cors.actual);
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false, maxBodySize: 5242880 }));
server.pre(cors.preflight);
server.pre(restify.plugins.pre.dedupeSlashes());
server.pre((req, res, next) => {
  // req.headers.accept = 'application/json';
  next();
});

employeesRoutes(server);
articleRoutes(server);
puppeteerRoutes(server);
financeRoutes(server);
getFetchStockData();

server.listen(1100, () => {
  console.log('%s listening at %s', server.name, server.url);
});
