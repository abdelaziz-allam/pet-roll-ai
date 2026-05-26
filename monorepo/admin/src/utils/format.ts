export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function truncateText(text: string, maxLength = 50): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatStatus(status: string): string {
  return capitalize(status.replace(/_/g, ' '));
}

export function formatRole(role: string): string {
  return capitalize(role);
}

export function getRoleBadgeColor(role: string): string {
  switch (role) {
    case 'super_admin': return 'red';
    case 'admin': return 'orange';
    case 'moderator': return 'blue';
    default: return 'default';
  }
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'active': return 'green';
    case 'banned': return 'red';
    case 'pending': return 'orange';
    case 'suspended': return 'volcano';
    default: return 'default';
  }
}
