/* Foto produk dan ilustrasi penempatan; foto ruangan bukan dokumentasi pelanggan.
   imagePath memakai aset ruangan yang juga digunakan di Beranda. */
const PORTFOLIO = [
  {title:"Smart Board untuk Ruang Kelas", category:"ruang", label:"Ilustrasi Ruangan", imagePath:"assets/images/optimized/ruang-kelas.webp", desc:"Materi pelajaran, anotasi, dan diskusi bersama pada layar yang mudah dijangkau guru serta siswa.", alt:"Ilustrasi Smart Board di ruang kelas untuk pembelajaran interaktif", href:"artikel-smart-board-ruang-kelas.html", linkLabel:"Baca panduan ruangan"},
  {title:"Smart Board untuk Ruang Rapat", category:"ruang", label:"Ilustrasi Ruangan", imagePath:"assets/images/optimized/ruang-rapat.webp", desc:"Presentasi, pencatatan ide, dan pembahasan dokumen dalam satu area kerja bersama tim.", alt:"Ilustrasi Smart Board di ruang rapat kantor", href:"artikel-smart-board-ruang-rapat.html", linkLabel:"Baca panduan ruangan"},
  {title:"Smart Board untuk Ruang Pelatihan", category:"ruang", label:"Ilustrasi Ruangan", imagePath:"assets/images/optimized/ruang-pelatihan.webp", desc:"Instruktur dapat menampilkan modul, menandai poin penting, dan mengulas hasil latihan bersama peserta.", alt:"Ilustrasi layar interaktif di ruang pelatihan", href:"artikel-tips-memilih-smart-board.html", linkLabel:"Baca tips pemilihan"},
  {title:"Smart Board untuk Laboratorium Komputer", category:"ruang", label:"Ilustrasi Ruangan", imagePath:"assets/images/optimized/laboratorium-komputer.webp", desc:"Demonstrasi aplikasi dan langkah praktikum ditampilkan di depan kelas agar mudah diikuti dari komputer masing-masing.", alt:"Ilustrasi Smart Board di laboratorium komputer", href:"artikel-laboratorium-bengkel-rpl.html", linkLabel:"Baca panduan ruangan"},
  {title:"Smart Board untuk Bengkel RPL", category:"ruang", label:"Ilustrasi Ruangan", imagePath:"assets/images/optimized/bengkel-rpl.webp", desc:"Bahas kode, diagram alur, dan rancangan antarmuka bersama saat praktik Rekayasa Perangkat Lunak.", alt:"Ilustrasi Smart Board untuk praktik di bengkel Rekayasa Perangkat Lunak", href:"artikel-laboratorium-bengkel-rpl.html", linkLabel:"Baca panduan ruangan"},
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
      <button type="button" class="portfolio-image ${p.category === 'ruang' ? 'is-room' : 'is-product'}" data-portfolio-preview aria-label="Perbesar gambar ${p.title}">
        <img src="${BASE}${p.imagePath || `assets/images/portfolio/${p.image}`}" alt="${p.alt}" width="760" height="520" loading="lazy" decoding="async" />
        <span class="portfolio-image-arrow" aria-hidden="true">↗</span>
      </button>
      <div class="portfolio-meta"><span>${p.label}</span><span aria-hidden="true">/</span><span>Smart Board</span></div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <a class="portfolio-text-link" href="${p.href || 'produk.html'}">${p.linkLabel || (p.href ? 'Lihat produknya' : 'Lihat produk terkait')} <span aria-hidden="true">→</span></a>
    </article>`;
  el.innerHTML = PORTFOLIO.map(makeCard).join("");
  initPortfolioLightbox(el);
  el.closest('.portfolio-section')?.setAttribute('data-portfolio-ready', 'true');

  const filters = document.querySelectorAll("[data-portfolio-filter]");
  filters.forEach(btn => {
    const category = btn.dataset.portfolioFilter;
    const label = btn.textContent.replace(/\s*\(\d+\)\s*$/, '');
    const count = category === 'all' ? PORTFOLIO.length : PORTFOLIO.filter(p => p.category === category).length;
    btn.textContent = `${label} (${count})`;
  });
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



/* Accessible lightbox: Escape, panah, next/previous, fokus kembali ke pemicu. */
function initPortfolioLightbox(grid) {
  const all = [...grid.querySelectorAll('.portfolio-item')];
  const modal = document.createElement('div');modal.className='portfolio-lightbox';modal.hidden=true;
  modal.innerHTML='<div class="portfolio-lightbox-panel" role="dialog" aria-modal="true" aria-labelledby="portfolio-lightbox-title"><button type="button" class="portfolio-lightbox-close" aria-label="Tutup gambar">×</button><button type="button" class="portfolio-lightbox-prev" aria-label="Gambar sebelumnya">‹</button><figure><img alt=""><figcaption id="portfolio-lightbox-title"></figcaption></figure><button type="button" class="portfolio-lightbox-next" aria-label="Gambar berikutnya">›</button></div>';
  document.body.append(modal);
  let active=0,trigger=null,previousOverflow='';
  const visible=()=>all.filter(item=>!item.hidden);
  function show(index){const cards=visible();if(!cards.length){close();return}active=(index+cards.length)%cards.length;const card=cards[active];const img=card.querySelector('.portfolio-image img');modal.querySelector('figure img').src=img.currentSrc||img.src;modal.querySelector('figure img').alt=img.alt;modal.querySelector('figcaption').textContent=card.querySelector('h3').textContent;modal.querySelector('.portfolio-lightbox-prev').hidden=cards.length<2;modal.querySelector('.portfolio-lightbox-next').hidden=cards.length<2}
  function close(){if(modal.hidden)return;modal.hidden=true;document.body.style.overflow=previousOverflow;trigger?.focus()}
  grid.addEventListener('click',e=>{const button=e.target.closest('[data-portfolio-preview]');if(!button)return;trigger=button;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';modal.hidden=false;show(visible().indexOf(button.closest('.portfolio-item')));modal.querySelector('.portfolio-lightbox-close').focus()});
  modal.querySelector('.portfolio-lightbox-close').addEventListener('click',close);
  modal.querySelector('.portfolio-lightbox-prev').addEventListener('click',()=>show(active-1));
  modal.querySelector('.portfolio-lightbox-next').addEventListener('click',()=>show(active+1));
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape'){close();e.preventDefault()}else if(e.key==='ArrowRight'){show(active+1);e.preventDefault()}else if(e.key==='ArrowLeft'){show(active-1);e.preventDefault()}else if(e.key==='Tab'){const stops=[...modal.querySelectorAll('button:not([hidden])')];const idx=stops.indexOf(document.activeElement);if(e.shiftKey&&idx<=0){e.preventDefault();stops.at(-1)?.focus()}else if(!e.shiftKey&&idx===stops.length-1){e.preventDefault();stops[0]?.focus()}}});
}
