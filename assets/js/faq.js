function initFaq() {
  document.querySelectorAll(".faq-q").forEach((q) =>
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      const open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!open));
      answer.style.maxHeight = open ? "0" : `${answer.scrollHeight}px`;
    }),
  );
}
