export interface StatsData {
  totalUsers: number;
  totalPets: number;
  activeListings: number;
  pendingVerifications: number;
  notificationsSentToday: number;
  userGrowthPercent: number;
  petGrowthPercent: number;
}

export interface GrowthDataPoint {
  date: string;
  users: number;
  pets: number;
}
