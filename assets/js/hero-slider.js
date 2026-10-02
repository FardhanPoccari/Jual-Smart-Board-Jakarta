/* ==========================================================
   HERO SLIDER
   - Isi HERO_IMAGES dengan 1 nama file untuk gambar tunggal,
     atau beberapa nama file untuk slideshow otomatis.
   - File gambar ditaruh di assets/images/hero/
   ========================================================== */
const HERO_IMAGES = [
  "contoh 3.png"
  // , "hero-2.jpg", "hero-3.jpg"   ← tambahkan baris seperti ini untuk slideshow
];

const HERO_AUTOPLAY_MS = 5000;

function initHeroSlider() {
  const wrap = document.getElementById("hero-slides");
  const dotsWrap = document.getElementById("hero-dots");
  if (!wrap || HERO_IMAGES.length === 0) return;

  const base = document.body.dataset.base || "";

  wrap.innerHTML = HERO_IMAGES
    .map((file, i) => `<div class="hero-slide${i === 0 ? " active" : ""}" style="background-image:url('${base}assets/images/hero/${file}')"></div>`)
    .join("");

  const slides = [...wrap.children];
  if (slides.length < 2) return; // satu gambar saja: tidak perlu titik/putar otomatis

  dotsWrap.innerHTML = slides
    .map((_, i) => `<button class="hero-dot${i === 0 ? " active" : ""}" aria-label="Gambar ${i + 1}"></button>`)
    .join("");
  const dots = [...dotsWrap.children];

  let current = 0;
  let timer;

  function show(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function next() {
    show((current + 1) % slides.length);
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, HERO_AUTOPLAY_MS);
  }

  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); restart(); }));
  restart();
}
