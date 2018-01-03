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
    const result = await this.db.select().from('employees').where('emp_no', id);

    res.send(result);
    next();
  }

  public async getEmployeeByPage(req: restify.Request, res: restify.Response, next: restify.Next) {
    const pageNumber = req.params.pageNumber;
    const startIndex = pageNumber * 10;
    const result = await this.db.select().from('employees').offset(startIndex).limit(50);

    res.send(result);
    next();
  }

  public async setEmployeeById(req: restify.Request, res: restify.Response, next: restify.Next) {
    const id = req.params.id;
    const data = JSON.parse(req.body);
    const result = await this.db.select().from('employees').where('emp_no', id)
      .update({
        first_name: data.first_name,
        last_name: data.last_name
      });

    if ( result ) {
      res.send({ status: 'success' });
      next();
    } else {
      res.send({ error: 'dbError' });
      next();
    }
  }
}

export default Employees;