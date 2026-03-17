import Comment from "../models/Comment.js"
import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";

export const addComment = async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    content,
    author: req.user._id,
    post: postId,
  });

 
  await comment.populate("author", "username");

 
  if (req.user._id.toString() !== post.author.toString()) {
    await Notification.create({
      user: post.author,
      type: "comment",
      post: post._id,
    });
  }

  res.json(comment);
};


export const getPostComments = async (req, res) => {

  try {

    const comments = await Comment.find({
      post: req.params.postId
    })
    .populate("author", "username")
    .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const deleteComment = async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};
