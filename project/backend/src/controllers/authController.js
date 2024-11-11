import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/database.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [username]
    });

    const user = result.rows[0];
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
