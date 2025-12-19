
import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService.ts';
import { Transaction } from '../types.ts';

interface InsightSectionProps {
  transactions: Transaction[];
}

const InsightSection: React.FC<InsightSectionProps> = ({ transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetInsight = async () => {
    setLoading(true);
    const advice = await getFinancialAdvice(transactions);
    setInsight(advice);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl text-white shadow-xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -m-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -m-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <h3 className="font-bold text-lg">Insights Financeiros AI</h3>
          </div>
          <button 
            onClick={handleGetInsight} 
            disabled={loading}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {!insight && !loading && (
          <p className="text-sm text-indigo-100">
            Clique no botão acima para receber dicas personalizadas baseadas no seu comportamento financeiro.
          </p>
        )}

        {loading && (
          <div className="space-y-2">
            <div className="h-3 w-3/4 bg-white/20 rounded animate-pulse"></div>
            <div className="h-3 w-1/2 bg-white/20 rounded animate-pulse"></div>
            <div className="h-3 w-2/3 bg-white/20 rounded animate-pulse"></div>
          </div>
        )}

        {insight && !loading && (
          <div className="text-sm leading-relaxed whitespace-pre-line text-indigo-50">
            {insight}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightSection;
