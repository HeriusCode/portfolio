import React, { useState, useEffect } from 'react';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ParticleBackground } from './components/ui/ParticleBackground';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { AdminModal } from './components/ui/AdminModal';
import { ToastContainer } from './components/ui/Toast';
import { useBanner } from './hooks/useBanner';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useToast } from './hooks/useToast';

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const banner = useBanner(5000); // Poll every 5s
  const activeSection = useScrollSpy(['home', 'about', 'skills', 'projects', 'contact'], 100);
  const { toasts, showToast, removeToast } = useToast();

  // Keyboard shortcut (Ctrl+Shift+A) or URL search param (?admin=true) to open Admin Control
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminOpen(true);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-textPrimary relative selection:bg-primaryCyan/20 selection:text-primaryCyan">
      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Futuristic Particle & Mesh Background */}
      <ParticleBackground />

      {/* SECTION 1: Top Announcement Banner (Infinite Marquee) */}
      <AnnouncementBanner
        banner={banner}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* SECTION 2: Navigation Bar (Sticky Glassmorphism) */}
      <Navbar
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main className="relative z-10 flex flex-col">
        {/* SECTION 3: Hero Section */}
        <HeroSection />

        {/* SECTION 4: About Me */}
        <AboutSection />

        {/* SECTION 5: Tech Stack & Skills */}
        <SkillsSection />

        {/* SECTION 6: Featured Projects */}
        <ProjectsSection />

        {/* SECTION 7: Contact Me */}
        <ContactSection showToast={showToast} />
      </main>

      {/* SECTION 8: Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Hidden Admin Announcement Control Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentBanner={banner}
        onBannerUpdated={banner.refresh}
        showToast={showToast}
      />

      {/* Toast Alert Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;

