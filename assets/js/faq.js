function initFaq() {
  document.querySelectorAll(".faq-q").forEach(q => q.addEventListener("click", () => {
    const a = q.nextElementSibling, open = q.getAttribute("aria-expanded") === "true";
    q.setAttribute("aria-expanded", !open); q.lastElementChild.textContent = open ? "+" : "−";
    a.style.maxHeight = open ? 0 : a.scrollHeight + "px";
  }));
}
