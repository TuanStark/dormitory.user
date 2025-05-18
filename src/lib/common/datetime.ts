
import dayjs from 'dayjs';

export function formatDateTime(isoString: string): string {
  try {
    return dayjs(isoString).format('DD/MM/YYYY HH:mm');
  } catch (error) {
    console.error('Invalid date format:', error);
    return '';
  }
}