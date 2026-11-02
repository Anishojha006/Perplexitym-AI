import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email: normalizedEmail }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: 'User already exists',
        success: false,
        error: 'User already exists',
      });
    }

    const user = await userModel.create({
      username,
      email: normalizedEmail,
      password,
    });

    await sendEmail({
      to: normalizedEmail,
      subject: 'Welcome to Perplexity',
      html: `
        <p>Hi ${username},</p>
        <p>Thank you for registering at Perplexity. We're excited to have you on board!</p>
        <p>Best regards,<br>The Perplexity Team</p>
      `,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'User registration failed',
      success: false,
      error: error.message,
    });
  }
}