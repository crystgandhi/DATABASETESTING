import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';

test('Create user using API and save resource in DB', async ({ request }) => {

  const userData = {
    name: 'testuser01',
    email: `testuser01_${Date.now()}@gmail.com`,
    password: 'Test@123',
    title: 'Mrs',
    birth_date: 12,
    birth_month: 5,
    birth_year: 1995,
    firstname: 'Test',
    lastname: 'User',
    company: 'ABC Tech',
    address1: '123 Main Street',
    address2: 'Apt 5',
    country: 'United States',
    zipcode: '21043',
    state: 'Maryland',
    city: 'Ellicott City',
    mobile_number: '1234567890'
  };

  const apiResponse = await request.post('https://automationexercise.com/api/createAccount',
    {
      form: userData
    }  );

  const responseBody = await apiResponse.json();
  console.log(responseBody);

  expect(responseBody.responseCode).toBe(201);
  expect(responseBody.message).toBe('User created!');

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'automation_exercise'
  });

  await connection.execute(
    `INSERT INTO users
    (name, email, password, title, birth_date, birth_month, birth_year,
     firstname, lastname, company, address1, address2, country, zipcode,
     state, city, mobile_number)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userData.name,
      userData.email,
      userData.password,
      userData.title,
      userData.birth_date,
      userData.birth_month,
      userData.birth_year,
      userData.firstname,
      userData.lastname,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.zipcode,
      userData.state,
      userData.city,
      userData.mobile_number
    ]
  );

  const [dbUser]: any = await connection.execute('SELECT * FROM users WHERE email = ?', [userData.email]);

  expect(dbUser[0].email).toBe(userData.email);
  expect(dbUser[0].firstname).toBe(userData.firstname);
  expect(dbUser[0].city).toBe(userData.city);

  await connection.end();
});