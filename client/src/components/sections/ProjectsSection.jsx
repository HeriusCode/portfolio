import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Lock, 
  Layers, 
  Sparkles, 
  Activity,
  Server,
  EyeOff
} from 'lucide-react';
import { projects } from '../../data/projectsData';

export function ProjectsSection() {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Full-stack', 'Frontend', 'Interactive', 'Systems & Network'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-8 sm:py-10 lg:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-primaryCyan/20 text-primaryCyan text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-textPrimary tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="max-w-xl text-textSecondary text-sm sm:text-base mt-3">
            Practical applications built for academic coursework, competitive engineering, and personal production use.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primaryCyan to-secondaryPurple rounded-full mt-4" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === cat
                  ? 'bg-primaryCyan/20 text-primaryCyan border border-primaryCyan/40 shadow-glow-cyan/20'
                  : 'bg-surface/60 hover:bg-surface text-textSecondary border border-white/5'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid: 2 columns on desktop/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-card rounded-2xl border border-white/10 hover:border-primaryCyan/40 hover:shadow-glow-cyan/25 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Thumbnail Container with Zoom Effect */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-surface">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/40 to-transparent" />

                {/* Badges on Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-darkBg/80 backdrop-blur-md text-primaryCyan border border-primaryCyan/30">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondaryPurple/80 backdrop-blur-md text-white border border-secondaryPurple/40">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Key Spec Highlight on Bottom of Image */}
                {project.stats && (
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-4 text-xs font-mono text-gray-300">
                    {Object.entries(project.stats).map(([k, v]) => (
                      <span key={k} className="flex items-center gap-1 bg-surface/80 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                        <Activity className="w-3 h-3 text-primaryCyan" />
                        <span>{v}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-textPrimary group-hover:text-primaryCyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondaryPurple font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-textSecondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface/90 text-textSecondary border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Honest Status */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  {/* GitHub Button or Honest Status */}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surfaceHover border border-white/10 hover:border-primaryCyan/40 text-textPrimary text-xs font-semibold transition-all hover:scale-105"
                    >
                      <Github className="w-4 h-4 text-primaryCyan" />
                      <span>{project.githubStatus || 'Source Code'}</span>
                    </a>
                  ) : (
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-darkBg/60 border border-white/5 text-textSecondary/70 text-xs font-mono"
                      title="This repository is currently private / internal coursework"
                    >
                      <Lock className="w-3.5 h-3.5 text-textSecondary" />
                      <span>{project.githubStatus || 'Private Repo'}</span>
                    </div>
                  )}

                  {/* Live Demo or Deployment Status */}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primaryCyan to-secondaryPurple text-darkBg text-xs font-bold transition-all hover:opacity-95 shadow-glow-cyan"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-textSecondary/80 px-2.5 py-1 rounded-lg bg-surface/60 border border-white/5">
                      <Server className="w-3 h-3 text-secondaryPurple" />
                      <span>{project.liveStatus || 'Local Environment'}</span>
                    </span>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

