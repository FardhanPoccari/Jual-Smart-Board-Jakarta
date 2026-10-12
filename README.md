# Jual Smart Board Jakarta

Buka `index.html` di browser (atau jalankan `npx serve`).

## Struktur
```
index.html                  Halaman utama
pages/produk.html           Katalog 27 produk (9 per brand), filter merek dan seri
pages/portofolio.html       Halaman Portofolio
pages/artikel.html          Halaman Artikel editorial dengan gambar + teks
pages/kontak.html           Halaman Kontak (WhatsApp, email, area layanan + peta)
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

- **Tambah produk**: data detail ada di `assets/js/products.js`; untuk menambah/mengubah kartu katalog, sesuaikan juga kartu di `pages/produk.html` dan halaman brand terkait.

- **Portofolio**: edit array `PORTFOLIO` di `assets/js/portfolio.js`, 12 foto ada di `assets/images/portfolio/`. Filter otomatis menyesuaikan kategori `ruang`, `produk`, dan `detail`. Saat ini ini **galeri referensi**, bukan dokumentasi pekerjaan pemasangan asli. Ganti foto dan keterangan dengan dokumentasi proyek jika sudah ada.

- **Menu navbar**: Beranda · Produk · Portofolio · Artikel · Kontak Kami (tiap menu = 1 halaman) + tombol Konsultasi Sekarang (ke WhatsApp). Navbar disalin di tiap file HTML, jadi kalau diubah, ubah di semua halaman.

- **Gambar produk**: taruh foto di `assets/images/products/`, lalu tulis nama filenya di kolom terakhir tiap `mk(...)` di `products.js`. Kalau file tidak ada, otomatis tampil gambar cadangan.

- **Nomor WhatsApp**: **+62 811-3791-1115** (`6281137911115` di tautan `wa.me`). Konstanta `WA` ada di `assets/js/products.js`; tautan statis tersebar di HTML.

- **Isi popup Informasi**: objek `INFO` di `assets/js/modal.js`.

- **Tampilan banner biru "Masih Bingung Memilih Smart Board?"**: `assets/css/cta.css`.

## Pembaruan tampilan (Oktober 2026)

- Nomor 01–06 di bagian Keunggulan digeser sedikit ke kanan (CSS `products.css`).
- Halaman **Portofolio** kini menampilkan 12 foto lokal (dioptimalkan ke `.webp`), tanpa gambar cadangan/dummy. Gambar berasal dari aset yang sudah ada di proyek. **Foto contoh ruangan bukan bukti hasil pemasangan pelanggan.**
- Halaman **Artikel** menggunakan editorial foto dan tulisan dengan tiga sorotan produk (label NEW berarti *sorotan baru di website*) serta tiga panduan. Isi bisa diedit langsung dari `pages/artikel.html`.
- Halaman **Kontak** hanya berisi WhatsApp, email, area Jakarta, dan sematan Google Maps. Peta masih menunjukkan **Jakarta secara umum** karena alamat kantor/toko spesifik belum tersedia.

**Penting sebelum publikasi:** nomor WhatsApp (`+62 811-3791-1115`) mengikuti revisi yang diminta. Pastikan email (`info@jualsmartboardjakarta.id`) dan alamat layanan benar; keduanya masih nilai dari proyek sebelumnya, bukan diverifikasi. Untuk lokasi kantor akurat, ganti URL `maps.google.com/maps?q=Jakarta...` di `pages/kontak.html` dengan alamat yang tepat, sekaligus perbarui teks lokasi. Peta memerlukan koneksi internet.

## Revisi katalog dan WhatsApp (Oktober 2026)

- Katalog `pages/produk.html` kini menampilkan **27 produk**: 9 Hikvision, 9 Samsung, 9 ZELT (termasuk aksesori), bukan hanya 3 kartu brand. Seluruh gambar memakai aset produk lokal dalam proyek.
- Filter **Merek** dan **Seri** di katalog, seri menyesuaikan merek terpilih; tersedia tombol detail yang membuka halaman produk yang sesuai. JavaScript filter ada di `assets/js/all-products.js`, tampilannya ada di `assets/css/all-products.css`.
- Menu navigasi Produk di seluruh halaman sekarang memiliki tautan **Semua Produk** di atas daftar merek.
- Seluruh nomor kontak dan tautan WhatsApp diperbarui menjadi **+62 811-3791-1115** (`https://wa.me/6281137911115`).

## Hero merek baru: foto penuh dan besar

- Hero Hikvision, Samsung, dan ZELT mengikuti contoh Beranda: foto mengisi seluruh section dan produk tampil besar di kanan.
- Struktur hero lama yang memiliki figure, kotak foto kecil, caption, dan grid dua kolom sudah dihapus dari ketiga HTML merek.
- CSS baru adalah `assets/css/brand-banner.css`. HTML merek sudah memuatnya dan tidak lagi memuat CSS hero versi sebelumnya.
- Tinggi desktop 720 px, lebar konten dan ukuran tulisan mengikuti gaya hero Beranda. Foto diperbesar pada desktop dan difokuskan ke kanan.
- Beranda, Semua Produk, Portofolio, Artikel, dan Kontak tetap memakai tampilan sebelumnya.
- Semua ilustrasi dan aset berada di dalam ZIP. Panduan penerapan ada di [PANDUAN-HERO.md](PANDUAN-HERO.md).
