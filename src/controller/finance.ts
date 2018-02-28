import * as moment from 'moment';
import { log } from 'util';

class Finance {
  public async getKospi(db) {
    // const queryParams = querystring.parse(req.getQuery());
    const past = '201802261300';
    const current = '201802261340';

    const result = await db
      .select()
      .from('stock')
      .where('date', '>=', moment(past).format('YYYY-MM-DD hh:mm'))
      .andWhere('date', '<', moment(current).format('YYYY-MM-DD hh:mm'))
      .limit(10);
    return result;
  }

  public async getKosdaq(db) {
    // const queryParams = querystring.parse(req.getQuery());
    const result = await db.select().from('stock').where().limit(50);
    return result;
  }

  public async getKospiByPeriod(db) {
    // const queryParams = querystring.parse(req.getQuery());
    const result = await db.select().from('stock').where().limit(50);
    return result;
  }
}

export default Finance;