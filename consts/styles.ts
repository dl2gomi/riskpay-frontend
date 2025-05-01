import { Transaction } from '@/types';

export const txStatusStyles: Record<Transaction['status'], string> = {
  Succeeded: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Failed: 'bg-blue-100 text-blue-700',
  Chargeback: 'bg-blue-100 text-blue-700',
  Refunded: 'bg-gray-200 text-gray-700',
};
