import db from '../database/db.js';

/**
 * GET /api/banner
 * Public endpoint to fetch current announcement
 */
export function getBanner(req, res) {
  try {
    const stmt = db.prepare('SELECT message, updated_at FROM announcements ORDER BY id DESC LIMIT 1');
    const row = stmt.get();

    if (!row) {
      return res.json({
        success: true,
        message: 'Welcome to my Portfolio! Thanks for visiting my website.',
        updatedAt: new Date().toISOString(),
      });
    }

    return res.json({
      success: true,
      message: row.message,
      updatedAt: row.updated_at,
    });
  } catch (err) {
    console.error('[Banner] Error retrieving banner:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve banner',
    });
  }
}

/**
 * PUT /api/admin/banner
 * Admin only endpoint to publish a new announcement
 */
export function updateBanner(req, res) {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Announcement message cannot be empty.',
      });
    }

    const trimmed = message.trim();
    if (trimmed.length > 300) {
      return res.status(400).json({
        success: false,
        error: 'Announcement message is too long (maximum 300 characters).',
      });
    }

    // Insert new announcement as the active latest one
    const insertStmt = db.prepare(
      "INSERT INTO announcements (message, updated_at) VALUES (?, datetime('now', 'localtime'))"
    );
    insertStmt.run(trimmed);

    console.log(`[Banner] Admin updated banner to: "${trimmed}"`);

    return res.json({
      success: true,
      message: trimmed,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Banner] Error updating banner:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to update banner',
    });
  }
}

