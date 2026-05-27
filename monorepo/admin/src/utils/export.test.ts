import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportToCsv } from './export';

describe('export utilities', () => {
  beforeEach(() => {
    (global as any).URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
    (global as any).URL.revokeObjectURL = vi.fn();
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => document.createElement('a'));
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => document.createElement('a'));
  });

  describe('exportToCsv', () => {
    it('generates CSV with correct headers', () => {
      const columns = [
        { title: 'Name', dataIndex: 'name' as const },
        { title: 'Email', dataIndex: 'email' as const },
      ];
      const data = [
        { name: 'John', email: 'john@test.com' },
        { name: 'Jane', email: 'jane@test.com' },
      ];

      let blobContent = '';
      vi.spyOn(global, 'Blob').mockImplementation((parts: any) => {
        blobContent = parts[0];
        return { size: parts[0].length, type: 'text/csv' } as any;
      });

      exportToCsv('test.csv', columns, data);

      expect(blobContent).toContain('"Name","Email"');
      expect(blobContent).toContain('"John","john@test.com"');
      expect(blobContent).toContain('"Jane","jane@test.com"');
    });

    it('handles custom render functions', () => {
      const columns = [
        { title: 'Name', dataIndex: 'name' as const },
        {
          title: 'Status',
          dataIndex: 'active' as const,
          render: (value: boolean) => (value ? 'Active' : 'Inactive'),
        },
      ];
      const data = [{ name: 'John', active: true }];

      let blobContent = '';
      vi.spyOn(global, 'Blob').mockImplementation((parts: any) => {
        blobContent = parts[0];
        return { size: parts[0].length, type: 'text/csv' } as any;
      });

      exportToCsv('test', columns, data);

      expect(blobContent).toContain('"Active"');
    });

    it('escapes quotes in values', () => {
      const columns = [{ title: 'Name', dataIndex: 'name' as const }];
      const data = [{ name: 'John "The Dev" Doe' }];

      let blobContent = '';
      vi.spyOn(global, 'Blob').mockImplementation((parts: any) => {
        blobContent = parts[0];
        return { size: parts[0].length, type: 'text/csv' } as any;
      });

      exportToCsv('test.csv', columns, data);

      expect(blobContent).toContain('""The Dev""');
    });

    it('handles null values', () => {
      const columns = [{ title: 'Name', dataIndex: 'name' as const }];
      const data = [{ name: null }];

      let blobContent = '';
      vi.spyOn(global, 'Blob').mockImplementation((parts: any) => {
        blobContent = parts[0];
        return { size: parts[0].length, type: 'text/csv' } as any;
      });

      exportToCsv('test.csv', columns, data as any);

      expect(blobContent).toContain('""');
    });

    it('adds .csv extension if missing', () => {
      const mockClick = vi.fn();
      const mockLink = {
        setAttribute: vi.fn(),
        style: {},
        click: mockClick,
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      vi.spyOn(global, 'Blob').mockImplementation(() => ({ size: 0, type: 'text/csv' } as any));

      exportToCsv('export', [], []);

      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'export.csv');
    });

    it('keeps .csv extension if already present', () => {
      const mockClick = vi.fn();
      const mockLink = {
        setAttribute: vi.fn(),
        style: {},
        click: mockClick,
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      vi.spyOn(global, 'Blob').mockImplementation(() => ({ size: 0, type: 'text/csv' } as any));

      exportToCsv('export.csv', [], []);

      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'export.csv');
    });
  });
});
