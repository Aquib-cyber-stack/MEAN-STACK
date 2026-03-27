const postService = require('../services/postServices');
const jsend = require('jsend');

const createPost = async (req, res) => {
    try {
        console.log("Creating post with User:", req.user?.id || req.user?._id);

        const postDTO = {
            title: req.body.title,
            content: req.body.content,
            imgUrl: req.body.imageUrl || req.body.imgUrl || "", 
            author: req.user.id || req.user._id 
        };

        if (!postDTO.title || !postDTO.content || !postDTO.author) {
            return res.status(400).json(jsend.error({ 
                message: "Validation failed: Title, Content, and Author are required." 
            }));
        }

        const post = await postService.createPost(postDTO);
        res.status(201).json(jsend.success(post));

    } catch (error) {
        console.error("DATABASE ERROR:", error.message);
        res.status(400).json(jsend.error({ message: error.message }));
    }
};

// --- NEW UPDATE FUNCTION ---
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id || req.user._id;

        // 1. Ownership check: Fetch post to verify author
        const post = await postService.getPostById(userId, postId);
        
        // Ensure the logged-in user is the author
        // Comparing strings because MongoDB IDs are objects
        if (post.author._id.toString() !== userId.toString()) {
            return res.status(403).json(jsend.error({ 
                message: "Unauthorized: You can only edit your own posts." 
            }));
        }

        // 2. Map updated fields
        const updateData = {
            title: req.body.title,
            content: req.body.content,
            imgUrl: req.body.imageUrl || req.body.imgUrl || post.imgUrl
        };

        const updatedPost = await postService.updatePost(postId, updateData);
        res.status(200).json(jsend.success(updatedPost));

    } catch (error) {
        console.error("UPDATE ERROR:", error.message);
        res.status(400).json(jsend.error({ message: error.message }));
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

const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.user.id || req.user._id, req.params.postId);
        res.status(200).json(jsend.success(post));
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
    updatePost, // Exported
    getPostById,
    getAllPosts,
    getPostsByUser,
    deletePost,
    likePost,
    unlikePost
};
