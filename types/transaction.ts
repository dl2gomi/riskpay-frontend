export type Transaction = {
  date: Date;
  id: string;
  card: 'mastercard' | 'visa';
  store: string;
  status: 'Succeeded' | 'Pending' | 'Failed' | 'Chargeback';
  amount: number;
};

export type TransactionData = {
  pagination: {
    totalLength: number;
    itemsPerPage: number;
    pageCount: number;
    currentPage: number;
  };
  transactions: Transaction[];
};
