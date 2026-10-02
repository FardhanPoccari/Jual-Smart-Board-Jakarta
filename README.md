# Jual Smart Board Jakarta

Buka `index.html` di browser (atau jalankan `npx serve`).

## Struktur
```
index.html                  Halaman utama
pages/produk.html           Halaman Produk (semua kartu produk)
pages/portofolio.html       Halaman Portofolio
pages/artikel.html          Halaman Artikel (popup isi di modal.js)
pages/kontak.html           Halaman Kontak Kami (form → WhatsApp)
pages/product-detail.html   Halaman detail produk
assets/
  css/   global · navbar · hero · products · portfolio · page · information · faq · cta · footer · responsive
  js/    products · portfolio · contact · hero-slider · navbar · animation · modal · faq · back-to-top · main
  images/
    logo/     logo.png              → logo di navbar
    hero/     hero-1.jpg, ...       → gambar/slideshow hero
    products/                        → foto tiap produk
    portfolio/                       → foto tiap proyek portofolio
    smartboard.svg                   → gambar cadangan (fallback)
```

## Yang sering diubah

- **Logo navbar**: ganti file `assets/images/logo/logo.png` dengan logo asli (disarankan persegi, mis. 160×160 px). Nama file boleh diganti asal disesuaikan juga di `<img class="brand-logo">` pada `index.html` dan `pages/product-detail.html`.

- **Gambar hero (bagian paling atas)**: taruh foto di `assets/images/hero/`, lalu daftarkan namanya di `assets/js/hero-slider.js` pada `HERO_IMAGES`.
  - Satu nama file → tampil sebagai satu gambar diam.
  - Dua nama file atau lebih → otomatis jadi slideshow (fade bergantian tiap 5 detik + titik navigasi di bawah, bisa diklik).
  - Ukuran disarankan 1920×1080 px agar tajam di layar lebar.

- **Tambah produk**: edit array `PRODUCTS` di `assets/js/products.js`.

- **Portofolio**: edit array `PORTFOLIO` di `assets/js/portfolio.js`, foto ditaruh di `assets/images/portfolio/`.

- **Menu navbar**: Beranda · Produk · Portofolio · Artikel · Kontak Kami (tiap menu = 1 halaman) + tombol Konsultasi Sekarang (ke WhatsApp). Navbar disalin di tiap file HTML, jadi kalau diubah, ubah di semua halaman.

- **Gambar produk**: taruh foto di `assets/images/products/`, lalu tulis nama filenya di kolom terakhir tiap `mk(...)` di `products.js`. Kalau file tidak ada, otomatis tampil gambar cadangan.

- **Nomor WhatsApp**: konstanta `WA` di `assets/js/products.js`, dan semua link `wa.me` di `index.html`.

- **Isi popup Informasi**: objek `INFO` di `assets/js/modal.js`.

- **Tampilan banner biru "Masih Bingung Memilih Smart Board?"**: `assets/css/cta.css`.
