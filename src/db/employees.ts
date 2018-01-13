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

  public async getEmployeeByName(req: restify.Request, res: restify.Response, next: restify.Next) {
    const name = req.params.name;
    // const queryParams: any = querystring.parse(req.getQuery());
    // if ( queryParams ) {
    //   const pageNumber: number = queryParams.pageNumber;
    //   const startIndex = pageNumber * 10;
    //   result = await this.db.select().from('employees').where('first_name', 'like', `${name}%`).offset(startIndex).limit(10);
    // } else {
    //   const pageNumber = req.params.pageNumber;
    //   const startIndex = pageNumber * 10;
    //   result = await this.db.select().from('employees').where('first_name', 'like', `${name}%`).limit(20);
    // }
    // MATCH(content) AGAINST ('commercial' IN BOOLEAN MODE)

    const result = await this.db.select().from('employees').whereRaw(`MATCH(first_name) AGAINST ('${name}*' IN BOOLEAN MODE)`).limit(20);

    res.send(result);
    next();
  }

  public async getArticle(req: restify.Request, res: restify.Response, next: restify.Next) {
    const id = req.params.id;
    const result = await this.db.select().from('article').where('id', id).first();

    res.send(result);
    next();
  }

  public async setArticle(req: restify.Request, res: restify.Response, next: restify.Next) {
    const result = await this.db('article').insert({
      title: req.body.title,
      content: JSON.stringify(req.body.content)
    });

    res.send(result);
    next();
  }
}

export default Employees;