var CACHE_NAME = '2020-11-23 11:40';
var urlsToCache = [
  '/tegaki-100masu/',
  '/tegaki-100masu/index.js',
  '/tegaki-100masu/model/model.json',
  '/tegaki-100masu/model/group1-shard1of2.bin',
  '/tegaki-100masu/model/group1-shard2of2.bin',
  '/tegaki-100masu/mp3/incorrect1.mp3',
  '/tegaki-100masu/mp3/end.mp3',
  '/tegaki-100masu/mp3/correct3.mp3',
  'https://marmooo.github.io/fonts/textar-light.woff2',
  'https://marmooo.github.io/fonts/textar-light.woff',
  'https://marmooo.github.io/fonts/textar-light.ttf',
  'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
