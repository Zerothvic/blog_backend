import express from 'express';


import postRoutes from './post.routes.js';
import userRoutes from './user.routes.js'

const router = express.Router();

router.use("/posts", postRoutes)
router.use("/auth", userRoutes)

export default router;