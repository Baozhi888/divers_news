import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createClient } from '@libsql/client';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = createClient({
  url: 'file:local.db'
});

// Initialize database
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

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username]
  });

  if (user.rows[0]?.password === password) {
    const token = jwt.sign({ id: user.rows[0].id }, 'your-secret-key');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/drivers', auth, async (req, res) => {
  const result = await db.execute('SELECT * FROM drivers');
  res.json(result.rows);
});

app.post('/api/drivers', auth, async (req, res) => {
  const { licensePlate, name, wechatId, wechatName, phone, parkingLocation, 
          appUsername, appPassword, invoiceDate, amount, notes } = req.body;
          
  await db.execute({
    sql: `INSERT INTO drivers (licensePlate, name, wechatId, wechatName, phone,
          parkingLocation, appUsername, appPassword, invoiceDate, amount, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [licensePlate, name, wechatId, wechatName, phone, parkingLocation,
           appUsername, appPassword, invoiceDate, amount, notes]
  });
  
  res.status(201).json({ message: 'Driver created' });
});

app.put('/api/drivers/:id', auth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  await db.execute({
    sql: `UPDATE drivers SET 
          licensePlate = ?, name = ?, wechatId = ?, wechatName = ?, phone = ?,
          parkingLocation = ?, appUsername = ?, appPassword = ?, invoiceDate = ?,
          amount = ?, notes = ? WHERE id = ?`,
    args: [...Object.values(updates), id]
  });
  
  res.json({ message: 'Driver updated' });
});

app.delete('/api/drivers/:id', auth, async (req, res) => {
  const { id } = req.params;
  await db.execute({
    sql: 'DELETE FROM drivers WHERE id = ?',
    args: [id]
  });
  res.json({ message: 'Driver deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
