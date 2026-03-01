import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";

// 1. Get Dashboard Stats
const getDashboardStats = async (req, res) => {
    try {
        const [postCount, commentCount, userCount] = await Promise.all([
            Post.countDocuments(),
            Comment.countDocuments(),
            User.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            data: { posts: postCount, comments: commentCount, users: userCount }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
};

// 2. Delete Any Post
const adminDeletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        res.status(200).json({ message: "Post deleted by Admin" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
};

// 3. Delete Any Comment
const adminDeleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        res.status(200).json({ message: "Comment deleted by Admin" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
};

// 4. Block/Unblock User
const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isBlocked = !user.isBlocked; // Toggles the status
        await user.save();

        res.status(200).json({ 
            message: `User has been ${user.isBlocked ? 'blocked' : 'unblocked'}` 
        });
    } catch (error) {
        res.status(500).json({ message: "Error toggling block status", error: error.message });
    }
};

export { getDashboardStats, adminDeletePost, adminDeleteComment, toggleBlockUser };