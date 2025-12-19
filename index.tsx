
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Polifill básico para process em ambiente de navegador puro
if (typeof window !== 'undefined' && !window.process) {
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Elemento raiz não encontrado");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
