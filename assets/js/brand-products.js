document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".brand-products-page").forEach(page => {
    const buttons = page.querySelectorAll(".brand-series-btn");
    const sections = page.querySelectorAll(".brand-series");
    if (!buttons.length || !sections.length) return;

    const showAll = () => {
      buttons.forEach(btn => {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      });
      sections.forEach(section => section.classList.remove("is-hidden"));
    };

    const activate = (id, scroll = true) => {
      buttons.forEach(btn => {
        const active = btn.dataset.series === id;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      sections.forEach(section => {
        section.classList.toggle("is-hidden", section.id !== id);
      });
      if (history.replaceState) history.replaceState(null, "", `#${id}`);
      const target = document.getElementById(id);
      if (scroll) target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const visible = [...sections].filter(section => !section.classList.contains("is-hidden"));
        const id = button.dataset.series;

        // Saat semua seri sedang tampil, klik salah satu tombol untuk memfilter seri tersebut.
        // Saat hanya satu seri yang tampil, klik seri yang sama untuk kembali menampilkan semuanya.
        if (visible.length === sections.length) {
          activate(id);
        } else if (visible.length === 1 && visible[0].id === id) {
          showAll();
          if (history.replaceState) history.replaceState(null, "", location.pathname);
        } else {
          activate(id);
        }
      });
    });

    const initial = location.hash.replace("#", "");
    if (initial && [...sections].some(section => section.id === initial)) {
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
