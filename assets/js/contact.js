/* Form Kontak: tidak mengirim ke server, tapi membuka WhatsApp dengan pesan yang sudah terisi.
   Nomor WhatsApp memakai konstanta WA dari products.js. */
function initContact(form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const text = `Halo, saya ${d.get("nama")}. Saya tertarik dengan ${d.get("kebutuhan")}.` + (d.get("pesan") ? `\n\n${d.get("pesan")}` : "");
    window.open(waLink(text), "_blank", "noopener");
  });
}
