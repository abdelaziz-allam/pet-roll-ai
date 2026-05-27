import { z } from 'zod';

const doseSchema = z.object({
  doseNumber: z.number().int().positive(),
  date: z.string(),
  status: z.enum(['scheduled', 'completed', 'missed']).default('scheduled'),
  notes: z.string().optional(),
});

export const createVaccinationSchema = z.object({
  petId: z.string().min(1),
  vaccineId: z.string().optional(),
  vaccineName: z.string().min(1),
  dateAdministered: z.string(),
  nextDueDate: z.string().optional().nullable(),
  batchNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  vetName: z.string().optional(),
  vetClinic: z.string().optional(),
  notes: z.string().optional(),
  doses: z.array(doseSchema).optional(),
});

export const updateVaccinationSchema = z.object({
  vaccineId: z.string().min(1).optional(),
  vaccineName: z.string().min(1).optional(),
  dateAdministered: z.string().optional(),
  nextDueDate: z.string().optional().nullable(),
  batchNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  vetName: z.string().optional(),
  vetClinic: z.string().optional(),
  notes: z.string().optional(),
  doses: z.array(doseSchema).optional(),
});

export type Dose = z.infer<typeof doseSchema>;
export type CreateVaccinationInput = z.infer<typeof createVaccinationSchema>;
export type UpdateVaccinationInput = z.infer<typeof updateVaccinationSchema>;
