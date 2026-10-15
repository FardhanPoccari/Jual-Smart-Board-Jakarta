function initUsecases() {
  const section = document.querySelector(".usecases");
  if (!section || section.dataset.usecasesReady === "true") return;

  const list = section.querySelector(".usecase-list");
  const items = Array.from(section.querySelectorAll("[data-usecase]"));
  const images = Array.from(section.querySelectorAll("[data-usecase-image]"));
  if (!list || !items.length || images.length !== items.length) return;

  section.dataset.usecasesReady = "true";
  const previous = section.querySelector("[data-usecase-prev]");
  const next = section.querySelector("[data-usecase-next]");
  const title = section.querySelector("[data-usecase-title]");
  const counter = section.querySelector("[data-usecase-counter]");
  let current = -1;
  let scrollFrame = 0;
  let resizeFrame = 0;

  const maximumScroll = () => Math.max(0, list.scrollHeight - list.clientHeight);
  const number = (value) => String(value).padStart(2, "0");

  const activate = (index, moveList = false) => {
    const selected = Math.max(0, Math.min(items.length - 1, index));

    if (selected !== current) {
      current = selected;
      items.forEach((item, i) => {
        const active = i === selected;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      images.forEach((image) => {
        const active = Number(image.dataset.usecaseImage) === selected;
        if (active && image.dataset.src && !image.getAttribute('src')) image.src = image.dataset.src;
        image.classList.toggle("active", active);
        image.setAttribute("aria-hidden", String(!active));
      });
      if (title) title.textContent = items[selected].querySelector(".usecase-title").textContent;
      if (counter) counter.textContent = `${number(selected + 1)} / ${number(items.length)}`;
      if (previous) previous.disabled = selected === 0;
      if (next) next.disabled = selected === items.length - 1;
    }

    if (moveList) {
      const top = items.length > 1 ? maximumScroll() * selected / (items.length - 1) : 0;
      list.scrollTo({ top, behavior: "instant" });
    }
  };

  const syncFromScroll = () => {
    scrollFrame = 0;
    const maximum = maximumScroll();
    if (maximum < 1) return;
    const progress = Math.max(0, Math.min(1, list.scrollTop / maximum));
    activate(Math.round(progress * (items.length - 1)));
  };

  // Posisi guliran dibagi menjadi lima pilihan; ujung bawah selalu memilih 05.
  list.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(syncFromScroll);
  }, { passive: true });

  items.forEach((item, index) => {
    item.addEventListener("click", () => activate(index, true));
    item.addEventListener("focus", () => activate(index, true));
  });

  if (previous) previous.addEventListener("click", () => activate(current - 1, true));
  if (next) next.addEventListener("click", () => activate(current + 1, true));

  // Daftar juga dapat dipakai dengan keyboard tanpa menggulir seluruh halaman.
  list.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    let selected;
    if (event.key === "ArrowDown") selected = current + 1;
    else if (event.key === "ArrowUp") selected = current - 1;
    else if (event.key === "Home") selected = 0;
    else if (event.key === "End") selected = items.length - 1;
    else return;
    event.preventDefault();
    selected = Math.max(0, Math.min(items.length - 1, selected));
    items[selected].focus({ preventScroll: true });
    activate(selected, true);
  });

  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => activate(current, true));
  }, { passive: true });

  activate(0, true);
}
