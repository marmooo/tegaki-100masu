const CACHE_NAME="2023-08-04 00:05",urlsToCache=["/tegaki-100masu/","/tegaki-100masu/index.js","/tegaki-100masu/worker.js","/tegaki-100masu/model/model.json","/tegaki-100masu/model/group1-shard1of1.bin","/tegaki-100masu/mp3/incorrect1.mp3","/tegaki-100masu/mp3/end.mp3","/tegaki-100masu/mp3/correct3.mp3","/tegaki-100masu/favicon/favicon.svg","https://marmooo.github.io/fonts/textar-light.woff2","https://cdn.jsdelivr.net/npm/signature_pad@4.1.6/dist/signature_pad.umd.min.js","https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.10.0/dist/tf.min.js"];self.addEventListener("install",a=>{a.waitUntil(caches.open(CACHE_NAME).then(a=>a.addAll(urlsToCache)))}),self.addEventListener("fetch",a=>{a.respondWith(caches.match(a.request).then(b=>b||fetch(a.request)))}),self.addEventListener("activate",a=>{a.waitUntil(caches.keys().then(a=>Promise.all(a.filter(a=>a!==CACHE_NAME).map(a=>caches.delete(a)))))})