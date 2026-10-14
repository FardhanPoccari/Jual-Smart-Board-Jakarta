/* Ingat posisi scroll halaman daftar produk.
   Saat pengunjung membuka detail lalu menekan "Kembali" (tombol browser maupun tombol di halaman),
   halaman daftar dibuka lagi tepat di posisi sebelumnya — tanpa animasi scroll dari atas. */
(function () {
  // Filter katalog memperbarui query dengan replaceState; gunakan URL terkini.
  const key = () => "scroll:" + location.pathname + location.search;
  const nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  const isBack = nav ? nav.type === "back_forward" : false;

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const save = () => {
    try { sessionStorage.setItem(key(), String(window.scrollY)); } catch (_) {}
  };
  window.addEventListener("pagehide", save);
  document.addEventListener("click", e => {
    if (e.target.closest && e.target.closest('a[href*="product-detail"]')) save();
  }, true);

  const restore = (fromCache = false) => {
    if (!isBack && !fromCache) return;
    let y = null;
    try { y = sessionStorage.getItem(key()); } catch (_) {}
    if (y === null || !Number.isFinite(Number(y))) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";          // lompat langsung, bukan scroll halus
    window.scrollTo(0, parseFloat(y));
    root.style.scrollBehavior = prev;
  };

  // dua kali: setelah DOM siap, lalu setelah gambar/tinggi halaman final
  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(() => restore()));
  window.addEventListener("load", () => restore());
  // BFCache tidak menjalankan DOMContentLoaded/load kembali.
  window.addEventListener("pageshow", event => {
    if (event.persisted) requestAnimationFrame(() => restore(true));
  });
})();
