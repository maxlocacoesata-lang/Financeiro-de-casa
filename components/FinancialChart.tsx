
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '../types.ts';
import { CATEGORIES } from '../constants.tsx';

interface FinancialChartProps {
  transactions: Transaction[];
}

const FinancialChart: React.FC<FinancialChartProps> = ({ transactions }) => {
  const expenseData = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc: any[], current) => {
      const existing = acc.find(item => item.name === current.category);
      if (existing) {
        existing.value += current.amount;
      } else {
        const cat = CATEGORIES.find(c => c.name === current.category);
        acc.push({ name: current.category, value: current.amount, color: cat?.color || '#94a3b8' });
      }
      return acc;
    }, []);

  if (expenseData.length === 0) {
    return (
      <div className="glass-card p-6 rounded-3xl shadow-sm min-h-[300px] flex items-center justify-center text-gray-400 italic">
        Sem dados de despesas para exibir o gráfico.
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-3xl shadow-sm min-h-[350px]">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Despesas por Categoria</h3>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialChart;
