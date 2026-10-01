/* ==========================================================
   PORTOFOLIO
   - Tambah / ubah proyek cukup lewat array PORTFOLIO di bawah.
   - Taruh foto di assets/images/portfolio/ lalu tulis nama filenya di "image".
   - Kalau "image" dikosongkan atau file tidak ditemukan, otomatis tampil gambar cadangan.
   (BASE, DEFAULT_IMG, imgFallback datang dari products.js)
   ========================================================== */
const PORTFOLIO = [
  { title: "Instalasi Smart Board Sekolah", category: "Sekolah", desc: "Ruang kelas interaktif dengan Smart Board.", image: "" },
  { title: "Ruang Meeting Perkantoran", category: "Kantor", desc: "Presentasi dan kolaborasi tim dalam satu layar.", image: "" },
  { title: "Instansi & Perusahaan", category: "Instansi", desc: "Pemasangan interactive flat panel untuk pelatihan.", image: "" }
];

function renderPortfolio(el) {
  el.innerHTML = PORTFOLIO.map(p => `
  <article class="card fade-up"><img src="${p.image ? `${BASE}assets/images/portfolio/${p.image}` : DEFAULT_IMG}" alt="${p.title}" width="400" height="280" loading="lazy" ${imgFallback}>
  <div class="card-body"><span class="badge">${p.category}</span><h3>${p.title}</h3><p>${p.desc}</p></div></article>`).join("");
}
