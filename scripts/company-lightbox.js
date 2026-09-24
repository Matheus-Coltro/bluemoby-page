(() => {
  'use strict';
  const dialog = document.querySelector('#company-lightbox');
  const image = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('#lightbox-caption');
  const closeButton = dialog.querySelector('.lightbox-close');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let opener;
  let closeTimer;

  document.querySelectorAll('.company-photo-open').forEach(button => {
    button.addEventListener('click', () => {
      const figure = button.closest('.company-photo');
      const source = figure.querySelector('img');
      opener = button;
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      caption.textContent = figure.querySelector('figcaption').textContent;
      dialog.classList.remove('is-closing');
      document.body.classList.add('company-lightbox-open');
      dialog.showModal();
      closeButton.focus({ preventScroll: true });
    });
  });

  function close() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    closeTimer = setTimeout(() => dialog.close(), reducedMotion.matches ? 0 : 180);
  }
  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  let pointerStartedOutside = false;
  function outside(event) {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  }
  dialog.addEventListener('pointerdown', event => { pointerStartedOutside = outside(event); });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && pointerStartedOutside && outside(event)) close();
    pointerStartedOutside = false;
  });
  dialog.addEventListener('close', () => {
    clearTimeout(closeTimer);
    dialog.classList.remove('is-closing');
    document.body.classList.remove('company-lightbox-open');
    opener?.focus({ preventScroll: true });
  });
})();
