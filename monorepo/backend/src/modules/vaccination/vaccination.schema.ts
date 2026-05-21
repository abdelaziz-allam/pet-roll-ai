import { z } from 'zod';

export const logVaccinationSchema = z.object({
  vaccineName: z.string().min(1).max(100).optional(),
  name: z.string().min(1).max(100).optional(),
  dateAdministered: z.string().optional(),
  administeredDate: z.string().optional(),
  nextDueDate: z.string().optional(),
  batchNumber: z.string().optional(),
  veterinarian: z.string().optional(),
  vetName: z.string().optional(),
  clinic: z.string().optional(),
  manufacturer: z.string().optional(),
  notes: z.string().max(500).optional(),
  sideEffects: z.string().optional(),
  totalDoses: z.number().int().positive().optional(),
  currentDose: z.number().int().positive().optional(),
  doseDates: z.array(z.string().nullable()).optional(),
}).refine((data) => data.vaccineName || data.name, {
  message: 'Either vaccineName or name is required',
}).refine((data) => data.dateAdministered || data.administeredDate, {
  message: 'Either dateAdministered or administeredDate is required',
});

export const updateVaccinationSchema = z.object({
  vaccineName: z.string().min(1).max(100).optional(),
  name: z.string().min(1).max(100).optional(),
  dateAdministered: z.string().optional(),
  administeredDate: z.string().optional(),
  nextDueDate: z.string().optional(),
  batchNumber: z.string().optional(),
  veterinarian: z.string().optional(),
  vetName: z.string().optional(),
  clinic: z.string().optional(),
  manufacturer: z.string().optional(),
  notes: z.string().max(500).optional(),
  sideEffects: z.string().optional(),
  totalDoses: z.number().int().positive().optional(),
  currentDose: z.number().int().positive().optional(),
  doseDates: z.array(z.string().nullable()).optional(),
});

export type LogVaccinationInput = z.infer<typeof logVaccinationSchema>;
export type UpdateVaccinationInput = z.infer<typeof updateVaccinationSchema>;
