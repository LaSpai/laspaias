document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'PrintScreen') e.preventDefault();
});
