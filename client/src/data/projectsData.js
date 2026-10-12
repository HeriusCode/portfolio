export const projects = [
  {
    id: 'autix',
    title: 'AutiX',
    subtitle: 'Smart Vehicle Management System',
    description: 'An intelligent IoT-integrated vehicle fleet management platform providing real-time telemetry tracking, predictive maintenance scheduling, and fuel consumption analytics.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'IoT Telemetry', 'Tailwind CSS'],
    category: 'Full-stack',
    githubUrl: null, // Private university/client repository
    githubStatus: 'Private Repository',
    liveUrl: null,
    liveStatus: 'Internal Network Preview',
    featured: true,
    stats: {
      latency: '< 50ms',
      metrics: 'Real-time GPS & OBD-II'
    }
  },
  {
    id: 'todayly',
    title: 'Todayly',
    subtitle: 'Daily Lifestyle & Productivity Planner',
    description: 'A modern, distraction-free productivity and habit tracking web app designed for students and developers, featuring Pomodoro timer, milestone roadmaps, and offline sync.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    tags: ['ReactJS', 'Tailwind CSS', 'Framer Motion', 'Local Storage', 'PWA'],
    category: 'Frontend',
    githubUrl: 'https://github.com/alexnguyen-dev/todayly-planner',
    githubStatus: 'Public Code',
    liveUrl: null,
    liveStatus: 'Demo on Request',
    featured: true,
    stats: {
      uptime: '99.9%',
      features: 'Full Offline Support'
    }
  },
  {
    id: 'street-rush',
    title: 'Street Rush',
    subtitle: '3D Arcade Driving Game',
    description: 'An interactive web-based 3D racing simulator engineered with WebGL shaders, realistic vehicle physics, dynamic obstacles, audio synthesis, and high-score leaderboards.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    tags: ['Three.js', 'JavaScript', 'WebGL', 'Web Audio API', 'HTML5 Canvas'],
    category: 'Interactive',
    githubUrl: 'https://github.com/alexnguyen-dev/street-rush-3d',
    githubStatus: 'Open Source',
    liveUrl: null,
    liveStatus: 'WebGL Build',
    featured: false,
    stats: {
      fps: '60 FPS Smooth',
      engine: 'Custom Three.js'
    }
  },
  {
    id: 'network-monitor',
    title: 'Network Traffic Monitoring System',
    subtitle: 'Real-time Packet Analyzer & Security Dashboard',
    description: 'A network packet capturing and bandwidth analysis suite developed for network programming coursework, visualizing TCP/UDP packet distributions, anomalies, and active node throughput.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'Socket.IO', 'Linux C Sockets', 'Chart.js', 'Docker', 'SQLite'],
    category: 'Systems & Network',
    githubUrl: null,
    githubStatus: 'Coursework Archive',
    liveUrl: null,
    liveStatus: 'VMware Lab Deployment',
    featured: true,
    stats: {
      throughput: '10 Gbps Monitored',
      protocols: 'TCP / UDP / ICMP'
    }
  }
];

