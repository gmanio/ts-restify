import { masterDB, slaveDB } from '../db';
import Employees from '../controller/employees';

export const employeesRoutes = (server) => {
  const employeesController = new Employees();

  /**
   * Employee Table
   */
  server.get('/employees', async (req, res, next) => {
    res.send(await employeesController.getEmployee(slaveDB()))
    return next();
  });
  server.get('/employees/page',
    async (req, res, next) => {
      const defaultSize = 20;
      const size = req.query.size ? +req.query.size : defaultSize;
      const start = req.query.start ? (+req.query.start * size) - 1 : 0;
      res.send(await employeesController.getEmployeeByPage(slaveDB(), { start, size }));
      return next();
    });
  server.get('/employees/:id', async (req, res, next) => {
    const id = req.params.id;
    res.send(await employeesController.getEmployeeById(slaveDB(), id));
    return next();
  });
  server.get('/employees/search/:name', async (req, res, next) => {
    const name = req.params.name;
    res.send(await employeesController.getEmployeeByName(slaveDB(), name));
    return next();
  });
  server.post('/employees/update/:id', async (req, res, next) => {
    res.send(await employeesController.setEmployeeById(masterDB(), { id: req.params.id, data: JSON.parse(req.body) }));
    return next();
  });
}