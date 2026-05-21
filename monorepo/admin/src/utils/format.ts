import dayjs from 'dayjs';

export function formatDate(date: string | Date | number, format = 'MMM D, YYYY'): string {
  return dayjs(date).format(format);
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatPercent(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export function getRoleBadgeColor(role: string): string {
  const map: Record<string, string> = {
    super_admin: 'gold',
    admin: 'purple',
    moderator: 'blue',
    support: 'green',
  };
  return map[role] || 'default';
}

export function getStatusBadgeColor(status: string): string {
  const map: Record<string, string> = {
    active: 'green',
    banned: 'red',
    deleted: 'grey',
  };
  return map[status] || 'default';
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return `${str.slice(0, maxLen)}...`;
}
