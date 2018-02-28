import * as request from 'request';
import * as cron from 'node-cron';
import * as vm from 'vm';
import { financeDB } from '../db';

enum API_TYPE {
  KOSPI = 1,
  KOSDAQ = 2
}

const apiUrls = require('../../dbconfig.json');
const globalVar = {
  dataset: {}
};

export const getFetchStockData = () => {
  // save kospi
  cron.schedule('0 * 9-15 * * 1-5', () => {
    const context = vm.createContext(globalVar);

    request.get(apiUrls.kospi, async (error, response, body) => {
      const script = new vm.Script(body);
      await script.runInContext(context);
      await financeDB().insert({ dataset: JSON.stringify(globalVar.dataset), type: API_TYPE.KOSPI }).into('stock');
    });
  });

  // save kosdaq
  cron.schedule('0 * 9-15 * * 1-5', () => {
    const context = vm.createContext(globalVar);

    request.get(apiUrls.kosdaq, async (error, response, body) => {
      const script = new vm.Script(body);
      await script.runInContext(context);
      await financeDB().insert({ dataset: JSON.stringify(globalVar.dataset), type: API_TYPE.KOSDAQ }).into('stock');
    });
  });
}