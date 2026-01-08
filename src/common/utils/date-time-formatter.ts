import dayjs from 'dayjs';

export enum DateTimeFormat {
  Date = 'DD/MM/YYYY',
  DateTime = 'DD/MM/YYYY HH:mm',
  Time = 'HH:mm',
}

export const formatDateTime = (
  datetime?: string | null,
  format: DateTimeFormat = DateTimeFormat.DateTime,
): string | null => {
  if (!datetime) {
    return null;
  }

  return dayjs(datetime).format(format);
};