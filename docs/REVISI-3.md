# Revisi 3 — PageSpeed dan Web Performance

Baseline: `ff7e1122b285c8190f60851ae61c9efde1349c25`. Branch: `revisi-1/perbaikan-p1`. [Draft PR #1](https://github.com/FardhanPoccari/Jual-Smart-Board-Jakarta/pull/1). P3 adalah commit tersendiri setelah P2; belum di-merge atau dideploy.

## Kondisi pengukuran

Lighthouse 13.5.0, Chromium lokal, server HTTP tanpa kompresi, cache browser baru untuk setiap run. Mobile: 412×823, DPR 1,75, simulasi RTT 150 ms/1638,4 Kbps/CPU ×4. Desktop: 1350×940, DPR 1, RTT 40 ms/10240 Kbps/CPU ×1. Uji layout tambahan menggunakan 390/768/1440 px.

Google Fonts tidak dapat diakses. Pada baseline, URL @import Google diganti hanya dalam respons server uji dengan stylesheet font cermin lokal; Inter WOFF2 yang dipakai persis sama dengan versi sesudah. Source baseline tetap tidak berubah. Ini mempertahankan rantai import baseline, tetapi tidak mensimulasikan DNS/TLS/CDN Google. Karena itu angka bukan PSI publik atau performa hosting GitHub Pages. Tidak ada klaim INP lapangan.

8 run baseline dan 8 run final diambil berurutan. Ada 8 run eksplorasi sesudah yang berlangsung bersama regresi; hasilnya tidak digunakan untuk tabel karena noise CPU/TBT. Tidak menggunakan nilai terbaik dari beberapa run.

## Metrik final sebelum → sesudah

| Halaman / profil | Skor lab | FCP (s) | LCP (s) | CLS | TBT (ms) | Payload (KiB) |
|---|---:|---:|---:|---:|---:|---:|
| home / mobile | 70 → 97 | 1.959 → 1.503 | 3.459 → 2.554 | 0.442 → 0.000 | 0.0 → 0.0 | 1005.3 → 437.7 |
| catalog / mobile | 77 → 99 | 1.969 → 1.503 | 2.419 → 2.031 | 0.420 → 0.000 | 2.0 → 0.0 | 293.1 → 267.7 |
| detail / mobile | 74 → 98 | 1.812 → 1.356 | 3.072 → 2.259 | 0.388 → 0.000 | 1.5 → 0.0 | 355.2 → 228.2 |
| article / mobile | 73 → 97 | 1.957 → 1.504 | 3.156 → 2.556 | 0.420 → 0.000 | 0.0 → 0.0 | 298.9 → 240.6 |
| home / desktop | 92 → 100 | 0.453 → 0.363 | 0.751 → 0.726 | 0.169 → 0.000 | 0.0 → 0.0 | 1005.3 → 437.7 |
| catalog / desktop | 92 → 100 | 0.490 → 0.367 | 0.610 → 0.531 | 0.170 → 0.000 | 0.0 → 0.0 | 539.1 → 513.7 |
| detail / desktop | 94 → 100 | 0.448 → 0.330 | 0.697 → 0.503 | 0.145 → 0.000 | 0.0 → 0.0 | 355.2 → 228.2 |
| article / desktop | 92 → 100 | 0.489 → 0.365 | 0.767 → 0.668 | 0.170 → 0.000 | 0.0 → 0.0 | 648.0 → 589.7 |

## Optimasi yang diterapkan

- Inter normal variable 400–900 dilayani dari assets/fonts/inter-latin-variable.woff2 (48.256 byte), dengan font-display: swap dan preload crossorigin. Bobot 900 masih dipakai CSS, sehingga dipertahankan; tidak memuat font italic atau bobot/file eksternal yang tidak dibutuhkan. Lisensi SIL OFL disertakan.
- State nav-pending dipasang sebelum paint dan dilepas saat load. CSS fallback tanpa JS tetap tersedia, tetapi tidak sempat membuat header relatif lalu fixed pada jalur JS normal. Ini menanggulangi pergeseran main besar yang terlihat dalam trace baseline; P1 dropdown/ARIA tidak diimplementasi ulang.
- Script eksternal menggunakan defer dalam urutan dependensi yang sama. Hanya modul fitur yang ada di DOM yang dimuat; main.js memanggil modul opsional jika tersedia.
- Controller galeri P2 dipindahkan ke gallery.js agar 27 detail statis tidak perlu memuat dataset produk lengkap. Dataset/spesifikasi tetap ada pada products.js untuk detail legacy.
- CSS hero/FAQ/modal/CTA/portofolio yang tidak berlaku pada jenis halaman tertentu tidak dimuat. Aturan intro dipindahkan ke global.css agar animasi tetap sama. CSS bersama yang berisiko dipisah, terutama products.css, dipertahankan.
- 30 thumbnail WebP nyata (maksimal 176×176, quality 88) dibuat dari foto yang sudah ada. Foto asli tidak dikompresi ulang atau dihapus. Gambar penuh galeri sekunder dimuat saat dipilih, dengan preload tetangga setelah interaksi. Gambar aktif/LCP tetap tersedia sejak HTML dan berprioritas tinggi.
- Empat ilustrasi ruangan nonaktif memakai data-src dan dimuat saat dipilih; gambar ruangan pertama serta seluruh teks tetap tersedia tanpa JS.
- 30 gambar HTML yang belum memiliki dimensi dilengkapi dengan dimensi intrinsik asli. Area galeri tetap memakai aspect-ratio yang ada.
- Tidak memasang srcset/sizes pada foto utama tanpa varian resolusi yang sesuai: thumbnail 176px dibuat untuk slot thumbnail, bukan sebagai alternatif foto LCP. Hero asli yang sudah kecil (79 KB) dan kualitas gambar penuh dipertahankan.

## Pengujian regresi yang tercatat

| Kelompok | Assertion | Hasil |
|---|---:|---|
| P1 dan fitur pada 390/768/1440 | 211 | Lulus |
| P2: 27 galeri, 8 keluarga varian, metadata/heading/docs | 388 | Lulus |
| BFCache HTTP nyata, template, reduced motion | 14 | Lulus |
| Geometri 7 halaman ×3 viewport, resource/error, decoding 13 gambar galeri ×3 | 144 | Lulus |
| Integritas 44 HTML, canonical/JSON-LD, src/data-src/href, dimensi, gambar asli, lisensi/dependency | 8 | Lulus |
| Total | 765 | Semua lulus |

BFCache nyata teramati persisted=true dan mengembalikan 5293→5293 px. Tipografi/geometri layout final dibandingkan dengan P2 menggunakan Inter yang sama dan tidak berubah. Semua foto penuh pada galeri representatif berhasil didekode setelah dipilih. Syntax JS dan git diff --check lulus sebagai pemeriksaan tambahan.

Satu percobaan skrip pemeriksaan visual berhenti karena ekspresi QA tidak valid; ekspresi diperbaiki dan run lengkap dicatat. Percobaan parsial itu tidak masuk jumlah assertion di atas. Server benchmark hanya menyajikan salinan website terisolasi; tidak menyajikan seluruh workspace.

## Batasan dan sisa pekerjaan

- Nilai adalah satu run per kombinasi halaman/profil, bukan median multi-run atau data pengguna nyata; ada variasi antar-run.
- LCP mobile beranda/artikel masih sekitar 2,55 s, sedikit di atas 2,5 s. Peluang berikutnya perlu pengukuran publik dan varian gambar utama yang menjaga kualitas.
- CSS bersama masih dapat diperkecil melalui pemisahan komponen lebih lanjut, tetapi ditunda untuk membatasi risiko perubahan desain.
- Foto utama belum memiliki srcset/sizes; varian yang tepat belum dibuat.
- Font eksternal/Maps, Safari/iOS, perangkat fisik, pembaca layar, dan PSI publik belum diverifikasi. Swipe memakai event sintetis.
- Skor lab 97–100 bukan jaminan skor PSI atau Core Web Vitals lapangan.
- Lighthouse dan Fontsource hanya dipasang pada folder alat QA di luar repository; tidak menambah package.json/framework/dependency runtime.
- Merge, deployment, serta pengujian final P4 menunggu persetujuan pengguna.
