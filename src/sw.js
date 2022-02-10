var CACHE_NAME = '2022-02-11 03:10';
var urlsToCache = [
  "/tegaki-100masu/",
  "/tegaki-100masu/index.js",
  "/tegaki-100masu/model/model.json",
  "/tegaki-100masu/model/group1-shard1of1.bin",
  "/tegaki-100masu/mp3/incorrect1.mp3",
  "/tegaki-100masu/mp3/end.mp3",
  "/tegaki-100masu/mp3/correct3.mp3",
  "/tegaki-100masu/favicon/original.svg",
  "https://marmooo.github.io/fonts/textar-light.woff2",
  "https://cdn.jsdelivr.net/npm/signature_pad@4.0.2/dist/signature_pad.umd.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.9.0/dist/tf.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
