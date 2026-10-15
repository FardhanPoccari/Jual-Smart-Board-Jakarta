/* Slide berputar: dari gambar terakhir, tombol berikutnya langsung kembali ke gambar pertama (dan sebaliknya). */
function initGallery(root) {
  if (!root || root.dataset.galleryReady === 'true') return;
  const slides = [...root.querySelectorAll(".gallery-slide")];
  const dots = [...root.querySelectorAll(".gallery-dot")];
  if (slides.length < 2) return;
  root.dataset.galleryReady = 'true';
  const stage = root.querySelector('.gallery-stage');
  const status = document.createElement('p');
  status.className = 'gallery-status';
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  root.append(status);
  dots.forEach(d => d.setAttribute('aria-controls', stage.id));
  let current = 0;

  const go = (n, preload = true) => {
    current = (n + slides.length) % slides.length;   // wrap-around
    slides.forEach((s, i) => {
      const on = i === current;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach((d, i) => {
      const on = i === current;
      d.classList.toggle("is-active", on);
      d.setAttribute("aria-pressed", String(on));
    });
    status.textContent = `Gambar ${current + 1} dari ${slides.length} — ${root.getAttribute('aria-label')}`;
    const activeImage = slides[current].querySelector('img');
    if (preload && activeImage) activeImage.loading = 'eager';
    if (activeImage?.dataset.src && !activeImage.getAttribute('src')) activeImage.src = activeImage.dataset.src;
    // muat gambar tetangga lebih awal supaya geser terasa mulus
    if (preload) [current + 1, current - 1].forEach(k => {
      const img = slides[(k + slides.length) % slides.length].querySelector("img");
      if (img) {
        img.loading = "eager";
        if (img.dataset.src && !img.getAttribute('src')) img.src = img.dataset.src;
      }
    });
  };
  go(0, false);

  root.querySelector(".gallery-prev").addEventListener("click", () => go(current - 1));
  root.querySelector(".gallery-next").addEventListener("click", () => go(current + 1));
  dots.forEach(d => d.addEventListener("click", () => go(+d.dataset.index)));

  root.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    let next;
    if (e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "ArrowRight") next = current + 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = slides.length - 1;
    else return;
    go(next);
    if (e.target.closest('.gallery-dot')) dots[current]?.focus();
    e.preventDefault();
  });

  // Geser jari / mouse (swipe)
  let startX = null, startY = 0;
  stage.addEventListener("pointerdown", e => {
    if (e.target.closest(".gallery-nav")) return;
    startX = e.clientX; startY = e.clientY;
  });
  const end = e => {
    if (startX === null) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", () => { startX = null; });
}
