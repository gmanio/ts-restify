import Finance from '../controller/finance';
import { financeDB, slaveDB } from '../db';


export const financeRoutes = (server) => {
  const financeController = new Finance();

  /**
   * Finance Table
   */
  server.get('/finance/kospi', async (req, res, next) => {
    res.send(await financeController.getKospi(financeDB()));
    return next();
  });
}