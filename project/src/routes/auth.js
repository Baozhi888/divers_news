import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Driver from '../models/Driver.js';

const router = express.Router();

router.post('/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const driver = await Driver.findOne({ username });

      if (!driver || !await bcrypt.compare(password, driver.password)) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        { id: driver._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        driver: {
          id: driver._id,
          username: driver.username,
          wxName: driver.wxName
        }
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  });

export default router;