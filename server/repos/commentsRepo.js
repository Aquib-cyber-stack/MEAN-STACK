const Comment = require('../models/Comment');

const getPostComments = async (postId) => {
    try {
        const comments = await Comment.find({ post: postId }).populate('author', 'username imgUrl').sort({ createdAt: -1 });
        return comments;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createPostComment = async (commentData) => {
    try {
        const comment = new Comment(commentData);
        await comment.save();
        return comment;
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = {
    getPostComments,
    createPostComment
}   