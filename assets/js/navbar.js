function initNavbar() {
  const nav = document.querySelector(".navbar");
  const links = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  if (!nav || !links || nav.dataset.navbarReady === "true") return;
  nav.dataset.navbarReady = "true";
  links.id = links.id || "site-navigation";
  if (hamburger) {
    hamburger.type = "button";
    hamburger.setAttribute("aria-controls", links.id);
  }

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
    hamburger?.setAttribute("aria-expanded", "false");
    dropdown?.classList.remove("open");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  }));

  document.addEventListener("click", e => {
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      dropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (dropdown?.classList.contains("open")) {
      dropdown.classList.remove("open");
      dropdownToggle?.setAttribute("aria-expanded", "false");
      dropdownToggle?.focus();
    } else if (links.classList.contains("open")) {
      links.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
      hamburger?.focus();
    }
  });
}

/* Halaman merek memuat navbar.js tanpa main.js. Guard di atas mencegah binding ganda. */
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initNavbar);
else initNavbar();
