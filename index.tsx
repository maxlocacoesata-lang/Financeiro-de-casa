
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Pequeno delay para garantir que o primeiro frame do React foi desenhado
    setTimeout(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }
    }, 100);
    
    console.log("FinancePro montado com sucesso.");
  } catch (err) {
    console.error("Erro ao montar React:", err);
    const display = document.getElementById('error-display');
    if (display) display.style.display = 'block';
  }
};

// Executa assim que o script carregar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mountApp();
} else {
  window.addEventListener('DOMContentLoaded', mountApp);
}
