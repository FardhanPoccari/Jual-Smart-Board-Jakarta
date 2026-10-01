function initBackToTop() {
  const b = document.getElementById("back-to-top");
  addEventListener("scroll", () => b.classList.toggle("show", scrollY > 400), { passive: true });
  b.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}
