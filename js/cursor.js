/* ═══════════════════════════════════════════════════════════
   VIREON — STANDALONE LUXURY ♱ CURSOR v2
   Works on every page, no dependencies.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.matchMedia('(hover:none)').matches) return;

  function setup() {
    // Inject keyframe + cursor:none CSS
    if (!document.getElementById('vcursor-style')) {
      var s = document.createElement('style');
      s.id = 'vcursor-style';
      s.textContent =
        '@keyframes vcGlow{' +
          '0%,100%{color:#D4AF37;text-shadow:0 0 8px rgba(212,175,55,.7),0 0 18px rgba(212,175,55,.3)}' +
          '50%{color:#F5D76E;text-shadow:0 0 22px rgba(212,175,55,1),0 0 44px rgba(212,175,55,.55)}' +
        '}' +
        'html.cca *,html.cca *::before,html.cca *::after{cursor:none!important}' +
        '@media(hover:none){html.cca *{cursor:auto!important}#vireon-cursor{display:none!important}}';
      document.head.appendChild(s);
    }

    // Create cursor div
    var c = document.getElementById('vireon-cursor');
    if (!c) {
      c = document.createElement('div');
      c.id = 'vireon-cursor';
      document.body.appendChild(c);
    }

    c.textContent = '\u2671'; // ♱
    c.setAttribute('style', [
      'position:fixed',
      'top:-100px',
      'left:-100px',
      'pointer-events:none',
      'z-index:2147483647',
      'transform:translate(-50%,-50%)',
      'font-size:1.45rem',
      'line-height:1',
      'color:#D4AF37',
      'text-shadow:0 0 8px rgba(212,175,55,.7),0 0 18px rgba(212,175,55,.3)',
      'animation:vcGlow 2.5s ease-in-out infinite',
      'will-change:left,top',
      'user-select:none',
      '-webkit-user-select:none',
      'transition:transform .1s ease,color .15s,text-shadow .15s',
      'font-family:serif'
    ].join(';'));

    // Activate cursor:none globally
    document.documentElement.classList.add('cca');

    // Track mouse
    document.addEventListener('mousemove', function (e) {
      c.style.left = e.clientX + 'px';
      c.style.top  = e.clientY + 'px';
    }, { passive: true });

    // Hover scale/rotate on interactive elements
    var SEL = 'a,button,input,select,textarea,label,[role="button"],.p-card,.cat-item,.btn,.vireon-logo,.ed-card,.tbl-action,.admin-link,.d-btn,.d-btn-ghost,.filter-chip,.sfb-chip,.nav-a,.v-action-btn,.page-btn,.rev-btn,.r-btn,.si-dot,.acc-card,.btn-gold,.btn-ghost,.btn-outline';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(SEL)) {
        c.style.transform = 'translate(-50%,-50%) scale(1.4) rotate(15deg)';
        c.style.color = '#F5D76E';
        c.style.textShadow = '0 0 28px rgba(212,175,55,1),0 0 55px rgba(212,175,55,.5)';
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(SEL)) {
        c.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)';
        c.style.color = '#D4AF37';
        c.style.textShadow = '0 0 8px rgba(212,175,55,.7),0 0 18px rgba(212,175,55,.3)';
      }
    });
    document.addEventListener('mousedown', function () {
      c.style.transform = 'translate(-50%,-50%) scale(0.7)';
    });
    document.addEventListener('mouseup', function () {
      c.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)';
    });
    document.addEventListener('mouseleave', function () { c.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { c.style.opacity = '1'; });
  }

  // Run as soon as possible
  if (document.body) {
    setup();
  } else {
    document.addEventListener('DOMContentLoaded', setup);
  }
})();
