/* ================= CONFIG: edit these ================= */

const MUSIC = {
  1: 'music/page1.mp3',
  2: 'music/page2.mp3',
  3: 'music/page3.mp3'
};

const VOLUME = 0.3;

const IMAGES = [
  {src:'images/photo1.jpeg', cap:'us being chaotic #1 😭', e:'📸'},
  {src:'images/photo2.jpeg', cap:'the cutest duo 🥹', e:'🎀'},
  {src:'images/photo3.jpeg', cap:'zero brain cells 😂', e:'🧠'},
  {src:'images/photo4.jpeg', cap:'main character energy 💅', e:'💖'},
  {src:'images/photo5.jpeg', cap:'my fav human 💗', e:'🌸'},
  {src:'images/photo6.jpeg', cap:'why are we like this 😭', e:'😂'}
];

const NO_TEXTS = [
  'SHRM AARI H? 😭💗',
  'PLZ BBY YES KROOO 🥺💕',
  'PLEASE NAAA 😭❤️'
];

const YES_TEXTS = [
  'Try harder baby 😭💗',
  'Soory tease kr rha tha, repteeeee na maar dena 😭❤️🖐️💥'
];

/* ================= AUTOMATIC MUSIC SYSTEM ================= */

let currentAudio = null;
let currentMusicPage = null;

function playPageMusic(page) {

  if (!MUSIC[page]) return;

  // Avoid restarting the same song
  if (currentMusicPage === page && currentAudio && !currentAudio.paused) {
    return;
  }

  // Stop previous music
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentMusicPage = page;

  // Create new audio
  currentAudio = new Audio(MUSIC[page]);
  currentAudio.volume = VOLUME;
  currentAudio.loop = true;
  currentAudio.preload = 'auto';

  // Attempt immediate playback
  currentAudio.play().catch(error => {
    console.log('Autoplay blocked by browser:', error);
  });
}

/* ================= PAGE MUSIC ================= */

// Attempt music immediately when website loads
document.addEventListener('DOMContentLoaded', () => {
  playPageMusic(1);
});

// Page navigation music functions
function enterPage1() {
  playPageMusic(1);
}

function enterPage2() {
  playPageMusic(2);
}

function enterPage3() {
  playPageMusic(3);
}

/* ====================================================== */