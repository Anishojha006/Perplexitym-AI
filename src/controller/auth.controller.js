import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: 'Email is required',
        success: false,
        error: 'Email is required',
      });
    }

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

    const verificationToken = jwt.sign({ email: normalizedEmail }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const user = await userModel.create({
      username,
      email: normalizedEmail,
      password,
      isEmailVerified: false,
      // emailVerificationToken: hashedToken,
      emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000),
    });



    const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `http://localhost:3000/api/auth/verify-email/${verificationToken}`
    const verificationText = `Please verify your email using this link: ${verificationUrl}`;
    const verificationHtml = `
    
<div style="
  margin: 0;
  padding: 40px 15px;
  background-color: #f4f4fb;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 560px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e8e8f0;
  ">

    <!-- Header -->
    <div style="
      background-color: #17172f;
      padding: 30px 20px;
      text-align: center;
    ">
      <h1 style="
        margin: 0;
        color: #ffffff;
        font-size: 27px;
        font-weight: 700;
        letter-spacing: -1px;
      ">
        ✦ Perplexity
      </h1>

      <p style="
        margin: 10px 0 0;
        color: #c7c7df;
        font-size: 13px;
      ">
        Your AI-powered search experience
      </p>
    </div>

    <!-- Email Body -->
    <div style="
      padding: 40px 35px;
      text-align: center;
    ">

      <div style="
        width: 65px;
        height: 65px;
        line-height: 65px;
        margin: 0 auto 25px;
        background-color: #ecfdf5;
        border-radius: 50%;
        font-size: 32px;
      ">
        ✉
      </div>

      <h2 style="
        color: #17172f;
        font-size: 25px;
        margin: 0 0 15px;
        font-weight: 700;
      ">
        Welcome ${username}!
      </h2>

      <p style="
        color: #55556b;
        font-size: 15px;
        line-height: 1.7;
        margin: 0 0 15px;
      ">
        Your account has been created successfully.
        We're excited to have you on board!
      </p>

      <p style="
        color: #55556b;
        font-size: 15px;
        line-height: 1.7;
        margin: 0 0 30px;
      ">
        To get started, please verify your email address
        by clicking the button below.
      </p>

      <!-- Verification Button -->
      <a href="${verificationUrl}"
        style="
          display: inline-block;
          background-color: #4f46e5;
          color: #ffffff;
          padding: 15px 35px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          letter-spacing: 0.2px;
        "
      >
        Verify My Email →
      </a>

      <!-- Expiry Notice -->
      <div style="
        margin-top: 30px;
        padding: 14px;
        background-color: #fff7ed;
        border-radius: 8px;
      ">
        <p style="
          margin: 0;
          color: #9a3412;
          font-size: 13px;
          line-height: 1.6;
        ">
          ⏱ This verification link will expire in
          <strong>15 minutes.</strong>
        </p>
      </div>

      <p style="
        color: #77778b;
        font-size: 12px;
        line-height: 1.7;
        margin: 25px 0 0;
      ">
        If you did not create an account, you can safely
        ignore this email.
      </p>

    </div>

    <!-- Footer -->
    <div style="
      background-color: #f8f8fc;
      padding: 22px 20px;
      text-align: center;
      border-top: 1px solid #eeeeF5;
    ">
      <p style="
        margin: 0 0 8px;
        color: #77778b;
        font-size: 12px;
      ">
        © 2026 Perplexity. All rights reserved.
      </p>

      <p style="
        margin: 0;
        color: #9999aa;
        font-size: 11px;
      ">
        This is an automated email. Please do not reply.
      </p>
    </div>

  </div>
</div>

    `;

    await sendEmail({
      to: normalizedEmail,
      subject: 'Verify Your Email',
      text: verificationText,
      html: verificationHtml,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isverified: user.isEmailVerified,
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

export async function emailVerification(req, res) {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findOne({ email: decoded.email });
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      success: false,
      error: 'User not found',
    });
  }

  if (user.isVerified === true) {
    return res.status(200).json({
      message: "Account already verified"
    })
  }

  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  await user.save();


  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified Successfully</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4fb;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 15px;
    box-sizing: border-box;
  ">

    <div style="
      max-width: 480px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 18px;
      padding: 40px 30px;
      text-align: center;
      box-sizing: border-box;
      box-shadow: 0 10px 40px rgba(0,0,0,0.07);
      border: 1px solid #eeeeF5;
    ">

      <!-- Logo -->
      <h2 style="
        margin: 0 0 40px;
        color: #17172f;
        font-size: 25px;
        font-weight: 700;
      ">
        ✦ Perplexity
      </h2>

      <!-- Success Icon -->
      <div style="
        width: 85px;
        height: 85px;
        background-color: #dcfce7;
        border-radius: 50%;
        margin: 0 auto 25px;
        line-height: 85px;
        font-size: 45px;
        color: #16a34a;
      ">
        ✓
      </div>

      <!-- Heading -->
      <h1 style="
        color: #17172f;
        font-size: 27px;
        margin: 0 0 15px;
        font-weight: 700;
      ">
        Email Verified!
      </h1>

      <!-- Description -->
      <p style="
        color: #66667a;
        font-size: 15px;
        line-height: 1.8;
        margin: 0 0 30px;
      ">
        Your email verification has been completed successfully.
        Your account is now active, and you can start exploring
        your AI-powered search experience.
      </p>

      <!-- Login Button -->
      <a href="http://localhost:5173/login"
        style="
          display: inline-block;
          background-color: #4f46e5;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 35px;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 600;
        ">
        Go to Login →
      </a>

      <!-- Footer -->
      <p style="
        color: #9999aa;
        font-size: 12px;
        margin: 35px 0 0;
        line-height: 1.6;
      ">
        Thank you for joining us!<br>
        © 2026 Perplexity. All rights reserved.
      </p>

    </div>
  </div>

</body>
</html>
`);

}
