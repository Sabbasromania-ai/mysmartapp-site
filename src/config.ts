// ============================================
// ΑΛΛΑΞΕ ΜΟΝΟ ΑΥΤΟ ΤΟ ΑΡΧΕΙΟ
// ============================================

export const config = {
  name: 'Savvas',
  brand: 'SmartApps',
  tagline: 'Smart apps built for real people.',
  bio: [
    "I'm Savvas — a solo indie developer based in Greece. I build mobile apps that solve everyday problems with smart, clean design and AI-powered features.",
    "Every app I ship is designed, coded and deployed by me — from the first wireframe to the App Store listing.",
    "My focus right now is health & lifestyle apps, but I'm always exploring new ideas.",
  ],
  contact: {
    email: 'sabbasromania@icloud.com',
    available: true,
  },
  stats: [
    { num: '4+', label: 'Apps shipped', sub: 'iOS & Android' },
    { num: '2k+', label: 'Total downloads', sub: 'Across platforms' },
    { num: 'AI⚡', label: 'Powered features', sub: 'GPT-4o, Vision, Claude' },
    { num: '100%', label: 'Solo built', sub: 'Design to deployment' },
  ],
  apps: [
    {
      id: 1,
      icon: '💉',
      name: 'GLP-1 Tracker',
      status: 'live' as const,
      category: 'Health',
      desc: 'Complete health companion for Mounjaro, Ozempic & Wegovy users. AI Coach with memory, injection site rotation, drug level charts, nutrition logging with photo recognition.',
      tags: ['Health & Fitness', 'AI Coach', 'React + Capacitor', 'Supabase'],
      appStore: '',        // ← βαλε link οταν ειναι live
      playStore: '',       // ← βαλε link οταν ειναι live
    },
    {
      id: 2,
      icon: '⚡',
      name: 'App Name',
      status: 'live' as const,
      category: 'Productivity',
      desc: 'Short description of what this app does and who it helps.',
      tags: ['Category', 'Platform'],
      appStore: '',
      playStore: '',
    },
    {
      id: 3,
      icon: '🚀',
      name: 'Next Project',
      status: 'dev' as const,
      category: 'Coming Soon',
      desc: 'Something new is in development. Stay tuned.',
      tags: ['In Development', '2025'],
      appStore: '',
      playStore: '',
    },
  ],
  tech: {
    Frontend: ['React', 'TypeScript', 'Vite', 'Capacitor'],
    'Backend & Data': ['Supabase', 'Node.js', 'PostgreSQL'],
    'AI & Integrations': ['GPT-4o', 'Claude API', 'Google Vision', 'RevenueCat', 'FCM'],
    Deploy: ['Vercel', 'Codemagic', 'GitHub Actions'],
  },
}
