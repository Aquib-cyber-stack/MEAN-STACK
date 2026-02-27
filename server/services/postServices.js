const postRepo = require('../repos/postsRepo');

const createPost = async (postData) => {
	try {
		const newPost = await postRepo.createPost(postData);
		return newPost;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const getAllPosts = async (userId) => {
	try {
		const posts = await postRepo.getAllPosts(userId);
		return posts;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const getPostById = async (userId, postId) => {
	try {
		const post = await postRepo.getPostById(userId , postId);
		return post;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const getPostsByUser = async (userId) => {
	try {
		const posts = await postRepo.getPostsByUser(userId);
		return posts;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const deletePost = async (postId) => {
	try {
		const deletedPost = await postRepo.deletePost(postId);
		return deletedPost;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const likePost = async (postId , userId) => {
	try {
		const likedPost = await postRepo.likePost(postId , userId);
		return likedPost;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const unlikePost = async (postId , userId) => {
	try {
		const unlikedPost = await postRepo.unlikePost(postId , userId);
		return unlikedPost;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

module.exports = {
	createPost,
	getPostById,
	getAllPosts,
	getPostsByUser,
	deletePost,
	likePost,
	unlikePost
}
