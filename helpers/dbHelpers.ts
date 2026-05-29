import mysql from 'mysql2/promise';

export class DBHelper {
  static async executeQuery(query: string) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'Gandhi',
      password: 'Utestgandhi@2020',
      database: 'StudentDB'
    });

    const [rows] = await connection.execute(query);

    await connection.end();

    return rows;
  }
}

//mysql://localhost:3306/employee","Gandhi", "Utestgandhi@2020"