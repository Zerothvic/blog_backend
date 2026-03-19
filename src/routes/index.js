import express from 'express';

import postRoutes from './post.routes.js';
import userRouter from './user.routes.js'
import commentRoutes from "./comment.routes.js";
import notificationRoutes from "./notification.routes.js"
import adminRouter from './admin.routes.js';




const router = express.Router();

router.use("/posts", postRoutes)
router.use("/auth", userRouter)
router.use("/comments", commentRoutes);
router.use("/notifications", notificationRoutes)
router.use("/admin", adminRouter)

export default router;