(() => {
  'use strict';
  const products = [
    { name: 'Cômoda Miami', category: 'Quarto', image: 'comoda-miami.png', tagline: 'Um novo lugar para organizar seu mundo.', description: 'Uma peça de presença marcante para compor o quarto e dar espaço aos objetos que fazem parte da sua rotina.' },
    { name: 'Cozinha Tati', category: 'Cozinha', image: 'cozinha-tati.png', tagline: 'O cenário dos seus encontros cotidianos.', description: 'Uma nova possibilidade para o ambiente onde receitas, conversas e momentos se encontram. Explore a Cozinha Tati na composição da sua casa.' },
    { name: 'Home Painel Havana', category: 'Sala', image: 'home-havana.png', tagline: 'Seu momento de pausa tem lugar.', description: 'Uma peça para compor a sala e dar um novo cenário aos seus momentos de descanso, filmes e encontros em casa.' },
    { name: 'Cômoda Caribe', category: 'Quarto', image: 'comoda-caribe.png', tagline: 'Mais personalidade para o seu cantinho.', description: 'Organização e presença para o quarto. Conheça a Cômoda Caribe e imagine novas possibilidades para o seu espaço.' },
    { name: 'Gabinete Flora', category: 'Banheiro', image: 'gabinete-flora.png', tagline: 'Cuidado com cada espaço da casa.', description: 'Uma opção para compor o banheiro e acomodar os itens do dia a dia, trazendo a identidade Blue Moby também para esse ambiente.' },
    { name: 'Conjunto Amanda', category: 'Jantar', label: 'Sala de jantar', image: 'conjunto-amanda.png', tagline: 'As melhores histórias são compartilhadas.', description: 'Um convite para reunir as pessoas e compartilhar os momentos à mesa. Descubra o Conjunto Amanda para sua sala de jantar.' }
  ];
  const listings = {
    "Cômoda Miami": {
      "shopee": "https://shopee.com.br/product/1650267515/22699370464/"
    },
    "Cozinha Tati": {
      "shopee": "https://shopee.com.br/product/1650267515/56914668942/",
      "ml": "https://www.mercadolivre.com.br/p/MLB75693603?matt_tool=38524122&pdp_filters=item_id:MLB4937251061&ua=XmrpEEg0N0RvWuTdM8Y0rSIzrI82uLa8dJJKEuNypUkMWmA#origin=share&sid=share&wid=MLB4937251061&action=copy"
    },
    "Home Painel Havana": {
      "ml": "https://www.mercadolivre.com.br/p/MLB58251253?matt_tool=38524122&pdp_filters=item_id:MLB6482543684&ua=BXcCXfyAiV00yO4RKx2Zn84fAmBZmE00MKri6BPUd5DIJQM#origin=share&sid=share&wid=MLB6482543684&action=copy"
    },
    "Cômoda Caribe": {
      "shopee": "https://shopee.com.br/product/1650267515/56165372661/",
      "ml": "https://www.mercadolivre.com.br/p/MLB75697617?matt_tool=38524122&pdp_filters=item_id:MLB4937403875&ua=Cb2NGY1oua2c49Bim23L6zvyJd6-Vgiez-hu-7wgK-xu0OQ#origin=share&sid=share&wid=MLB4937403875&action=copy"
    },
    "Gabinete Flora": {
      "shopee": "https://shopee.com.br/product/1650267515/47665193310/",
      "ml": "https://www.mercadolivre.com.br/up/MLBU4500620402?matt_tool=38524122&pdp_filters=item_id:MLB4963960105&ua=HVxeqwZXb3s37tNl4IMiCERopx3Og1oQhRC0LmsC4jlwdlns#origin=share&sid=share&wid=MLB4963960105&action=copy"
    },
    "Conjunto Amanda": {
      "shopee": "https://shopee.com.br/product/1650267515/52267831560/",
      "ml": "https://www.mercadolivre.com.br/p/MLB67362550?matt_tool=38524122&pdp_filters=item_id:MLB7542158048&ua=MZ9lvuk-CC1l6QBQN8GqWJmxhHnM3GELYkGikQLoCu7drsE#origin=share&sid=share&wid=MLB7542158048&action=copy"
    }
  };
  const arrowMarkup = "<svg class=\"interactive-arrow\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 19 19 5M5 5h14v14\"/></svg>";
  const grid = document.querySelector('#product-grid');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const dialog = document.querySelector('#product-dialog');
  let selectedProduct = null;
  let opener = null;
  function render(category = 'Todos') {
    const visible = products.filter(p => category === 'Todos' || p.category === category);
    grid.replaceChildren();
    visible.forEach(p => {
      const card = document.createElement('article'); card.className = 'product-card';
      card.innerHTML = `<button class="product-trigger" aria-label="Ver detalhes de ${p.name}"><div class="product-image"><img src="../assets/${p.image}" alt="${p.name}" loading="lazy"><span class="product-view" aria-hidden="true">${arrowMarkup}</span></div><div class="product-info"><small>${p.label || p.category}</small><h3>${p.name.slice(0, p.name.lastIndexOf(" "))} <em>${p.name.slice(p.name.lastIndexOf(" ") + 1)}</em></h3><p>${p.tagline}</p></div></button>`;
      card.querySelector('button').addEventListener('click', e => openProduct(p, e.currentTarget)); grid.append(card);
    });
    filters.forEach(b => { const active = b.dataset.filter === category; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    document.querySelector('#result-count').textContent = `${visible.length} ${visible.length === 1 ? 'peça' : 'peças'} na seleção`;
    document.querySelector('#empty-state').hidden = visible.length !== 0;
  }
  function openProduct(p, button) {
    selectedProduct = p; opener = button;
    document.querySelector('#dialog-image').src = `../assets/${p.image}`;
    document.querySelector('#dialog-image').alt = p.name;
    document.querySelector('#dialog-category').textContent = p.label || p.category;
    document.querySelector('#dialog-title').textContent = p.name;
    document.querySelector('#dialog-description').textContent = p.description;
    document.querySelector('#copy-status').textContent = '';
    const storeContainer = document.querySelector('.dialog-stores');
    storeContainer.replaceChildren();
    const available = listings[p.name];
    const platforms = [
      { key: 'ml', label: 'Ver anúncio no Mercado Livre', logo: 'mercado-livre.png' },
      { key: 'shopee', label: 'Ver anúncio na Shopee', logo: 'shopee.svg' }
    ];
    platforms.forEach(platform => {
      if (!available[platform.key]) return;
      const link = document.createElement('a');
      link.href = available[platform.key];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = '<img src="../assets/' + platform.logo + '" alt="" width="25" height="22"><span>' + platform.label + '</span><span aria-hidden="true">' + arrowMarkup + '</span><span class="sr-only"> (abre em nova aba)</span>';
      storeContainer.append(link);
    });
    document.querySelector('.detail-note p').textContent = Object.keys(available).length === 1
      ? 'Este produto está disponível ' + (available.shopee ? 'na Shopee.' : 'no Mercado Livre.') + ' Acesse o anúncio para conferir os detalhes.'
      : 'Escolha a plataforma e veja o anúncio deste produto com medidas, acabamentos e condições de compra.';
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  filters.forEach(b => b.addEventListener('click', () => render(b.dataset.filter)));
  document.querySelectorAll('[data-category]').forEach(a => a.addEventListener('click', () => render(a.dataset.category)));
  document.querySelector('#reset-filter').addEventListener('click', () => { render(); filters[0].focus(); });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
  document.querySelector('#copy-product').addEventListener('click', async () => {
    const name = selectedProduct.name;
    try { await navigator.clipboard.writeText(`${name} — Blue Moby`); document.querySelector('#copy-status').textContent = 'Nome copiado!'; }
    catch { document.querySelector('#copy-status').textContent = `Copie este nome: ${name} — Blue Moby`; }
  });
  const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav');
  function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); }
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear(); render();


})();



(() => {
  'use strict';
  const strip = document.querySelector('.brand-strip');
  const pauseButton = document.querySelector('.marquee-toggle');
  pauseButton.addEventListener('click', () => {
    const paused = strip.classList.toggle('is-paused');
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Retomar letreiro' : 'Pausar letreiro');
  });

  const tabs = [...document.querySelectorAll('.market-tab')];
  function selectMarket(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectMarket(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectMarket(tabs[next]);
      tabs[next].focus();
    });
  });
})();
