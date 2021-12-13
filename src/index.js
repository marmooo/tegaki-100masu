const infoPanel = document.getElementById("infoPanel");
const scorePanel = document.getElementById("scorePanel");
const canvases = [
  ...document.getElementById("canvases").getElementsByTagName(
    "canvas",
  ),
];
const pads = initSignaturePads(canvases);
let endAudio, correctAudio;
loadAudios();
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
loadConfig();

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.dataset.theme = "dark";
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.dataset.theme = "dark";
  }
}

function playAudio(audioBuffer, volume) {
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  if (volume) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(audioContext.destination);
    audioSource.connect(gainNode);
    audioSource.start();
  } else {
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }
}

function unlockAudio() {
  audioContext.resume();
}

function loadAudio(url) {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          resolve(audioBuffer);
        }, (err) => {
          reject(err);
        });
      });
    });
}

function loadAudios() {
  promises = [
    loadAudio("mp3/end.mp3"),
    loadAudio("mp3/correct3.mp3"),
  ];
  Promise.all(promises).then((audioBuffers) => {
    endAudio = audioBuffers[0];
    correctAudio = audioBuffers[1];
  });
}

// +-*/のテストデータ生成範囲を返却
function getNumRange(grade) {
  switch (grade) {
    case 1:
      return [[9, 1], [[10, 5], [5, 1]], [9, 1], [[9, 1], [5, 1]]];
    case 2:
      return [[14, 2], [[20, 11], [10, 1]], [9, 1], [[19, 1], [5, 1]]];
    case 3:
      return [[19, 4], [[26, 16], [15, 6]], [9, 1], [[99, 10], [9, 1]]];
    case 4:
      return [[24, 8], [[99, 50], [50, 11]], [9, 1], [[99, 20], [19, 11]]];
    default:
      return [[49, 11], [[99, 50], [50, 11]], [9, 1], [[99, 20], [19, 11]]];
  }
}

let startTime;
let gameTimer;
function startGameTimer() {
  clearInterval(gameTimer);
  const timeNode = document.getElementById("time");
  startTime = Date.now();
  gameTimer = setInterval(function () {
    timeNode.textContent = (Date.now() - startTime) / 1000;
  }, 200);
}

let countdownTimer;
function countdown() {
  initTable();
  clearTimeout(countdownTimer);
  gameStart.classList.remove("d-none");
  infoPanel.classList.add("d-none");
  scorePanel.classList.add("d-none");
  const counter = document.getElementById("counter");
  counter.textContent = 3;
  countdownTimer = setInterval(function () {
    const colors = ["skyblue", "greenyellow", "violet", "tomato"];
    if (parseInt(counter.textContent) > 1) {
      const t = parseInt(counter.textContent) - 1;
      counter.style.backgroundColor = colors[t];
      counter.textContent = t;
    } else {
      clearTimeout(countdownTimer);
      gameStart.classList.add("d-none");
      infoPanel.classList.remove("d-none");
      document.getElementById("score").textContent = 0;
      startGameTimer();
    }
  }, 1000);
}

function initMasu() {
  let min = document.getElementById("masu").offsetWidth;
  const headerHeight = document.getElementById("header").offsetHeight;
  const height = window.innerHeight - headerHeight - 10;
  if (height < min) {
    min = height;
  }
  document.getElementById("masu").style.fontSize = min / 11 * 0.6 + "px";
}

