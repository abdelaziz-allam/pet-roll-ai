interface CsvColumn<T = any> {
  title: string;
  dataIndex: keyof T;
  render?: (value: any, record: T) => string;
}

export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  columns: CsvColumn<T>[],
  data: T[]
): void {
  const header = columns.map((col) => `"${col.title}"`).join(',');

  const rows = data.map((record) =>
    columns
      .map((col) => {
        const value = col.render
          ? col.render(record[col.dataIndex], record)
          : record[col.dataIndex];
        const str = value == null ? '' : String(value);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
