import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export const sendEmail = async (optionsOrTo, subject, text, html) => {
  const mailOptions = typeof optionsOrTo === 'object' && optionsOrTo !== null
    ? optionsOrTo
    : {
        to: optionsOrTo,
        subject,
        text,
        html,
      };

  const { to, subject: mailSubject, text: mailText, html: mailHtml } = mailOptions;

  if (!to || !String(to).trim()) {
    throw new Error('No recipients defined');
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};