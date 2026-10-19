import React from 'react';
import { ArrowUp, Code2, Github, Linkedin, Facebook, Shield, Heart } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-darkBg/95 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/5">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primaryCyan to-secondaryPurple p-0.5">
                <div className="w-full h-full rounded-[6px] bg-darkBg flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primaryCyan" />
                </div>
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-textPrimary">
                DEV<span className="text-secondaryPurple">.</span>PORTFOLIO
              </span>
            </div>
            <p className="text-xs text-textSecondary max-w-sm">
              Modern dark tech personal portfolio designed for Network Programming coursework, Docker containerization, and VMware cloud tunnel deployment.
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 flex items-center justify-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-surface/80 border border-white/5 text-textSecondary hover:text-primaryCyan hover:border-primaryCyan/40 transition-all hover:scale-110"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-surface/80 border border-white/5 text-textSecondary hover:text-primaryCyan hover:border-primaryCyan/40 transition-all hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="p-2.5 rounded-xl bg-surface/80 border border-white/5 text-textSecondary hover:text-primaryCyan hover:border-primaryCyan/40 transition-all hover:scale-110"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surfaceHover border border-white/10 hover:border-primaryCyan/40 text-xs font-semibold text-textPrimary transition-all hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-primaryCyan group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textSecondary">
          <p className="flex items-center gap-1">
            <span>© 2026 {personalInfo.name}. All rights reserved.</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              Built with <span className="text-primaryCyan font-mono">React</span> & <span className="text-secondaryPurple font-mono">Tailwind CSS</span>
            </span>

            {/* Admin entry point in footer */}
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-textSecondary/60 hover:text-primaryCyan flex items-center gap-1 transition-colors"
              title="Admin Mode"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

