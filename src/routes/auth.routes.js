import { Router } from 'express';
import { registerUser , emailVerification } from '../controller/auth.controller.js';
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
export default authRouter;