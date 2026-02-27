const commentService = require('../services/commentServices');
const jsend = require('jsend');

const createComment = async (req, res) => {
		try {
				const commentDTO = {
						content: req.body.content,
						post: req.params.postId,
						author: req.user.id
				}
				const comment = await commentService.createComment(commentDTO);
				res.status(201).json(jsend.success(comment));
		} catch (error) {
				res.status(400).json(jsend.error({ message: error.message }));
		}
}

const getCommentsByPostId = async (req, res) => {
		try {
				const comments = await commentService.getCommentsByPostId(req.params.postId);
				res.status(200).json(jsend.success(comments));
		} catch (error) {
				res.status(400).json(jsend.error({ message: error.message }));
		}
}

module.exports = {
	createComment,
	getCommentsByPostId
}