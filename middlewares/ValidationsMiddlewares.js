const { body, validationResult } = require('express-validator');

const createUserValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

const createRepairValidations = [
    body('date').notEmpty().withMessage('The date cannot be empty'),
    body('computerNumber')
        .notEmpty()
        .withMessage('ComputerNumber cannot be empty'),
    body('comments').notEmpty().withMessage('comment cannot be empty'),
];

const checkValidations = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);

        // [msg, msg, msg] -> 'msg. msg. msg'
        const errorMsg = messages.join('. ');

        return response.status(400).json({
            status: 'error',
            message: errorMsg,
        });
    }

    next();
};

module.exports = {
    createUserValidations,
    createRepairValidations,
    checkValidations,
};
