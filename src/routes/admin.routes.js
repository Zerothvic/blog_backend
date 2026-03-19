import { Router } from 'express';
import { getDashboardStats, adminDeletePost, adminDeleteComment, toggleBlockUser } from '../controllers/admin.controller.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const adminRouter = Router();


adminRouter.route('/stats').get(getDashboardStats, isAdmin);
adminRouter.route('/post/:id').delete(adminDeletePost, isAdmin);
adminRouter.route('/comment/:id').delete(adminDeleteComment, isAdmin);
adminRouter.route('/user/block/:id').patch(toggleBlockUser, isAdmin);

export default adminRouter;