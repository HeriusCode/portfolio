
import { env } from '../config/env.js';
import db from '../database/db.js';

const API_URL = 'https://api.pushbullet.com/v2/pushes';

const TITLE = env.PUSHBULLET_BANNER_TITLE;
const INTERVAL = Math.max(5000, env.PUSHBULLET_POLL_INTERVAL);

let checking = false;

// Lưu mốc bắt đầu và các push đã xử lý.
db.exec(`
  CREATE TABLE IF NOT EXISTS pushbullet_sync (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    started_at REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pushbullet_processed (
    push_id TEXT PRIMARY KEY,
    processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const getSync = db.prepare(
  'SELECT started_at FROM pushbullet_sync WHERE id = 1'
);

const markProcessed = db.prepare(
  'INSERT OR IGNORE INTO pushbullet_processed (push_id) VALUES (?)'
);

const alreadyProcessed = db.prepare(
  'SELECT 1 FROM pushbullet_processed WHERE push_id = ?'
);

const saveAnnouncement = db.prepare(
  'INSERT INTO announcements (message) VALUES (?)'
);

async function fetchPushes() {
  const response = await fetch(
    `${API_URL}?active=true&limit=100`,
    {
      headers: {
        'Access-Token': env.PUSHBULLET_ACCESS_TOKEN
      },
      signal: AbortSignal.timeout(8000)
    }
  );

  if (!response.ok) {
    throw new Error(`Pushbullet HTTP ${response.status}`);
  }

  return response.json();
}

async function checkBanner() {
  if (checking) return;
  checking = true;

  try {
    const data = await fetchPushes();
    const startedAt = getSync.get().started_at;

    const commands = (data.pushes || [])
      .filter((push) =>
        push.active !== false &&
        push.type === 'note' &&
        push.sender_iden === env.PUSHBULLET_ADMIN_IDEN &&
        push.source_device_iden ===
          env.PUSHBULLET_ADMIN_DEVICE_IDEN &&
        typeof push.iden === 'string' &&
        typeof push.body === 'string' &&
push.body.startsWith('/banner ') &&
push.body.slice('/banner '.length).trim().length > 0 &&
        push.body.trim().length > 0 &&
        push.body.trim().length <= 300 &&
        push.created >= startedAt
      )
      .sort((a, b) => a.created - b.created);

    for (const push of commands) {
      if (alreadyProcessed.get(push.iden)) continue;

      db.exec('BEGIN');

      try {
        saveAnnouncement.run(
  push.body.slice('/banner '.length).trim()
);
        markProcessed.run(push.iden);
        db.exec('COMMIT');

        console.log(
          '[Pushbullet Banner] Updated:',
          push.iden
        );
      } catch (error) {
        db.exec('ROLLBACK');
        throw error;
      }
    }
  } catch (error) {
    console.error(
      '[Pushbullet Banner] Sync error:',
      error.message
    );
  } finally {
    checking = false;
  }
}

export async function startPushbulletBannerService() {
  if (
    !env.PUSHBULLET_ACCESS_TOKEN ||
    !env.PUSHBULLET_ADMIN_IDEN ||
    !env.PUSHBULLET_ADMIN_DEVICE_IDEN
  ) {
    console.log(
      '[Pushbullet Banner] Missing configuration'
    );
    return;
  }

  // Lần đầu chạy chỉ xử lý push mới,
  // không đưa các push cũ lên banner.
  db.prepare(`
    INSERT OR IGNORE INTO pushbullet_sync
    (id, started_at) VALUES (1, ?)
  `).run(Date.now() / 1000);

  console.log('[Pushbullet Banner] Polling started');

  await checkBanner();

  const timer = setInterval(checkBanner, INTERVAL);
  timer.unref?.();
}

