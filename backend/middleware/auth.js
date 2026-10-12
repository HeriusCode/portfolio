import crypto from 'crypto';
import { env } from '../config/env.js';

/**
 * Creates a cryptographically signed HMAC token for Admin
 */
export function generateAdminToken() {
  const payload = {
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(payloadStr)
    .digest('base64url');
  
  return `${payloadStr}.${signature}`;
}

/**
 * Verifies the HMAC token
 */
export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(payloadStr)
    .digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Express middleware to protect Admin routes
 */
export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid authorization token.',
    });
  }

  const token = authHeader.substring(7).trim();
  const decoded = verifyAdminToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or expired token.',
    });
  }

  req.admin = decoded;
  next();
}

