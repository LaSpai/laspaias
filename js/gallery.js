// Lightbox
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const pageTitle = document.querySelector('.page-title');
  const items = Array.from(document.querySelectorAll('.gallery-item img'));
  let current = 0;

  function open(index) {
    current = index;
    lightboxImg.src = items[current].src;
    lightboxCounter.textContent = `${current + 1} / ${items.length}`;
    if (lightboxTitle && pageTitle) lightboxTitle.textContent = pageTitle.textContent.trim();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    lightboxImg.src = items[current].src;
    lightboxCounter.textContent = `${current + 1} / ${items.length}`;
  }

  function next() {
    current = (current + 1) % items.length;
    lightboxImg.src = items[current].src;
    lightboxCounter.textContent = `${current + 1} / ${items.length}`;
  }

  items.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => open(i));
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', prev);
  lightbox.querySelector('.lightbox-next').addEventListener('click', next);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') close();
  });
}
