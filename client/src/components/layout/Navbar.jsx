import React, { useState } from 'react';
import { Terminal, Menu, X, Shield, ExternalLink, Code2 } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const bannerHeight = 44;
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryCyan rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primaryCyan/20 to-secondaryPurple/20 border border-primaryCyan/30 flex items-center justify-center group-hover:border-primaryCyan transition-all shadow-glow-cyan/20">
                <Code2 className="w-5 h-5 text-primaryCyan group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-lg tracking-wider text-textPrimary group-hover:text-primaryCyan transition-colors">
                  DEV<span className="text-secondaryPurple">.</span>PORTFOLIO
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-textSecondary -mt-1">
                  Fullstack & Network
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'text-primaryCyan bg-primaryCyan/10 shadow-[inset_0_0_12px_rgba(34,211,238,0.15)]'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primaryCyan shadow-[0_0_8px_#22D3EE]" />
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primaryCyan to-secondaryPurple rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Admin Discreet Access Button */}
            <div className="ml-3 pl-3 border-l border-white/10 flex items-center">
              <button
                onClick={onOpenAdmin}
                title="Admin Control Panel"
                className="p-2 rounded-lg text-textSecondary hover:text-primaryCyan hover:bg-white/5 transition-all group"
                aria-label="Admin Control"
              >
                <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-textSecondary hover:text-primaryCyan transition-colors"
              title="Admin Access"
              aria-label="Admin Control"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface/60 border border-white/10 text-textPrimary hover:text-primaryCyan transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-x-0 border-t border-white/10 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-primaryCyan/15 text-primaryCyan border border-primaryCyan/30 font-semibold'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-primaryCyan shadow-[0_0_8px_#22D3EE]" />}
                </button>
              );
            })}
            <div className="pt-3 border-t border-white/10 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-textSecondary hover:text-primaryCyan border border-white/5 bg-surface"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Announcement Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

