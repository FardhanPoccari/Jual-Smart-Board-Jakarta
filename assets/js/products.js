/* Data produk. Model di halaman brand memakai ID yang sama untuk halaman detail. */
const BASE = document.body.dataset.base || "";
const WA = "6281234567890";

const product = (id, name, type, series, size, image, desc, long, specs = {}) => ({
  id, name, type, series, size, image, desc, long,
  badge: size ? `${size} Inch` : "Aksesoris",
  specs
});

const PRODUCTS = [
  /* Hikvision */
  product("hikvision-ds-d5c65rba", "Hikvision DS-D5C65RB/A", "Smart Board Hikvision", "Ultra Series", 65, "hikvision/Hikvision DS-D5C65RB-A.webp", "Smart Board Hikvision Ultra Series 65 inch untuk ruang kelas dan meeting room berukuran kecil hingga menengah.", "Smart Board Hikvision Ultra Series 65 inch untuk pembelajaran interaktif, presentasi, meeting, dan kolaborasi.", { "Brand": "Hikvision", "Series": "Ultra Series", "Ukuran Layar": "65 inch" }),
  product("hikvision-ds-d5c75rba", "Hikvision DS-D5C75RB/A", "Smart Board Hikvision", "Ultra Series", 75, "hikvision/Hikvision DS-D5C65RB-A.webp", "Smart Board Hikvision Ultra Series 75 inch untuk presentasi dan kolaborasi tim sehari-hari.", "Smart Board Hikvision Ultra Series 75 inch untuk kebutuhan pembelajaran, presentasi, meeting, dan kolaborasi.", { "Brand": "Hikvision", "Series": "Ultra Series", "Ukuran Layar": "75 inch" }),
  product("hikvision-ds-d5c86rba", "Hikvision DS-D5C86RB/A", "Smart Board Hikvision", "Ultra Series", 86, "hikvision/Hikvision DS-D5C65RB-A.webp", "Smart Board Hikvision Ultra Series 86 inch dengan layar luas untuk ruang meeting dan training berkapasitas besar.", "Smart Board Hikvision Ultra Series 86 inch untuk ruang meeting, training, presentasi, dan kolaborasi skala besar.", { "Brand": "Hikvision", "Series": "Ultra Series", "Ukuran Layar": "86 inch" }),
  product("hikvision-ds-d5b65rbep", "Hikvision DS-D5B65RB/EP", "Smart Board Hikvision", "Performance Series", 65, "hikvision/Hikvision DS-D5B65RB-EP.webp", "Smart Board Hikvision Performance Series 65 inch untuk ruang kelas dan ruang kerja berukuran kecil hingga menengah.", "Smart Board Hikvision Performance Series 65 inch untuk kebutuhan presentasi, pembelajaran, dan kolaborasi.", { "Brand": "Hikvision", "Series": "Performance Series", "Ukuran Layar": "65 inch" }),
  product("hikvision-ds-d5b75rbep", "Hikvision DS-D5B75RB/EP", "Smart Board Hikvision", "Performance Series", 75, "hikvision/Hikvision DS-D5B65RB-EP.webp", "Smart Board Hikvision Performance Series 75 inch untuk mendukung presentasi dan pembelajaran interaktif.", "Smart Board Hikvision Performance Series 75 inch untuk presentasi, pembelajaran, meeting, dan kolaborasi.", { "Brand": "Hikvision", "Series": "Performance Series", "Ukuran Layar": "75 inch" }),
  product("hikvision-ds-d5b86rbep", "Hikvision DS-D5B86RB/EP", "Smart Board Hikvision", "Performance Series", 86, "hikvision/Hikvision DS-D5B65RB-EP.webp", "Smart Board Hikvision Performance Series 86 inch untuk ruang meeting dan training berkapasitas besar.", "Smart Board Hikvision Performance Series 86 inch untuk kebutuhan ruang meeting, training, dan presentasi skala besar.", { "Brand": "Hikvision", "Series": "Performance Series", "Ukuran Layar": "86 inch" }),
  product("hikvision-ds-d5sc3b-b", "Active Dongle DS-D5SC3B-B", "Aksesoris Hikvision", "Accessories", null, "hikvision/Active Dongle DS-D5SC3B-B.webp", "Dongle nirkabel untuk menghubungkan laptop ke Smart Board Hikvision secara instan tanpa kabel.", "Active Dongle DS-D5SC3B-B untuk mendukung konektivitas nirkabel pada Smart Board Hikvision.", { "Brand": "Hikvision", "Jenis": "Active Dongle" }),
  product("hikvision-ds-d5abky3-sl", "Mobile Bracket DS-D5ABKY3-SL", "Aksesoris Hikvision", "Accessories", null, "hikvision/Mobile Bracket DS-D5ABKY3-SL.webp", "Bracket mobile beroda untuk memudahkan pemindahan Smart Board Hikvision antar ruangan.", "Mobile Bracket DS-D5ABKY3-SL untuk kebutuhan mobilitas Smart Board Hikvision antar ruang.", { "Brand": "Hikvision", "Jenis": "Mobile Bracket" }),
  product("hikvision-ds-d5ac12g5-8s2", "OPS Module DS-D5AC12G5-8S2", "Aksesoris Hikvision", "Accessories", null, "hikvision/OPS Module DS-D5AC12G5-8S2.webp", "Modul PC tambahan yang terpasang pada Smart Board Hikvision untuk mendukung penggunaan aplikasi secara langsung.", "OPS Module DS-D5AC12G5-8S2 sebagai modul PC tambahan untuk Smart Board Hikvision.", { "Brand": "Hikvision", "Jenis": "OPS Module" }),

  /* ZELT */
  product("zelt-pro-65", "ZELT Pro 65 Inch", "Smart Board ZELT", "ZELT Pro", 65, "zelt/zelt-pro.webp", "Smart Board 65 inch yang cocok untuk ruang kelas, meeting room, dan ruang kerja berukuran kecil hingga menengah.", "Smart Board ZELT Pro 65 inch untuk pembelajaran interaktif, presentasi, meeting, dan kolaborasi.", { "Brand": "ZELT", "Series": "ZELT Pro", "Ukuran Layar": "65 inch" }),
  product("zelt-pro-75", "ZELT Pro 75 Inch", "Smart Board ZELT", "ZELT Pro", 75, "zelt/zelt-pro.webp", "Smart Board 75 inch untuk mendukung pembelajaran interaktif, presentasi, dan kolaborasi sehari-hari.", "Smart Board ZELT Pro 75 inch untuk kebutuhan pembelajaran, presentasi, meeting, dan kolaborasi.", { "Brand": "ZELT", "Series": "ZELT Pro", "Ukuran Layar": "75 inch" }),
  product("zelt-pro-85", "ZELT Pro 85 Inch", "Smart Board ZELT", "ZELT Pro", 85, "zelt/zelt-pro.webp", "Smart Board 85 inch dengan layar lebih luas untuk ruang kelas dan meeting berukuran menengah.", "Smart Board ZELT Pro 85 inch untuk ruang kelas, meeting, training, dan kolaborasi dengan area tampilan lebih luas.", { "Brand": "ZELT", "Series": "ZELT Pro", "Ukuran Layar": "85 inch" }),
  product("zelt-lite-65", "ZELT Lite 65 Inch", "Smart Board ZELT", "ZELT Lite", 65, "zelt/zelt-pro.webp", "Smart Board ZELT Lite 65 inch untuk kebutuhan pembelajaran dan presentasi sehari-hari.", "Smart Board ZELT Lite 65 inch untuk kebutuhan display interaktif.", { "Brand": "ZELT", "Series": "ZELT Lite", "Ukuran Layar": "65 inch" }),
  product("zelt-lite-75", "ZELT Lite 75 Inch", "Smart Board ZELT", "ZELT Lite", 75, "zelt/zelt-pro.webp", "Smart Board ZELT Lite 75 inch untuk ruang kelas, meeting, dan presentasi.", "Smart Board ZELT Lite 75 inch untuk kebutuhan display interaktif.", { "Brand": "ZELT", "Series": "ZELT Lite", "Ukuran Layar": "75 inch" }),
  product("zelt-lite-86", "ZELT Lite 86 Inch", "Smart Board ZELT", "ZELT Lite", 86, "zelt/zelt-pro.webp", "Smart Board ZELT Lite 86 inch untuk ruang dengan kebutuhan tampilan lebih luas.", "Smart Board ZELT Lite 86 inch untuk kebutuhan display interaktif berukuran besar.", { "Brand": "ZELT", "Series": "ZELT Lite", "Ukuran Layar": "86 inch" }),
  product("zelt-standing", "Standing Smart Board ZELT", "Aksesoris ZELT", "Accessories", null, "zelt/Standing Smart Board ZELT.webp", "Stand mobile beroda untuk memudahkan pemindahan Smart Board ZELT antar ruangan sesuai kebutuhan.", "Standing Smart Board ZELT untuk mendukung mobilitas dan penempatan Smart Board di berbagai ruangan.", { "Brand": "ZELT", "Jenis": "Standing / Mobile Stand" }),
  product("zelt-active-dongle", "Active Dongle USB", "Aksesoris ZELT", "Accessories", null, "zelt/Active Dongle USB.webp", "Perangkat pendukung untuk menghubungkan laptop ke Smart Board secara nirkabel untuk presentasi dan screen sharing.", "Active Dongle USB untuk mendukung presentasi dan screen sharing secara nirkabel.", { "Brand": "ZELT", "Jenis": "Active Dongle" }),
  product("zelt-active-ops", "Active OPS", "Aksesoris ZELT", "Accessories", null, "zelt/Active OPS.webp", "Modul PC tambahan yang terpasang pada Smart Board untuk mendukung penggunaan aplikasi dan sistem operasi secara langsung.", "Active OPS sebagai modul PC tambahan untuk Smart Board ZELT.", { "Brand": "ZELT", "Jenis": "OPS Module" }),

  /* Samsung */
  product("samsung-wm55b", "Samsung Flip WM55B", "Smart Board Samsung", "Samsung WMB", 55, "samsung/Samsung Flip WM55B.webp", "Smart Board Samsung Flip 55 inch yang cocok untuk ruang meeting dan ruang kerja berukuran kecil.", "Samsung Flip WM55B untuk meeting, presentasi, dan kolaborasi di ruang kerja.", { "Brand": "Samsung", "Series": "Flip WMB", "Ukuran Layar": "55 inch" }),
  product("samsung-wm65b", "Samsung Flip WM65B", "Smart Board Samsung", "Samsung WMB", 65, "samsung/Samsung Flip WM55B.webp", "Smart Board Samsung Flip 65 inch untuk mendukung presentasi dan kolaborasi tim sehari-hari.", "Samsung Flip WM65B untuk presentasi, meeting, dan kolaborasi.", { "Brand": "Samsung", "Series": "Flip WMB", "Ukuran Layar": "65 inch" }),
  product("samsung-wm75b", "Samsung Flip WM75B", "Smart Board Samsung", "Samsung WMB", 75, "samsung/Samsung Flip WM55B.webp", "Smart Board Samsung Flip 75 inch dengan layar lebih luas untuk ruang meeting dan training.", "Samsung Flip WM75B untuk ruang meeting, training, presentasi, dan kolaborasi.", { "Brand": "Samsung", "Series": "Flip WMB", "Ukuran Layar": "75 inch" }),
  product("samsung-wa65d", "Samsung Flip WA65D", "Smart Board Samsung", "Samsung WAD", 65, "samsung/Samsung Flip WA65D.webp", "Smart Board Samsung Flip 65 inch untuk kebutuhan presentasi dan kolaborasi ruang kerja modern.", "Samsung Flip WA65D untuk presentasi dan kolaborasi di ruang kerja modern.", { "Brand": "Samsung", "Series": "Flip WAD", "Ukuran Layar": "65 inch" }),
  product("samsung-wa75d", "Samsung Flip WA75D", "Smart Board Samsung", "Samsung WAD", 75, "samsung/Samsung Flip WA65D.webp", "Smart Board Samsung Flip 75 inch dengan tampilan lebih luas untuk ruang meeting dan training.", "Samsung Flip WA75D untuk ruang meeting, training, presentasi, dan kolaborasi.", { "Brand": "Samsung", "Series": "Flip WAD", "Ukuran Layar": "75 inch" }),
  product("samsung-wa86d", "Samsung Flip WA86D", "Smart Board Samsung", "Samsung WAD", 86, "samsung/Samsung Flip WA65D.webp", "Smart Board Samsung Flip 86 inch untuk ruang meeting dan training berkapasitas besar.", "Samsung Flip WA86D untuk kebutuhan ruang meeting, training, dan presentasi skala besar.", { "Brand": "Samsung", "Series": "Flip WAD", "Ukuran Layar": "86 inch" }),
  product("samsung-wall-mount", "Wall Mount Samsung", "Aksesoris Samsung", "Accessories", null, "samsung/Wall Mount Samsung.webp", "Bracket dinding untuk pemasangan Smart Board Samsung secara permanen dan stabil.", "Wall Mount Samsung untuk pemasangan Smart Board secara permanen dan stabil.", { "Brand": "Samsung", "Jenis": "Wall Mount" }),
  product("samsung-mobile-stand", "Mobile Stand Samsung", "Aksesoris Samsung", "Accessories", null, "samsung/Mobile Stand Samsung.webp", "Stand mobile beroda untuk memudahkan pemindahan Smart Board Samsung antar ruangan.", "Mobile Stand Samsung untuk kebutuhan mobilitas Smart Board antar ruangan.", { "Brand": "Samsung", "Jenis": "Mobile Stand" }),
  product("samsung-ops-pc", "OPS PC Samsung", "Aksesoris Samsung", "Accessories", null, "samsung/OPS PC Samsung.webp", "Modul PC tambahan yang terpasang pada Smart Board Samsung untuk mendukung penggunaan aplikasi secara langsung.", "OPS PC Samsung sebagai modul PC tambahan untuk Smart Board Samsung.", { "Brand": "Samsung", "Jenis": "OPS PC" }),

  /* Produk umum lama, tetap dipertahankan agar halaman lain yang memakai ID lama tidak rusak. */
  product("smartboard-65", "Smart Board 65 Inch", "Smart Board", "Umum", 65, "zelt/zelt-pro.webp", "Smart Board 65 inch untuk kelas, meeting, dan presentasi interaktif.", "Smart Board 65 inch untuk sekolah, kantor, dan ruang meeting.", { "Ukuran Layar": "65 inch" }),
  product("smartboard-75", "Smart Board 75 Inch", "Smart Board", "Umum", 75, "zelt/zelt-pro.webp", "Smart Board 75 inch untuk kelas, meeting, dan presentasi interaktif.", "Smart Board 75 inch untuk sekolah, kantor, dan ruang meeting.", { "Ukuran Layar": "75 inch" }),
  product("smartboard-86", "Smart Board 86 Inch", "Smart Board", "Umum", 86, "zelt/zelt-pro.webp", "Smart Board 86 inch untuk kelas, meeting, dan presentasi interaktif.", "Smart Board 86 inch untuk ruang meeting dan presentasi skala besar.", { "Ukuran Layar": "86 inch" }),
  product("ifp-65", "Interactive Flat Panel 65 Inch", "Interactive Flat Panel", "Umum", 65, "zelt/zelt-pro.webp", "Interactive Flat Panel 65 inch untuk sekolah dan perusahaan.", "Interactive Flat Panel 65 inch untuk kebutuhan display interaktif.", { "Ukuran Layar": "65 inch" }),
  product("ifp-75", "Interactive Flat Panel 75 Inch", "Interactive Flat Panel", "Umum", 75, "zelt/zelt-pro.webp", "Interactive Flat Panel 75 inch untuk sekolah dan perusahaan.", "Interactive Flat Panel 75 inch untuk kebutuhan display interaktif.", { "Ukuran Layar": "75 inch" }),
  product("ifp-86", "Interactive Flat Panel 86 Inch", "Interactive Flat Panel", "Umum", 86, "zelt/zelt-pro.webp", "Interactive Flat Panel 86 inch untuk sekolah dan perusahaan.", "Interactive Flat Panel 86 inch untuk kebutuhan display interaktif.", { "Ukuran Layar": "86 inch" })
];

