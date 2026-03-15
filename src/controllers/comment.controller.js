import Comment from "../models/Comment.js"
import Notification from "../models/Notification.js";

export const createComment = async (req, res) => {

  try {

    const comment = await Comment.create({
      content: req.body.content,
      author: req.user.id,
      post: req.params.postId
    });

    await Notification.create({

  user: post.author,
  type:"comment",
  post: post._id

});

    res.status(201).json(comment);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

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
