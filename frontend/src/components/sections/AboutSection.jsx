import React from 'react';
import { 
  MapPin, 
  GraduationCap, 
  Compass, 
  Heart, 
  Target, 
  Terminal, 
  Layers, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-primaryCyan/20 text-primaryCyan text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Discover My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-textPrimary tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primaryCyan to-secondaryPurple rounded-full mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Visual Story Card & Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primaryCyan/10 rounded-full blur-2xl group-hover:bg-primaryCyan/20 transition-all pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primaryCyan to-secondaryPurple p-0.5">
                  <div className="w-full h-full rounded-[14px] bg-surface overflow-hidden flex items-center justify-center">
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-textPrimary">{personalInfo.name}</h3>
                  <p className="text-xs text-primaryCyan font-mono">{personalInfo.vietnameseName}</p>
                  <p className="text-xs text-textSecondary mt-0.5">{personalInfo.tagline}</p>
                </div>
              </div>

              {/* Career Goal Callout */}
              <div className="p-4 rounded-xl bg-darkBg/60 border border-primaryCyan/20 mb-6">
                <div className="flex items-center gap-2 text-primaryCyan text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Target className="w-4 h-4" />
                  <span>Career Objective</span>
                </div>
                <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
                  To become a versatile Full-stack & Network Engineer capable of architecting reliable, cloud-native digital systems that empower millions of users with speed and data security.
                </p>
              </div>

              {/* Quick Stat Counters */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {personalInfo.stats.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface/70 border border-white/5 text-center">
                    <p className="text-2xl font-heading font-bold text-gradient">{stat.value}</p>
                    <p className="text-[11px] text-textSecondary uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Detail Info Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Bio Narrative */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-textPrimary flex items-center gap-2.5">
                <span>Passionate Developer & IT Student</span>
                <Sparkles className="w-5 h-5 text-secondaryPurple" />
              </h3>

              <p className="text-sm sm:text-base text-textSecondary leading-relaxed">
                Hello! I am a senior Information Technology undergraduate specializing in <strong className="text-primaryCyan font-medium">Computer Networks and Web Engineering</strong>. My journey started with curiosity about how the Internet transports packets across continents in milliseconds, which blossomed into a deep passion for building resilient software applications.
              </p>

              <p className="text-sm sm:text-base text-textSecondary leading-relaxed">
                I take pride in writing clean, well-tested code across the modern JavaScript ecosystem. From building interactive client-side interfaces using ReactJS and Framer Motion, to crafting secure RESTful APIs with Node.js, Express, and SQLite, and orchestrating containerized deployments with Docker on Ubuntu Server.
              </p>
            </div>

            {/* 4 Glassmorphism Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Location */}
              <div className="glass-card glass-card-hover rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-primaryCyan/10 border border-primaryCyan/30 flex items-center justify-center shrink-0 text-primaryCyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-textSecondary">Location</h4>
                  <p className="text-sm font-semibold text-textPrimary mt-0.5">{personalInfo.location}</p>
                  <p className="text-[11px] text-textSecondary/70">GMT+7 • Ready for remote & on-site</p>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card glass-card-hover rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-secondaryPurple/10 border border-secondaryPurple/30 flex items-center justify-center shrink-0 text-secondaryPurple">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-textSecondary">Education</h4>
                  <p className="text-sm font-semibold text-textPrimary mt-0.5">{personalInfo.education.university}</p>
                  <p className="text-[11px] text-primaryCyan">GPA {personalInfo.education.gpa} • Class of {personalInfo.education.graduationYear}</p>
                </div>
              </div>

              {/* Major */}
              <div className="glass-card glass-card-hover rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-textSecondary">Major</h4>
                  <p className="text-sm font-semibold text-textPrimary mt-0.5">{personalInfo.education.major}</p>
                  <p className="text-[11px] text-textSecondary/70">Network Programming & Distributed Systems</p>
                </div>
              </div>

              {/* Interests */}
              <div className="glass-card glass-card-hover rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-textSecondary">Interests</h4>
                  <p className="text-sm font-semibold text-textPrimary mt-0.5">Cloud, Docker & DevOps</p>
                  <p className="text-[11px] text-textSecondary/70">UI/UX Micro-animations, Open Source</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

