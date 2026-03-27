const postService = require('../services/postServices');
const jsend = require('jsend');

/**
 * Create a New Post
 * Handles mapping from the frontend request to the database DTO
 */
const createPost = async (req, res) => {
    try {
        // 1. Safeguard: Check if req.user exists from the auth middleware
        if (!req.user) {
            return res.status(401).json(jsend.error({ 
                message: 'Unauthorized: User context missing' 
            }));
        }

        // 2. Map the DTO (Data Transfer Object)
        // We check for both .id and ._id to prevent "undefined" author errors
        const postDTO = {
            title: req.body.title,
            content: req.body.content,
            // Maps 'imageUrl' from frontend to 'image' if your model uses that name
            image: req.body.imageUrl || req.body.image || "", 
            author: req.user.id || req.user._id 
        };

        // 3. Basic Validation before hitting the Service/Repo
        if (!postDTO.title || !postDTO.content) {
            return res.status(400).json(jsend.error({ 
                message: 'Title and Content are required fields' 
            }));
        }

        const post = await postService.createPost(postDTO);
        
        // 4. Success Response
        res.status(201).json(jsend.success(post));

    } catch (error) {
        // Detailed logging for Render console to help you debug 400 errors
        console.error("[PostController Error]:", error.message);
        res.status(400).json(jsend.error({ message: error.message }));
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.user.id || req.user._id, req.params.postId);
        res.status(200).json(jsend.success(post));
    } catch (error) {
        res.status(500).json(jsend.error({ message: error.message }));
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts(req.user.id || req.user._id);
        res.status(200).json(jsend.success(posts));
    } catch (error) {
        res.status(500).json(jsend.error({ message: error.message }));
    }
};

const getPostsByUser = async (req, res) => {
    try {
        const posts = await postService.getPostsByUser(req.user.id || req.user._id);
        res.status(200).json(jsend.success(posts));
    } catch (error) {
        res.status(500).json(jsend.error({ message: error.message }));
    }
};

const deletePost = async (req, res) => {
    try {
        const deletedPost = await postService.deletePost(req.params.postId);
        res.status(200).json(jsend.success(deletedPost));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
    }
};

const likePost = async (req, res) => {
    try {
        const likedPost = await postService.likePost(req.params.postId, req.user.id || req.user._id);
        res.status(200).json(jsend.success(likedPost));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
    }
};

const unlikePost = async (req, res) => {
    try {
        const unlikedPost = await postService.unlikePost(req.params.postId, req.user.id || req.user._id);
        res.status(200).json(jsend.success(unlikedPost));
    } catch (error) {
        res.status(400).json(jsend.error({ message: error.message }));
    }
};

module.exports = {
    createPost,
    getPostById,
    getAllPosts,
    getPostsByUser,
    deletePost,
    likePost,
    unlikePost
};
