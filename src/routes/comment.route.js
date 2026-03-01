import { Router } from 'express';
import { createComment, getCommentsByPost, updateComment, deleteComment } from '../controllers/comment.controller.js';

const commentRouter = Router();

commentRouter.route('/add').post(createComment);
commentRouter.route('/post/:postId').get(getCommentsByPost);
commentRouter.route('/update/:id').patch(updateComment);
commentRouter.route('/delete/:id').delete(deleteComment);

export default commentRouter;