const waLink = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const DEFAULT_IMG = `${BASE}assets/images/smartboard.svg`;
const imgPath = f => `${BASE}assets/images/products/${encodeURI(f)}`;
const imgSrc = p => p.image ? imgPath(p.image) : DEFAULT_IMG;
const imgFallback = `onerror="this.onerror=null;this.src='${DEFAULT_IMG}'"`;

/* ==========================================================
   GALERI DETAIL PRODUK
   Taruh foto detail di folder produk, lalu daftarkan di sini.
   Urutan array = urutan slide. Slide pertama = foto utama kartu.
   ========================================================== */
const numbered = (dir, prefix, nums, ext = "avif", overrides = {}) =>
  nums.map(n => `${dir}/${prefix}${n}.${overrides[n] || ext}`);

const GALLERY_SETS = {
  "samsung-wad": numbered("samsung/WAD Detail", "Interactive Display WAD series detail ", [0,1,2,3,4,5,6,7,8,9,10,11], "avif", { 8: "jpg" }),
  // nama file WMB detail 3 memakai DUA spasi di folder Anda — jangan diubah kecuali file-nya diganti
  "samsung-wmb": [
    "samsung/WMB Detail/Interactive Display WMB detail 1.avif",
    "samsung/WMB Detail/Interactive Display WMB detail 2.avif",
    "samsung/WMB Detail/Interactive Display WMB detail  3.avif",
    "samsung/WMB Detail/Interactive Display WMB detail 4.avif",
    "samsung/WMB Detail/Interactive Display WMB detail 5.avif",
    "samsung/WMB Detail/Interactive Display WMB detail 6.avif"
  ],
  "hikvision-ultra": [
    "hikvision/DS-D5C75RB-A/DS-D5C75RB-A detail 1.png",
    "hikvision/DS-D5C75RB-A/DS-D5C75RB-A detail 2.png",
    "hikvision/DS-D5C75RB-A/DS-D5C75RB-3 detail 3.png"
  ],
  "hikvision-performance": [
    "hikvision/DS-D5B65RB-EP/DS-D5B65RB-EP detail 1.png",
    "hikvision/DS-D5B65RB-EP/DS-D5B65RB-EP detail 2.png"
  ],
  "zelt": [
    "zelt/Zelt detail/zelt-pro Lurus.webp",
    "zelt/Zelt detail/zelt-pro.webp"
  ]
};

