import express from "express";
import { createPost, getAllPosts, getSinglePost, updatePost, deletePost } from "../controllers/post.controller.js";

import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

router.post("/", 
    protect,
     createPost);
router.put("/:id", 
    protect, 
    updatePost);
router.delete("/:id", 
    protect,
     deletePost);

export default router;
