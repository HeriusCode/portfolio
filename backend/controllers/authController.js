import { env } from '../config/env.js';
import { generateAdminToken } from '../middleware/auth.js';

/**
 * POST /api/admin/login
 * Verify admin password and return signed token
 */
export function login(req, res) {
  try {
    const { password } = req.body || {};

    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Password is required.',
      });
    }

    if (password !== env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect administrative password.',
      });
    }

    const token = generateAdminToken();

    return res.json({
      success: true,
      token,
      message: 'Admin authentication successful.',
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed due to server error.',
    });
  }
}

/**
 * GET /api/admin/verify
 * Validate existing admin session
 */
export function verify(req, res) {
  return res.json({
    success: true,
    valid: true,
    user: req.admin,
  });
}

