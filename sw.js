
const CACHE_NAME = 'financepro-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignora cache para o arquivo principal e módulos para evitar o loop de loading
  if (event.request.mode === 'navigate' || event.request.url.includes('index.tsx')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
