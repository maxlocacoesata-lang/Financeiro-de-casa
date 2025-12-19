
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("FinancePro: Iniciando carregamento...");

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("FinancePro: Renderizado com sucesso.");
    
    // Remove o loader
    if (typeof (window as any).hideLoader === 'function') {
      (window as any).hideLoader();
    }
  } catch (err) {
    console.error("FinancePro: Erro na renderização:", err);
  }
} else {
  console.error("FinancePro: Elemento #root não encontrado.");
}
