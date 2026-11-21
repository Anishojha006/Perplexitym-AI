import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'server is live',
  });
});



export default app;