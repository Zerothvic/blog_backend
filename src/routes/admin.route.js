import { Router } from 'express';
import { 
    getDashboardStats, 
    adminDeletePost, 
    adminDeleteComment, 
    toggleBlockUser 
} from '../controllers/admin.controller.js';

const adminRouter = Router();

// Routes mapped to admin responsibilities
adminRouter.route('/stats').get(getDashboardStats);
adminRouter.route('/post/:id').delete(adminDeletePost);
adminRouter.route('/comment/:id').delete(adminDeleteComment);
adminRouter.route('/user/block/:id').patch(toggleBlockUser);

export default adminRouter;