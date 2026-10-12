# Hero merek dengan foto penuh dan besar

Hikvision, Samsung, dan ZELT sekarang memakai struktur hero baru yang mengikuti contoh Beranda: foto mengisi seluruh latar, Smart Board terlihat besar di kanan, dan tulisan berada di kiri dengan gradasi gelap.

Tidak ada lagi kotak foto kecil, sudut membulat, caption di bawah foto, atau grid dua kolom pada hero merek. Foto diletakkan langsung sebagai anak section `.brand-banner`.

## Menggunakan ZIP terbaru

Ekstrak ZIP terbaru dan gunakan folder `jual-smartboard-jakarta` di dalamnya. Buka `index.html`, kemudian masuk ke halaman merek melalui menu Produk.

Jika ingin memperbarui folder proyek yang sudah kamu edit, salin empat file ini ke lokasi yang sama:

- `assets/css/brand-banner.css`
- `pages/produk-hikvision.html`
- `pages/produk-samsung.html`
- `pages/produk-zelt.html`

Pastikan tiga gambar `hero-hikvision-full.png`, `hero-samsung-full.png`, dan `hero-zelt-full.png` dari paket berada di `assets/images/hero/`. Setelah selesai, tekan Ctrl + F5.

## Mengganti foto

| Merek | File HTML | File foto di assets/images/hero/ |
| --- | --- | --- |
| Hikvision | `pages/produk-hikvision.html` | `hero-hikvision-full.png` |
| Samsung | `pages/produk-samsung.html` | `hero-samsung-full.png` |
| ZELT | `pages/produk-zelt.html` | `hero-zelt-full.png` |

Cari komentar `GAMBAR HERO PENUH` pada HTML merek. Ubah `src` pada `<img class="brand-banner-image">`. Simpan foto baru dalam folder hero dan cocokkan nama file serta ekstensi. Sesuaikan `alt`, `width`, dan `height` dengan gambar baru bila diperlukan.

## Mengatur besar gambar dan hero

Semua pengaturan baru ada di **`assets/css/brand-banner.css`**. Hero desktop setinggi 720 px. Pada desktop lebar, gambar diperbesar 1.45 kali dengan titik fokus di kanan, sehingga Smart Board mengisi sisi kanan seperti contoh. Pembesaran dikurangi pada tablet dan HP agar fokus gambar menyesuaikan lebar layar.

Ubah `--banner-zoom` untuk mengatur pembesaran foto. Ubah `--banner-height` untuk mengatur tinggi hero. Posisi foto berada pada `.brand-banner-image` melalui `object-position` dan `transform-origin`.

Teks, nama merek, deskripsi, dan tautan tombol tetap sama. Semua Produk, Beranda, Portofolio, Artikel, dan Kontak memakai tampilan sebelumnya.

Ketiga foto merek adalah ilustrasi ruang kelas dari referensi foto produk, bukan dokumentasi pemasangan pelanggan.
