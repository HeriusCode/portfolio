import React, { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-[100] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primaryCyan via-secondaryPurple to-primaryCyan transition-all duration-75 ease-out shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

