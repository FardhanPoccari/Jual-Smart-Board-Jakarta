document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.static-product-page [data-gallery]');
  if (gallery && typeof initGallery === 'function') initGallery(gallery);
});
