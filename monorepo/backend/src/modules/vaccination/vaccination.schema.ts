import { z } from 'zod';

export const createVaccinationSchema = z.object({
  petId: z.string().min(1),
  vaccineId: z.string().min(1),
  vaccineName: z.string().min(1),
  dateAdministered: z.string().datetime(),
  batchNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  vetName: z.string().optional(),
  vetClinic: z.string().optional(),
  notes: z.string().optional(),
});

export const updateVaccinationSchema = z.object({
  vaccineId: z.string().min(1).optional(),
  vaccineName: z.string().min(1).optional(),
  dateAdministered: z.string().datetime().optional(),
  batchNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  vetName: z.string().optional(),
  vetClinic: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateVaccinationInput = z.infer<typeof createVaccinationSchema>;
export type UpdateVaccinationInput = z.infer<typeof updateVaccinationSchema>;
