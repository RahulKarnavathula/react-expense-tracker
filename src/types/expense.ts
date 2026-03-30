export type Category =
  | 'Food'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Utilities'
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  notes?: string;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface ExpenseFilters {
  category: Category | 'All';
  dateFrom: string;
  dateTo: string;
  search: string;
}
