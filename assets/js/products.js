/* Data produk. Tambah produk baru cukup dengan menambah satu baris di PRODUCTS. */
const BASE = document.body.dataset.base || "";
const WA = "6281234567890"; // ganti dengan nomor WhatsApp bisnis
const mk = (type, size, ram, storage, touch, image) => ({
  id: `${type === "Smart Board" ? "smartboard" : "ifp"}-${size}`,
  name: `${type} ${size} Inch`, type, size, image,
  badge: size === 75 ? "Terlaris" : size === 86 ? "Kelas Besar" : "Ekonomis",
  desc: `${type} ${size}" untuk kelas, meeting, dan presentasi interaktif.`,
  specs: { "Ukuran Layar": `${size} inch`, Resolusi: "4K UHD (3840×2160)", "Sistem Operasi": "Android 13 + Windows (opsional)", RAM: ram, Storage: storage, "Touch Point": `${touch} titik sentuh`, Konektivitas: "WiFi, Bluetooth, HDMI, USB, LAN", Speaker: "2 × 15W", Garansi: "1 tahun" },
  long: `${type} ${size} inch dengan layar sentuh responsif, cocok untuk sekolah, kantor, dan ruang meeting. Sudah termasuk pulpen stylus dan software anotasi.`
});
/* Format: mk(jenis, ukuran, RAM, storage, touch point, "nama-file-gambar")
   Taruh file gambar di folder assets/images/products/ dan tulis nama filenya di kolom terakhir.
   Kalau file belum ada / salah nama, otomatis tampil gambar default (smartboard.svg). */
const PRODUCTS = [
  mk("Smart Board", 65, "4 GB", "32 GB", 20, "zelt-lite-pro.webp"),
  mk("Smart Board", 75, "8 GB", "64 GB", 20, "zelt-lite-pro.webp"),
  mk("Smart Board", 86, "8 GB", "128 GB", 20, "zelt-lite-pro.webp"),
  mk("Interactive Flat Panel", 65, "4 GB", "32 GB", 20, "zelt-lite-pro.webp"),
  mk("Interactive Flat Panel", 75, "8 GB", "64 GB", 20, "zelt-lite-pro.webp"),
  mk("Interactive Flat Panel", 86, "8 GB", "128 GB", 20, "zelt-lite-pro.webp")
];
const waLink = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const DEFAULT_IMG = `${BASE}assets/images/smartboard.svg`;
const imgSrc = p => p.image ? `${BASE}assets/images/products/${p.image}` : DEFAULT_IMG;
// Jika file gambar tidak ditemukan, pakai gambar default
const imgFallback = `onerror="this.onerror=null;this.src='${DEFAULT_IMG}'"`;

function renderProducts(el) {
  el.innerHTML = PRODUCTS.map(p => `
  <article class="card fade-up"><img src="${imgSrc(p)}" alt="${p.name}" width="400" height="280" loading="lazy" ${imgFallback}>
  <div class="card-body"><span class="badge">${p.badge}</span><h3>${p.name}</h3><p>${p.desc}</p>
  <a class="btn btn-outline" href="${BASE}pages/product-detail.html?id=${p.id}">Lihat Detail</a></div></article>`).join("");
}
function renderDetail(el) {
  const p = PRODUCTS.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!p) { el.innerHTML = `<p>Produk tidak ditemukan. <a href="${BASE}pages/produk.html">Kembali ke produk</a></p>`; return; }
  document.title = `${p.name} | Jual Smart Board Jakarta`;
  el.innerHTML = `<a class="back-btn" href="${BASE}pages/produk.html">← Kembali ke Produk</a>
  <img src="${imgSrc(p)}" alt="${p.name}" width="400" height="280" ${imgFallback}>
  <div><span class="badge">${p.badge}</span><h1>${p.name}</h1><p>${p.long}</p>
  <table class="spec">${Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>
  <div class="actions"><a class="btn btn-primary" href="${waLink("Halo, saya ingin tanya produk " + p.name)}" target="_blank" rel="noopener">Tanya Produk</a>
  <a class="btn btn-outline" href="${waLink("Halo, saya tertarik dengan " + p.name)}" target="_blank" rel="noopener">WhatsApp</a></div></div>`;
}
