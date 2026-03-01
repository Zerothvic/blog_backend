
import { Router }  from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.route('/create').post(createPost);
postRouter.route('/getPosts').get(getPosts);
postRouter.route('/update/:id').patch(updatePost);
postRouter.route('/delete/:id').delete(deletePost);




export default postRouter;