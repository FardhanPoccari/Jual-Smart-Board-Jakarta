/* Galeri referensi: gunakan gambar sungguhan dari folder assets/images/portfolio/.
   Bukan klaim dokumentasi pemasangan di lokasi pelanggan.
   Jika sudah ada foto instalasi asli, ganti path foto dan judul pada daftar ini. */
const PORTFOLIO = [
  {title:"Smart Board untuk Ruang Kelas", category:"ruang", label:"Inspirasi Ruangan", image:"Hikvision Smart Board Classroom Lesson.png", desc:"Contoh penataan layar interaktif untuk belajar, menjelaskan materi, dan diskusi di kelas.", alt:"Contoh ruang kelas dengan layar interaktif dan kegiatan pembelajaran"},
  {title:"Presentasi Interaktif di Aula", category:"ruang", label:"Inspirasi Ruangan", image:"Smart Board Presentation in Aula.png", desc:"Referensi penggunaan layar besar untuk pelatihan, seminar, dan presentasi bersama.", alt:"Ilustrasi layar interaktif dalam suasana aula presentasi"},
  {title:"Display untuk Auditorium", category:"ruang", label:"Inspirasi Ruangan", image:"Hikvision Smart Board on Auditorium Stage.png", desc:"Inspirasi tampilan layar digital sebagai pusat penyampaian materi pada ruangan luas.", alt:"Contoh penggunaan layar interaktif untuk auditorium"},
  {title:"Hikvision Ultra Series", category:"produk", label:"Galeri Produk", image:"hikvision-ultra.webp", desc:"Tampilan unit Hikvision untuk kebutuhan pengajaran dan kolaborasi digital.", alt:"Foto produk Smart Board Hikvision Ultra Series", href:"produk-hikvision.html"},
  {title:"Hikvision Performance Series", category:"produk", label:"Galeri Produk", image:"hikvision-performance.webp", desc:"Pilihan panel interaktif untuk presentasi dan aktivitas ruang kelas sehari-hari.", alt:"Foto produk Smart Board Hikvision Performance Series", href:"produk-hikvision.html"},
  {title:"Samsung Flip WMB", category:"produk", label:"Galeri Produk", image:"samsung-flip.webp", desc:"Layar interaktif yang mendukung ide visual, anotasi, dan pembahasan dalam tim.", alt:"Foto produk Samsung Flip WMB", href:"produk-samsung.html"},
  {title:"Samsung Interactive Display WAD", category:"produk", label:"Galeri Produk", image:"samsung-wad.webp", desc:"Alternatif layar interaktif untuk kelas, pelatihan, dan lingkungan kantor.", alt:"Foto produk Samsung Interactive Display WAD", href:"produk-samsung.html"},
  {title:"ZELT Pro Interactive Display", category:"produk", label:"Galeri Produk", image:"zelt-pro.webp", desc:"Tampilan Smart Board ZELT Pro dengan layar luas untuk penyampaian materi digital.", alt:"Foto produk ZELT Pro Interactive Display", href:"produk-zelt.html"},
  {title:"Detail Display Hikvision", category:"detail", label:"Detail Fitur", image:"detail-hikvision.webp", desc:"Detail tampilan panel Hikvision yang bisa menjadi referensi saat memilih produk.", alt:"Detail panel Smart Board Hikvision", href:"produk-hikvision.html"},
  {title:"Fitur Whiteboard Samsung Flip", category:"detail", label:"Detail Fitur", image:"detail-samsung-flip.webp", desc:"Contoh visual penggunaan papan tulis digital untuk menuliskan dan berbagi ide.", alt:"Contoh tulisan dan anotasi pada Samsung Flip", href:"produk-samsung.html"},
  {title:"Tampilan Samsung WAD Series", category:"detail", label:"Detail Fitur", image:"detail-samsung-wad.webp", desc:"Melihat lebih dekat antarmuka display interaktif Samsung seri WAD.", alt:"Tampilan depan interactive display Samsung WAD", href:"produk-samsung.html"},
  {title:"Mobile Stand Hikvision", category:"detail", label:"Aksesoris", image:"mobile-stand.webp", desc:"Dudukan beroda untuk membantu penempatan panel pada berbagai kebutuhan ruangan.", alt:"Foto produk dudukan beroda Smart Board Hikvision", href:"produk-hikvision.html"}
];

function renderPortfolio(el) {
  const makeCard = p => `
    <article class="portfolio-item fade-up" data-category="${p.category}">
      <a class="portfolio-image ${p.category === 'ruang' ? 'is-room' : 'is-product'}" href="${p.href || 'produk.html'}" aria-label="Lihat ${p.title}">
        <img src="${BASE}assets/images/portfolio/${p.image}" alt="${p.alt}" width="760" height="520" loading="lazy" decoding="async" />
        <span class="portfolio-image-arrow" aria-hidden="true">↗</span>
      </a>
      <div class="portfolio-meta"><span>${p.label}</span><span aria-hidden="true">/</span><span>Smart Board</span></div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <a class="portfolio-text-link" href="${p.href || 'produk.html'}">Lihat ${p.href ? 'produknya' : 'produk terkait'} <span aria-hidden="true">→</span></a>
    </article>`;
  el.innerHTML = PORTFOLIO.map(makeCard).join("");

  const filters = document.querySelectorAll("[data-portfolio-filter]");
  filters.forEach(btn => btn.addEventListener("click", () => {
    const active = btn.dataset.portfolioFilter;
    filters.forEach(b => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    el.querySelectorAll(".portfolio-item").forEach(item => {
      const show = active === "all" || item.dataset.category === active;
      item.hidden = !show;
    });
  }));
}
