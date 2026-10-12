import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchBanner } from '../services/api';

export function useBanner(pollIntervalMs = 5000) {
  const [banner, setBanner] = useState({
    message: 'Welcome to my Portfolio! Thanks for visiting my website.',
    updatedAt: null,
    loading: true,
    error: null,
    isFallback: false,
  });

  const isMountedRef = useRef(true);

  const loadBanner = useCallback(async () => {
    try {
      const data = await fetchBanner();
      if (!isMountedRef.current) return;

      if (data && data.message) {
        setBanner(prev => {
          // Only update if message or time changed to avoid re-renders
          if (prev.message === data.message && prev.updatedAt === data.updatedAt && !prev.loading) {
            return prev;
          }
          return {
            message: data.message,
            updatedAt: data.updatedAt || new Date().toISOString(),
            loading: false,
            error: null,
            isFallback: !!data.isFallback,
          };
        });
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      setBanner(prev => ({
        ...prev,
        loading: false,
        error: 'Offline mode',
        isFallback: true,
      }));
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    loadBanner();

    // Auto-poll every 5 seconds
    const interval = setInterval(loadBanner, pollIntervalMs);

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
    };
  }, [loadBanner, pollIntervalMs]);

  return { ...banner, refresh: loadBanner };
}

