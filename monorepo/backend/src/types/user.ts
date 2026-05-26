export interface User {
  id: string;
  email: string;
  phone?: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'breeder' | 'super_admin' | 'admin' | 'moderator' | 'support' | 'viewer';
  status: 'active' | 'banned' | 'deleted';
  timezone: string;
  settings: UserSettings;
  fcmTokens: string[];
  isVerifiedBreeder: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface UserSettings {
  reminderTimeUTC: number;
  pushEnabled: boolean;
  emailNotifications: boolean;
  language: string;
}
