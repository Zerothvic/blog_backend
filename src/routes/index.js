import express from 'express';

import postRoutes from './post.routes.js';
import userRoutes from './user.routes.js'
import commentRoutes from "./comment.routes.js";
import notificationRoutes from "./notification.routes.js"




const router = express.Router();

router.use("/posts", postRoutes)
router.use("/auth", userRoutes)
router.use("/comments", commentRoutes);
router.use("/notifications", notificationRoutes)

export default router;