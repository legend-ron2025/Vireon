/* =============================================
   VARPELLA LUXURY CHOCOLATE - CART SYSTEM
   ============================================= */

const CART_KEY = 'varpella_cart';

/* ===== CART STATE ===== */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

/* ===== ADD TO CART ===== */
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, category: product.category, gradient: product.gradient, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.name} added to bag`, 'success');
  openMiniCart();
}

/* ===== REMOVE FROM CART ===== */
function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

/* ===== UPDATE QTY ===== */
function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart(cart);
}

/* ===== CART TOTALS ===== */
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/* ===== UPDATE ALL CART UI ===== */
function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
  renderMiniCart();
  renderCartPage();
}

/* ===== MINI CART ===== */
function renderMiniCart() {
  const container = document.getElementById('miniCartItems');
  const totalEl = document.getElementById('miniCartTotal');
  if (!container) return;

  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `<div class="mini-cart-empty"><i class="fas fa-shopping-bag"></i><p>Your bag is empty</p><a href="shop.html" class="btn btn-primary" style="margin-top:1rem">SHOP NOW</a></div>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="mini-cart-item">
        <div class="mini-cart-item-img" style="background:${item.gradient || 'var(--black-3)'}">
          <i class="fas fa-seedling" style="font-size:1.2rem;color:rgba(201,168,76,0.3)"></i>
        </div>
        <div class="mini-cart-item-info">
          <p class="mini-cart-item-name">${item.name}</p>
          <p class="mini-cart-item-price">$${item.price} × ${item.qty}</p>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="mini-cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-times"></i></button>
      </div>`).join('');
  }
  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

function openMiniCart() {
  const miniCart = document.getElementById('miniCart');
  const overlay = document.getElementById('miniCartOverlay');
  if (miniCart) miniCart.classList.add('open');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMiniCart() {
  const miniCart = document.getElementById('miniCart');
  const overlay = document.getElementById('miniCartOverlay');
  if (miniCart) miniCart.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===== CART PAGE ===== */
function renderCartPage() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  const cart = getCart();
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const shipping = cart.length ? 15 : 0;
  const subtotal = getCartTotal();

  if (!cart.length) {
    container.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><h3>Your bag is empty</h3><p>Discover our premium chocolate collection</p><a href="shop.html" class="btn btn-primary" style="margin-top:1.5rem">SHOP NOW</a></div>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img" style="background:${item.gradient || 'var(--black-3)'}">
          <i class="fas fa-seedling" style="font-size:1.5rem;color:rgba(201,168,76,0.3)"></i>
        </div>
        <div class="cart-item-details">
          <p class="cart-item-cat">${item.category}</p>
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">$${item.price} each</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
        <p class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</p>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
      </div>`).join('');
  }

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${(subtotal + shipping).toFixed(2)}`;
  const shippingEl = document.getElementById('cartShipping');
  if (shippingEl) shippingEl.textContent = shipping ? `$${shipping.toFixed(2)}` : 'FREE';
}

/* ===== COUPON ===== */
function initCoupon() {
  const btn = document.getElementById('applyCoupon');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const code = document.getElementById('couponInput')?.value.trim().toUpperCase();
    if (code === 'VARPELLA10') {
      showToast('10% discount applied!', 'success');
    } else if (code === 'LUXURY') {
      showToast('Free shipping applied!', 'success');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  });
}

/* ===== INIT CART ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Cart button opens mini cart
  document.getElementById('cartBtn')?.addEventListener('click', openMiniCart);

  // Close mini cart
  document.getElementById('miniCartClose')?.addEventListener('click', closeMiniCart);
  document.getElementById('miniCartClose2')?.addEventListener('click', closeMiniCart);
  document.getElementById('miniCartOverlay')?.addEventListener('click', closeMiniCart);

  initCoupon();

  // Checkout form
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!getCart().length) { showToast('Your cart is empty', 'error'); return; }
      showToast('Order placed! Redirecting to tracking...', 'success');
      setTimeout(() => { window.location.href = 'tracking.html?order=VP' + Math.floor(Math.random() * 90000 + 10000); }, 1500);
    });
  }
});
