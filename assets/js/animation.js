function initAnimation() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver !== "function") return;
  // Konten terlihat secara default; sembunyikan hanya setelah observer siap.
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }), { threshold: .12 });
  // Hero: elemen muncul berurutan saat halaman dibuka
  document.querySelectorAll(".intro").forEach((el, i) => {
    el.classList.add("reveal-ready");
    setTimeout(() => el.classList.add("in"), 150 + i * 150);
  });
  // Scroll: tiap elemen dianimasikan sekali saja, lalu observer dilepas
  document.querySelectorAll(".fade-up,.fade-left,.fade-right,.zoom-in").forEach(el => {
    io.observe(el);
    el.classList.add("reveal-ready");
  });
}
