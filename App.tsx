
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  LayoutDashboard, 
  History, 
  PieChart as PieChartIcon, 
  Settings, 
  Trash2,
  Calendar,
  Filter
} from 'lucide-react';
import SummaryCard from './components/SummaryCard.tsx';
import TransactionForm from './components/TransactionForm.tsx';
import FinancialChart from './components/FinancialChart.tsx';
import InsightSection from './components/InsightSection.tsx';
import { Transaction, FinancialSummary } from './types.ts';
import { getCategoryIcon, CATEGORIES } from './constants.tsx';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('financepro_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'stats'>('dashboard');

  useEffect(() => {
    localStorage.setItem('financepro_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const summary = useMemo<FinancialSummary>(() => {
    const income = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalBalance: income - expense,
      monthlyIncome: income,
      monthlyExpense: expense
    };
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  return (
    <div className="min-h-screen pb-32 md:pb-8 max-w-5xl mx-auto px-4 pt-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">FinancePro</h1>
          <p className="text-gray-500 text-sm font-medium">Seu dinheiro, sob controle.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
             <img src="https://picsum.photos/seed/user/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {activeTab === 'dashboard' && (
        <>
          <SummaryCard 
            balance={summary.totalBalance}
            income={summary.monthlyIncome}
            expense={summary.monthlyExpense}
          />
          
          <InsightSection transactions={transactions} />

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Transações Recentes</h3>
            <button 
              onClick={() => setActiveTab('history')}
              className="text-sm font-bold text-blue-500 hover:text-blue-600"
            >
              Ver tudo
            </button>
          </div>

          <div className="space-y-3">
            {sortedTransactions.slice(0, 5).map(t => {
              const category = CATEGORIES.find(c => c.name === t.category);
              return (
                <div key={t.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: category?.color || '#94a3b8' }}
                    >
                      {getCategoryIcon(category?.icon || 'more-horizontal', 'w-6 h-6')}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{t.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Calendar className="w-3 h-3" />
                        {new Date(t.date).toLocaleDateString('pt-BR')}
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">{t.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${t.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                      {t.type === 'INCOME' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              );
            })}
            {transactions.length === 0 && (
              <div className="text-center py-12 text-gray-400 bg-white/50 rounded-3xl border-2 border-dashed border-gray-100">
                <p>Nenhuma transação encontrada.</p>
                <p className="text-sm">Clique em + para adicionar sua primeira movimentação.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <div className="animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Histórico Completo</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="space-y-3 pb-10">
            {sortedTransactions.map(t => {
              const category = CATEGORIES.find(c => c.name === t.category);
              return (
                <div key={t.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: category?.color || '#94a3b8' }}
                    >
                      {getCategoryIcon(category?.icon || 'more-horizontal', 'w-5 h-5')}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{t.description}</p>
                      <p className="text-xs text-gray-400 font-medium">{new Date(t.date).toLocaleDateString('pt-BR')} • {t.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-bold ${t.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                      {t.type === 'INCOME' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <button 
                      onClick={() => deleteTransaction(t.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="animate-in fade-in duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Relatórios e Estatísticas</h3>
          <FinancialChart transactions={transactions} />
          
          <div className="mt-8 glass-card p-6 rounded-3xl shadow-sm mb-10">
            <h4 className="font-bold text-gray-800 mb-4">Maiores Despesas</h4>
            <div className="space-y-4">
              {[...transactions]
                .filter(t => t.type === 'EXPENSE')
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 3)
                .map((t, idx) => (
                  <div key={t.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">{idx + 1}</span>
                      <span className="font-medium text-gray-700">{t.description}</span>
                    </div>
                    <span className="font-bold text-red-500">R$ {t.amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* FAB - Floating Action Button */}
      <button 
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-28 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-300 flex items-center justify-center hover:bg-indigo-700 active:scale-90 transition-all z-40"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-8 pt-4 pb-8 flex justify-between items-center z-40 safe-area-bottom">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold">Histórico</span>
        </button>
        <div className="w-12 h-12 invisible"></div> {/* Spacer for FAB */}
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'stats' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <PieChartIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">Relatórios</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold">Ajustes</span>
        </button>
      </nav>

      {isFormOpen && (
        <TransactionForm 
          onAdd={addTransaction} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
