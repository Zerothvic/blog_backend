import express from "express";
import {
  addComment,
  getPostComments,
  deleteComment
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id", protect, addComment);

router.get("/:postId", getPostComments);

router.delete("/:id", protect, deleteComment);

export default router;
