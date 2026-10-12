import express from 'express';
import { getBanner, updateBanner } from '../controllers/bannerController.js';
import { sendMessage } from '../controllers/messageController.js';
import { login, verify } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/auth.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public Banner route
router.get('/banner', getBanner);

// Contact message with rate limiter (max 5 requests per 2 mins per IP)
router.post('/messages', rateLimiter({ maxRequests: 5, windowMs: 120000 }), sendMessage);

// Admin authentication
router.post('/admin/login', login);
router.get('/admin/verify', requireAdmin, verify);

// Admin announcement update
router.put('/admin/banner', requireAdmin, updateBanner);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;

