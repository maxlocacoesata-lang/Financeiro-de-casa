
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Garante que o process.env exista para bibliotecas que o requeiram
if (typeof window !== 'undefined') {
  (window as any).process = { env: { API_KEY: '' } };
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Não foi possível encontrar o elemento #root");
}
