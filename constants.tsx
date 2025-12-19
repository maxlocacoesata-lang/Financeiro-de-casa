
import React from 'react';
import { 
  Home, 
  Utensils, 
  Car, 
  ShoppingBag, 
  HeartPulse, 
  GraduationCap, 
  Gamepad2, 
  Wallet,
  Briefcase,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import { Category } from './types.ts';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Aluguel/Casa', icon: 'home', color: '#3b82f6', type: 'EXPENSE' },
  { id: '2', name: 'Alimentação', icon: 'utensils', color: '#ef4444', type: 'EXPENSE' },
  { id: '3', name: 'Transporte', icon: 'car', color: '#f59e0b', type: 'EXPENSE' },
  { id: '4', name: 'Compras', icon: 'shopping-bag', color: '#ec4899', type: 'EXPENSE' },
  { id: '5', name: 'Saúde', icon: 'heart-pulse', color: '#10b981', type: 'EXPENSE' },
  { id: '6', name: 'Educação', icon: 'graduation-cap', color: '#6366f1', type: 'EXPENSE' },
  { id: '7', name: 'Lazer', icon: 'gamepad2', color: '#8b5cf6', type: 'EXPENSE' },
  { id: '8', name: 'Salário', icon: 'wallet', color: '#22c55e', type: 'INCOME' },
  { id: '9', name: 'Freelance', icon: 'briefcase', color: '#0ea5e9', type: 'INCOME' },
  { id: '10', name: 'Investimentos', icon: 'trending-up', color: '#facc15', type: 'INCOME' },
  { id: '11', name: 'Outros', icon: 'more-horizontal', color: '#94a3b8', type: 'EXPENSE' },
];

export const getCategoryIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'home': return <Home className={className} />;
    case 'utensils': return <Utensils className={className} />;
    case 'car': return <Car className={className} />;
    case 'shopping-bag': return <ShoppingBag className={className} />;
    case 'heart-pulse': return <HeartPulse className={className} />;
    case 'graduation-cap': return <GraduationCap className={className} />;
    case 'gamepad2': return <Gamepad2 className={className} />;
    case 'wallet': return <Wallet className={className} />;
    case 'briefcase': return <Briefcase className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    default: return <MoreHorizontal className={className} />;
  }
};
