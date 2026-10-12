/* Katalog: filter merek dan seri untuk seluruh 27 produk.
 * Kartu produk ada di HTML supaya tetap terlihat tanpa JavaScript. */
document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.querySelector(".catalog-section");
  if (!catalog) return;

  const brandGroups = [...catalog.querySelectorAll(".catalog-brand")];
  const countEl = catalog.querySelector("#catalog-visible-count");
  const emptyEl = catalog.querySelector("#catalog-empty");
  const filters = {
    brand: catalog.querySelector('[data-filter="brand"]'),
    series: catalog.querySelector('[data-filter="series"]')
  };
  if (!filters.brand || !filters.series || !brandGroups.length) return;

  const seriesByBrand = {
    hikvision: [
      ["hikvision-ultra", "Ultra Series"],
      ["hikvision-performance", "Performance Series"],
      ["accessories", "Accessories"]
    ],
    samsung: [
      ["samsung-wmb", "Flip WMB"],
      ["samsung-wad", "Flip WAD"],
      ["accessories", "Accessories"]
    ],
    zelt: [
      ["zelt-pro", "ZELT Pro"],
      ["zelt-lite", "ZELT Lite"],
      ["accessories", "Accessories"]
    ]
  };

  const params = new URLSearchParams(location.search);
  const state = {
    brand: Object.hasOwn(seriesByBrand, params.get("merek")) ? params.get("merek") : "all",
    series: params.get("seri") || "all"
  };

  function seriesOptions(brand) {
    const brands = brand === "all" ? Object.keys(seriesByBrand) : [brand];
    const unique = new Map();
    brands.forEach((key) => seriesByBrand[key].forEach(([id, name]) => unique.set(id, name)));
    return [["all", "Semua seri"], ...unique.entries()];
  }

  function setOptions(filter, entries) {
    const menu = filter.querySelector(".brand-series-menu");
    menu.replaceChildren();
    entries.forEach(([value, label]) => {
      const button = document.createElement("button");
      button.className = "brand-series-option";
      button.type = "button";
      button.setAttribute("role", "menuitemradio");
      button.dataset.value = value;
      button.textContent = label;
      menu.append(button);
    });
  }

  function syncLabels() {
    Object.entries(filters).forEach(([kind, el]) => {
      const selected = [...el.querySelectorAll(".brand-series-option")].find((option) => option.dataset.value === state[kind]);
      el.dataset.value = selected ? state[kind] : "all";
      el.querySelector(".brand-series-current").textContent = selected?.textContent || (kind === "brand" ? "Semua merek" : "Semua seri");
      el.querySelectorAll(".brand-series-option").forEach((option) => {
        option.setAttribute("aria-checked", String(option === selected));
      });
    });
  }

  function applyFilter(updateAddress = false) {
    let visible = 0;
    brandGroups.forEach((group) => {
      const matchesBrand = state.brand === "all" || group.dataset.brand === state.brand;
      let brandCount = 0;
      group.querySelectorAll(".catalog-series-group").forEach((section) => {
        const show = matchesBrand && (state.series === "all" || section.dataset.series === state.series);
        section.hidden = !show;
        if (show) brandCount += section.querySelectorAll(".brand-model-card").length;
      });
      group.hidden = brandCount === 0;
      visible += brandCount;
    });
    countEl.textContent = String(visible);
    emptyEl.hidden = visible !== 0;
    syncLabels();

    if (updateAddress && history.replaceState) {
      const url = new URL(location.href);
      if (state.brand === "all") url.searchParams.delete("merek");
      else url.searchParams.set("merek", state.brand);
      if (state.series === "all") url.searchParams.delete("seri");
      else url.searchParams.set("seri", state.series);
      history.replaceState(history.state, "", url.pathname + url.search + url.hash);
    }
  }

  function selectValue(kind, value) {
    if (kind === "brand") {
      state.brand = value;
      const available = seriesOptions(value);
      if (!available.some(([id]) => id === state.series)) state.series = "all";
      setOptions(filters.series, available);
    } else {
      state.series = value;
    }
    applyFilter(true);
  }

  function installDropdown(kind) {
    const filter = filters[kind];
    const trigger = filter.querySelector(".brand-series-trigger");
    const menu = filter.querySelector(".brand-series-menu");
    const close = (returnFocus = false) => {
      menu.hidden = true;
      filter.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      if (returnFocus) trigger.focus();
    };
    const open = () => {
      Object.values(filters).forEach((other) => {
        if (other === filter) return;
        other.classList.remove("is-open");
        other.querySelector(".brand-series-menu").hidden = true;
        other.querySelector(".brand-series-trigger").setAttribute("aria-expanded", "false");
      });
      menu.hidden = false;
      filter.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    };

    trigger.addEventListener("click", () => menu.hidden ? open() : close());
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        open();
        const options = [...menu.querySelectorAll(".brand-series-option")];
        const selected = options.find((option) => option.getAttribute("aria-checked") === "true");
        (selected || options[0])?.focus();
      }
      if (event.key === "Escape") close();
    });
    menu.addEventListener("click", (event) => {
      const option = event.target.closest(".brand-series-option");
      if (!option) return;
      selectValue(kind, option.dataset.value);
      close(true);
    });
    menu.addEventListener("keydown", (event) => {
      const options = [...menu.querySelectorAll(".brand-series-option")];
      const index = options.indexOf(document.activeElement);
      let target;
      if (event.key === "ArrowDown") target = options[(index + 1) % options.length];
      else if (event.key === "ArrowUp") target = options[(index - 1 + options.length) % options.length];
      else if (event.key === "Home") target = options[0];
      else if (event.key === "End") target = options[options.length - 1];
      else if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      } else if (event.key === "Tab") {
        close();
        return;
      } else return;
      event.preventDefault();
      target?.focus();
    });
    document.addEventListener("click", (event) => {
      if (!filter.contains(event.target)) close();
    });
    return { close };
  }

  if (!seriesOptions(state.brand).some(([id]) => id === state.series)) state.series = "all";
  setOptions(filters.series, seriesOptions(state.brand));
  installDropdown("brand");
  installDropdown("series");
  applyFilter();
});
