import { test, expect } from '@playwright/test';
import { DBHelper } from '../helpers/dbHelpers';

test('Validate users from database', async () => {

  const result: any = await DBHelper.executeQuery(
    'SELECT * FROM employees');

  console.log(result);

  expect(result.length).toBeGreaterThan(0);

  await DBHelper.executeQuery(`
  INSERT INTO employees
  (first_name, last_name, gender, age, department, salary, joining_date, email)
  VALUES
  ('Cathy', 'David', 'Female', 30, 'QA', 55000.00, '2024-01-15', 'cathy.david@gmail.com')
`);

const result1 = await DBHelper.executeQuery(`
  SELECT * FROM employees
  WHERE email = 'cathy.david@gmail.com'
`);

console.log(result1);

const emp_greaterThanSalary = await DBHelper.executeQuery(`
  SELECT * FROM employees
  WHERE salary > 70000
`);

console.log(emp_greaterThanSalary);

const employeeCount = await DBHelper.executeQuery(`
  SELECT COUNT(*) AS totalEmployees
  FROM employees
`);

console.log(employeeCount);

});

