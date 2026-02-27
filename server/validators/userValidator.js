const {body} = require('express-validator');

const signUpValidator = [
	body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
	body('email').isEmail().withMessage('Invalid email'),
	body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidator = [
	body('email').isEmail().withMessage('Invalid email'),
	body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
	signUpValidator,
	loginValidator
}