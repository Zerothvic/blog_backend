
import { Router } from 'express';
import { registerUser, loginUser, logoutUser,
    getAuthorProfile, getFollowers, toggleFollow
 } from '../controllers/user.controller.js';
 import { protect } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser);
userRouter.route('/:id').get(getAuthorProfile);
userRouter.route('/:id/follow').post(protect, toggleFollow);
userRouter.route('/:id/followers').get(protect, getFollowers);


export default userRouter;