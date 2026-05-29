import mysql from 'mysql2/promise';

export class DBHelper {
  static async executeQuery(query: string) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'automation_api_db'
    });

    const [rows] = await connection.execute(query);

    await connection.end();

    return rows;
  }
}


/*import mysql from 'mysql2/promise';

export class DBHelper {
  static async getConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'your_password',
      database: 'automation_api_db'
    });
  }

  static async executeQuery(query: string, values?: any[]) {
    const connection = await this.getConnection();
    const [rows] = await connection.execute(query, values);
    await connection.end();
    return rows;
  }
}*/