import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

import app from './src/app.js';
import mongooseConnect from './src/config/database.connect.js';

async function startServer() {
  try {
    console.log('Starting server...');
    await mongooseConnect();
    app.listen(3000, () => {
      console.log('server is live on 3000 port');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();