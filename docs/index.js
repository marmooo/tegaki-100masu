const countPanel=document.getElementById("countPanel"),infoPanel=document.getElementById("infoPanel"),scorePanel=document.getElementById("scorePanel"),canvases=[...document.getElementById("canvases").getElementsByTagName("canvas")],canvasCache=document.createElement("canvas").getContext("2d",{alpha:!1,willReadFrequently:!0}),pads=initSignaturePads(canvases),audioContext=new AudioContext,audioBufferCache={};loadAudio("end","mp3/end.mp3"),loadAudio("correct","mp3/correct3.mp3"),loadConfig();function loadConfig(){localStorage.getItem("darkMode")==1&&(document.documentElement.dataset.theme="dark")}function toggleDarkMode(){localStorage.getItem("darkMode")==1?(localStorage.setItem("darkMode",0),delete document.documentElement.dataset.theme):(localStorage.setItem("darkMode",1),document.documentElement.dataset.theme="dark")}async function playAudio(b,c){const d=await loadAudio(b,audioBufferCache[b]),a=audioContext.createBufferSource();if(a.buffer=d,c){const b=audioContext.createGain();b.gain.value=c,b.connect(audioContext.destination),a.connect(b),a.start()}else a.connect(audioContext.destination),a.start()}async function loadAudio(a,c){if(audioBufferCache[a])return audioBufferCache[a];const d=await fetch(c),e=await d.arrayBuffer(),b=await audioContext.decodeAudioData(e);return audioBufferCache[a]=b,b}function unlockAudio(){audioContext.resume()}function getNumRange(a){switch(a){case 1:return[[9,1],[[10,5],[5,1]],[9,1],[[9,1],[5,1]]];case 2:return[[14,2],[[20,11],[10,1]],[9,1],[[19,1],[5,1]]];case 3:return[[19,4],[[26,16],[15,6]],[9,1],[[99,10],[9,1]]];case 4:return[[24,8],[[99,50],[50,11]],[9,1],[[99,20],[19,11]]];default:return[[49,11],[[99,50],[50,11]],[9,1],[[99,20],[19,11]]]}}let startTime,gameTimer;function startGameTimer(){clearInterval(gameTimer);const a=document.getElementById("time");startTime=Date.now(),gameTimer=setInterval(()=>{a.textContent=(Date.now()-startTime)/1e3},200)}let countdownTimer;function countdown(){initTable(),clearTimeout(countdownTimer),countPanel.classList.remove("d-none"),infoPanel.classList.add("d-none"),scorePanel.classList.add("d-none");const a=document.getElementById("counter");a.textContent=3,countdownTimer=setInterval(()=>{const b=["skyblue","greenyellow","violet","tomato"];if(parseInt(a.textContent)>1){const c=parseInt(a.textContent)-1;a.style.backgroundColor=b[c],a.textContent=c}else clearTimeout(countdownTimer),countPanel.classList.add("d-none"),infoPanel.classList.remove("d-none"),document.getElementById("score").textContent=0,startGameTimer()},1e3)}function initTableFontSize(){const a=document.getElementById("table"),b=a.offsetWidth;a.style.fontSize=b/11*.6+"px"}function shuffle(a){for(let b=a.length;1<b;b--){const c=Math.floor(Math.random()*b);[a[c],a[b-1]]=[a[b-1],a[c]]}return a}function initTable(){initTableHeader(),initTableAnswers(),[...document.getElementById("table").querySelectorAll("td.table-danger")].forEach(a=>{a.className=""}),document.getElementById("table").getElementsByTagName("tr")[1].children[1].className="table-danger"}function initTableAnswers(){const a=document.getElementById("courseOption").selectedIndex,b=document.getElementById("table").getElementsByTagName("tr"),c=b[0].children;for(let e=1;e<b.length;e++){const d=b[e].children;for(let b=1;b<d.length;b++){let e;const f=parseInt(c[b].textContent),g=parseInt(d[0].textContent);a==0?e=f+g:a==1?e=f-g:a==2?e=f*g:e=Math.floor(f/g),d[b].dataset.answer=e,d[b].textContent=""}}}function initTableHeader(){const d=document.getElementById("table"),b=d.getElementsByTagName("th"),c=document.getElementById("gradeOption").selectedIndex+1,a=document.getElementById("courseOption").selectedIndex;if(a==1||a==3){let[g,e]=getNumRange(c)[a][0],f=Array.from(new Array(g-e+1)).map((b,a)=>a+e),d=shuffle(f.slice());d=d.concat(shuffle(f.slice()));for(let a=1;a<=10;a++)b[a].textContent=d[a];[g,e]=getNumRange(c)[a][1],f=Array.from(new Array(g-e+1)).map((b,a)=>a+e),d=shuffle(f.slice()),d=d.concat(shuffle(f.slice()));for(let a=11;a<=20;a++)b[a].textContent=d[a-11]}else{const[g,f]=getNumRange(c)[a],d=Array.from(new Array(g-f+1)).map((b,a)=>a+f);let e=shuffle(d);e=e.concat(shuffle(d.slice())).concat(shuffle(d.slice()));for(let a=1;a<=20;a++)b[a].textContent=e[a]}}function moveCursorNext(a){const f=a.parentNode,c=[...document.getElementById("table").getElementsByTagName("tr")],g=[...a.parentNode.children],d=g.indexOf(a),e=c.indexOf(f);let b;e==10?d==10?b=a:b=c[1].children[d+1]:b=c[e+1].children[d],a.className="",b.className="table-danger"}function initSignaturePads(a){const b=[];for(let d=0;d<a.length;d++){const e=a[d],c=new SignaturePad(e,{minWidth:5,maxWidth:5,penColor:"black",backgroundColor:"white",throttle:0});c.addEventListener("endStroke",()=>{const d=c.toData();let b=0;for(let a=0;a<d.length;a++)b+=d[a].points.length;if(5<b&&b<100){const e=a.indexOf(c.canvas);predict(c.canvas,e,d.length,b)}});const f=e.nextElementSibling;f.onclick=()=>{c.clear(),e.dataset.predict="";const b=new Array(2).fill("");for(let c=0;c<a.length;c++)b[c]=a[c].dataset.predict;const d=document.getElementById("table").querySelector("td.table-danger");d.textContent=b.join("")},b.push(c)}return b}function getImageData(d){const b=inputHeight=28;canvasCache.drawImage(d,0,0,b,inputHeight);const c=canvasCache.getImageData(0,0,b,inputHeight),a=c.data;for(let b=0;b<a.length;b+=4)a[b]=255-a[b],a[b+1]=255-a[b+1],a[b+2]=255-a[b+2];return c}const kakusus=[1,1,1,1,2,2,1,2,1,1];function getReplies(a){const c=canvases[a.pos],b=new Array(2).fill(" ");for(let a=0;a<canvases.length;a++)b[a]=canvases[a].dataset.predict;a.klass!=1&&a.count<15?a.klass="":a.kaku<kakusus[a.klass]&&(a.klass=""),c.dataset.predict=a.klass;const d=parseInt(c.getAttribute("id").slice(-1));return b[d]=a.klass.toString(),b}function predict(a,b,c,d){const e=getImageData(a);worker.postMessage({pos:b,imageData:e,kaku:c,count:d})}initTable(),initTableFontSize();const worker=new Worker("worker.js");worker.addEventListener("message",c=>{const b=getReplies(c.data).join(""),a=document.getElementById("table").querySelector("td.table-danger");if(a.textContent=b,a.dataset.answer==b){playAudio("correct");const b=document.getElementById("score"),c=parseInt(b.textContent)+1;b.textContent=c,moveCursorNext(a),pads.forEach(a=>{a.clear()}),canvases.forEach(a=>{a.dataset.predict=""}),c==100?(playAudio("end"),clearInterval(gameTimer),infoPanel.classList.add("d-none"),scorePanel.classList.remove("d-none"),b.textContent=(Date.now()-startTime)/1e3):c==1&&startGameTimer()}}),document.getElementById("toggleDarkMode").onclick=toggleDarkMode,document.getElementById("startButton").onclick=countdown,document.getElementById("restartButton").onclick=countdown,document.getElementById("courseOption").onchange=b=>{const a=b.target,c=a.options[a.selectedIndex].textContent;document.getElementById("courseText").innerHTML=c,initTable()},document.getElementById("gradeOption").onchange=initTable,window.onresize=initTableFontSize,document.addEventListener("click",unlockAudio,{once:!0,useCapture:!0})