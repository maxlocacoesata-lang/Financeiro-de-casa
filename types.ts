
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}
