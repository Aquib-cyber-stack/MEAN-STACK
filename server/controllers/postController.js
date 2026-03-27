const postService = require('../services/postServices');
const jsend = require('jsend');

const createPost = async (req, res) => {
    try {
        // 1. Log the incoming data for debugging in Render
        console.log("Creating post with User:", req.user?.id || req.user?._id);

        const postDTO = {
            title: req.body.title,
            content: req.body.content,
            // Check which name your model uses: 'image' or 'imgUrl'
            // Based on your repo's populate, it might be imgUrl
            imgUrl: req.body.imageUrl || req.body.imgUrl || "", 
            author: req.user.id || req.user._id 
        };

        // 2. Prevent the 400 error by checking data before saving
        if (!postDTO.title || !postDTO.content || !postDTO.author) {
            return res.status(400).json(jsend.error({ 
                message: "Validation failed: Title, Content, and Author are required." 
            }));
        }

        const post = await postService.createPost(postDTO);
        res.status(201).json(jsend.success(post));

    } catch (error) {
        // This log is your best friend. Check 'Logs' in Render Dashboard!
        console.error("DATABASE ERROR:", error.message);
        res.status(400).json(jsend.error({ message: error.message }));
    }
};

// ... keep your other functions (getAllPosts, etc.) as they were
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
    getPostById,
    getAllPosts,
    getPostsByUser,
    deletePost,
    likePost,
    unlikePost
};
