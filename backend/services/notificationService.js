import { env } from '../config/env.js';

/**
 * Sends notification to developer's mobile device via Pushbullet or Bark
 * @param {Object} payload { name, message, ip }
 * @returns {Promise<{ success: boolean, provider: string, details?: any }>}
 */
export async function sendMobileNotification({ name, message, ip }) {
  const senderName = name && name.trim() ? name.trim() : 'Anonymous Visitor';
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const title = `Portfolio Contact: ${senderName}`;
  const body = `Time: ${timestamp}\nFrom: ${senderName}\nMessage: ${message}`;

  const results = [];

  // 1. Try Pushbullet
  if (env.PUSHBULLET_ACCESS_TOKEN) {
    try {
      const res = await fetch('https://api.pushbullet.com/v2/pushes', {
        method: 'POST',
        headers: {
          'Access-Token': env.PUSHBULLET_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'note',
          title: title,
          body: body,
        }),
      });

      if (res.ok) {
        console.log('[Notification] Successfully pushed via Pushbullet.');
        results.push('Pushbullet');
      } else {
        const errorText = await res.text();
        console.error('[Notification] Pushbullet error:', res.status, errorText);
      }
    } catch (err) {
      console.error('[Notification] Failed to connect to Pushbullet:', err.message);
    }
  }

  // 2. Try Bark
  if (env.BARK_DEVICE_KEY) {
    try {
      const barkUrl = `${env.BARK_SERVER_URL.replace(/\/$/, '')}/push`;
      const res = await fetch(barkUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_key: env.BARK_DEVICE_KEY,
          title: title,
          body: body,
          category: 'Portfolio',
          badge: 1,
          sound: 'minuet',
        }),
      });

      if (res.ok) {
        console.log('[Notification] Successfully pushed via Bark.');
        results.push('Bark');
      } else {
        const errorText = await res.text();
        console.error('[Notification] Bark error:', res.status, errorText);
      }
    } catch (err) {
      console.error('[Notification] Failed to connect to Bark:', err.message);
    }
  }

  // 3. Fallback / Log Simulation mode if no external token is provided
  if (results.length === 0) {
    console.log('---------------------------------------------------------');
    console.log('[Notification Service: Simulation Mode (No Token Configured)]');
    console.log(`From:    ${senderName} (${ip || 'unknown IP'})`);
    console.log(`Time:    ${timestamp}`);
    console.log(`Message: "${message}"`);
    console.log('To deliver real mobile pushes, set PUSHBULLET_ACCESS_TOKEN or BARK_DEVICE_KEY in .env');
    console.log('---------------------------------------------------------');
    return {
      success: true,
      provider: 'Simulation (Console Log)',
      mock: true
    };
  }

  return {
    success: true,
    provider: results.join(', ')
  };
}

