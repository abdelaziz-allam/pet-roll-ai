import { z } from 'zod';

export const startPregnancySchema = z.object({
  matingDate: z.string().optional(),
  startDate: z.string().optional(),
  expectedDueDate: z.string().optional(),
  mateInfo: z.object({
    name: z.string().optional(),
    breed: z.string().optional(),
    ownerId: z.string().optional(),
  }).optional(),
  fatherInfo: z.object({
    name: z.string().min(1).max(100),
    breed: z.string().max(100).optional(),
    color: z.string().max(50).optional(),
    weight: z.number().positive().optional(),
    age: z.string().max(50).optional(),
    notes: z.string().max(500).optional(),
    ownerName: z.string().max(100).optional(),
    photos: z.array(z.string()).max(10).optional(),
  }).optional(),
  notes: z.string().max(500).optional(),
  status: z.enum(['active', 'completed', 'miscarriage', 'false_alarm']).optional(),
}).refine((data) => data.matingDate || data.startDate, {
  message: 'Either matingDate or startDate is required',
});

export const updatePregnancySchema = z.object({
  status: z.enum(['active', 'completed', 'miscarriage', 'false_alarm']).optional(),
  actualDeliveryDate: z.string().optional(),
  litterSize: z.number().int().positive().optional(),
  complications: z.string().optional(),
  notes: z.string().max(500).optional(),
  fatherInfo: z.object({
    name: z.string().min(1).max(100),
    breed: z.string().max(100).optional(),
    color: z.string().max(50).optional(),
    weight: z.number().positive().optional(),
    age: z.string().max(50).optional(),
    notes: z.string().max(500).optional(),
    ownerName: z.string().max(100).optional(),
    photos: z.array(z.string()).max(10).optional(),
  }).optional(),
});

export const addWeightSchema = z.object({
  weight: z.number().positive(),
});

export type StartPregnancyInput = z.infer<typeof startPregnancySchema>;
export type UpdatePregnancyInput = z.infer<typeof updatePregnancySchema>;
