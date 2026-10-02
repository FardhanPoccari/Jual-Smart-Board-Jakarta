function initAnimation() {
  // Hero: elemen muncul berurutan saat halaman dibuka
  document.querySelectorAll(".intro").forEach((el, i) => setTimeout(() => el.classList.add("in"), 150 + i * 150));
  // Scroll: tiap elemen dianimasikan sekali saja, lalu observer dilepas
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".fade-up,.fade-left,.fade-right,.zoom-in").forEach(el => io.observe(el));
}
