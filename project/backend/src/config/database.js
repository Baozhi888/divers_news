import { createClient } from '@libsql/client';
import path from 'path';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'truck.db');

const db = createClient({
  url: `file:${dbPath}`
});

export const initializeDatabase = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY,
      licensePlate TEXT,
      name TEXT,
      wechatId TEXT,
      wechatName TEXT,
      phone TEXT,
      parkingLocation TEXT,
      appUsername TEXT,
      appPassword TEXT,
      invoiceDate TEXT,
      amount REAL,
      notes TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Create default admin user if not exists
  const adminExists = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: ['admin']
  });

  if (adminExists.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
      args: ['admin', 'admin123'] // Change this in production!
    });
  }
};

export default db;
