/* Toshiko Sushi — catálogo digital
   Controla el carrusel del teléfono interactivo */

(function () {
  var CAMERA_ICON = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.3"/>' +
    '<path d="M8 7l1.6-2.4A1 1 0 0 1 10.4 4h3.2a1 1 0 0 1 .8.6L16 7" stroke="currentColor" stroke-width="1.3"/>' +
    '<circle cx="12" cy="13.5" r="3.4" stroke="currentColor" stroke-width="1.3"/></svg>';

  function photoTile(label, heightClass) {
    return '<div class="photo-tile ' + (heightClass || '') + '">' + CAMERA_ICON +
      '<span>' + label + '</span></div>';
  }

  var screens = [
    {
      title: 'Portada',
      desc: 'La primera impresión. Una fotografía protagonista y tu logo, sin ruido visual, para transmitir en un segundo que Toshiko es un restaurante serio y cuidado.',
      render: function () {
        return (
          '<div style="height:100%;display:flex;flex-direction:column;justify-content:flex-end;">' +
            photoTile('Fotografía principal de sushi', 'tile-full') +
          '</div>'
        );
      }
    },
    {
      title: 'Bienvenida y menú',
      desc: 'Una bienvenida breve y navegación clara hacia cada categoría real de tu carta, para que el cliente sepa de un vistazo qué puede pedir.',
      render: function () {
        return (
          '<div class="ph-logo">LOGO</div>' +
          '<p class="ph-caption" style="margin-bottom:14px;">Bienvenida breve de Toshiko</p>' +
          '<div class="ph-eyebrow">Explora el menú</div>' +
          '<div class="ph-pills">' +
            ['Promociones','Special Rolls','Fusión','California','Hot Rolls','Sushi Burger','Gohan','Hand Roll','Ceviches','Bebidas']
              .map(function (c) { return '<div class="ph-pill">' + c + '</div>'; }).join('') +
          '</div>'
        );
      }
    },
    {
      title: 'Página de producto',
      desc: 'Fotografía grande, nombre, descripción breve y precio siempre visible. Las etiquetas ayudan a destacar favoritos, novedades o versiones vegetarianas.',
      render: function () {
        return (
          '<div class="ph-eyebrow">Special Rolls</div>' +
          '<div class="ph-card">' +
            photoTile('Fotografía del plato') +
            '<div class="ph-card-head"><strong>Nombre del roll</strong><span class="ph-badge">Favorito</span></div>' +
            '<p class="ph-desc">Descripción breve del plato</p>' +
            '<p class="ph-price">$ XX.XXX</p>' +
          '</div>' +
          '<div class="ph-card">' +
            photoTile('Fotografía del plato') +
            '<div class="ph-card-head"><strong>Nombre del roll</strong><span class="ph-badge">Nuevo</span></div>' +
            '<p class="ph-desc">Descripción breve del plato</p>' +
            '<p class="ph-price">$ XX.XXX</p>' +
          '</div>'
        );
      }
    },
    {
      title: 'Promociones',
      desc: 'Pensada para vender: fotografía grande, ahorro visible cuando aplica y un botón de pedido inmediato.',
      render: function () {
        return (
          '<div class="ph-eyebrow">Promociones</div>' +
          '<div class="ph-card">' +
            photoTile('Fotografía de la promoción', 'tile-tall') +
            '<div class="ph-card-head"><strong>Nombre de la promo</strong></div>' +
            '<p class="ph-desc">Qué incluye la promoción</p>' +
            '<p class="ph-price">$ XX.XXX <span class="was">$ XX.XXX</span></p>' +
            '<div class="ph-btn">Pedir</div>' +
          '</div>'
        );
      }
    },
    {
      title: 'Favoritos Toshiko',
      desc: 'Una sección de "los más pedidos" para que un cliente nuevo decida rápido. Los productos reales los define el restaurante — hoy son espacios de ejemplo.',
      render: function () {
        return (
          '<div class="ph-eyebrow">Los más pedidos</div>' +
          '<p class="ph-caption">Favoritos de tus clientes</p>' +
          ['Producto 1','Producto 2','Producto 3'].map(function (p) {
            return '<div class="ph-list-item"><div class="ph-thumb"></div><span class="name">' + p + '</span><span class="val">$ XX.XXX</span></div>';
          }).join('')
        );
      }
    },
    {
      title: '¿Listo para pedir?',
      desc: 'La puerta de salida del catálogo: todos los canales de pedido y de contacto, reunidos en una sola pantalla con un botón principal.',
      render: function () {
        var rows = [
          ['WhatsApp'], ['Rappi'], ['DiDi'], ['Instagram'], ['Ubicación'], ['Horarios']
        ];
        return (
          '<div class="ph-eyebrow">¿Listo para pedir?</div>' +
          rows.map(function (r) {
            return '<div class="ph-row"><span class="dot"></span><span class="grow">' + r[0] + '</span><span class="chev">›</span></div>';
          }).join('') +
          '<div class="ph-btn" style="margin-top:10px;">Pedir ahora</div>'
        );
      }
    }
  ];

  var phoneScreen = document.getElementById('phoneScreen');
  var screenTitle = document.getElementById('screenTitle');
  var screenDesc = document.getElementById('screenDesc');
  var screenIndex = document.getElementById('screenIndex');
  var screenTotal = document.getElementById('screenTotal');
  var dotsWrap = document.getElementById('screenDots');
  var prevBtn = document.getElementById('prevScreen');
  var nextBtn = document.getElementById('nextScreen');

  var current = 0;
  var panes = [];

  function build() {
    screenTotal.textContent = screens.length;

    screens.forEach(function (s, i) {
      var pane = document.createElement('div');
      pane.className = 'screen-pane' + (i === 0 ? ' is-active' : '');
      pane.innerHTML = s.render();
      phoneScreen.appendChild(pane);
      panes.push(pane);

      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ir a ' + s.title);
      if (i === 0) dot.className = 'is-active';
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(i) {
    current = (i + screens.length) % screens.length;
    panes.forEach(function (p, idx) { p.classList.toggle('is-active', idx === current); });
    Array.prototype.forEach.call(dotsWrap.children, function (d, idx) {
      d.classList.toggle('is-active', idx === current);
    });
    screenTitle.textContent = screens[current].title;
    screenDesc.textContent = screens[current].desc;
    screenIndex.textContent = current + 1;
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  build();
  goTo(0);
})();
