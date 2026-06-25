const CACHE_NAME = 'mijn-web-app-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  './pages/weer.js',
  './pages/water.js',
  './pages/planner.js',
  './pages/menu.js',
  './pages/pressure.js',
  './pages/ridelog.js',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png',
];

// Installatie: Cache de basisbestanden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch: Serveer vanuit cache, of haal op van het netwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activatie: Ruim oude caches op
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});