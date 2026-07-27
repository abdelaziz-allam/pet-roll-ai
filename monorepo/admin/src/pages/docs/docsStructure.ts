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
      { key: 'roles-permissions', title: 'Roles & Permissions', description: 'User roles, access control, and permission matrix' },
      { key: 'quickstart-super-admin', title: 'Quick Start: Super Admin', description: 'Your first day as a Super Admin' },
      { key: 'quickstart-admin', title: 'Quick Start: Admin', description: 'Your first day as an Admin' },
      { key: 'quickstart-moderator', title: 'Quick Start: Moderator', description: 'Your first day as a Moderator' },
      { key: 'quickstart-viewer', title: 'Quick Start: Viewer', description: 'Your first day as a Viewer' },
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
  {
    key: 'reference',
    label: 'Reference',
    articles: [
      { key: 'glossary', title: 'Glossary', description: 'Platform terminology and definitions' },
      { key: 'troubleshooting', title: 'Troubleshooting', description: 'Common issues and solutions' },
      { key: 'changelog', title: "What's New", description: 'Recent updates and changes' },
    ],
  },
];