function gallerySetKey(p) {
  if (p.series === "Samsung WAD") return "samsung-wad";
  if (p.series === "Samsung WMB") return "samsung-wmb";
  if (p.series === "Ultra Series") return "hikvision-ultra";
  if (p.series === "Performance Series") return "hikvision-performance";
  if (p.series === "ZELT Pro" || p.series === "ZELT Lite") return "zelt";
  return null;
}

function galleryImages(p) {
  const key = gallerySetKey(p);
  const extra = key ? GALLERY_SETS[key] : [];
  // Samsung & Hikvision: foto utama dulu, lalu foto detail. ZELT: foto detail sudah termasuk foto utama.
  const list = key === "zelt" ? extra : [p.image, ...extra];
  return [...new Set(list.filter(Boolean))];
}

/* Poin singkat di bawah judul (di sebelah kanan galeri) */
const HIGHLIGHTS = {
  "Samsung WAD": ["Ditenagai Android™", "Bersertifikasi EDLA", "Multitasking yang mudah"],
  "Samsung WMB": ["Layar interaktif untuk presentasi dan kolaborasi", "Cocok untuk ruang meeting dan ruang kerja", "Pilihan ukuran 55 sampai 75 inch"],
  "Ultra Series": ["Layar sentuh interaktif untuk belajar dan meeting", "Cocok untuk ruang kelas dan ruang meeting", "Pilihan ukuran 65, 75, dan 86 inch"],
  "Performance Series": ["Layar sentuh interaktif untuk belajar dan meeting", "Cocok untuk ruang kelas dan ruang kerja", "Pilihan ukuran 65, 75, dan 86 inch"],
  "ZELT Pro": ["Layar sentuh interaktif untuk belajar dan presentasi", "Cocok untuk kelas, meeting, dan training", "Pilihan ukuran 65, 75, dan 85 inch"],
  "ZELT Lite": ["Layar sentuh interaktif untuk belajar dan presentasi", "Cocok untuk kebutuhan harian di kelas dan kantor", "Pilihan ukuran 65, 75, dan 86 inch"]
};

