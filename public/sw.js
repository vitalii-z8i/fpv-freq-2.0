// Cache name
const CACHE_NAME = 'fpv-freq-cache-v1.1';

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

// Add channel images to cache
const channelPrefixes = ['a', 'b', 'e', 'f', 'h', 'l', 'o', 'r', 's', 'u', 'x', '3-3g-a', '3-3g-b'];
const channelNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

// Generate channel image URLs
channelPrefixes.forEach(prefix => {
  channelNumbers.forEach(number => {
    urlsToCache.push(`/channels/${prefix}${number}`);
    urlsToCache.push(`/images/channels/${prefix}${number}.png`);
  });
});

// Add special case for Foxeer L-band
channelNumbers.forEach(number => {
  urlsToCache.push(`/images/channels/l${number}-foxeer`);
  urlsToCache.push(`/images/channels/l${number}-foxeer.png`);
});

['3-3g-a', '3-3g-b', '3-3g-c', '3-3g-d', '3-3g-e'].forEach(prefix => {
  channelNumbers.forEach(number => {
    urlsToCache.push(`/channels/${prefix}${number}-geprc`);
  });
})

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
