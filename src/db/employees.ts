import * as Knex from 'knex';
import * as restify from 'restify';
import * as querystring from 'querystring';

class Employees {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async getEmployee(req: restify.Request, res: restify.Response, next: restify.Next) {
    //   const id = req.params.id;
    //   const queryParams = querystring.parse(req.getQuery());
    const result = await this.db.select().from('employees').limit(50);
    res.send(result);
    next();
  }

  public async getEmployeeById(req: restify.Request, res: restify.Response, next: restify.Next) {
    const id = req.params.id;
    await this.db
      .select().from('employees').where('emp_no', id).then(result => {
        res.send(result);
        next();
      });
  }
}

export default Employees;