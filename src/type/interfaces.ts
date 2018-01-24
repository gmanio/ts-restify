enum Gender {
  M = 'MALE',
  F = 'FEMALE'
}

export interface Employee {
  emp_no: number;
  birth_date: Date;
  first_name: string;
  last_name: string;
  gender: Gender;
  hire_date: Date;
}