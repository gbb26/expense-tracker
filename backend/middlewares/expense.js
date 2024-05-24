
const { body, validationResult } = require('express-validator');

const validateAddExpenseData = [
    body('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string'),
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
    body('comments')
        .optional().isString().withMessage('Comments must be a string'),

    // Middleware to check the validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUpdateExpenseData = [
    body('category')
        .optional()
        .isString().withMessage('Category must be a string'),
    body('amount')
        .optional()
        .isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
    body('comments')
        .optional()
        .isString().withMessage('Comments must be a string'),

    // Middleware to check the validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports = { validateAddExpenseData, validateUpdateExpenseData };
