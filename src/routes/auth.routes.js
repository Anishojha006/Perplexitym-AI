import { Router } from 'express';
import { registerUser } from '../controller/auth.controller.js';
import { registerValidation } from '../validators/auth.validator.js';

const authRouter = Router();

/**
 * @route Post api/auth/register.
 * @description Register an new user.
 * @access Public
 * @body {username,email,password}.
 */

authRouter.post('/register', registerValidation, registerUser);

export default authRouter;