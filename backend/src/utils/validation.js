import { body, param } from 'express-validator';

export const driverValidation = [
  body('licensePlate')
    .trim()
    .notEmpty()
    .withMessage('License plate is required')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Invalid license plate format'),
  
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('phone')
    .optional()
    .matches(/^\+?[\d\s-]+$/)
    .withMessage('Invalid phone number format'),
  
  body('amount')
    .optional()
    .isNumeric()
    .withMessage('Amount must be a number')
];

export const validateObjectId = [
  param('id').isInt().withMessage('Invalid ID format')
];
