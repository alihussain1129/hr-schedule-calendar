export const HOUR_HEIGHT = 72;
export const START_HOUR = 8;
export const END_HOUR = 18;

export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function formatHeaderDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDayLabel(date: Date): { weekday: string; date: string } {
  return {
    weekday: date.toLocaleDateString('en-GB', { weekday: 'long' }),
    date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
  };
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatTimeRange(start: Date, end: Date): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

export function getWeekDays(anchor: Date): Date[] {
  const monday = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export function getMonthDays(anchor: Date): Date[] {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export function getYearsRange(anchor: Date): number[] {
  const center = anchor.getFullYear();
  return Array.from({ length: 12 }, (_, i) => center - 5 + i);
}

export function eventTop(start: Date): number {
  const hours = start.getHours() + start.getMinutes() / 60;
  return (hours - START_HOUR) * HOUR_HEIGHT;
}

export function eventHeight(start: Date, end: Date): number {
  const durationHours =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return Math.max(durationHours * HOUR_HEIGHT - 8, 48);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
