function initFaq() {
  const entries = [];
  document.querySelectorAll(".faq-q").forEach((q, index) => {
    const answer = q.nextElementSibling;
    if (!answer || q.dataset.faqReady === "true") return;
    q.dataset.faqReady = "true";
    q.type = "button";
    q.id = q.id || `faq-question-${index + 1}`;
    answer.id = answer.id || `faq-answer-${index + 1}`;
    q.setAttribute("aria-controls", answer.id);
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", q.id);

    const sync = () => {
      const open = q.getAttribute("aria-expanded") === "true";
      answer.setAttribute("aria-hidden", String(!open));
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
    };
    q.addEventListener("click", () => {
      q.setAttribute("aria-expanded", String(q.getAttribute("aria-expanded") !== "true"));
      sync();
    });
    sync();
    entries.push(sync);
  });
  if (entries.length) window.addEventListener("resize", () => entries.forEach(sync => sync()), { passive: true });
}
