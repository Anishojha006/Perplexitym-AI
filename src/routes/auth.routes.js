import { Router } from 'express';
import { registerUser, emailVerification, loginUser, getmeController } from '../controller/auth.controller.js';
import { registerValidation, loginValidation } from '../validators/auth.validator.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Router();

/**
 * @route Post api/auth/register.
 * @description Register an new user.
 * @access Public
 * @body {username,email,password}.
 */

authRouter.post('/register', registerValidation, registerUser);

/**
 * @route GET api/auth/verify-email
 * @description Verify user's email.
 * @access Public
 * @query {token}.
 */

authRouter.get('/verify-email/:token', loginValidation, emailVerification);

/**
 * @route GET api/auth/get-me
 * @description  get current loggedIn user details
 * @access Private
 */

authRouter.get("/get-me", authMiddleware, getmeController);


/**
 * @route POST api/auth/login
 * @description Login user.
 * @access Public
 * @body {email,password}.
 */

authRouter.post('/login', loginUser);
export default authRouter;