import { test, expect } from '@playwright/test';
import { DBHelper } from '../helpers/dbHelpers';

test('Validate users from database', async () => {

  const result: any = await DBHelper.executeQuery(
    'SELECT * FROM Students');
  console.log(result);
  expect(result.length).toBeGreaterThan(0);

  console.log(await DBHelper.executeQuery('SELECT * FROM Students WHERE first_name = "Cathy"'));

console.log(await DBHelper.executeQuery('SELECT * FROM Students WHERE age > 15'));
console.log(await DBHelper.executeQuery('SELECT * FROM Students WHERE grade = "10th Grade"'));
console.log(await DBHelper.executeQuery('SELECT * FROM Students WHERE city = "Houston"'));
console.log(await DBHelper.executeQuery('SELECT * FROM Students ORDER BY age DESC'));
console.log(await DBHelper.executeQuery('SELECT * FROM Students ORDER BY age DESC LIMIT 1'));
console.log(await DBHelper.executeQuery('SELECT AVG(age) AS averageAge FROM Students'));
console.log(await DBHelper.executeQuery('SELECT EXISTS (SELECT 1 FROM Students WHERE email = "cathy.david@gmail.com") AS studentExists'));
console.log(await DBHelper.executeQuery('SELECT * FROM Students WHERE first_name LIKE "C%"'));

const studentData:any = await DBHelper.executeQuery(`SELECT COUNT(*) AS totalStudents FROM Students`);
console.log(studentData[0].totalStudents);
});