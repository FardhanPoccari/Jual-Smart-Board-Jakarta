document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid"), detail = document.getElementById("product-detail");
  if (grid) renderProducts(grid);
  const pf = document.getElementById("portfolio-grid");
  if (pf) renderPortfolio(pf);
  if (detail) renderDetail(detail);
  const cf = document.getElementById("contact-form");
  if (cf) initContact(cf);
  initHeroSlider();
  if (typeof initUsecases === "function") initUsecases();
  initNavbar(); initBackToTop();
  if (document.getElementById("modal")) initModal();
  if (document.querySelector(".faq")) initFaq();
  initAnimation();
});
