import * as restify from 'restify';
import { employeesRoutes } from './routes/employees';
import { articleRoutes } from './routes/article';
import { puppeteerRoutes } from './routes/puppeteer';
import { getFetchStockData } from './batch/finance';
import { financeRoutes } from './routes/finance';

/**
 * Initialize server
 * @type {Server}
 */
const server = restify.createServer();
const port: number = 1100;

/**
 * Configure Server plugins
 */
server.pre(restify.plugins.pre.dedupeSlashes());// dedupe slashes in request urls
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ maxBodySize: 5242880 }));// 5MB limited body size
server.use(restify.plugins.gzipResponse());

/**
 * configure server routes
 */
employeesRoutes(server);
articleRoutes(server);
puppeteerRoutes(server);
financeRoutes(server);
// getFetchStockData();

server.listen(port, () => `${server.name} listening at ${server.url}`);
