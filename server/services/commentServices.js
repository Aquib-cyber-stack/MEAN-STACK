const commentRepo = require("../repos/commentsRepo");

const createComment = async (comment) => {
  try {
    const newComment = await commentRepo.createPostComment(comment);
    return newComment;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getCommentsByPostId = async (postId) => {
  try {
    const comments = await commentRepo.getPostComments(postId);
    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createComment,
  getCommentsByPostId
}