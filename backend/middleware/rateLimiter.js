const requestLogs = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requestLogs.entries()) {
    const valid = timestamps.filter(t => now - t < 120000);
    if (valid.length === 0) {
      requestLogs.delete(ip);
    } else {
      requestLogs.set(ip, valid);
    }
  }
}, 300000);

/**
 * Limits requests per IP (Default: max 5 messages per 2 minutes)
 */
export function rateLimiter({ maxRequests = 5, windowMs = 120000 } = {}) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const history = requestLogs.get(ip) || [];
    const recent = history.filter(t => now - t < windowMs);

    if (recent.length >= maxRequests) {
      const oldestInWindow = recent[0];
      const waitSeconds = Math.ceil((windowMs - (now - oldestInWindow)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Too many messages sent. Please wait ${waitSeconds}s before trying again.`,
        retryAfter: waitSeconds,
      });
    }

    recent.push(now);
    requestLogs.set(ip, recent);
    next();
  };
}