function highlightsFor(p) {
  if (HIGHLIGHTS[p.series]) return HIGHLIGHTS[p.series];
  if (p.series === "Accessories") return [`Pendukung untuk Smart Board ${p.specs.Brand || ""}`.trim(), "Konsultasikan kebutuhan Anda lewat WhatsApp"];
  return [];
}

const CHEVRON_L = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const CHEVRON_R = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

function galleryHTML(p) {
  const imgs = galleryImages(p);
  const many = imgs.length > 1;
  const slides = imgs.map((f, i) => `
      <div class="gallery-slide${i === 0 ? " is-active" : ""}" data-index="${i}" aria-hidden="${i === 0 ? "false" : "true"}">
        <img src="${imgPath(f)}" alt="${p.name} - gambar ${i + 1} dari ${imgs.length}" ${i === 0 ? "" : 'loading="lazy"'} draggable="false" ${imgFallback}>
      </div>`).join("");
  const nav = many ? `
      <button class="gallery-nav gallery-prev" type="button" aria-label="Gambar sebelumnya">${CHEVRON_L}</button>
      <button class="gallery-nav gallery-next" type="button" aria-label="Gambar berikutnya">${CHEVRON_R}</button>` : "";
  const dots = many ? `
    <div class="gallery-dots" role="tablist" aria-label="Pilih gambar">
      ${imgs.map((_, i) => `<button class="gallery-dot${i === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${i === 0}" aria-label="Gambar ${i + 1}" data-index="${i}"></button>`).join("")}
    </div>` : "";
  return `
    <div class="gallery${many ? "" : " is-single"}" data-gallery tabindex="0" aria-roledescription="carousel" aria-label="Galeri ${p.name}">
      <div class="gallery-stage">${slides}${nav}</div>${dots}
    </div>`;
}

