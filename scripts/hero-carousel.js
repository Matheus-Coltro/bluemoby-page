(() => {
  'use strict';
  const hero = document.querySelector('.hero');
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const next = hero.querySelector('.hero-next');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;
  let changing = false;

  function schedule() {
    clearTimeout(timer);
    if (!document.hidden && !reducedMotion.matches) {
      timer = setTimeout(advance, 6000);
    }
  }

  async function advance() {
    if (changing) return;
    changing = true;
    clearTimeout(timer);
    const target = (current + 1) % slides.length;
    try {
      // Keep the current image visible until the next one is ready to paint.
      await slides[target].decode();
      slides[current].classList.remove('is-active');
      slides[current].setAttribute('aria-hidden', 'true');
      slides[target].classList.add('is-active');
      slides[target].removeAttribute('aria-hidden');
      current = target;
    } catch {
      // A failed image request must not leave an empty hero.
    } finally {
      changing = false;
      schedule();
    }
  }

  next.addEventListener('click', advance);
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  schedule();
})();
