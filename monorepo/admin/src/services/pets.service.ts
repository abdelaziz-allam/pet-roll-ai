import { api } from '@/config/api';
import type { Pet } from '@/types/pet';
import type { PaginatedResponse } from '@/types/common';

export interface PetListParams {
  page?: number;
  limit?: number;
  species?: string;
  breed?: string;
  search?: string;
}

export interface PetWithOwner extends Pet {
  owner?: {
    id: string;
    displayName: string;
    email: string;
  };
}

export const PetsService = {
  async getAllPets(params: PetListParams): Promise<PaginatedResponse<PetWithOwner>> {
    const { data } = await api.get<PaginatedResponse<PetWithOwner>>('/admin/pets', { params });
    return data;
  },

  async getPetDetail(petId: string): Promise<PetWithOwner> {
    const { data } = await api.get<PetWithOwner>(`/admin/pets/${petId}`);
    return data;
  },

  async getPetsByOwner(ownerId: string): Promise<Pet[]> {
    const { data } = await api.get<Pet[]>(`/admin/users/${ownerId}/pets`);
    return data;
  },

  async flagPet(petId: string, reason: string): Promise<void> {
    await api.post(`/admin/pets/${petId}/flag`, { reason });
  },

  async removePet(petId: string, reason: string): Promise<void> {
    await api.delete(`/admin/pets/${petId}`, { data: { reason } });
  },
};
