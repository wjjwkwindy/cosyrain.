import dayjs from 'dayjs';

export function formatDate(d: string) {
  const date = dayjs(d);
  return date.format('MMM D, YYYY');
}
