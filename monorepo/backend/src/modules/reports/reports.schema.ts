import { z } from 'zod';

export const generateReportSchema = z.object({
  petId: z.string().min(1),
  type: z.enum(['health_summary', 'vaccination_card', 'full_report']),
  dateRange: z.object({
    from: z.string().datetime({ message: 'Must be a valid ISO date' }),
    to: z.string().datetime({ message: 'Must be a valid ISO date' }),
  }).optional(),
});

export type GenerateReportInput = z.infer<typeof generateReportSchema>;
