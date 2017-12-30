import * as restify from 'restify';
import { getEmployeeById, getEmployees } from './db';

const server = restify.createServer();
server.get('/', (req: restify.Request, res: restify.Response, next: restify.Next) => {
  res.contentType = 'json';
  res.send({ greeting: 'hello restify' });
  next();
});
server.get('/employees', getEmployees);
server.get('/employees/:id', getEmployeeById);
// server.post('/')
// server.get('/table/:name', getTableInfo);

server.listen(2000, () => {
  console.log('%s listening at %s', server.name, server.url);
});