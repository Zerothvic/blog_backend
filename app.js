import express from "express";



// Routes
import userRouter from './src/routes/user.route.js';
import postRouter from './src/routes/post.route.js';
import commentRouter from './src/routes/comment.route.js';
import adminRouter from './src/routes/admin.route.js';

const app = express();
app.use(express.json());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/admin", adminRouter);

export default app;