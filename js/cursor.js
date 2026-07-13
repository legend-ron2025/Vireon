/* ═══════════════════════════════════════════════════════════
   VIREON — STANDALONE LUXURY ♱ CURSOR
   Loads on every page independently of vireon.js
   ═══════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  // Don't run on touch devices
  if (window.matchMedia('(hover:none)').matches) return;

  // Create cursor element if not already in DOM
  function getOrCreate(id, tag) {
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tag || 'div');
      el.id = id;
      document.body.appendChild(el);
    }
    return el;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var c = getOrCreate('v-cursor');

    // Style the ♱ cursor
    c.textContent = '\u2671'; // ♱
    c.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'pointer-events:none',
      'z-index:999999',
      'transform:translate(-50%,-50%)',
      'font-size:1.45rem',
      'line-height:1',
      'color:#D4AF37',
      'text-shadow:0 0 8px rgba(212,175,55,.7),0 0 18px rgba(212,175,55,.3)',
      'animation:cursorGlow 2.5s ease-in-out infinite',
      'will-change:left,top',
      'user-select:none',
      '-webkit-user-select:none',
      'transition:transform .12s ease,color .2s'
    ].join(';');

    // Inject keyframe if not already present
    if (!document.getElementById('cursor-keyframes')) {
      var style = document.createElement('style');
      style.id = 'cursor-keyframes';
      style.textContent = [
        '@keyframes cursorGlow{',
        '0%,100%{color:#D4AF37;text-shadow:0 0 8px rgba(212,175,55,.7),0 0 18px rgba(212,175,55,.3)}',
        '50%{color:#F5D76E;text-shadow:0 0 20px rgba(212,175,55,1),0 0 40px rgba(212,175,55,.55)}',
        '}',
        'html.cca *,html.cca *::before,html.cca *::after{cursor:none!important}'
      ].join('');
      document.head.appendChild(style);
    }

    // Activate cursor:none via class
    document.documentElement.classList.add('cca');

    var mx = 0, my = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      c.style.left = mx + 'px';
      c.style.top  = my + 'px';
    }, { passive: true });

    // Hover effect on interactive elements
    function onOver(e) {
      var el = e.target.closest('a,button,input,select,textarea,label,.p-card,.cat-item,.btn,.vireon-logo,.ed-card,.tbl-action,.admin-link,.d-btn,.d-btn-ghost,.filter-chip,.sfb-chip,.nav-a,.admin-link');
      if (el) {
        c.style.transform = 'translate(-50%,-50%) scale(1.35) rotate(14deg)';
        c.style.color = '#F5D76E';
        c.style.textShadow = '0 0 25px rgba(212,175,55,1),0 0 50px rgba(212,175,55,.5)';
      }
    }
    function onOut(e) {
      var el = e.target.closest('a,button,input,select,textarea,label,.p-card,.cat-item,.btn,.vireon-logo,.ed-card,.tbl-action,.admin-link,.d-btn,.d-btn-ghost,.filter-chip,.sfb-chip,.nav-a,.admin-link');
      if (el) {
        c.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)';
        c.style.color = '#D4AF37';
        c.style.textShadow = '0 0 8px rgba(212,175,55,.7),0 0 18px rgba(212,175,55,.3)';
      }
    }

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    // Click animation
    document.addEventListener('mousedown', function () {
      c.style.transform = 'translate(-50%,-50%) scale(0.72)';
    });
    document.addEventListener('mouseup', function () {
      c.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)';
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', function () { c.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { c.style.opacity = '1'; });
  });
})();
