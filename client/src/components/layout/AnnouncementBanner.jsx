import React from 'react';
import { Megaphone, Sparkles, RefreshCw, Radio } from 'lucide-react';

export function AnnouncementBanner({ banner, onOpenAdmin }) {
  const { message, loading, error, isFallback } = banner;

  return (
    <aside 
      aria-label="Admin Announcement Banner" 
      className="relative z-50 h-10 sm:h-11 w-full bg-gradient-to-r from-cyan-950/95 via-surface/95 to-purple-950/95 border-b border-primaryCyan/20 backdrop-blur-md flex items-center overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primaryCyan/10 via-transparent to-secondaryPurple/10 pointer-events-none" />

      {/* Left Badge: Live Status & Megaphone */}
      <div className="relative z-10 flex items-center gap-2 pl-3 sm:pl-6 pr-3 bg-darkBg/90 sm:bg-darkBg/80 backdrop-blur-md border-r border-white/10 shrink-0 h-full">
        <button
          onClick={onOpenAdmin}
          title="Click to open Admin Announcement panel"
          className="group flex items-center gap-2 text-primaryCyan hover:text-white transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryCyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primaryCyan" />
          </span>
          <Megaphone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-primaryCyan" />
          <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline text-gray-200">
            Announcement
          </span>
        </button>
      </div>

      {/* Center Marquee Track */}
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <div className="marquee-wrapper w-full flex overflow-hidden">
          {loading ? (
            <div className="flex items-center gap-2 text-xs text-textSecondary px-4 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin text-primaryCyan" />
              <span>Checking latest server announcement...</span>
            </div>
          ) : (
            <div className="marquee-content flex items-center gap-12 whitespace-nowrap will-change-transform">
              {/* Marquee duplicate loops for seamless infinite scrolling */}
              {[1, 2, 3].map((key) => (
                <div key={key} className="flex items-center gap-3 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-secondaryPurple shrink-0" />
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-textPrimary">
                    {message}
                  </span>
                  <span className="text-xs text-primaryCyan/60 px-2 py-0.5 rounded-full bg-primaryCyan/10 border border-primaryCyan/20">
                    Live Broadcast
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Live Pulse & Admin trigger */}
      <div className="relative z-10 flex items-center gap-2 pr-3 sm:pr-6 pl-3 bg-darkBg/90 sm:bg-darkBg/80 backdrop-blur-md border-l border-white/10 shrink-0 h-full">
        <button
          onClick={onOpenAdmin}
          className="text-[11px] text-textSecondary hover:text-primaryCyan flex items-center gap-1.5 transition-colors group"
          title="Admin Control"
        >
          <Radio className="w-3 h-3 text-secondaryPurple group-hover:text-primaryCyan animate-pulse" />
          <span className="hidden lg:inline text-gray-300">Admin Live</span>
        </button>
      </div>

      <style>{`
        .marquee-wrapper {
          mask-image: linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent);
        }
        .marquee-content {
          animation: continuousMarquee 26s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes continuousMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </aside>
  );
}

