const { body, validationResult } = require('express-validator');

// Middleware function to validate user data
const validateUserData = [
    // Validate name field
    body('name').trim().notEmpty().withMessage('Name is required'),

    // Validate email address field
    body('email').trim().notEmpty().withMessage('Email address is required')
        .isEmail().withMessage('Invalid email address'),

    // Validate password field
    body('password').trim().notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // Validate confirm password field
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
// Middleware function to validate login data
const validateLoginData = [
    // Validate email address field
    body('email').trim().notEmpty().withMessage('Email address is required')
        .isEmail().withMessage('Invalid email address'),

    // Validate password field
    body('password').trim().notEmpty().withMessage('Password is required'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUserData, validateLoginData }