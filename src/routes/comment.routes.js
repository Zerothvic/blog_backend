import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:postId", protect, createComment);

router.get("/:postId", getPostComments);

router.delete("/:id", protect, deleteComment);

export default router;
