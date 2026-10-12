// Frontend API service communicating with Express backend

export async function fetchBanner() {
  try {
    const res = await fetch('/api/banner');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[API] Could not fetch banner:', err.message);
    return {
      success: false,
      message: 'Welcome to my Portfolio! Building modern web applications & distributed systems.',
      isFallback: true,
    };
  }
}

export async function postContactMessage({ name, message }) {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}: Failed to deliver message`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export async function adminLogin(password) {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Admin authentication failed');
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateAdminBanner(message, token) {
  try {
    const res = await fetch('/api/admin/banner', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update announcement');
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export async function verifyAdminSession(token) {
  if (!token) return false;
  try {
    const res = await fetch('/api/admin/verify', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

