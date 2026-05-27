import { z } from 'zod';

const doseSchema = z.object({
  doseNumber: z.number().int().positive(),
  date: z.string(),
  status: z.enum(['scheduled', 'completed', 'missed']).default('scheduled'),
  notes: z.string().optional().nullable(),
});

export const createVaccinationSchema = z.object({
  petId: z.string().min(1),
  vaccineId: z.string().optional().nullable(),
  vaccineName: z.string().min(1),
  dateAdministered: z.string(),
  nextDueDate: z.string().optional().nullable(),
  batchNumber: z.string().optional().nullable(),
  serialNumber: z.string().optional().nullable(),
  vetName: z.string().optional().nullable(),
  vetClinic: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  status: z.enum(['active', 'completed']).default('active'),
  doses: z.array(doseSchema).optional(),
});

export const updateVaccinationSchema = z.object({
  vaccineId: z.string().min(1).optional().nullable(),
  vaccineName: z.string().min(1).optional(),
  dateAdministered: z.string().optional(),
  nextDueDate: z.string().optional().nullable(),
  batchNumber: z.string().optional().nullable(),
  serialNumber: z.string().optional().nullable(),
  vetName: z.string().optional().nullable(),
  vetClinic: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  status: z.enum(['active', 'completed']).optional(),
  doses: z.array(doseSchema).optional(),
});

export type Dose = z.infer<typeof doseSchema>;
export type CreateVaccinationInput = z.infer<typeof createVaccinationSchema>;
export type UpdateVaccinationInput = z.infer<typeof updateVaccinationSchema>;
