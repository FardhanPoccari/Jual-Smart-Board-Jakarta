function initNavbar() {
  const nav = document.querySelector(".navbar");
  const links = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  if (!nav || !links) return;

  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  hamburger?.addEventListener("click", e => {
    const open = links.classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  dropdownToggle?.addEventListener("click", e => {
    e.stopPropagation();
    const open = dropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    dropdown?.classList.remove("open");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  }));

  document.addEventListener("click", e => {
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      dropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });
}
