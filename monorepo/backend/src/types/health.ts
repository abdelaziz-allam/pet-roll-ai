export interface HealthRecord {
  id: string;
  petId: string;
  ownerId: string;
  type: 'vet_visit' | 'surgery' | 'diagnosis' | 'medication' | 'injury' | 'test_result' | 'other';
  title: string;
  description?: string;
  date: string;
  vetName?: string;
  vetClinic?: string;
  attachments: string[];
  cost?: number;
  currency?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Vaccination {
  id: string;
  petId: string;
  ownerId: string;
  vaccineId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  batchNumber?: string;
  serialNumber?: string;
  vetName?: string;
  vetClinic?: string;
  sideEffects?: string;
  notes?: string;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface Pregnancy {
  id: string;
  petId: string;
  ownerId: string;
  breedingDate: string;
  expectedDueDate: string;
  actualDeliveryDate?: string;
  status: 'active' | 'completed' | 'lost';
  numberOfOffspring?: number;
  milestones: PregnancyMilestone[];
  weightLog: WeightEntry[];
  notes?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface PregnancyMilestone {
  id: string;
  weekStart: number;
  weekEnd: number;
  title: string;
  description: string;
  expectedDate: string;
  completedAt?: string;
  status: 'upcoming' | 'current' | 'completed' | 'missed';
}

export interface WeightEntry {
  date: string;
  weight: number;
  unit: string;
  notes?: string;
}

export interface Schedule {
  id: string;
  petId: string;
  ownerId: string;
  type: 'feeding' | 'medication' | 'exercise' | 'grooming' | 'other';
  title: string;
  description?: string;
  times: string[];
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[];
  startDate: string;
  endDate?: string;
  active: boolean;
  reminderEnabled: boolean;
  nextTrigger?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
