/* =============================================
   VARPELLA LUXURY CHOCOLATE - MAIN JS
   ============================================= */

/* ===== PRODUCT DATA ===== */
const products = [
  { id: 1, name: "Noir Obsidian", category: "Dark Chocolate", price: 45, badge: "LIMITED", description: "85% single-origin Madagascar cacao, intense and complex", gradient: "linear-gradient(135deg,#1a0500 0%,#2d0a00 40%,#0d0400 100%)" },
  { id: 2, name: "Velvet Truffle", category: "Truffles", price: 68, badge: "NEW", description: "Hand-rolled Valrhona ganache, dusted in pure cocoa", gradient: "linear-gradient(135deg,#0a0a1a 0%,#1a1a2d 40%,#06060d 100%)" },
  { id: 3, name: "Golden Praline", category: "Pralines", price: 52, badge: null, description: "Caramelized hazelnuts wrapped in silky milk chocolate", gradient: "linear-gradient(135deg,#1a1000 0%,#2d2000 40%,#0d0a00 100%)" },
  { id: 4, name: "Royal Dark Box", category: "Gift Boxes", price: 120, badge: "LIMITED", description: "12-piece luxury gift collection, hand-wrapped in gold foil", gradient: "linear-gradient(135deg,#0a1a10 0%,#1a2d20 40%,#060d0a 100%)" },
  { id: 5, name: "Pearl White", category: "White Chocolate", price: 38, badge: null, description: "Madagascan vanilla infused, ethereally smooth", gradient: "linear-gradient(135deg,#1a1a0a 0%,#2d2d15 40%,#0d0d06 100%)" },
  { id: 6, name: "Midnight Collection", category: "Dark Chocolate", price: 95, badge: "SALE", description: "6-piece signature dark selection, pure obsidian pleasure", gradient: "linear-gradient(135deg,#0a0005 0%,#1a0010 40%,#050005 100%)" },
  { id: 7, name: "Silk Caramel", category: "Milk Chocolate", price: 42, badge: null, description: "Fleur de sel salted caramel, handcrafted in small batches", gradient: "linear-gradient(135deg,#1a0f00 0%,#2d1a00 40%,#0d0800 100%)" },
  { id: 8, name: "The Archive Box", category: "Gift Boxes", price: 185, badge: "LIMITED", description: "Exclusive numbered collector edition, only 50 produced", gradient: "linear-gradient(135deg,#0a0a00 0%,#1a1900 40%,#050500 100%)" },
  { id: 9, name: "Ivory Ganache", category: "White Chocolate", price: 55, badge: "NEW", description: "Rose-infused white chocolate with lychee centre", gradient: "linear-gradient(135deg,#1a0a0a 0%,#2d1515 40%,#0d0606 100%)" },
  { id: 10, name: "Obsidian Truffle", category: "Truffles", price: 78, badge: "LIMITED", description: "72% dark with smoked sea salt and black truffle oil", gradient: "linear-gradient(135deg,#050510 0%,#0d0d20 40%,#030308 100%)" },
  { id: 11, name: "Hazelnut Royale", category: "Pralines", price: 48, badge: null, description: "Triple-layered hazelnut praline with feuilletine crunch", gradient: "linear-gradient(135deg,#150800 0%,#241200 40%,#0a0500 100%)" },
  { id: 12, name: "Signature Gift Set", category: "Gift Boxes", price: 220, badge: "LIMITED", description: "Our most prestigious gift — 24 assorted masterpieces", gradient: "linear-gradient(135deg,#0a0500 0%,#1a0d00 40%,#050300 100%)" },
];

function getAllProducts() { return products; }

/* ===== RENDER PRODUCT CARD ===== */
function createProductCard(p) {
  const badge = p.badge ? `<span class="product-badge badge-${p.badge.toLowerCase().replace(' ','-')}">${p.badge}</span>` : '';
  return `
    <div class="product-card fade-in-up" data-id="${p.id}" data-category="${p.category}" data-price="${p.price}">
      <div class="product-image">
        <div class="product-image-bg" style="background:${p.gradient}">
          <i class="fas fa-seedling product-image-icon"></i>
        </div>
        ${badge}
        <button class="product-wishlist" data-id="${p.id}" aria-label="Add to wishlist"><i class="far fa-heart"></i></button>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <button class="btn-add-cart" data-id="${p.id}">ADD TO BAG</button>
        </div>
      </div>
    </div>`;
}

/* ===== RENDER FEATURED PRODUCTS (homepage) ===== */
function renderFeaturedProducts() {
  const el = document.getElementById('featuredProducts');
  if (!el) return;
  el.innerHTML = products.slice(0, 4).map(createProductCard).join('');
  attachProductEvents(el);
}

