
const $ = id => document.getElementById(id), rnd = (a,b) => a + Math.random()*(b-a);
const state = JSON.parse(sessionStorage.getItem('st') || '{"yes":0,"noMoves":0,"noStage":0}');
const save = () => sessionStorage.setItem('st', JSON.stringify(state));   // counters survive page changes

/* ---------- floating hearts background ---------- */
const HE = ['❤️','💗','💕','💖','🥹','✨','🌸'];
setInterval(() => {
  const h = document.createElement('span'); h.className = 'fh'; h.textContent = HE[Math.floor(rnd(0,HE.length))];
  h.style.cssText = `left:${rnd(0,98)}vw;font-size:${rnd(16,34)}px;animation-duration:${rnd(7,13)}s`;
  $('bg').appendChild(h); setTimeout(() => h.remove(), 13500);
}, 600);

/* ---------- music: each page plays its own track; starts after the first tap (autoplay rules) ---------- */
const PAGE = +document.body.dataset.page;
let musicOn = sessionStorage.getItem('musicOn') !== '0', started = false;
const track = new Audio(MUSIC[PAGE]); track.loop = true; track.volume = VOLUME;
function playCur(){
  if (musicOn) track.play().then(() => started = true).catch(() => {}); else track.pause();
  $('music').textContent = musicOn ? '🎵' : '🔇';
}
playCur();   // may be blocked by the browser; retried on the first tap
['click','touchend','keydown'].forEach(ev => document.addEventListener(ev, () => { if(!started) playCur(); }, {passive:true}));
$('music').onclick = () => { musicOn = !musicOn; sessionStorage.setItem('musicOn', musicOn ? '1' : '0'); started = false; playCur(); };

/* ---------- helpers ---------- */
function burst(x,y,n=14){
  for(let i=0;i<n;i++){ const s=document.createElement('span'); s.className='burst'; s.textContent=HE[Math.floor(rnd(0,5))];
    s.style.cssText=`left:${x}px;top:${y}px;--dx:${rnd(-140,140)}px;--dy:${rnd(-160,60)}px`; document.body.appendChild(s); setTimeout(()=>s.remove(),1300); }
}
function confetti(){
  const cs=['#ff8fb1','#e8456b','#d9c8ff','#ffd23d','#7cc7ff','#fff'];
  for(let i=0;i<70;i++){ const c=document.createElement('i'); c.className='conf';
    c.style.cssText=`left:${rnd(0,100)}vw;background:${cs[i%6]};animation-duration:${rnd(2.5,5)}s;animation-delay:${rnd(0,1.5)}s;border-radius:${i%3?'2px':'50%'}`;
    document.body.appendChild(c); setTimeout(()=>c.remove(),7000); }
}
// REAL page navigation: fades out, then opens the next HTML file
const URLS = {1:'index.html', 2:'bouquet.html', 3:'birthday.html'};
function go(n){ document.body.classList.add('leave'); setTimeout(() => location.href = URLS[n], 480); }
// move a button to a random spot that is fully inside the visible screen
function jump(b){
  const r = b.getBoundingClientRect(), w = document.documentElement.clientWidth, h = window.innerHeight;
  b.style.position='fixed'; b.style.zIndex=20; b.style.margin=0;
  b.style.left = rnd(10, Math.max(11, w-r.width-10)) + 'px';
  b.style.top  = rnd(10, Math.max(11, h-r.height-10)) + 'px';
}
