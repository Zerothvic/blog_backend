
import { Router } from 'express';
import { registerUser, loginUser, logoutUser,
    getAuthorProfile
 } from '../controllers/user.controller.js';
 import { protect } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser);
userRouter.route('/:id').get(getAuthorProfile)


export default userRouter;