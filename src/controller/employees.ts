import { Employee } from '../type/interfaces';

class Employees {
  public static async getEmployee(db) {
    // const queryParams = querystring.parse(req.getQuery());
    const result: Employee[] = await db.select().from('employees').limit(50);
    return result;
  }

  public static async getEmployeeById(db, id) {
    const result: Employee[] = await db.select().from('employees').where('emp_no', id);
    return result;
  }

  public static async getEmployeeByPage(db, { start, size }) {
    const result: Employee[] = await db.select().from('employees').offset(start).limit(size);
    return result;
  }

  public static async setEmployeeById(db, { id, data }) {
    const result = await db.select().from('employees').where('emp_no', id)
      .update({
        first_name: data.first_name,
        last_name: data.last_name
      });

    return result;
  }

  public static async getEmployeeByName(db, name) {
    // const queryParams: any = querystring.parse(req.getQuery());
    // if ( queryParams ) {
    //   const pageNumber: number = queryParams.pageNumber;
    //   const startIndex = pageNumber * 10;
    //   result = await this.db.select().from('employeesController').where('first_name', 'like', `${name}%`).offset(startIndex).limit(10);
    // } else {
    //   const pageNumber = req.params.pageNumber;
    //   const startIndex = pageNumber * 10;
    //   result = await this.db.select().from('employeesController').where('first_name', 'like', `${name}%`).limit(20);
    // }
    // MATCH(content) AGAINST ('commercial' IN BOOLEAN MODE)

    const result: Employee[] = await db
      .select()
      .from('employees')
      .whereRaw(`MATCH(first_name) AGAINST ('${name}*' IN BOOLEAN MODE)`)
      // .innerJoin('salaries', 'salaries.emp_no', '=', 'employees.emp_no')
      // .leftJoin('salaries', 'employees.emp_no', 'salaries.emp_no')
      .limit(20);

    return result;
  }
}

export default Employees;