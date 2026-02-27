const {body} = require('express-validator');

const createPostValidator = [
    body('title').isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('content').isString().isLength({ min: 3 }).withMessage('Content must be at least 3 characters long'),
];

module.exports = {
    createPostValidator,
}