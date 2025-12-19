
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface SummaryCardProps {
  balance: number;
  income: number;
  expense: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ balance, income, expense }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="glass-card p-6 rounded-3xl shadow-sm border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-sm font-medium">Saldo Total</span>
          <Wallet className="text-blue-500 w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
      </div>

      <div className="glass-card p-6 rounded-3xl shadow-sm border-l-4 border-l-green-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-sm font-medium">Receitas</span>
          <ArrowUpCircle className="text-green-500 w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
      </div>

      <div className="glass-card p-6 rounded-3xl shadow-sm border-l-4 border-l-red-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-sm font-medium">Despesas</span>
          <ArrowDownCircle className="text-red-500 w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          R$ {expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
      </div>
    </div>
  );
};

export default SummaryCard;
