function initNavbar() {
  const nav = document.querySelector(".navbar"), links = document.querySelector(".nav-links");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  document.querySelector(".hamburger").addEventListener("click", e => {
    const open = links.classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", open);
  });
  // Mobile: menu tertutup otomatis setelah salah satu link diklik
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
}
