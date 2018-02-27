import * as moment from 'moment';

class Finance {
  public async getKospi(db) {
    // const queryParams = querystring.parse(req.getQuery());
    const past = '201802261100';
    const current = '201802261140';
    const result = await db
      .select()
      .from('stock')
      .where('date', '>=', moment(past, "YYYYMMDD hhmm").format('YYYY-MM-DD hh:mm'))
      .andWhere('date', '<', moment(current, "YYYYMMDD hhmm").format('YYYY-MM-DD hh:mm'))
      .limit(10);

    console.log(
      db
        .select()
        .from('stock')
        .where('date', '>=', moment(past, "YYYYMMDD hhmm").format('YYYY-MM-DD hh:mm'))
        .andWhere('date', '<', moment(current, "YYYYMMDD hhmm").format('YYYY-MM-DD hh::mm'))
        .limit(10)
        .toSQL());

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