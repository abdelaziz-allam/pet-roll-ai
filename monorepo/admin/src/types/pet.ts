export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  breedId: string;
  gender: string;
  dateOfBirth: string;
  weight: number;
  weightUnit: string;
  isNeutered: boolean;
  isAvailableForMating: boolean;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}
