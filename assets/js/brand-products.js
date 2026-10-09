document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".brand-products-page").forEach((page) => {
    const filter = page.querySelector(".brand-series-filter");
    const trigger = filter?.querySelector(".brand-series-trigger");
    const menu = filter?.querySelector(".brand-series-menu");
    const currentLabel = filter?.querySelector(".brand-series-current");
    const options = [...(filter?.querySelectorAll(".brand-series-option") || [])];
    const sections = page.querySelectorAll(".brand-series");
    if (!filter || !trigger || !menu || !currentLabel || !options.length || !sections.length) return;

    const closeMenu = (restoreFocus = false) => {
      menu.hidden = true;
      filter.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      if (restoreFocus) trigger.focus();
    };

    const openMenu = () => {
      menu.hidden = false;
      filter.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      const selected = options.find((option) => option.getAttribute("aria-checked") === "true");
      (selected || options[0]).focus();
    };

    const setFilterValue = (id) => {
      filter.dataset.value = id;
      const selected = options.find((option) => option.dataset.series === id) || options[0];
      currentLabel.textContent = selected.textContent.trim();
      options.forEach((option) => {
        option.setAttribute("aria-checked", option === selected ? "true" : "false");
      });
    };

    const showAll = () => {
      setFilterValue("all");
      sections.forEach((section) => section.classList.remove("is-hidden"));
    };

    const activate = (id, scroll = true) => {
      setFilterValue(id);
      sections.forEach((section) => {
        section.classList.toggle("is-hidden", section.id !== id);
      });
      if (history.replaceState) history.replaceState(null, "", `#${id}`);
      const target = document.getElementById(id);
      if (scroll) target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const selectSeries = (id) => {
      closeMenu(true);
      if (id === "all") {
        showAll();
        if (history.replaceState) history.replaceState(null, "", location.pathname);
      } else {
        activate(id);
      }
    };

    trigger.addEventListener("click", () => {
      if (menu.hidden) openMenu();
      else closeMenu();
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openMenu();
      }
    });

    options.forEach((option, index) => {
      option.addEventListener("click", () => selectSeries(option.dataset.series));
      option.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
        else if (event.key === "ArrowUp") nextIndex = (index - 1 + options.length) % options.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = options.length - 1;
        else if (event.key === "Escape") {
          event.preventDefault();
          closeMenu(true);
          return;
        } else return;

        event.preventDefault();
        options[nextIndex].focus();
      });
    });

    document.addEventListener("click", (event) => {
      if (!filter.contains(event.target)) closeMenu();
    });

    const initial = location.hash.replace("#", "");
    if (initial && [...sections].some((section) => section.id === initial)) {
      // Jika link membuka seri tertentu, langsung tampilkan seri tersebut.
      // (saat kembali dari halaman detail, posisi scroll dipulihkan oleh nav-history.js)
      const navType = (performance.getEntriesByType("navigation")[0] || {}).type;
      activate(initial, navType !== "back_forward");
    } else {
      // Default: semua seri tampil sehingga halaman brand terlihat lengkap saat pertama dibuka.
      showAll();
    }
  });
});
