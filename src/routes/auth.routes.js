import { Router } from 'express';
import { registerUser , emailVerification,loginUser } from '../controller/auth.controller.js';
import { registerValidation } from '../validators/auth.validator.js';

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

authRouter.get('/verify-email/:token',emailVerification);


/**
 * @route POST api/auth/login
 * @description Login user.
 * @access Public
 * @body {email,password}.
 */

authRouter.post('/login', loginUser);
export default authRouter;