/* ===== RENDER SHOP PRODUCTS ===== */
function renderShopProducts(list) {
  const el = document.getElementById('shopProductsGrid');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:5rem 0;color:var(--gray)"><i class="fas fa-search" style="font-size:2.5rem;color:var(--gray-dark);display:block;margin-bottom:1rem"></i>No products found</div>`;
    return;
  }
  el.innerHTML = list.map(createProductCard).join('');
  attachProductEvents(el);
  initScrollAnimations();
}

/* ===== ATTACH PRODUCT EVENTS ===== */
function attachProductEvents(container) {
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) { addToCart(product); }
    });
  });
  container.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      toggleWishlist(parseInt(btn.dataset.id));
    });
  });
}

/* ===== SHOP FILTERS ===== */
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('productSearch');
  const sortSelect = document.getElementById('sortSelect');
  let activeFilter = 'all';
  let searchQuery = '';
  let sortOrder = 'default';

  function applyFilters() {
    let list = [...products];
    if (activeFilter !== 'all') {
      if (activeFilter === 'limited') {
        list = list.filter(p => p.badge === 'LIMITED');
      } else {
        list = list.filter(p => p.category === activeFilter);
      }
    }
    if (searchQuery) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
      );
    }
    if (sortOrder === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'name-az') list.sort((a, b) => a.name.localeCompare(b.name));
    renderShopProducts(list);
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.toLowerCase().trim();
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortOrder = sortSelect.value;
      applyFilters();
    });
  }

  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat');
  if (cat) {
    const catMap = { dark: 'Dark Chocolate', milk: 'Milk Chocolate', white: 'White Chocolate', truffles: 'Truffles', pralines: 'Pralines', gifts: 'Gift Boxes' };
    if (catMap[cat]) {
      activeFilter = catMap[cat];
      pills.forEach(p => {
        p.classList.remove('active');
        if (p.dataset.filter === catMap[cat]) p.classList.add('active');
      });
      applyFilters();
    }
  }
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else if (!navbar.classList.contains('force-scrolled')) {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }
}

/* ===== SEARCH OVERLAY ===== */
function initSearch() {
  const btn = document.getElementById('searchBtn');
  const overlay = document.getElementById('searchOverlay');
  const close = document.getElementById('searchClose');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => { overlay.classList.add('active'); overlay.querySelector('.search-input')?.focus(); });
  close?.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('active'); });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in-up');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ===== STATS COUNTER ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { el.textContent = target + (el.dataset.suffix || '+'); clearInterval(timer); }
          else { el.textContent = Math.floor(start) + '+'; }
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ===== TESTIMONIALS CAROUSEL ===== */
function initCarousel() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('carouselDots');
  const prev = document.getElementById('prevTestimonial');
  const next = document.getElementById('nextTestimonial');
  if (!cards.length) return;

  let current = 0;
  if (dotsContainer) {
    dotsContainer.innerHTML = [...cards].map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`).join('');
    dotsContainer.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.idx)));
    });
  }

  function goTo(idx) {
    cards[current].classList.remove('active');
    dotsContainer?.querySelectorAll('.dot')[current]?.classList.remove('active');
    current = (idx + cards.length) % cards.length;
    cards[current].classList.add('active');
    dotsContainer?.querySelectorAll('.dot')[current]?.classList.add('active');
  }

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));
  setInterval(() => goTo(current + 1), 5000);
}

/* ===== PARTICLE SYSTEM (Canvas) ===== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.x = Math.random() * W;
    this.y = H + 10;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedY = Math.random() * 0.8 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    if (particles.length < 40) particles.push(new Particle());
    particles = particles.filter(p => {
      p.x += p.speedX;
      p.y -= p.speedY;
      p.life++;
      const fade = p.life < 20 ? p.life / 20 : p.life > p.maxLife - 20 ? (p.maxLife - p.life) / 20 : 1;
      ctx.save();
      ctx.globalAlpha = p.opacity * fade;
      ctx.fillStyle = '#c9a84c';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return p.life < p.maxLife && p.y > -10;
    });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ===== NEWSLETTER ===== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Welcome to the inner circle!', 'success');
    form.reset();
  });
}

/* ===== WISHLIST ===== */
function toggleWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem('varpella_wishlist') || '[]');
  const idx = wishlist.indexOf(id);
  if (idx === -1) { wishlist.push(id); showToast('Added to wishlist', 'success'); }
  else { wishlist.splice(idx, 1); showToast('Removed from wishlist', 'info'); }
  localStorage.setItem('varpella_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('varpella_wishlist') || '[]');
  document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = wishlist.length);
}

/* ===== TOAST NOTIFICATION ===== */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ===== BUTTON RIPPLE ===== */
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearch();
  initScrollAnimations();
  initCounters();
  initCarousel();
  initParticles();
  initNewsletter();
  initRipple();
  updateWishlistCount();
  renderFeaturedProducts();
  if (document.getElementById('shopProductsGrid')) {
    renderShopProducts(getAllProducts());
    initFilters();
  }
});
