const postService = require('../services/postServices');
const jsend = require('jsend');

const createPost = async (req, res) => {
    try {
        const postDTO = {
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body?.imageUrl,
            author: req.user.id
        }
        const post = await postService.createPost(postDTO);
        res.status(201).json(jsend.success(post));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.user.id, req.params.postId);
        res.status(200).json(jsend.success(post));
    } catch (error) {
        res.status(500).json(jsend.error({ message: error.message }));
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts(req.user.id);
        res.status(200).json(jsend.success(posts));
    } catch (error) {
        res.status(500).json(jsend.error({ message: error.message }));
    }
}

const getPostsByUser = async (req, res) => {
    try {
        const posts = await postService.getPostsByUser(req.user.id);
        res.status(200).json(jsend.success(posts));
    } catch (error) {
        res.status(500).json(jsend.error({ message: error.message }));
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await postService.deletePost(req.params.postId);
        res.status(200).json(jsend.success(deletedPost));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
    }
}

const likePost = async (req, res) => {
    try {
        const likedPost = await postService.likePost(req.params.postId, req.user.id);
        res.status(200).json(jsend.success(likedPost));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
    }
}

const unlikePost = async (req, res) => {
    try {
        const unlikedPost = await postService.unlikePost(req.params.postId, req.user.id);
        res.status(200).json(jsend.success(unlikedPost));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
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