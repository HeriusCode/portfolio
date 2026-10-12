import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root or server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin@2026',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_portfolio_super_secure_secret_key_2026',
  
  // Push Notification Services
  PUSHBULLET_ACCESS_TOKEN: process.env.PUSHBULLET_ACCESS_TOKEN || '',
  BARK_DEVICE_KEY: process.env.BARK_DEVICE_KEY || '',
  BARK_SERVER_URL: process.env.BARK_SERVER_URL || 'https://api.day.app',
  
  // Database Path (can be mapped in Docker volume)
  DB_PATH: process.env.DB_PATH || path.resolve(__dirname, '../data/portfolio.db'),
};

