import db from '../database/db.js';
import { sendMobileNotification } from '../services/notificationService.js';

/**
 * POST /api/messages
 * Submit a message from portfolio visitor and push to phone
 */
export async function sendMessage(req, res) {
  try {
    const { name, message } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message content cannot be empty.',
      });
    }

    const trimmedMsg = message.trim();
    if (trimmedMsg.length > 600) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (maximum 600 characters).',
      });
    }

    const trimmedName = typeof name === 'string' ? name.trim().slice(0, 80) : '';
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    // Store in SQLite database
    const insertStmt = db.prepare(
      'INSERT INTO messages (name, message, ip, notified) VALUES (?, ?, ?, 0)'
    );
    const result = insertStmt.run(trimmedName || 'Anonymous', trimmedMsg, ip);
    const messageId = result.lastInsertRowid;

    // Send push notification asynchronously
    let pushResult = { success: false, provider: 'none' };
    try {
      pushResult = await sendMobileNotification({
        name: trimmedName,
        message: trimmedMsg,
        ip,
      });

      if (pushResult.success) {
        const updateStmt = db.prepare('UPDATE messages SET notified = 1 WHERE id = ?');
        updateStmt.run(messageId);
      }
    } catch (notifErr) {
      console.error('[Messages] Notification forwarding error:', notifErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Your message has been delivered directly to my phone. Thank you for connecting!',
      delivery: {
        provider: pushResult.provider,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[Messages] Error processing message:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while sending your message. Please try again.',
    });
  }
}

