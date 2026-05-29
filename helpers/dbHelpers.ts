import mysql from 'mysql2/promise';

export class DBHelper {
  static async executeQuery(query: string) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'StudentDB'
    });

    const [rows] = await connection.execute(query);

    await connection.end();

    return rows;
  }
}

