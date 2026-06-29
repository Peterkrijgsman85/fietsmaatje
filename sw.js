const CACHE_NAME = 'fietsmaatje-cache-v1';

// Alle paden zijn nu relatief gemaakt met ./ zodat ze keurig binnen de /fietsmaatje/ submap blijven
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',
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
  './pages/weer-locaties.js',
];

// Installatie: Cache de basisbestanden en activeer direct
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Bestanden cachen binnen submap');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // Forceer de nieuwe Service Worker om direct actief te worden
        return self.skipWaiting();
      })
  );
});

// Fetch: Serveer vanuit cache, val terug op netwerk
self.addEventListener('fetch', (event) => {
  // Sla niet-GET verzoeken (zoals POST of externe API-calls naar Open-Meteo) over voor de cache
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Als het bestand in de cache staat, serveren we het direct (snelheid!)
      if (cachedResponse) {
        return cachedResponse;
      }
      // Anders halen we het live van het netwerk
      return fetch(event.request);
    })
  );
});

// Activatie: Ruim oude caches op en claim direct controle over de pagina's
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('SW: Oude cache opruimen:', key);
            return caches.delete(key);
          })
      );
    }).then(() => {
      // Zorgt ervoor dat de SW direct de controle neemt over de geopende pagina
      return self.clients.claim();
    })
  );
});