function shuffle(array) {
  for (i = array.length; 1 < i; i--) {
    k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}

function initTable() {
  initTableHeader();
  initTableAnswers();
  [...document.getElementById("table").querySelectorAll("td.table-danger")]
    .forEach((td) => {
      td.className = "";
    });
  document.getElementById("table").getElementsByTagName("tr")[1].children[1]
    .className = "table-danger";
}

function initTableAnswers() {
  const course = document.getElementById("courseOption").selectedIndex;
  const trs = document.getElementById("table").getElementsByTagName("tr");
  const ths = trs[0].children;
  for (let i = 1; i < trs.length; i++) {
    const tds = trs[i].children;
    for (let j = 1; j < tds.length; j++) {
      let answer;
      const a = parseInt(ths[j].textContent);
      const b = parseInt(tds[0].textContent);
      if (course == 0) {
        answer = a + b;
      } else if (course == 1) {
        answer = a - b;
      } else if (course == 2) {
        answer = a * b;
      } else {
        answer = Math.floor(a / b);
      }
      tds[j].dataset.answer = answer;
      tds[j].textContent = "";
    }
  }
}

function initTableHeader() {
  const table = document.getElementById("table");
  const ths = table.getElementsByTagName("th");
  const grade = document.getElementById("gradeOption").selectedIndex + 1;
  const course = document.getElementById("courseOption").selectedIndex;
  if (course == 1 || course == 3) {
    let [to, from] = getNumRange(grade)[course][0];
    let range = Array.from(new Array(to - from + 1)).map((_v, i) => i + from);
    let arr = shuffle(range.slice());
    arr = arr.concat(shuffle(range.slice()));
    for (let i = 1; i <= 10; i++) {
      ths[i].textContent = arr[i];
    }
    [to, from] = getNumRange(grade)[course][1];
    range = Array.from(new Array(to - from + 1)).map((_v, i) => i + from);
    arr = shuffle(range.slice());
    arr = arr.concat(shuffle(range.slice()));
    for (let i = 11; i <= 20; i++) {
      ths[i].textContent = arr[i - 11];
    }
  } else {
    const [to, from] = getNumRange(grade)[course];
    const range = Array.from(new Array(to - from + 1)).map((_v, i) => i + from);
    let arr = shuffle(range);
    arr = arr.concat(shuffle(range.slice())).concat(shuffle(range.slice()));
    for (let i = 1; i <= 20; i++) {
      ths[i].textContent = arr[i];
    }
  }
}

function moveCursorNext(obj) {
  const objY = obj.parentNode;
  const trs = [...document.getElementById("table").getElementsByTagName("tr")];
  const tds = [...obj.parentNode.children];
  const x = tds.indexOf(obj);
  const y = trs.indexOf(objY);
  let newObj;
  if (y == 10) {
    if (x == 10) {
      newObj = obj;
    } else {
      newObj = trs[1].children[x + 1];
    }
  } else {
    newObj = trs[y + 1].children[x];
  }
  obj.className = "";
  newObj.className = "table-danger";
}

function moveCursor(obj) {
  const prevObj = document.getElementById("table").querySelector(
    "td.table-danger",
  );
  prevObj.className = "";
  obj.className = "table-danger";
}

function initSignaturePads(canvases) {
  const pads = [];
  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
    const pad = new SignaturePad(canvas, {
      minWidth: 5,
      maxWidth: 5,
      penColor: "black",
      backgroundColor: "white",
      throttle: 0,
    });
    pad.onEnd = () => {
      const data = pad.toData();
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        count += data[i].points.length;
      }
      if (5 < count && count < 100) {
        const pos = canvases.indexOf(pad.canvas);
        predict(pad.canvas, pos, data.length, count);
      }
    };
    const eraser = canvas.nextElementSibling;
    eraser.onclick = () => {
      pad.clear();
      canvas.dataset.predict = "";
      const reply = new Array(2).fill("");
      for (let j = 0; j < canvases.length; j++) {
        reply[j] = canvases[j].dataset.predict;
      }
      const replyObj = document.getElementById("table").querySelector(
        "td.table-danger",
      );
      replyObj.textContent = reply.join("");
    };
    pads.push(pad);
  }
  return pads;
}

const canvasCache = document.createElement("canvas").getContext("2d");
function getImageData(drawElement) {
  const inputWidth = inputHeight = 28;
  // resize
  canvasCache.drawImage(drawElement, 0, 0, inputWidth, inputHeight);
  // invert color
  const imageData = canvasCache.getImageData(0, 0, inputWidth, inputHeight);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  return imageData;
}

const kakusus = [1, 1, 1, 1, 2, 2, 1, 2, 1, 1]; // japanese style
function getReplies(predicted) {
  const canvas = canvases[predicted.pos];
  const predicts = new Array(2).fill(" ");
  for (let i = 0; i < canvases.length; i++) {
    predicts[i] = canvases[i].dataset.predict;
  }
  if (predicted.klass != 1 && predicted.count < 15) {
    predicted.klass = "";
  } else if (predicted.kaku < kakusus[predicted.klass]) { // 画数が足りないものは不正解とする
    predicted.klass = "";
  }
  canvas.dataset.predict = predicted.klass;
  predicts[parseInt(canvas.getAttribute("id").slice(-1))] = predicted.klass
    .toString();
  return predicts;
}

function predict(canvas, pos, kaku, count) {
  const imageData = getImageData(canvas);
  worker.postMessage({
    pos: pos,
    imageData: imageData,
    kaku: kaku,
    count: count,
  });
}

initTable();
initMasu();

const worker = new Worker("worker.js");
worker.addEventListener("message", function (e) {
  const reply = getReplies(e.data).join("");
  const replyObj = document.getElementById("table").querySelector(
    "td.table-danger",
  );
  replyObj.textContent = reply;
  if (replyObj.dataset.answer == reply) {
    playAudio(correctAudio);
    const scoreObj = document.getElementById("score");
    const score = parseInt(scoreObj.textContent) + 1;
    scoreObj.textContent = score;
    moveCursorNext(replyObj);
    pads.forEach((pad) => {
      pad.clear();
    });
    canvases.forEach((canvas) => {
      canvas.dataset.predict = "";
    });
    if (score == 100) {
      playAudio(endAudio);
      clearInterval(gameTimer);
      infoPanel.classList.add("d-none");
      scorePanel.classList.remove("d-none");
      scoreObj.textContent = (Date.now() - startTime) / 1000;
    }
  }
});

document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("startButton").onclick = countdown;
document.getElementById("restartButton").onclick = countdown;
[...document.getElementsByTagName("td")].forEach((td) => {
  td.onmousedown = function () {
    moveCursor(this);
  };
  td.ontouchstart = function () {
    moveCursor(this);
  };
});
document.getElementById("courseOption").onchange = function () {
  const text = this.options[this.selectedIndex].textContent;
  document.getElementById("courseText").innerHTML = text;
  initTable();
};
document.getElementById("gradeOption").onchange = initTable;
window.onresize = initMasu;

// https://webinlet.com/2020/ios11以降でピンチインアウト拡大縮小禁止
// 手を置いた時の誤爆を防ぎつつスクロールは許可
document.body.addEventListener("touchstart", function (e) {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });
document.body.addEventListener("touchmove", function (e) {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });
document.addEventListener("click", unlockAudio, {
  once: true,
  useCapture: true,
});
