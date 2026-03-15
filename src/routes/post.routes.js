import express from "express";

import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  bookmarkPost,
  getTrendingPosts,
  searchPosts, getPostsByAuthor, uploadAvatar
} from "../controllers/post.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/trending", getTrendingPosts);
router.get("/search", searchPosts);
router.get("/author/:id", getPostsByAuthor);
router.get("/:id", getPost);
router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvatar);

router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);

router.put(
  "/:id",
  protect,
  updatePost
);

router.delete(
  "/:id",
  protect,
  deletePost
);
router.post("/search", searchPosts)
router.post("/:id/like", protect, likePost);
router.post("/:id/bookmark", protect, bookmarkPost);

export default router;
