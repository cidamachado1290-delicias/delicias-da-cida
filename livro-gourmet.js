(function () {
  'use strict';
  const names = ["Capa original","A história da Cida","Sumário de doces gourmet","Bombons de chocolate ao leite","Bombons de chocolate branco","Brigadeiros especiais","Trufas","Especiais 1","Especiais 2","Fondados e doces no palito","Copinhos e tacinhas","Copinhos de chocolate ao leite","Copinhos de chocolate branco","Quadradinhos de chocolate","Enlace de Nozes e linha Gold","Ocasiões especiais","Opções personalizadas","Zuppa Inglesa e Torta Paulista","Tortas especiais","Delícias na taça","Naked Cake e Tsunami","Caseirinhos","Bolos gelados e Banoffee","Encerramento com QR Code","Contato Delícias da Cida"];
  const pages = names.map((name, i) => ({ name, src: 'assets/acervo-gourmet/pagina-' + String(i + 1).padStart(2, '0') + '.webp' }));
  const get = id => document.getElementById(id);
  const image = get('livro-image');
  const dialog = get('livro-dialog');
  const dialogImage = get('livro-dialog-image');
  const prev = get('livro-prev');
  const next = get('livro-next');
  const thumbs = get('livro-thumbs');
  const zoomPrev = get('livro-modal-prev');
  const zoomNext = get('livro-modal-next');
  const modalLabel = get('livro-modal-label');
  let current = 0;
  let lastFocused = null;

  function show(index) {
    current = Math.max(0, Math.min(pages.length - 1, index));
    const page = pages[current];
    const alt = 'Página ' + (current + 1) + ': ' + page.name;
    image.src = page.src;
    image.alt = alt;
    dialogImage.src = page.src;
    dialogImage.alt = alt;
    get('livro-page-label').textContent = String(current + 1).padStart(2, '0') + ' / ' + pages.length;
    get('livro-page-name').textContent = page.name;
    get('livro-progress-fill').style.width = ((current + 1) / pages.length * 100) + '%';
    modalLabel.textContent = String(current + 1).padStart(2, '0') + ' / ' + pages.length + ' — ' + page.name;
    prev.disabled = zoomPrev.disabled = current === 0;
    next.disabled = zoomNext.disabled = current === pages.length - 1;
    Array.from(thumbs.children).forEach((button, i) => {
      const active = i === current;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function openZoom() {
    if (dialog.open) return;
    lastFocused = document.activeElement;
    dialog.showModal();
    get('livro-close').focus();
  }

  thumbs.innerHTML = pages.map((page, i) => '<button type="button" class="livro-thumb" data-index="' + i + '" aria-label="Ir para página ' + (i + 1) + ': ' + page.name + '"><img src="' + page.src + '" alt="" loading="lazy"><span>' + String(i + 1).padStart(2, '0') + '</span></button>').join('');
  thumbs.addEventListener('click', event => {
    const button = event.target.closest('[data-index]');
    if (button) show(Number(button.dataset.index));
  });
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  zoomPrev.addEventListener('click', () => show(current - 1));
  zoomNext.addEventListener('click', () => show(current + 1));
  get('livro-zoom').addEventListener('click', openZoom);
  get('livro-image-button').addEventListener('click', openZoom);
  get('livro-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (!dialog.open && ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  function addSwipe(target) {
    let startX = null;
    let startY = null;
    target.addEventListener('touchstart', event => {
      if (event.touches.length !== 1) return;
      startX = event.changedTouches[0].screenX;
      startY = event.changedTouches[0].screenY;
    }, { passive: true });
    target.addEventListener('touchend', event => {
      if (startX === null || startY === null) return;
      const deltaX = event.changedTouches[0].screenX - startX;
      const deltaY = event.changedTouches[0].screenY - startY;
      startX = startY = null;
      if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        show(current + (deltaX < 0 ? 1 : -1));
      }
    }, { passive: true });
    target.addEventListener('touchcancel', () => { startX = startY = null; });
  }
  addSwipe(image);
  addSwipe(dialogImage);
  show(0);
})();
