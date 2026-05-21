import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(relativeTimePlugin);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);

export function relativeTime(date: string | Date | number): string {
  return dayjs(date).fromNow();
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = dayjs(start);
  const e = dayjs(end);

  if (s.year() !== e.year()) {
    return `${s.format('MMM D, YYYY')} - ${e.format('MMM D, YYYY')}`;
  }

  if (s.month() !== e.month()) {
    return `${s.format('MMM D')} - ${e.format('MMM D, YYYY')}`;
  }

  return `${s.format('MMM D')} - ${e.format('D, YYYY')}`;
}

export function checkIsToday(date: string | Date | number): boolean {
  return dayjs(date).isToday();
}

export function isThisWeek(date: string | Date | number): boolean {
  const now = dayjs();
  const target = dayjs(date);
  const startOfWeek = now.startOf('week');
  const endOfWeek = now.endOf('week');
  return (
    target.isSameOrAfter(startOfWeek) && target.isBefore(endOfWeek.add(1, 'millisecond'))
  );
}

export function isThisMonth(date: string | Date | number): boolean {
  const now = dayjs();
  const target = dayjs(date);
  return target.month() === now.month() && target.year() === now.year();
}
