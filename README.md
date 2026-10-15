# Jual Smart Board Jakarta — Revisi 14 + P1/P2/P3 dalam review

Website HTML, CSS, dan JavaScript yang siap digunakan di GitHub Pages. Semua halaman, gambar, dan fitur sudah terintegrasi; tidak memerlukan backend atau build npm.

## Status revisi

- Baseline `main`: commit `840e2de` (Revisi 14), berhasil dideploy pada 13 Oktober 2026 melalui [Pages run #10](https://github.com/FardhanPoccari/Jual-Smart-Board-Jakarta/actions/runs/38365022641).
- P1: commit `b0e7245`; P2: commit terpisah sesudahnya pada branch `revisi-1/perbaikan-p1`.
- Perubahan P1/P2/P3 ditinjau di [Draft PR #1](https://github.com/FardhanPoccari/Jual-Smart-Board-Jakarta/pull/1). Branch revisi belum di-merge atau dideploy. P3 menggunakan baseline `ff7e112` dan disimpan sebagai commit berikutnya.
- Metrik Lighthouse sebelum/sesudah dan catatan P3 tersedia di [docs/REVISI-3.md](docs/REVISI-3.md).
- Cakupan, pengujian, dan batasan P1/P2 tersedia di [docs/REVISI-1-2.md](docs/REVISI-1-2.md).

## Menjalankan website

1. Ekstrak ZIP. Folder yang berisi `index.html` adalah root website.
2. Buka `index.html` langsung, atau jalankan `python -m http.server 8000` dari folder tersebut.
3. Untuk server lokal, buka `http://localhost:8000/`. VS Code Live Server juga dapat digunakan.

## Perbaikan Revisi 14

- Pencarian katalog mencocokkan setiap kata, tanpa bergantung urutan atau tanda baca. Contoh: `Samsung WA75D`, `WA75D Samsung`, `DS D5C65RB A`, dan `DSD5C65RBA`.
- Filter merek, seri, ukuran, dan kata kunci tetap bekerja bersama. Hasil kosong, reset, tombol hapus pencarian, dan URL filter tetap tersedia.
- Galeri Samsung WAD pada URL detail lama sudah memakai WebP yang tersedia. Semua 27 halaman detail statis tetap tersedia.
- Spesifikasi dan ringkasan fitur 12 Smart Board Samsung/Hikvision dilengkapi berdasarkan sumber resmi. Tautan sumber ditampilkan pada detail; data HTML dan detail lama konsisten.
- Portofolio memuat 14 referensi: 5 ilustrasi ruangan, 5 galeri produk, serta 4 detail/aksesoris. Lima ruangan adalah kelas, rapat, pelatihan, laboratorium komputer, dan bengkel RPL. Filter dan lightbox tetap berfungsi.
- Kontak menggunakan keterangan kunjungan yang lebih jelas dan alamat pada titik Maps yang sudah ada. Nomor WhatsApp dan email tetap sama.
- Input pencarian mobile berukuran 16 px; tombol hapus berukuran 44 × 44 px.
- Animasi pada Solusi, FAQ, dan Kontak dibatasi di dalam section agar tidak menimbulkan scroll horizontal saat elemen belum terlihat.
- Panduan SEO disesuaikan untuk GitHub Pages project site.

## Melanjutkan pengerjaan melalui branch revisi

Gunakan clone repository dan branch revisi; jangan menyalin ZIP menimpa seluruh repository tanpa membandingkan isinya.

```powershell
git clone https://github.com/FardhanPoccari/Jual-Smart-Board-Jakarta.git
cd Jual-Smart-Board-Jakarta
git fetch origin
git switch revisi-1/perbaikan-p1
```

Periksa `git status` dan lakukan pengujian sebelum menyimpan perubahan. Push hanya ke branch revisi yang telah disetujui. Push/merge ke `main` dapat memicu publikasi Pages; merge dan deployment memerlukan persetujuan terpisah.

## URL publik dan SEO

URL dasar: `https://fardhanpoccari.github.io/Jual-Smart-Board-Jakarta/`. Log Pages membuktikan deployment baseline Revisi 14 berhasil. Hal itu tidak menggantikan pengujian HTTP/tampilan publik; audit revisi menggunakan Chromium lokal karena akses publik terbatas.

- Canonical, Open Graph, dan sitemap mempertahankan URL project tersebut.
- `sitemap.xml` mencakup 43 halaman publik. Detail lama `product-detail.html?id=...` tetap memakai `noindex,follow` untuk menghindari duplikasi.
- **Penting:** Google mengambil robots.txt dari root host, yaitu `https://fardhanpoccari.github.io/robots.txt`, bukan dari `/Jual-Smart-Board-Jakarta/robots.txt`. File di ZIP tetap tersedia untuk penggunaan di domain sendiri, tetapi tidak mengendalikan crawler pada project site.
- Kirim URL lengkap `https://fardhanpoccari.github.io/Jual-Smart-Board-Jakarta/sitemap.xml` melalui menu Sitemaps di Google Search Console setelah memverifikasi properti website.
- Jika Anda mengelola site root akun GitHub tersebut, contoh robots.txt ada di `docs/robots-host-root.example.txt`. Jangan menimpa aturan host yang sudah ada; gabungkan baris Sitemap bila diperlukan. File contoh di dalam folder docs tidak aktif sebagai robots.txt.
- Bila domain berubah, perbarui semua canonical, Open Graph, Product JSON-LD, sitemap, dan baris Sitemap di robots.txt menggunakan URL publik yang sudah benar.

Referensi: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec

## Aset dan informasi produk

83 gambar WebP dan satu SVG dipertahankan. Foto aula/auditorium tetap disimpan sebagai aset lama, tetapi tidak dipakai sebagai contoh ruangan Smart Board di Portofolio. Gambar ruangan merupakan ilustrasi penggunaan, bukan dokumentasi instalasi pelanggan.

Beberapa ukuran memakai foto seri yang sama. Spesifikasi numerik yang belum dapat dikaitkan dengan varian unit tidak ditambahkan. Katalog ZELT, termasuk Pro 85 inch, dipertahankan; ukuran, versi OS, RAM, penyimpanan, kompatibilitas aksesoris, isi paket, serta ketersediaan perlu dicocokkan dengan datasheet unit sebelum transaksi.

Laporan Revisi 12/13/14 tidak tersedia dalam baseline repository; dokumentasi ini tidak mengklaim telah memulihkannya. Riwayat dapat diperiksa melalui commit GitHub. Gunakan [docs/REVISI-1-2.md](docs/REVISI-1-2.md) untuk catatan P1/P2 yang benar-benar tersedia.
