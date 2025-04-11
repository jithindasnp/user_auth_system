import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLogin = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];