import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  Cpu, 
  Layers, 
  Sparkles,
  Atom,
  FileCode2,
  Palette,
  Globe,
  HardDrive,
  Container,
  GitBranch,
  GitPullRequest,
  AppWindow,
  Code
} from 'lucide-react';
import { skills, skillCategories } from '../../data/skillsData';

// Map icon strings to Lucide components
const iconMap = {
  Atom: Atom,
  FileCode2: FileCode2,
  Palette: Palette,
  Code: Code,
  Layers: Layers,
  Server: Server,
  Cpu: Cpu,
  Globe: Globe,
  Database: Database,
  HardDrive: HardDrive,
  Container: Container,
  Terminal: Terminal,
  GitBranch: GitBranch,
  GitPullRequest: GitPullRequest,
  AppWindow: AppWindow,
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-8 sm:py-10 lg:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-secondaryPurple/30 text-secondaryPurple text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5 text-primaryCyan" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-textPrimary tracking-tight">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="max-w-xl text-textSecondary text-sm sm:text-base mt-3">
            Tools, languages, and frameworks I use to engineer robust, high-performance web products.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primaryCyan to-secondaryPurple rounded-full mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {skillCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primaryCyan to-secondaryPurple text-darkBg shadow-glow-cyan'
                    : 'bg-surface/70 hover:bg-surface text-textSecondary hover:text-textPrimary border border-white/5'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <div
                key={skill.name}
                className="group relative glass-card rounded-2xl p-5 border border-white/5 hover:border-primaryCyan/40 hover:shadow-glow-cyan/30 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Ambient glow in card corner on hover */}
                <div 
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{ backgroundColor: skill.color }}
                />

                <div>
                  {/* Icon & Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-11 h-11 rounded-xl bg-surface/90 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                      style={{ color: skill.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-textSecondary/80 px-2 py-0.5 rounded-md bg-white/5">
                      {skill.category}
                    </span>
                  </div>

                  {/* Name & Desc */}
                  <h3 className="text-base font-heading font-bold text-textPrimary group-hover:text-primaryCyan transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-textSecondary mt-1 leading-snug line-clamp-2">
                    {skill.desc}
                  </p>
                </div>

                {/* Proficiency Bar */}
                <div className="mt-5 pt-3 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] text-textSecondary font-mono mb-1.5">
                    <span>Proficiency</span>
                    <span className="text-primaryCyan font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-darkBg rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`,
                      }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

