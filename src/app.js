import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './routes/auth.routes.js';
import { testAI } from './services/ai.service.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'server is live',
  });
});

app.get('/api/test-ai', async (req, res) => {
  try {
    const result = await testAI();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'AI request failed',
      error: error.message,
    });
  }
});

export default app;