/* Slide berputar: dari gambar terakhir, tombol berikutnya langsung kembali ke gambar pertama (dan sebaliknya). */
function initGallery(root) {
  if (!root) return;
  const slides = [...root.querySelectorAll(".gallery-slide")];
  const dots = [...root.querySelectorAll(".gallery-dot")];
  if (slides.length < 2) return;
  let current = 0;

  const go = n => {
    current = (n + slides.length) % slides.length;   // wrap-around
    slides.forEach((s, i) => {
      const on = i === current;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach((d, i) => {
      const on = i === current;
      d.classList.toggle("is-active", on);
      d.setAttribute("aria-selected", on ? "true" : "false");
    });
    // muat gambar tetangga lebih awal supaya geser terasa mulus
    [current + 1, current - 1].forEach(k => {
      const img = slides[(k + slides.length) % slides.length].querySelector("img");
      if (img) img.loading = "eager";
    });
  };

  root.querySelector(".gallery-prev").addEventListener("click", () => go(current - 1));
  root.querySelector(".gallery-next").addEventListener("click", () => go(current + 1));
  dots.forEach(d => d.addEventListener("click", () => go(+d.dataset.index)));

  root.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { go(current - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { go(current + 1); e.preventDefault(); }
  });

  // Geser jari / mouse (swipe)
  const stage = root.querySelector(".gallery-stage");
  let startX = null, startY = 0;
  stage.addEventListener("pointerdown", e => {
    if (e.target.closest(".gallery-nav")) return;
    startX = e.clientX; startY = e.clientY;
  });
  const end = e => {
    if (startX === null) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", () => { startX = null; });
}

function renderProducts(el) {
  el.innerHTML = PRODUCTS.filter(p => ["Smart Board", "Interactive Flat Panel"].includes(p.type)).map(p => `
    <article class="card fade-up">
      <img src="${imgSrc(p)}" alt="${p.name}" width="400" height="280" loading="lazy" ${imgFallback}>
      <div class="card-body"><span class="badge">${p.badge}</span><h3>${p.name}</h3><p>${p.desc}</p>
      <a class="btn btn-outline" href="${BASE}pages/product-detail.html?id=${p.id}">Lihat Detail</a></div>
    </article>`).join("");
}

function sizeOptionsHTML(p) {
  if (!p.size) return "";
  const sibs = PRODUCTS.filter(x => x.series === p.series && x.type === p.type && x.size).sort((a, b) => a.size - b.size);
  if (sibs.length < 2) return "";
  return `
      <div class="size-picker">
        <h2>Pilih ukuran</h2>
        <div class="size-options">
          ${sibs.map(x => `<a class="size-option${x.id === p.id ? " is-active" : ""}" href="?id=${x.id}" data-size-id="${x.id}" ${x.id === p.id ? 'aria-current="page"' : ""}>${x.size}"</a>`).join("")}
        </div>
      </div>`;
}

/* Bagian yang berganti isi saat ukuran dipilih (tanpa memuat ulang halaman) */
function detailTopHTML(p) {
  const points = highlightsFor(p);
  return `
      <span class="badge">${p.badge}</span>
      <h1>${p.name}</h1>
      <p class="detail-sub">${p.type} · ${p.series}</p>
      ${points.length ? `<ul class="detail-points">${points.map(t => `<li>${t}</li>`).join("")}</ul>` : ""}`;
}

function detailBottomHTML(p) {
  return `
      <p class="detail-long">${p.long}</p>
      <table class="spec">${Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>
      <div class="actions">
        <a class="btn btn-primary" href="${waLink("Halo, saya ingin tanya produk " + p.name)}" target="_blank" rel="noopener">Tanya Produk</a>
        <a class="btn btn-outline" href="${waLink("Halo, saya tertarik dengan " + p.name)}" target="_blank" rel="noopener">WhatsApp</a>
      </div>`;
}

function brandPageFor(p) {
  return p.type.includes("Hikvision") ? "produk-hikvision.html" : p.type.includes("ZELT") ? "produk-zelt.html" : p.type.includes("Samsung") ? "produk-samsung.html" : "produk.html";
}

/* Muat gambar ukuran lain lebih awal supaya perpindahan ukuran langsung tampil */
function preloadSiblings(p) {
  PRODUCTS.filter(x => x.series === p.series && x.type === p.type && x.id !== p.id)
    .forEach(x => galleryImages(x).slice(0, 2).forEach(f => { const im = new Image(); im.src = imgPath(f); }));
}

function renderDetail(el) {
  const p = PRODUCTS.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!p) {
    el.innerHTML = `<p>Produk tidak ditemukan. <a href="${BASE}pages/produk.html">Kembali ke produk</a></p>`;
    return;
  }

  document.title = `${p.name} | Jual Smart Board Jakarta`;

  el.innerHTML = `
    <a class="back-btn" href="${BASE}pages/${brandPageFor(p)}" data-back>← Kembali ke Produk</a>
    <div data-gallery-slot>${galleryHTML(p)}</div>
    <div class="detail-info">
      <div data-swap="top">${detailTopHTML(p)}</div>
      ${sizeOptionsHTML(p)}
      <div data-swap="bottom">${detailBottomHTML(p)}</div>
    </div>`;

  initGallery(el.querySelector("[data-gallery]"));
  initBackButton(el, p);
  initSizeSwitch(el, p);
  preloadSiblings(p);
}

/* Tombol kembali: pakai riwayat browser supaya posisi scroll & filter halaman sebelumnya kembali persis */
function initBackButton(el, p) {
  const btn = el.querySelector("[data-back]");
  if (!btn) return;
  btn.addEventListener("click", e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
    let cameFromSite = false;
    try {
      const ref = new URL(document.referrer);
      cameFromSite = ref.origin === location.origin && !ref.pathname.endsWith("product-detail.html");
    } catch (_) {}
    if (cameFromSite && history.length > 1) {
      e.preventDefault();
      history.back();
    }
    // jika dibuka langsung dari link/tab baru, tombol tetap menuju halaman brand (href bawaan)
  });
}

/* Ganti ukuran tanpa reload: konten dipertukarkan dengan fade halus, URL diperbarui dengan replaceState */
function initSizeSwitch(el, startProduct) {
  let current = startProduct;
  const FADE = 180;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fadeSwap = (node, html) => {
    node.style.minHeight = node.offsetHeight + "px";
    node.classList.add("is-swapping");
    return new Promise(res => setTimeout(() => {
      node.innerHTML = html;
      requestAnimationFrame(() => {
        node.classList.remove("is-swapping");
        setTimeout(() => { node.style.minHeight = ""; res(); }, reduce ? 0 : FADE);
      });
    }, reduce ? 0 : FADE));
  };

  const swapGalleryIfNeeded = (prev, next) => {
    const a = galleryImages(prev).join("|"), b = galleryImages(next).join("|");
    if (a === b) return;                       // galeri sama → tidak diubah sama sekali (tidak berkedip)
    const slot = el.querySelector("[data-gallery-slot]");
    slot.innerHTML = galleryHTML(next);
    slot.firstElementChild.classList.add("gallery-enter");
    initGallery(slot.querySelector("[data-gallery]"));
  };

  el.addEventListener("click", e => {
    const link = e.target.closest("[data-size-id]");
    if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    const next = PRODUCTS.find(x => x.id === link.dataset.sizeId);
    if (!next || next.id === current.id) return;

    const prev = current;
    current = next;

    // update langsung (instan): tombol aktif, judul tab, URL
    el.querySelectorAll("[data-size-id]").forEach(a => {
      const on = a.dataset.sizeId === next.id;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.title = `${next.name} | Jual Smart Board Jakarta`;
    history.replaceState(history.state, "", `?id=${next.id}`);

    swapGalleryIfNeeded(prev, next);
    fadeSwap(el.querySelector('[data-swap="top"]'), detailTopHTML(next));
    fadeSwap(el.querySelector('[data-swap="bottom"]'), detailBottomHTML(next));
  });
}
