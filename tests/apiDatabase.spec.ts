// tests/productsApiDb.spec.ts
import { test, expect } from '@playwright/test';
import { DBHelper } from '../helpers/dbHelpers';


test('Validate API product data with database', async ({ request }) => {
  const apiResponse = await request.get('https://automationexercise.com/api/productsList');

  expect(apiResponse.status()).toBe(200);

  const responseBody = await apiResponse.json();
  console.log(responseBody);
  console.log("---------------------------------------------------------------");
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.products.length).toBeGreaterThan(0);

const apiProduct = responseBody.products[0];
const dbProduct: any = await DBHelper.executeQuery(`SELECT * FROM products WHERE id = ${apiProduct.id}`);

  expect(dbProduct.length).toBeGreaterThan(0);
  expect(dbProduct[0].name).toBe(apiProduct.name);
  expect(dbProduct[0].price).toBe(apiProduct.price);
  expect(dbProduct[0].brand).toBe(apiProduct.brand);
  expect(dbProduct[0].user_type).toBe(apiProduct.category.usertype.usertype);
  expect(dbProduct[0].category).toBe(apiProduct.category.category);

console.log(await DBHelper.executeQuery('SELECT COUNT(*) AS totalProducts FROM products'));
console.log(await DBHelper.executeQuery('SELECT * FROM products WHERE brand = "Polo"'));
console.log(await DBHelper.executeQuery('SELECT * FROM products WHERE user_type = "Women"'));
console.log(await DBHelper.executeQuery('SELECT * FROM products WHERE category = "Tops"'));
console.log(await DBHelper.executeQuery('SELECT brand, COUNT(*) AS total FROM products GROUP BY brand'));

});