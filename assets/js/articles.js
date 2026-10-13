/* Pencarian dan filter berjalan pada kartu HTML; artikel tetap bisa dibaca tanpa JS. */
(function () {
  const normalize = (text) => String(text).normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();

  function initArticles() {
    const articleURL = new URL("artikel.html", location.href);
    const storageKey = `smartboard:article-filter:${articleURL.pathname}`;

    document.querySelectorAll("[data-article-back]").forEach((link) => {
      try {
        const remembered = sessionStorage.getItem(storageKey);
        if (remembered) link.setAttribute("href", `artikel.html?${new URLSearchParams(remembered)}`);
      } catch (_) { /* Tautan HTML tetap dapat digunakan jika storage tidak tersedia. */ }
    });

    const page = document.querySelector(".articles-index");
    if (!page) return;
    const search = page.querySelector("#article-search");
    const clear = page.querySelector("#article-search-clear");
    const filters = [...page.querySelectorAll("[data-article-category]")];
    const cards = [...page.querySelectorAll("[data-article-card]")];
    const grid = page.querySelector("#articles-grid");
    const status = page.querySelector("#article-result-status");
    const empty = page.querySelector("#article-empty");
    if (!search || !clear || !filters.length || !cards.length || !grid || !empty) return;

    const categories = new Set(filters.map(button => button.dataset.articleCategory));
    const params = new URLSearchParams(location.search);
    let category = categories.has(params.get("kategori")) ? params.get("kategori") : "all";
    search.value = (params.get("q") || "").slice(0, 200);
    const searchIndex = new Map(cards.map(card => [card,
      normalize(`${card.dataset.articleSearch || ""} ${card.textContent}`)
    ]));

    function apply(updateAddress = true) {
      const words = normalize(search.value).split(" ").filter(Boolean);
      let visible = 0;
      cards.forEach(card => {
        const matchesCategory = category === "all" || card.dataset.category === category;
        const matchesSearch = words.every(word => searchIndex.get(card).includes(word));
        const show = matchesCategory && matchesSearch;
        card.hidden = !show;
        card.classList.toggle("is-featured", show && visible === 0);
        if (show) visible += 1;
      });
      filters.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.articleCategory === category)));
      clear.hidden = search.value.length === 0;
      empty.hidden = visible !== 0;
      grid.hidden = visible === 0;
      if (status) status.textContent = visible === 0 ? "0 artikel ditemukan" : `Menampilkan ${visible} dari ${cards.length} artikel`;

      if (updateAddress) {
        const url = new URL(location.href);
        const query = search.value.trim();
        if (query) url.searchParams.set("q", query);
        else url.searchParams.delete("q");
        if (category === "all") url.searchParams.delete("kategori");
        else url.searchParams.set("kategori", category);
        try { history.replaceState(history.state, "", url.href); } catch (_) {}
        try { sessionStorage.setItem(storageKey, url.searchParams.toString()); } catch (_) {}
      }
    }

    search.addEventListener("input", () => apply());
    search.addEventListener("search", () => apply());
    search.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        search.value = "";
        apply();
      }
    });
    clear.addEventListener("click", () => {
      search.value = "";
      apply();
      search.focus();
    });
    filters.forEach(button => button.addEventListener("click", () => {
      category = button.dataset.articleCategory;
      apply();
    }));
    page.querySelector("#article-reset")?.addEventListener("click", () => {
      category = "all";
      search.value = "";
      apply();
      search.focus();
    });
    window.addEventListener("popstate", () => {
      const current = new URLSearchParams(location.search);
      category = categories.has(current.get("kategori")) ? current.get("kategori") : "all";
      search.value = (current.get("q") || "").slice(0, 200);
      apply(false);
    });
    apply();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initArticles);
  else initArticles();
})();
