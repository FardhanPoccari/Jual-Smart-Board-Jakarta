const INFO = {
  panduan: ["Panduan Memilih Smart Board", "Tentukan ukuran dari jumlah peserta dan jarak duduk terjauh, pilih resolusi minimal 4K, pastikan ada touch multi-titik, dan cek garansi serta layanan instalasi."],
  ukuran: ["Perbedaan 65\", 75\", dan 86\"", "65\" cocok untuk ruang kecil (hingga 15 orang), 75\" untuk kelas atau meeting sedang, 86\" untuk ruang besar dan aula kecil."],
  sekolah: ["Smart Board untuk Sekolah", "Mendukung materi interaktif, anotasi langsung, dan penyimpanan catatan pelajaran. Layar tahan goresan dan aman digunakan siswa."],
  meeting: ["Smart Board untuk Meeting", "Presentasi nirkabel, whiteboard digital, dan video conference dalam satu layar."],
  rawat: ["Tips Merawat Smart Board", "Bersihkan dengan kain mikrofiber kering atau sedikit lembap, hindari cairan langsung, dan matikan layar saat tidak dipakai."]
};
function initModal() {
  const modal = document.getElementById("modal"), box = modal.querySelector(".modal-content");
  const close = () => modal.classList.remove("open");
  document.querySelectorAll("[data-info]").forEach(b => b.addEventListener("click", () => {
    const [t, d] = INFO[b.dataset.info]; box.innerHTML = `<h3>${t}</h3><p>${d}</p>`; modal.classList.add("open");
  }));
  modal.addEventListener("click", e => { if (e.target === modal || e.target.classList.contains("modal-close")) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}
