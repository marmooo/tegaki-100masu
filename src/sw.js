const CACHE_NAME = "2023-09-30 19:30";
const urlsToCache = [
  "/tegaki-100masu/",
  "/tegaki-100masu/index.js",
  "/tegaki-100masu/worker.js",
  "/tegaki-100masu/model/model.json",
  "/tegaki-100masu/model/group1-shard1of1.bin",
  "/tegaki-100masu/mp3/incorrect1.mp3",
  "/tegaki-100masu/mp3/end.mp3",
  "/tegaki-100masu/mp3/correct3.mp3",
  "/tegaki-100masu/favicon/favicon.svg",
  "https://marmooo.github.io/fonts/textar-light.woff2",
  "https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.13.0/dist/tf.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
