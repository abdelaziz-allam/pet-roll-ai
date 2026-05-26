export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function isOverdue(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

export function daysUntil(dateString: string): number {
  const target = new Date(dateString);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

export function getUserLocalHour(utcHour: number, timezoneOffset: number): number {
  return (utcHour + timezoneOffset + 24) % 24;
}
