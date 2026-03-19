

import  Post  from "../models/Post.js";
import Comment from "../models/Comment.js";
import { User } from "../models/User.js";


 
export const getDashboardStats = async (req, res) => {
  try {

    const [postCount, commentCount, userCount] = await Promise.all([
      Post.countDocuments(),
      Comment.countDocuments(),
      User.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        posts: postCount,
        comments: commentCount,
        users: userCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};

export const adminDeletePost = async (req, res) => {
  try {

    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    await Comment.deleteMany({ post: req.params.id });

    res.status(200).json({
      success: true,
      message: "Post and associated comments deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error.message,
    });
  }
};

export const adminDeleteComment = async (req, res) => {
  try {

    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: error.message,
    });
  }
};

export const toggleBlockUser = async (req, res) => {
  try {
   

    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot block yourself",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User has been ${
        user.isBlocked ? "blocked" : "unblocked"
      } successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message,
    });
  }
};