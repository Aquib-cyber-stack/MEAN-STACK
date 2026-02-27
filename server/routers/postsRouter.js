const postController = require('../controllers/postController');
const express = require('express');
const { createPostValidator } = require('../validators/postValidator');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/create', createPostValidator , auth , validate , postController.createPost);
router.get('/all', auth ,  postController.getAllPosts);
router.get('/userPosts' , auth , postController.getPostsByUser);
router.get('/:postId', auth , postController.getPostById);
router.delete('/:postId', auth , postController.deletePost);
router.post('/:postId/like', auth , postController.likePost);
router.post('/:postId/unlike', auth , postController.unlikePost);

module.exports = router;