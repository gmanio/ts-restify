import * as Knex from 'knex';

class Employees {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public getEmployee() {
    return this.db.select().from('employees').limit(50);
  }

  public getEmployeeById(id: number) {
    return this.db.select().from('employees').where('emp_no', id);
  }
}

export default Employees;