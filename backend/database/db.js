import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { env } from '../config/env.js';

// Ensure data folder exists
const dbDir = path.dirname(env.DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;
try {
  db = new DatabaseSync(env.DB_PATH);
  console.log(`[DB] Connected to SQLite database at: ${env.DB_PATH}`);
} catch (err) {
  console.error('[DB] Failed to open SQLite database:', err);
  throw err;
}

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT NOT NULL,
    ip TEXT,
    notified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial announcement if empty
const countQuery = db.prepare('SELECT COUNT(*) as count FROM announcements');
const result = countQuery.get();

if (result && result.count === 0) {
  const defaultMsg = 'Welcome to my Portfolio! Thanks for visiting my website. Feel free to explore my projects & connect.';
  const insertStmt = db.prepare('INSERT INTO announcements (message) VALUES (?)');
  insertStmt.run(defaultMsg);
  console.log('[DB] Seeded initial announcement message.');
}

export default db;

