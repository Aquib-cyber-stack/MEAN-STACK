const commentsController = require('../controllers/commentController');
const express = require('express');
const { createCommentValidator } = require('../validators/commentValidator');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// ✅ FIX: auth runs FIRST, then validate, then controller
router.post('/:postId', auth, createCommentValidator, validate, commentsController.createComment);
router.get('/:postId', commentsController.getCommentsByPostId);

module.exports = router;
