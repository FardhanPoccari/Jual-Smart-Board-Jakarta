function initUsecases() {
  const items = document.querySelectorAll(".usecase-item");
  const images = document.querySelectorAll(".usecase-image");
  if (!items.length || !images.length) return;

  const activate = (index) => {
    items.forEach((item, i) => item.classList.toggle("active", i === index));
    images.forEach((img, i) => img.classList.toggle("active", i === index));
  };

  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => activate(index));
    item.addEventListener("focus", () => activate(index));
    item.addEventListener("click", () => activate(index));
  });

  activate(0);
}
