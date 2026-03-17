
import slugify from "slugify";
import Post from "../models/Post.js";
import { User } from "../models/User.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";



export const createPost = async (req, res) => {

  try {
const { title, content } = req.body;
const tags = JSON.parse(req.body.tags);

  if (!title || !content || !tags) {
      return res.status(400).json({ message: "Title and body are required" });
    }
    
    const slug = slugify(title, { lower: true }) + "-" + Date.now();
     
    const post = await Post.create({

      title,
      content,
      tags,
      slug,
      author: req.user.id,
      image: req.file ? req.file.path : null

    });


    res.status(201).json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



export const getAllPosts = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    };

    const posts = await Post.find(query)
      .populate("author", "username email avatar")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      posts
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


export const getPost = async(req,res)=>{

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate("author", "username email avatar")

  res.json(post);
};


export const updatePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only edit your post"
      });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


export const deletePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


export const likePost = async (req, res) => {
  try {
    console.log("User ID:", req.user?.id); // check if user exists
    console.log("Post ID param:", req.params.id);

    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found!");
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

await Notification.create({

  user: post.author,
  type:"like",
  post: post._id

});
    await post.save();

    console.log("Post liked successfully, total likes:", post.likes.length);

    res.json({ likes: post.likes.length });
  } catch (error) {
    console.error("Error in likePost controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const bookmarkPost = async (req,res)=>{

  const post = await Post.findById(req.params.id);

  if(!post) return res.status(404).json({message:"Post not found"});

  const userId = req.user.id;

  if(!post.bookmarks){
    post.bookmarks = [];
  }

  if(post.bookmarks.includes(userId)){
    post.bookmarks = post.bookmarks.filter(
      id => id.toString() !== userId
    );
  }else{
    post.bookmarks.push(userId);
  }

  await Notification.create({

  user: post.author,
  type:"bookmark",
  post: post._id

});

  await post.save();

  res.json(post);
}

export const getTrendingPosts = async(req,res)=>{

  const posts = await Post.find()
  .sort({ views: -1, likes: -1 })
  .limit(5);

  res.json(posts);

};

export const searchPosts = async (req, res) => {

  try {

    const q = req.query.q;

    if (!q) return res.json([]);

    const posts = await Post.find({
      title: { $regex: q, $options: "i" }
    }).limit(10);

    res.json(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};



export const getPostsByAuthor = async (req, res) => {
  try {

    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    const posts = await Post.find({ author: id })
      .populate("author", "username email avatar")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: req.file.filename },
      { new: true }
    );

    res.json({ avatar: updatedUser.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookmarkedPosts = async (req, res) => {
  
  try {

    const userId = req.user.id;
    
    const posts = await Post.find({
      bookmarks: userId
     
    })
    .populate("author", "username email avatar")

    
    res.json(posts);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching bookmarks"
    });

  }
};
