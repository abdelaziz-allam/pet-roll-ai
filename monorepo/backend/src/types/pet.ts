export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  breedId: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  weight?: number;
  weightUnit: 'kg' | 'lbs';
  color?: string;
  microchipId?: string;
  photoURL?: string;
  photos: string[];
  isNeutered: boolean;
  isAvailableForMating: boolean;
  notes?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Breed {
  id: string;
  name: string;
  species: string;
  group: string;
  avgWeightMale: { min: number; max: number; unit: string };
  avgWeightFemale: { min: number; max: number; unit: string };
  avgLifespan: { min: number; max: number; unit: string };
  gestationDays: number;
  commonVaccines: string[];
}
