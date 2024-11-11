import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import Driver from '../models/Driver.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all drivers
router.get('/', auth, async (req, res) => {
  try {
    const drivers = await Driver.find().select('-password');
    res.json({ success: true, data: drivers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single driver
router.get('/:id', auth, async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).select('-password');
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    res.json({ success: true, data: driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create driver
router.post('/',
  auth,
  [
    body('plateNumber').notEmpty(),
    body('phone').notEmpty(),
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { password, ...driverData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const driver = new Driver({
        ...driverData,
        password: hashedPassword
      });

      await driver.save();
      res.status(201).json({ success: true, data: driver });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

// Update driver
router.put('/:id', auth, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.json({ success: true, data: driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete driver
router.delete('/:id', auth, async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;