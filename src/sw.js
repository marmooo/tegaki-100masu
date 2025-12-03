const cacheName = "2025-12-04 00:00";
const urlsToCache = [
  "/tegaki-100masu/index.js",
  "/tegaki-100masu/worker.js",
  "/tegaki-100masu/model/model.json",
  "/tegaki-100masu/model/group1-shard1of1.bin",
  "/tegaki-100masu/mp3/incorrect1.mp3",
  "/tegaki-100masu/mp3/end.mp3",
  "/tegaki-100masu/mp3/correct3.mp3",
  "/tegaki-100masu/favicon/favicon.svg",
  "https://marmooo.github.io/fonts/textar-light.woff2",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js",
];

async function preCache() {
  const cache = await caches.open(cacheName);
  await Promise.all(
    urlsToCache.map((url) =>
      cache.add(url).catch((e) => console.warn("Failed to cache", url, e))
    ),
  );
  self.skipWaiting();
}

async function handleFetch(event) {
  const cached = await caches.match(event.request);
  return cached || fetch(event.request);
}

async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => name !== cacheName ? caches.delete(name) : null),
  );
  self.clients.claim();
}

self.addEventListener("install", (event) => {
  event.waitUntil(preCache());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(cleanOldCaches());
});
