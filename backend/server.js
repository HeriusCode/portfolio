import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import apiRouter from './routes/api.js';
import { startPushbulletBannerService } from './services/pushbulletBannerService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api') && req.path !== '/api/banner') {
      console.log(`[HTTP] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// API Routes
app.use('/api', apiRouter);

// Serve Client Static Files in Production / Docker container
const clientDistPath = path.resolve(__dirname, '../frontend/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`[Static] Serving frontend from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  console.log('[Static] frontend/dist not detected; running in API-only or dev proxy mode.');
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
});

// Start listening on 0.0.0.0
const server = app.listen(env.PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`🚀 DEV.PORTFOLIO Backend running on port ${env.PORT}`);
  console.log(`🔗 Local URL:    http://localhost:${env.PORT}`);
  console.log(`📡 Network Host: 0.0.0.0:${env.PORT}`);
  console.log(`📁 Environment:  ${env.NODE_ENV}`);
  console.log('====================================================');
});

startPushbulletBannerService().catch((error) => {
  console.error('[Pushbullet Banner] Startup failed:', error);
});

process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received. Gracefully shutting down...');
  server.close(() => process.exit(0));
});

export default app;

