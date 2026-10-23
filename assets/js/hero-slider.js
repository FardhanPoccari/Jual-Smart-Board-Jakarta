/* Carousel kartu merek: klik, keyboard, tombol navigasi, dan swipe. */
function initHeroSlider() {
  const root = document.querySelector('[data-hero-carousel]');
  if (!root || root.dataset.heroReady === 'true') return;
  const config = window.SMARTBOARD_HERO;
  if (!config || !Array.isArray(config.slides) || !config.slides.length) return;
  const cards = [...root.querySelectorAll('[data-hero-card]')];
  const backgrounds = [...root.querySelectorAll('[data-hero-background]')];
  const deck = root.querySelector('[data-hero-deck]');
  const brand = root.querySelector('[data-hero-brand]');
  const description = root.querySelector('[data-hero-description]');
  const productLink = root.querySelector('[data-hero-product-link]');
  const productLabel = productLink?.querySelector('[data-hero-product-label]');
  const currentCount = root.querySelector('[data-hero-current]');
  const totalCount = root.querySelector('[data-hero-total]');
  const progress = root.querySelector('[data-hero-progress]');
  const status = root.querySelector('[data-hero-status]');
  const panel = root.querySelector('[data-hero-panel]');
  const slides = config.slides;
  if (!deck || !brand || !description || !productLink || cards.length !== slides.length || backgrounds.length !== slides.length) return;
  root.dataset.heroReady = 'true';
  const base = document.body.dataset.base || '';
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const path = value => /^(?:https?:|data:|\/)/.test(value) ? value : base + value;
  const twoDigits = number => String(number).padStart(2, '0');
  const animations = new Map();
  let current = -1, backgroundRequest = 0, pointerStart = null, suppressClickUntil = 0;
  cards.forEach((card, index) => {
    const slide = slides[index];
    const image = card.querySelector('img');
    const background = backgrounds[index].querySelector('img');
    card.id = `hero-brand-card-${index + 1}`;
    card.setAttribute('aria-label', `Tampilkan Smart Board ${slide.brand}`);
    card.querySelector('[data-hero-card-brand]').textContent = slide.brand;
    card.querySelector('[data-hero-card-category]').textContent = slide.category;
    if (image) {
      const src = path(slide.cardImage || slide.image);
      if (image.getAttribute('src') !== src) image.src = src;
      image.style.objectPosition = slide.cardPosition || 'center';
    }
    if (background) {
      background.dataset.src = path(slide.image);
      background.style.objectPosition = slide.backgroundPosition || 'center';
    }
  });
  if (totalCount) totalCount.textContent = twoDigits(slides.length);
  function showBackground(index) {
    const request = ++backgroundRequest;
    const image = backgrounds[index].querySelector('img');
    if (!image) return;
    const src = image.dataset.src;
    if (src && image.getAttribute('src') !== src) image.src = src;
    const reveal = () => {
      if (request !== backgroundRequest || current !== index) return;
      backgrounds.forEach((background, i) => background.classList.toggle('is-active', i === index));
    };
    // Tunggu gambar baru siap agar background lama tidak berkedip kosong.
    if (image.complete && image.naturalWidth > 0) reveal();
    else if (typeof image.decode === 'function') image.decode().then(reveal).catch(reveal);
    else reveal();
  }
  function animateCopy() {
    if (reducedMotion?.matches) return;
    [brand, description].forEach(element => {
      animations.get(element)?.cancel();
      if (typeof element.animate === 'function') animations.set(element, element.animate([
        {opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'translateY(0)'}
      ], {duration: 360, easing: 'ease-out'}));
    });
  }
  function activate(index, {announce = true, focus = false} = {}) {
    const selected = (index + slides.length) % slides.length;
    const changed = selected !== current;
    current = selected;
    const slide = slides[selected];
    root.dataset.heroSelected = slide.id;
    cards.forEach((card, i) => {
      const active = i === selected;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
      card.tabIndex = active ? 0 : -1;
      card.style.setProperty('--slot', String((i - selected + slides.length) % slides.length));
    });
    deck.scrollLeft = 0;
    brand.textContent = slide.brand;
    description.textContent = slide.description;
    productLink.setAttribute('href', path(slide.productUrl));
    if (productLabel) productLabel.textContent = 'Lihat Produk';
    productLink.setAttribute('aria-label', `Lihat produk ${slide.brand}`);
    if (panel) panel.setAttribute('aria-label', `Smart Board ${slide.brand}`);
    if (currentCount) currentCount.textContent = twoDigits(selected + 1);
    if (progress) progress.style.width = `${(selected + 1) / slides.length * 100}%`;
    if (announce && status) status.textContent = `${slide.brand}, pilihan ${selected + 1} dari ${slides.length}.`;
    if (changed) { showBackground(selected); if (announce) animateCopy(); }
    if (focus) cards[selected].focus({preventScroll: true});
  }
  cards.forEach((card, index) => card.addEventListener('click', () => {
    if (performance.now() < suppressClickUntil) return;
    activate(index);
  }));
  root.querySelector('[data-hero-prev]')?.addEventListener('click', () => activate(current - 1));
  root.querySelector('[data-hero-next]')?.addEventListener('click', () => activate(current + 1));
  deck.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let target;
    if (event.key === 'ArrowRight') target = current + 1;
    else if (event.key === 'ArrowLeft') target = current - 1;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = slides.length - 1;
    else return;
    event.preventDefault(); activate(target, {focus: true});
  });
  deck.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.isPrimary === false) return;
    pointerStart = {id: event.pointerId, x: event.clientX, y: event.clientY};
  });
  window.addEventListener('pointerup', event => {
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    suppressClickUntil = performance.now() + 350;
    activate(current + (dx < 0 ? 1 : -1), {focus: true});
  });
  window.addEventListener('pointercancel', () => { pointerStart = null; });
  const initial = slides.findIndex(slide => slide.id === config.initialSlide);
  activate(initial >= 0 ? initial : 0, {announce: false});
}
