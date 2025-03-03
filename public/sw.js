// Cache name
const channels = require('./channels.json');
const vtxTables = require('./vtx-tables.json');

const { version } = require('../package.json');
const CACHE_NAME = `fpv-freq-cache-${version}`;

// Files to cache
const urlsToCache = [
  '/',
  '/table',
  '/wiki/vtx',
  '/offline',
  '/channels.json',
  '/harmonicas.json',
  '/vtx-tables.json',
  '/images/logo.png',
  '/images/favicon.ico',
  '/images/favicon.svg',
  '/images/favicon-96x96.png',
  '/images/apple-touch-icon.png',
  '/images/web-app-manifest-192x192.png',
  '/images/web-app-manifest-512x512.png'
];

// Generate channel URLs
channels.forEach(channel => {
  urlsToCache.push(`/channels/${channel.id}.png`);
  urlsToCache.push(`/images/channels/${channel.id}.png`);
});
// Generate vtx table URLs
vtxTables.forEach(table => {
  urlsToCache.push(`/wiki/vtx/${table.key}`);
});

// Install event - pre-cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activate worker immediately
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all clients
  );
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response to store in cache
        const responseToCache = response.clone();

        // Only cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }

        return response;
      })
      .catch(() => {
        // If network fetch fails, try to get from cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // For navigation requests, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline');
            }

            // If we don't have a cached response, return a default response
            return new Response('Network error occurred', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle channel images dynamically
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Check if the request is for a channel image
  if (url.pathname.startsWith('/images/channels/')) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If not in cache, fetch from network
          return fetch(event.request)
            .then(response => {
              // Clone the response to store in cache
              const responseToCache = response.clone();

              // Only cache successful responses
              if (response.status === 200) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }

              return response;
            });
        })
    );
  }
});
