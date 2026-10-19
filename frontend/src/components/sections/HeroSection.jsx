import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Facebook, 
  Sparkles, 
  Code, 
  Server, 
  Container, 
  Terminal,
  FileCode2,
  Download
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Typing animation loop
  useEffect(() => {
    const currentFullRole = personalInfo.roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(currentFullRole.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText.length + 1 === currentFullRole.length) {
          // Pause at word completion
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Backspacing
        setDisplayedText(currentFullRole.substring(0, displayedText.length - 1));
        setTypingSpeed(50);

        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative flex items-center justify-center pt-14 sm:pt-16 lg:pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/80 border border-primaryCyan/30 shadow-glow-cyan/20 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-textPrimary">
                {personalInfo.status}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-secondaryPurple" />
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-textPrimary leading-none">
                Hi, I'm <span className="text-gradient font-black">{personalInfo.name}</span>
              </h1>
              
              {/* Dynamic Rotating Roles */}
              <div className="h-12 sm:h-14 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-3xl font-heading font-semibold text-textSecondary mr-2.5">
                  I am a
                </span>
                <span className="text-xl sm:text-3xl font-heading font-bold text-primaryCyan tracking-wide">
                  {displayedText}
                </span>
                <span className="inline-block w-0.5 h-7 sm:h-8 ml-1 bg-secondaryPurple animate-pulse" />
              </div>
            </div>

            {/* Short Bio */}
            <p className="max-w-2xl text-base sm:text-lg text-textSecondary font-sans leading-relaxed">
              {personalInfo.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primaryCyan to-secondaryPurple text-darkBg font-bold text-sm sm:text-base hover:opacity-95 shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface/80 hover:bg-surface border border-white/10 hover:border-primaryCyan/50 text-textPrimary font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-primaryCyan" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5 w-full justify-center lg:justify-start">
              <span className="text-xs uppercase tracking-widest text-textSecondary font-semibold">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl bg-surface/70 border border-white/5 text-textSecondary hover:text-primaryCyan hover:border-primaryCyan/40 hover:bg-surface transition-all hover:scale-110 shadow-sm"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-surface/70 border border-white/5 text-textSecondary hover:text-primaryCyan hover:border-primaryCyan/40 hover:bg-surface transition-all hover:scale-110 shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="p-2.5 rounded-xl bg-surface/70 border border-white/5 text-textSecondary hover:text-primaryCyan hover:border-primaryCyan/40 hover:bg-surface transition-all hover:scale-110 shadow-sm"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Avatar with glowing halo and floating tech chips (5 cols on lg) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 flex items-center justify-center">
              
              {/* Subtle pulsing background glow halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primaryCyan/20 via-secondaryPurple/20 to-primaryCyan/10 blur-3xl animate-pulse-slow pointer-events-none" />

              {/* Outer decorative orbit ring */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-primaryCyan/20 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-8 rounded-full border border-secondaryPurple/20 border-dashed animate-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

              {/* Main Avatar Container with gradient border glow */}
              <div className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 rounded-3xl p-1 bg-gradient-to-tr from-primaryCyan via-secondaryPurple to-primaryCyan shadow-glow-cyan-lg">
                <div className="w-full h-full rounded-[22px] bg-surface overflow-hidden relative group">
                  
                  {/* Avatar Image: Stylish modern developer visual */}
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Glassmorphism subtle overlay on bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-darkBg/90 via-darkBg/50 to-transparent flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-textPrimary">{personalInfo.vietnameseName}</p>
                      <p className="text-[10px] text-primaryCyan font-mono">IT Major • VKU</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </div>
                </div>
              </div>

              {/* Floating Tech Chips around Avatar */}
              {/* Chip 1: React */}
              <div className="absolute -top-2 left-4 sm:-top-4 sm:left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-primaryCyan/40 shadow-glow-cyan animate-float-slow">
                <Code className="w-4 h-4 text-primaryCyan" />
                <span className="text-xs font-mono font-semibold text-textPrimary">React</span>
              </div>

              {/* Chip 2: Node.js */}
              <div className="absolute top-1/4 -right-4 sm:-right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-secondaryPurple/40 shadow-glow-purple animate-float-reverse">
                <Server className="w-4 h-4 text-secondaryPurple" />
                <span className="text-xs font-mono font-semibold text-textPrimary">Node.js</span>
              </div>

              {/* Chip 3: Docker */}
              <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-primaryCyan/40 shadow-glow-cyan animate-float-slow">
                <Container className="w-4 h-4 text-primaryCyan" />
                <span className="text-xs font-mono font-semibold text-textPrimary">Docker</span>
              </div>

              {/* Chip 4: Linux */}
              <div className="absolute bottom-1/4 -left-4 sm:-left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-secondaryPurple/40 shadow-glow-purple animate-float-reverse">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-semibold text-textPrimary">Ubuntu</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

