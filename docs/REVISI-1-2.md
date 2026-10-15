# Catatan Revisi 1 (P1) dan Revisi 2 (P2)

Baseline: Revisi 14, `840e2dee4c6d8de1a239b39b8c08c0bab9a37a9c`.
Branch: `revisi-1/perbaikan-p1`. Review: [Draft PR #1](https://github.com/FardhanPoccari/Jual-Smart-Board-Jakarta/pull/1).
P1 disimpan sebagai commit `b0e72450247f34c5cfe4e86fdb19f82c36a179f9`; P2 sebagai commit berikutnya yang terpisah. Belum ada merge atau deployment revisi ini.

## P1 yang dipertahankan

- Pemulihan scroll berdasarkan query katalog terkini, termasuk BFCache.
- Dropdown desktop memakai state yang sama untuk hover, Escape, klik, dan ARIA.
- CTA hover `#365fba`: kontras teks putih sekitar 6,00:1.
- Konten default terlihat; animasi diaktifkan setelah observer siap. Navigasi, FAQ, hero, dan 14 kartu portofolio tersedia tanpa JavaScript.

## Cakupan P2

- Alt, label galeri, dan nama tombol detail lama mengikuti produk serta ukuran yang dipilih, juga ketika set gambar tidak berubah.
- Thumbnail memakai tombol native dalam group, `aria-pressed`, `aria-controls`, indikator aktif, fokus terlihat, ArrowLeft/ArrowRight/Home/End, serta pengumuman gambar aktif melalui live region. Enter/Space tetap memakai perilaku tombol native.
- Galeri Hikvision memakai foto detail berlabel model yang sesuai: Ultra DS-D5C75RB/A mempunyai tiga foto detail; Performance DS-D5B65RB/EP mempunyai dua. Kedua detail statis sudah memakai aset ini dalam baseline; tidak ada foto tambahan yang dibuat.
- Detail lama diselaraskan: foto detail model 75 Ultra/65 Performance tidak ditambahkan ke varian lain. Asetnya tetap disimpan. Empat varian lain tetap memakai foto utama seri yang sudah tersedia; foto detail spesifik ukuran belum tersedia.
- Nama `DS-D5C75RB-3 detail 3.webp` dipertahankan; berkas berada di folder model DS-D5C75RB-A dan menampilkan sudut sisi yang konsisten dengan dua foto lain. Pemeriksaan berbasis berkas repository dan inspeksi visual, bukan verifikasi unit fisik.
- Empat metadata Open Graph dilengkapi pada halaman Hikvision, Samsung, dan ZELT. URL canonical/og:url tidak berubah.
- Heading footer pada 44 HTML menjadi H2; CSS mempertahankan ukuran 1em, bobot 700, dan margin 10px seperti H4 sebelumnya.
- Galeri portofolio mendapat H2 section yang tersedia untuk teknologi bantu tanpa perubahan visual, agar kartu H3 pada fallback HTML P1 tidak melompati H1 ke H3.
- README merujuk dokumen yang tersedia dan membedakan deployment baseline dari revisi draft. Laporan lama yang hilang tidak direka ulang.
- `.gitignore` menjadi UTF-8 dengan pola `.vscode/`. File editor yang sudah tracked tidak dihapus; aturan ignore tidak berlaku surut pada file tracked.

## Pengujian dan batasan

Eksekusi P2 pada 14 Oktober 2026, setelah commit P1:

| Kelompok | Assertion tercatat | Hasil |
|---|---:|---|
| P2: 27 galeri statis, 8 keluarga varian legacy, 6 model Hikvision, OG, heading, dokumentasi, ignore, tipografi | 389 | 388 lulus; 1 lompatan heading portofolio ditemukan |
| Regresi P1 dan fitur pada 390/768/1440 px | 211 | Semua lulus |
| BFCache HTTP nyata, template bersama, reduced motion | 14 | Semua lulus |
| Pengujian terarah setelah memperbaiki heading portofolio | 5 | Semua lulus |
| Total eksekusi tercatat | 619 | 618 lulus; 1 kegagalan awal sudah diperbaiki dan lolos retest |

Tidak ada kegagalan yang belum ditangani. Delapan observasi tambahan (scroll, hero, rasio kontras, BFCache) tidak dihitung sebagai assertion. Satu percobaan awal skrip P2 gagal mengekspor JSON karena nilai bytes pada laporan; skrip pencatatan diperbaiki dan P2 dijalankan ulang. Percobaan tanpa laporan lengkap itu tidak termasuk hitungan tabel.

Scroll Back tetap tepat: 5266→5266 px (390), 3556→3556 px (768), dan 2068→2068 px (1440). BFCache nyata teramati `persisted=true` dan mempertahankan 5266 px. Rasio CTA hover tetap 5,995:1. Footer baru mempunyai tipografi computed yang sama dengan baseline P1. Syntax JS dan `git diff --check` juga lulus sebagai pemeriksaan terpisah.

Pengujian menggunakan Chromium lokal, dengan font/layanan eksternal diisolasi. Safari/iOS, pembaca layar nyata, perangkat fisik, Google rich-result validator, dan website publik belum diuji. Event swipe diuji secara sintetis. Skor PSI/CWV tidak diukur.

## Pekerjaan yang tersisa

- Foto detail spesifik empat varian Hikvision lain dan verifikasi datasheet/stok ZELT perlu materi yang sesuai.
- Pengurangan CSS/JS, font, responsive images, pembersihan aset, dan CI berada di luar tahap P2 ini.
- Robots efektif pada root host dan hasil indeks perlu diperiksa melalui akses publik/Search Console.
- Merge dan deployment menunggu persetujuan terpisah.
