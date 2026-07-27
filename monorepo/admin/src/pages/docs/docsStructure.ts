export interface DocEntry {
  key: string;
  title: string;
  description?: string;
}

export interface DocCategory {
  key: string;
  label: string;
  articles: DocEntry[];
}

export const docsStructure: DocCategory[] = [
  {
    key: 'gettingStarted',
    label: 'Getting Started',
    articles: [
      { key: 'getting-started', title: 'Getting Started', description: 'Login, navigation, and first steps' },
    ],
  },
  {
    key: 'petManagement',
    label: 'Pet Management',
    articles: [
      { key: 'dashboard', title: 'Dashboard', description: 'Overview KPIs and analytics' },
      { key: 'pets', title: 'Pet Registry', description: 'Search, view, and manage pets' },
      { key: 'categories', title: 'Pet Categories', description: 'Manage species and types' },
    ],
  },
  {
    key: 'userManagement',
    label: 'User Management',
    articles: [
      { key: 'users', title: 'App Users', description: 'Manage mobile app users' },
      { key: 'admin-users', title: 'Admin Users', description: 'Manage admin accounts and permissions' },
    ],
  },
  {
    key: 'verification',
    label: 'Verification & Health',
    articles: [
      { key: 'verification', title: 'Breeder Verification', description: 'Review and approve breeder applications' },
      { key: 'health-certifications', title: 'Health Certifications', description: 'Manage pet health certificates' },
      { key: 'vaccination-analytics', title: 'Vaccination Analytics', description: 'Vaccination statistics and leaderboard' },
    ],
  },
  {
    key: 'marketplace',
    label: 'Marketplace',
    articles: [
      { key: 'mating', title: 'Mating Marketplace', description: 'Matches, requests, and breeder rankings' },
    ],
  },
  {
    key: 'content',
    label: 'Content & Communication',
    articles: [
      { key: 'blog', title: 'Blog CMS', description: 'Create and manage blog posts' },
      { key: 'feedback', title: 'Feedback Management', description: 'Handle user feedback and bug reports' },
      { key: 'notifications', title: 'Notifications', description: 'Send push notifications' },
    ],
  },
  {
    key: 'administration',
    label: 'Administration',
    articles: [
      { key: 'settings', title: 'Settings', description: 'App configuration and security' },
      { key: 'analytics', title: 'Analytics', description: 'User growth and engagement charts' },
    ],
  },
];
