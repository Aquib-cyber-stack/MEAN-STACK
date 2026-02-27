const {body} = require('express-validator');

const createCommentValidator = [
    body('content').isString().isLength({ min: 1 }).withMessage('Content must not be empty'),
];

module.exports = {
    createCommentValidator,
}