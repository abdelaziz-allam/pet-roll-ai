import { describe, it, expect, vi } from 'vitest';
import { generateReportSchema } from '../src/modules/reports/reports.schema';

vi.mock('../src/config/env', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 3001,
    GCP_PROJECT_ID: 'petroll-mvp',
    FIREBASE_PROJECT_ID: 'petroll-mvp',
    JWT_SECRET: 'test-secret-minimum-16-chars',
    JWT_EXPIRY: '1h',
    REFRESH_TOKEN_EXPIRY: '7d',
    CORS_ORIGINS: 'http://localhost:5173',
    RATE_LIMIT_MAX: 100,
    RATE_LIMIT_WINDOW: 60000,
    GCS_BUCKET: 'petroll-mvp.appspot.com',
  },
}));

describe('Reports Module', () => {
  describe('generateReportSchema', () => {
    it('should validate health_summary report', () => {
      const input = { petId: 'pet-123', type: 'health_summary' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should validate vaccination_card report', () => {
      const input = { petId: 'pet-123', type: 'vaccination_card' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should validate full_report type', () => {
      const input = { petId: 'pet-123', type: 'full_report' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid report type', () => {
      const input = { petId: 'pet-123', type: 'pdf' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should require petId', () => {
      const input = { type: 'health_summary' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty petId', () => {
      const input = { petId: '', type: 'health_summary' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept optional dateRange', () => {
      const input = {
        petId: 'pet-123',
        type: 'full_report',
        dateRange: {
          from: '2024-01-01T00:00:00Z',
          to: '2024-06-01T00:00:00Z',
        },
      };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid dateRange format', () => {
      const input = {
        petId: 'pet-123',
        type: 'full_report',
        dateRange: {
          from: '2024-01-01',
          to: '2024-06-01',
        },
      };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should work without dateRange', () => {
      const input = { petId: 'pet-123', type: 'health_summary' };
      const result = generateReportSchema.safeParse(input);
      expect(result.success).toBe(true);
      expect(result.data!.dateRange).toBeUndefined();
    });
  });
});
