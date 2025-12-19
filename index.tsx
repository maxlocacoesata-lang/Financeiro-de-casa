
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  console.log("Iniciando montagem do FinancePro...");
  
  // Força a remoção do loader assim que o código começa a rodar
  if (typeof (window as any).hideLoader === 'function') {
    (window as any).hideLoader();
  }

  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("FinancePro montado.");
  } catch (err) {
    console.error("Erro crítico no React:", err);
    const display = document.getElementById('error-overlay');
    if (display) {
      display.style.display = 'block';
      const log = document.getElementById('error-log');
      if (log) log.textContent += `\n[Mount Error]: ${err}`;
    }
  }
};

// Tenta montar imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mountApp();
} else {
  window.addEventListener('DOMContentLoaded', mountApp);
}
