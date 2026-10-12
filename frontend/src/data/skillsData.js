export const skillCategories = [
  { id: 'all', label: 'All Tech' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'Tools & DevOps' },
];

export const skills = [
  // Frontend
  {
    name: 'ReactJS',
    category: 'frontend',
    level: 90,
    icon: 'Atom',
    color: '#22D3EE',
    desc: 'SPA, Hooks, Context, State Management'
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 88,
    icon: 'FileCode2',
    color: '#FACC15',
    desc: 'ES6+, Async/Await, Web APIs, DOM'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 92,
    icon: 'Palette',
    color: '#38BDF8',
    desc: 'Utility-first, Responsive Design, Animations'
  },
  {
    name: 'HTML5',
    category: 'frontend',
    level: 95,
    icon: 'Code',
    color: '#F97316',
    desc: 'Semantic HTML, SEO Best Practices, A11y'
  },
  {
    name: 'CSS3',
    category: 'frontend',
    level: 88,
    icon: 'Layers',
    color: '#60A5FA',
    desc: 'Flexbox, Grid, Custom Keyframes, Glassmorphism'
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    level: 85,
    icon: 'Server',
    color: '#4ADE80',
    desc: 'Event loop, Streams, Core Modules, NPM'
  },
  {
    name: 'Express.js',
    category: 'backend',
    level: 86,
    icon: 'Cpu',
    color: '#A78BFA',
    desc: 'RESTful API, Middlewares, Routing, Auth'
  },
  {
    name: 'REST API',
    category: 'backend',
    level: 90,
    icon: 'Globe',
    color: '#22D3EE',
    desc: 'HTTP Protocols, Status Codes, JSON standards'
  },

  // Database
  {
    name: 'SQLite',
    category: 'database',
    level: 82,
    icon: 'Database',
    color: '#38BDF8',
    desc: 'Embedded relational DB, SQL queries, transactions'
  },
  {
    name: 'MongoDB',
    category: 'database',
    level: 80,
    icon: 'HardDrive',
    color: '#34D399',
    desc: 'NoSQL collections, Aggregation pipelines, Mongoose'
  },

  // Tools & DevOps
  {
    name: 'Docker',
    category: 'devops',
    level: 84,
    icon: 'Container',
    color: '#38BDF8',
    desc: 'Containers, Multi-stage builds, Compose orchestration'
  },
  {
    name: 'Linux',
    category: 'devops',
    level: 80,
    icon: 'Terminal',
    color: '#FBBF24',
    desc: 'Ubuntu Server, Shell scripting, Systemd, Permissions'
  },
  {
    name: 'Git',
    category: 'devops',
    level: 88,
    icon: 'GitBranch',
    color: '#F87171',
    desc: 'Version control, Branching strategies, Merging'
  },
  {
    name: 'GitHub',
    category: 'devops',
    level: 86,
    icon: 'GitPullRequest',
    color: '#C084FC',
    desc: 'Repositories, Actions, Collaboration, Code Reviews'
  },
  {
    name: 'VS Code',
    category: 'devops',
    level: 92,
    icon: 'AppWindow',
    color: '#60A5FA',
    desc: 'Advanced extensions, Debugging, Custom shortcuts'
  }
];

