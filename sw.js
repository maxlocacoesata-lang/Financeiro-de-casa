
const CACHE_NAME = 'financepro-v6-cleanup';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map(k => caches.delete(k))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass-through: Não cacheia nada nesta versão para resolver o problema de carregamento
  return fetch(event.request);
});
