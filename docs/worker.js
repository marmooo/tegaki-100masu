function getAccuracyScores(a){const b=tf.tidy(()=>{const c=1;let b=tf.browser.fromPixels(a,c);return b=tf.cast(b,"float32").div(tf.scalar(255)),b=b.expandDims(),model.predict(b).dataSync()});return b}function predict(b){const a=getAccuracyScores(b),c=a.indexOf(Math.max.apply(null,a));return c}async function loadModel(){model=await tf.loadGraphModel("model/model.json")}importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.9.0/dist/tf.min.js");let model;loadModel(),self.addEventListener("message",a=>{a.data.klass=predict(a.data.imageData),delete a.data.imageData,postMessage(a.data)})