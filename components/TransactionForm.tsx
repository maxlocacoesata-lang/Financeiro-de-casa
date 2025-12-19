
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { CATEGORIES } from '../constants.tsx';
import { Transaction, TransactionType } from '../types.ts';

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd, onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [category, setCategory] = useState(CATEGORIES.find(c => c.type === 'EXPENSE')?.name || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    onAdd(newTransaction);
    onClose();
  };

  const filteredCategories = CATEGORIES.filter(c => c.type === type);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Nova Transação</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setType('EXPENSE');
                setCategory(CATEGORIES.find(c => c.type === 'EXPENSE')?.name || '');
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === 'EXPENSE' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-500'}`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => {
                setType('INCOME');
                setCategory(CATEGORIES.find(c => c.type === 'INCOME')?.name || '');
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === 'INCOME' ? 'bg-white text-green-500 shadow-sm' : 'text-gray-500'}`}
            >
              Receita
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descrição</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Aluguel, Supermercado..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Valor</label>
              <input
                type="number"
                required
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Data</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-95 ${type === 'EXPENSE' ? 'bg-red-500' : 'bg-green-500'}`}
          >
            Adicionar {type === 'EXPENSE' ? 'Despesa' : 'Receita'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
