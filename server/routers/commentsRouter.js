const commentsController = require('../controllers/commentController');
const express = require('express');
const { createCommentValidator } = require('../validators/commentValidator');
const auth = require('../middlewares/auth');
const validate= require('../middlewares/validate');

const router = express.Router();

router.post('/:postId', createCommentValidator , auth , validate, commentsController.createComment);
router.get('/:postId', commentsController.getCommentsByPostId);

module.exports = router;