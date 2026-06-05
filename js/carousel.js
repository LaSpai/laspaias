document.querySelectorAll('.project-card').forEach((card, i) => {
  const images = card.querySelectorAll('img');
  if (images.length <= 1) return;
  let current = 0;
  setTimeout(() => {
    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 3000);
  }, i * 600); // stagger so cards don't all change at the same time
});
