const allImages = [
  'images/hc-punk-diy/cover.jpg','images/hc-punk-diy/001.jpg','images/hc-punk-diy/002.jpg',
  'images/hc-punk-diy/003.jpg','images/hc-punk-diy/004.jpg','images/hc-punk-diy/005.jpg',
  'images/hc-punk-diy/006.jpg','images/hc-punk-diy/007.jpg','images/hc-punk-diy/008.jpg',
  'images/hc-punk-diy/009.jpg','images/hc-punk-diy/010.jpg',
  'images/colour/cover.jpg','images/colour/001.jpg','images/colour/002.jpg',
  'images/colour/003.jpg','images/colour/004.jpg','images/colour/005.jpg',
  'images/colour/006.jpg','images/colour/007.jpg','images/colour/008.jpg',
  'images/colour/009.jpg','images/colour/010.jpg','images/colour/011.jpg',
  'images/colour/012.jpg','images/colour/013.jpg','images/colour/014.jpg',
  'images/colour/015.jpg','images/colour/016.jpg','images/colour/017.jpg','images/colour/018.jpg',
  'images/film/cover.jpg','images/film/001.jpg','images/film/002.jpg',
  'images/film/003.jpg','images/film/004.jpg','images/film/005.jpg',
  'images/film/006.jpg','images/film/007.jpg','images/film/008.jpg',
  'images/film/009.jpg','images/film/010.jpg','images/film/011.jpg',
  'images/film/012.jpg','images/film/013.jpg','images/film/014.jpg',
  'images/film/015.jpg','images/film/016.jpg','images/film/017.jpg',
  'images/film/018.jpg','images/film/019.jpg','images/film/020.jpg','images/film/021.jpg',
  'images/street-portrait/cover.jpg','images/street-portrait/001.jpg','images/street-portrait/002.jpg',
  'images/street-portrait/003.jpg','images/street-portrait/004.jpg','images/street-portrait/005.jpg',
  'images/street-portrait/006.jpg','images/street-portrait/007.jpg','images/street-portrait/008.jpg',
  'images/street-portrait/009.jpg','images/street-portrait/010.jpg','images/street-portrait/011.jpg',
  'images/street-portrait/012.jpg',
  'images/we-live-here/cover.jpg','images/we-live-here/001.jpg','images/we-live-here/002.jpg',
  'images/we-live-here/003.jpg','images/we-live-here/004.jpg','images/we-live-here/005.jpg',
  'images/we-live-here/006.jpg','images/we-live-here/007.jpg','images/we-live-here/008.jpg',
  'images/we-live-here/009.jpg','images/we-live-here/010.jpg','images/we-live-here/011.jpg',
  'images/we-live-here/012.jpg','images/we-live-here/013.jpg','images/we-live-here/014.jpg',
  'images/we-live-here/015.jpg','images/we-live-here/016.jpg','images/we-live-here/017.jpg',
  'images/we-live-here/018.jpg','images/we-live-here/019.jpg'
];

// Shuffle
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const shuffled = shuffle(allImages);
const SPRAY_COUNT = 14;
const container = document.querySelector('.spray');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCounter = document.querySelector('.lightbox-counter');
let current = 0;
let sprayImages = [];

// Build spray
for (let i = 0; i < SPRAY_COUNT; i++) {
  const wrap = document.createElement('div');
  wrap.className = 'spray-item';

  const x = 2 + (i % 4) * 24 + (Math.random() * 10 - 5);
  const y = 5 + Math.floor(i / 4) * 32 + (Math.random() * 10 - 5);
  const rot = (Math.random() - 0.5) * 12;
  const w = 160 + Math.random() * 100;

  wrap.style.cssText = `left:${x}%;top:${y}%;width:${w}px;transform:rotate(${rot}deg);z-index:${Math.floor(Math.random()*10)+1}`;

  const img = document.createElement('img');
  img.src = shuffled[i % shuffled.length];
  img.alt = '';
  sprayImages.push(img);

  const idx = i;
  wrap.addEventListener('click', () => openLightbox(idx));
  wrap.appendChild(img);
  container.appendChild(wrap);
}

// Cycle images randomly
const usedIndices = new Set(Array.from({length: SPRAY_COUNT}, (_, i) => i));
setInterval(() => {
  const slot = Math.floor(Math.random() * SPRAY_COUNT);
  let next;
  do { next = Math.floor(Math.random() * shuffled.length); } while (usedIndices.has(next) && usedIndices.size < shuffled.length);
  sprayImages[slot].style.opacity = '0';
  setTimeout(() => {
    sprayImages[slot].src = shuffled[next];
    sprayImages[slot].style.opacity = '1';
  }, 600);
}, 2500);

// Lightbox
function openLightbox(startIdx) {
  current = startIdx;
  lightboxImg.src = sprayImages[current].src;
  lightboxCounter.textContent = `${current + 1} / ${SPRAY_COUNT}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function prev() {
  current = (current - 1 + SPRAY_COUNT) % SPRAY_COUNT;
  lightboxImg.src = sprayImages[current].src;
  lightboxCounter.textContent = `${current + 1} / ${SPRAY_COUNT}`;
}

function next() {
  current = (current + 1) % SPRAY_COUNT;
  lightboxImg.src = sprayImages[current].src;
  lightboxCounter.textContent = `${current + 1} / ${SPRAY_COUNT}`;
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', prev);
document.querySelector('.lightbox-next').addEventListener('click', next);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
  if (e.key === 'Escape') closeLightbox();
});

// Swipe
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
}, { passive: true });
