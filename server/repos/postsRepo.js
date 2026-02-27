const Post = require("../models/Post.js");

const getAllPosts =  async (userId) => {
    try {
        const posts =  await Post.find({}).populate('author', 'username imgUrl').sort({ createdAt: -1 });
        const postsWithLikesStatus = posts.map(post => {
            const isLiked = post.likedBy.includes(userId);
            return { ...post._doc, isLiked };
        })
        return postsWithLikesStatus;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getPostById = async ( userId, postId) => {
    try {
        const post = await Post.findById(postId).populate('author', 'username imgUrl');
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.likedBy.includes(userId)) {
            post.isLiked = true;
        }
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getPostsByUser = async (userId) => {
    try {
        const posts = await Post.find({ author : userId }).populate('author', 'username imgUrl').sort({ createdAt: -1 });
        const postsWithLikesStatus = posts.map(post => {
            const isLiked = post.likedBy.includes(userId);
            return { ...post._doc, isLiked };
        })
        return postsWithLikesStatus;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createPost = async (postData) => {
    try {
        const post = new Post(postData);
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePost = async (postId) => {
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

const likePost = async (postId , userId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.likedBy.some(id => id.toString() === userId)) {
            throw new Error('User has already liked this post');
        }
        post.likedBy.push(userId);
        post.likes += 1;
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

const unlikePost = async (postId , userId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        const index = post.likedBy.findIndex(id => id.toString() === userId);
        if (index === -1) {
            throw new Error('User has not liked this post');
        }
        post.likedBy.splice(index, 1);
        if (post.likes > 0) {
            post.likes -= 1;
        }
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByUser,
    createPost,
    deletePost,
    likePost,
    unlikePost
}