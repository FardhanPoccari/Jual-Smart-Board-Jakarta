/* Ingat posisi scroll halaman daftar produk.
   Saat pengunjung membuka detail lalu menekan "Kembali" (tombol browser maupun tombol di halaman),
   halaman daftar dibuka lagi tepat di posisi sebelumnya — tanpa animasi scroll dari atas. */
(function () {
  const KEY = "scroll:" + location.pathname + location.search;
  const nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  const isBack = nav ? nav.type === "back_forward" : false;

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const save = () => {
    try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (_) {}
  };
  window.addEventListener("pagehide", save);
  document.addEventListener("click", e => {
    if (e.target.closest && e.target.closest('a[href*="product-detail"]')) save();
  }, true);

  const restore = () => {
    if (!isBack) return;
    let y = null;
    try { y = sessionStorage.getItem(KEY); } catch (_) {}
    if (y === null) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";          // lompat langsung, bukan scroll halus
    window.scrollTo(0, parseFloat(y));
    root.style.scrollBehavior = prev;
  };

  // dua kali: setelah DOM siap, lalu setelah gambar/tinggi halaman final
  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(restore));
  window.addEventListener("load", restore);
})();
