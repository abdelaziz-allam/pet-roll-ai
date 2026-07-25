import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock PDFKit before importing the module
const mockOn = vi.fn();
const mockEnd = vi.fn();
const mockRect = vi.fn().mockReturnThis();
const mockFill = vi.fn().mockReturnThis();
const mockFontSize = vi.fn().mockReturnThis();
const mockFillColor = vi.fn().mockReturnThis();
const mockText = vi.fn().mockReturnThis();
const mockMoveDown = vi.fn().mockReturnThis();
const mockMoveTo = vi.fn().mockReturnThis();
const mockLineTo = vi.fn().mockReturnThis();
const mockStrokeColor = vi.fn().mockReturnThis();
const mockLineWidth = vi.fn().mockReturnThis();
const mockStroke = vi.fn().mockReturnThis();
const mockFont = vi.fn().mockReturnThis();
const mockAddPage = vi.fn().mockReturnThis();

vi.mock('pdfkit', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      const instance = {
        on: mockOn,
        end: mockEnd,
        rect: mockRect,
        fill: mockFill,
        fontSize: mockFontSize,
        fillColor: mockFillColor,
        text: mockText,
        moveDown: mockMoveDown,
        moveTo: mockMoveTo,
        lineTo: mockLineTo,
        strokeColor: mockStrokeColor,
        lineWidth: mockLineWidth,
        stroke: mockStroke,
        font: mockFont,
        addPage: mockAddPage,
        page: { width: 595.28, height: 841.89 },
        y: 100,
      };
      return instance;
    }),
  };
});

vi.mock('../../src/config/env', () => ({
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

import { generateHealthReport } from '../../src/utils/pdf-generator';

describe('pdf-generator', () => {
  const basePet = {
    id: 'pet-1',
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    dateOfBirth: '2020-03-15',
    weight: 30,
    weightUnit: 'kg',
  };

  const healthRecords = [
    { id: 'hr-1', date: '2024-01-10', type: 'checkup', title: 'Annual Checkup', description: 'All good' },
    { id: 'hr-2', date: '2024-03-05', type: 'surgery', title: 'Dental Cleaning', description: 'Minor tartar removed' },
  ];

  const vaccinations = [
    { id: 'v-1', vaccineName: 'Rabies', dateAdministered: '2024-01-10', nextDueDate: '2025-01-10' },
    { id: 'v-2', vaccineName: 'Distemper', dateAdministered: '2024-02-01', nextDueDate: '2025-02-01' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Configure mockOn to simulate the PDF stream
    mockOn.mockImplementation((event: string, callback: Function) => {
      if (event === 'data') {
        // simulate calling data callback with a chunk
        setTimeout(() => callback(Buffer.from('pdf-data')), 0);
      }
      if (event === 'end') {
        // simulate end event after data
        setTimeout(() => callback(), 10);
      }
      return { on: mockOn, end: mockEnd, rect: mockRect, fill: mockFill, fontSize: mockFontSize, fillColor: mockFillColor, text: mockText, moveDown: mockMoveDown, moveTo: mockMoveTo, lineTo: mockLineTo, strokeColor: mockStrokeColor, lineWidth: mockLineWidth, stroke: mockStroke, font: mockFont, addPage: mockAddPage, page: { width: 595.28, height: 841.89 }, y: 100 };
    });
  });

  it('should return a Buffer', async () => {
    const result = await generateHealthReport(basePet, healthRecords, vaccinations);
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it('should call doc.end()', async () => {
    await generateHealthReport(basePet, healthRecords, vaccinations);
    expect(mockEnd).toHaveBeenCalled();
  });

  it('should draw header with pet name', async () => {
    await generateHealthReport(basePet, [], []);
    expect(mockText).toHaveBeenCalledWith('PET Roll Health Report', expect.any(Number), expect.any(Number), expect.any(Object));
    expect(mockText).toHaveBeenCalledWith(expect.stringContaining('Buddy'), expect.any(Number), expect.any(Number), expect.any(Object));
  });

  it('should draw pet info section', async () => {
    await generateHealthReport(basePet, [], []);
    expect(mockText).toHaveBeenCalledWith('Pet Information', expect.any(Number), expect.any(Number));
  });

  it('should draw vaccination table when vaccinations exist', async () => {
    await generateHealthReport(basePet, [], vaccinations);
    expect(mockText).toHaveBeenCalledWith('Vaccination Record', expect.any(Number));
  });

  it('should not draw vaccination table when empty', async () => {
    await generateHealthReport(basePet, [], []);
    const calls = mockText.mock.calls.map((c: any[]) => c[0]);
    expect(calls).not.toContain('Vaccination Record');
  });

  it('should draw health timeline when records exist', async () => {
    await generateHealthReport(basePet, healthRecords, []);
    expect(mockText).toHaveBeenCalledWith('Health Timeline', expect.any(Number));
  });

  it('should not draw health timeline when empty', async () => {
    await generateHealthReport(basePet, [], []);
    const calls = mockText.mock.calls.map((c: any[]) => c[0]);
    expect(calls).not.toContain('Health Timeline');
  });

  it('should handle pet with missing optional fields', async () => {
    const minimalPet = { id: 'pet-2', name: 'Rex' };
    await generateHealthReport(minimalPet, [], []);
    expect(mockEnd).toHaveBeenCalled();
  });

  it('should handle vaccinations with missing fields', async () => {
    const incompleteVacc = [{ id: 'v-1' }];
    await generateHealthReport(basePet, [], incompleteVacc);
    expect(mockEnd).toHaveBeenCalled();
  });

  it('should handle health records with missing fields', async () => {
    const incompleteRecords = [{ id: 'hr-1' }];
    await generateHealthReport(basePet, incompleteRecords, []);
    expect(mockEnd).toHaveBeenCalled();
  });

  it('should reject on error event', async () => {
    mockOn.mockImplementation((event: string, callback: Function) => {
      if (event === 'error') {
        setTimeout(() => callback(new Error('PDF generation failed')), 0);
      }
      return { on: mockOn, end: mockEnd, rect: mockRect, fill: mockFill, fontSize: mockFontSize, fillColor: mockFillColor, text: mockText, moveDown: mockMoveDown, moveTo: mockMoveTo, lineTo: mockLineTo, strokeColor: mockStrokeColor, lineWidth: mockLineWidth, stroke: mockStroke, font: mockFont, addPage: mockAddPage, page: { width: 595.28, height: 841.89 }, y: 100 };
    });

    await expect(generateHealthReport(basePet, [], [])).rejects.toThrow('PDF generation failed');
  });
});
