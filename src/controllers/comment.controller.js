import { Comment } from "../models/comment.model.js";

// 1. Create a Comment
const createComment = async (req, res) => {
    try {
        const { content, author, post, parentComment } = req.body;

        if (!content || !author || !post) {
            return res.status(400).json({ message: "Content, author, and post ID are required" });
        }

        const comment = await Comment.create({
            content,
            author,
            post,
            parentComment: parentComment || null // Optional for threaded replies
        });

        res.status(201).json({ message: "Comment added", comment });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// 2. Get all comments for a specific post
const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        // .populate() fetches the User's name instead of just their ID
        const comments = await Comment.find({ post: postId })
            .populate("author", "name profileImage") 
            .sort({ createdAt: -1 }); // Newest comments first

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// 3. Update a Comment
const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Updated content is required" });
        }

        const comment = await Comment.findByIdAndUpdate(
            req.params.id, 
            { content }, 
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment updated", comment });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// 4. Delete a Comment
const deleteComment = async (req, res) => {
    try {
        const deleted = await Comment.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment
};