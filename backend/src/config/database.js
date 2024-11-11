import { createClient } from '@libsql/client';

const db = createClient({
  url: `file:${process.env.DB_PATH || 'truck.db'}`
});

export const initializeDatabase = async () => {
  try {
    // 创建用户表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    // 创建司机表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS drivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        licensePlate TEXT NOT NULL,
        name TEXT NOT NULL,
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

    // 检查是否已存在管理员用户
    const adminCheck = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: ['admin']
    });

    // 如果不存在，创建默认管理员用户
    if (adminCheck.rows.length === 0) {
      await db.execute({
        sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
        args: ['admin', 'admin123']
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export default db;
