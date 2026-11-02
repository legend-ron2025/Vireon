/* ═══════════════════════════════════════════════════════════
   VIREON LUXURY COUTURE — ENTERPRISE ENGINE v3.0
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────────────────────
   PRODUCT STORE ACCESSORS
   ──────────────────────────────────────────────────────────── */
const DEFAULT_GRAD = 'linear-gradient(160deg,#1a0f05,#2d1a08,#0a0600)';
const DEFAULT_COLORS = ['#1a1a1a','#2d1a08','#0a0a0a'];
const DEFAULT_SIZES = ['S','M','L'];

function normProduct(p) {
  return Object.assign({}, p, {
    old: p.comparePrice !== undefined && p.comparePrice !== null ? p.comparePrice : (p.old !== undefined ? p.old : null),
    desc: p.description !== undefined ? p.description : (p.desc !== undefined ? p.desc : ''),
    grad: p.grad || DEFAULT_GRAD,
    rating: p.rating !== undefined ? p.rating : 5,
    reviews: p.reviews !== undefined ? p.reviews : 0,
    colors: p.colors || DEFAULT_COLORS,
    sizes: p.sizes || DEFAULT_SIZES,
    gender: p.gender || 'unisex',
    image: p.image || null,
  });
}

function getAllProducts() {
  return VireonStore.get('vireon_products').filter(function(p){ return p.active !== false; }).map(normProduct);
}

function findProduct(id) {
  return getAllProducts().find(function(p){ return String(p.id) === String(id); }) || null;
}

function getProducts(f){
  f = f || {};
  var list = getAllProducts();
  if(f.cat&&f.cat!=='all') list=list.filter(p=>p.cat.toLowerCase()===f.cat.toLowerCase()||p.gender===f.cat.toLowerCase());
  if(f.badge) list=list.filter(p=>p.badge===f.badge);
  if(f.q) list=list.filter(p=>p.name.toLowerCase().includes(f.q)||p.cat.toLowerCase().includes(f.q)||(p.desc||'').toLowerCase().includes(f.q)||p.sku.toLowerCase().includes(f.q));
  if(f.sort==='price-low') list.sort((a,b)=>a.price-b.price);
  else if(f.sort==='price-high') list.sort((a,b)=>b.price-a.price);
  else if(f.sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(f.sort==='rating') list.sort((a,b)=>b.rating-a.rating);
  return list;
}

/* ────────────────────────────────────────────────────────────
   STORAGE HELPERS
   ──────────────────────────────────────────────────────────── */
const store = {
  get: k => { try { return JSON.parse(localStorage.getItem(k)||'null'); } catch { return null; } },
  set: (k,v) => localStorage.setItem(k, JSON.stringify(v)),
  cart: () => store.get('vireon_cart') || [],
  wish: () => store.get('vireon_wish') || [],
  recently: () => store.get('vireon_recent') || [],
  saveCart: c => { store.set('vireon_cart', c); cartBus.notify(); },
  saveWish: w => { store.set('vireon_wish', w); wishBus.notify(); },
};

/* ────────────────────────────────────────────────────────────
   EVENT BUS
   ──────────────────────────────────────────────────────────── */
const cartBus = { fns:[], on(fn){this.fns.push(fn)}, notify(){ this.fns.forEach(f=>f()); } };
const wishBus = { fns:[], on(fn){this.fns.push(fn)}, notify(){ this.fns.forEach(f=>f()); } };

/* ────────────────────────────────────────────────────────────
   CART OPERATIONS
   ──────────────────────────────────────────────────────────── */
function cartAdd(id, qty=1, size='', color=''){
  const p = findProduct(id); if(!p) return;
  const cart = store.cart();
  const key = `${id}__${size}__${color}`;
  const ex = cart.find(i=>i.key===key);
  if(ex) ex.qty += qty;
  else cart.push({key,id,name:p.name,cat:p.cat,price:p.price,grad:p.grad,size,color,qty});
  store.saveCart(cart);
  toast(`${p.name} added to bag`);
  mcOpen();
}
function cartRemove(key){ store.saveCart(store.cart().filter(i=>i.key!==key)); }
function cartQty(key,d){
  const c=store.cart(); const i=c.find(x=>x.key===key); if(!i) return;
  i.qty+=d; if(i.qty<=0) cartRemove(key); else store.saveCart(c);
}
function cartTotal(){ return store.cart().reduce((s,i)=>s+i.price*i.qty,0); }
function cartCount(){ return store.cart().reduce((s,i)=>s+i.qty,0); }
function wishToggle(id){
  const w=store.wish(); const idx=w.indexOf(id);
  if(idx===-1){ w.push(id); toast('Added to wishlist'); }
  else { w.splice(idx,1); toast('Removed from wishlist'); }
  store.saveWish(w);
  document.querySelectorAll(`[data-wish="${id}"]`).forEach(b=>{
    b.classList.toggle('on',w.includes(id));
    const i=b.querySelector('i');
    if(i){ i.className = w.includes(id) ? 'fas fa-heart' : 'far fa-heart'; }
  });
}

/* ────────────────────────────────────────────────────────────
   TOAST
   ──────────────────────────────────────────────────────────── */
function toast(msg, type=''){
  const el=document.getElementById('v-toast');
  const m=document.getElementById('v-toast-msg');
  if(!el||!m) return;
  m.textContent=msg; el.className=`${type?''+type:''} on`;
  const icon=el.querySelector('i');
  if(icon) icon.className = type==='error' ? 'fas fa-times-circle' : type==='success' ? 'fas fa-check-circle' : 'fas fa-check-circle';
  setTimeout(()=>el.classList.remove('on'),3200);
}
window.toast = toast;

/* ────────────────────────────────────────────────────────────
   PRODUCT CARD HTML GENERATOR
   ──────────────────────────────────────────────────────────── */
function pCard(p){
  const w=store.wish().includes(p.id);
  const badge = p.badge ? `<span class="p-card-badge badge--${p.badge.toLowerCase()}">${p.badge}</span>`:'';
  const old = p.old ? `<span class="p-price-old">$${p.old.toLocaleString()}</span>`:'';
  const stars = '★'.repeat(Math.floor(p.rating))+'☆'.repeat(5-Math.floor(p.rating));
  return `<div class="p-card reveal d${Math.floor(Math.random()*4+1)}" data-id="${p.id}">
    <div class="p-card-img">
      <div class="p-card-bg" style="background:${p.image?'url(\"'+p.image+'\") center/cover':p.grad}"></div>
      <div class="p-card-overlay"></div>
      ${badge}
      <div class="p-card-actions">
        <button class="p-btn-cart" onclick="cartAdd(${p.id});event.stopPropagation()">ADD TO BAG</button>
        <button class="p-btn-wish ${w?'on':''}" data-wish="${p.id}" onclick="wishToggle(${p.id});event.stopPropagation()"><i class="${w?'fas':'far'} fa-heart"></i></button>
        <button class="p-btn-quick" onclick="quickView(${p.id});event.stopPropagation()" title="Quick view"><i class="fas fa-expand"></i></button>
      </div>
    </div>
    <div class="p-card-info">
      <p class="p-cat">${p.cat}</p>
      <h3 class="p-name">${p.name}</h3>
      <p class="p-stars">${stars} <span>(${p.reviews})</span></p>
      <div class="p-price-row">
        <span class="p-price">$${p.price.toLocaleString()}</span>${old}
      </div>
    </div>
  </div>`;
}

/* ────────────────────────────────────────────────────────────
   MINI CART
   ──────────────────────────────────────────────────────────── */
function mcRender(){
  const body=document.getElementById('mc-body');
  const tot=document.getElementById('mc-total');
  const qty=document.getElementById('mc-qty');
  if(!body) return;
  const cart=store.cart();
  if(qty) qty.textContent=`(${cartCount()})`;
  if(!cart.length){
    body.innerHTML=`<div class="mc-empty"><i class="fas fa-shopping-bag"></i><p>Your bag is empty</p><a href="shop.html" class="btn btn--gold btn--sm" style="margin-top:1rem">SHOP NOW</a></div>`;
  } else {
    body.innerHTML=cart.map(item=>`
      <div class="mc-item">
        <div class="mc-item-img" style="background:${item.grad}"></div>
        <div class="mc-item-info">
          <p class="mc-item-name">${item.name}</p>
          <p class="mc-item-cat">${item.cat}${item.size?' · '+item.size:''}</p>
          <p class="mc-item-price">$${item.price.toLocaleString()} × ${item.qty}</p>
        </div>
        <button class="mc-remove" onclick="cartRemove('${item.key}')"><i class="fas fa-times"></i></button>
      </div>`).join('');
  }
  if(tot) tot.textContent=`$${cartTotal().toLocaleString()}`;
}
function mcOpen(){
  document.getElementById('mini-cart')?.classList.add('on');
  document.getElementById('cart-overlay')?.classList.add('on');
  document.body.style.overflow='hidden';
}
function mcClose(){
  document.getElementById('mini-cart')?.classList.remove('on');
  document.getElementById('cart-overlay')?.classList.remove('on');
  document.body.style.overflow='';
}
window.cartAdd=cartAdd; window.cartRemove=cartRemove; window.cartQty=cartQty; window.mcClose=mcClose;
window.wishToggle=wishToggle;

/* ────────────────────────────────────────────────────────────
   QUICK VIEW MODAL
   ──────────────────────────────────────────────────────────── */
function quickView(id){
  const p=findProduct(id); if(!p) return;
  let modal=document.getElementById('qv-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='qv-modal';
    modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:4000;display:flex;align-items:center;justify-content:center;padding:2rem;backdrop-filter:blur(10px)';
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{ if(e.target===modal) modal.remove(); });
  }
  const old=p.old?`<span style="font-size:1rem;color:var(--gray);text-decoration:line-through">$${p.old.toLocaleString()}</span>`:'';
  modal.innerHTML=`
    <div style="background:var(--bg-2);border:1px solid var(--border);max-width:900px;width:100%;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;max-height:90vh;overflow-y:auto">
      <div style="height:500px;background:${p.grad};position:relative"><div style="position:absolute;inset:0;background:url('') center/cover"></div></div>
      <div style="padding:3rem">
        <button onclick="document.getElementById('qv-modal').remove()" style="position:absolute;top:1rem;right:1.5rem;background:none;color:var(--white);font-size:2rem;border:none;cursor:pointer">&times;</button>
        <p style="font-size:.58rem;letter-spacing:.28em;color:var(--gold);text-transform:uppercase;margin-bottom:.8rem">${p.cat}</p>
        <h2 style="font-family:var(--font-serif);font-size:2rem;color:var(--white);margin-bottom:1rem;font-weight:300">${p.name}</h2>
        <div style="display:flex;align-items:baseline;gap:.8rem;margin-bottom:1.5rem">
          <span style="font-family:var(--font-serif);font-size:1.8rem;color:var(--gold)">$${p.price.toLocaleString()}</span>${old}
        </div>
        <p style="font-size:.85rem;color:var(--text-2);line-height:1.9;margin-bottom:2rem">${p.desc}</p>
        <div style="display:flex;gap:.8rem;flex-wrap:wrap">
          <button onclick="cartAdd(${p.id});document.getElementById('qv-modal').remove()" class="btn btn--gold">ADD TO BAG</button>
          <a href="product.html?id=${p.id}" class="btn btn--outline">VIEW DETAILS</a>
        </div>
      </div>
    </div>`;
}
window.quickView=quickView;

/* ────────────────────────────────────────────────────────────
   LOADER
   ──────────────────────────────────────────────────────────── */
function initLoader(){
  const el=document.getElementById('v-loader');
  const bar=document.getElementById('loader-fill');
  const pct=document.getElementById('loader-pct');
  if(!el) return;
  let p=0;
  const t=setInterval(()=>{
    p+=Math.random()*18+4;
    if(bar) bar.style.width=Math.min(p,100)+'%';
    if(pct) pct.textContent=Math.min(Math.floor(p),100)+'%';
    if(p>=100){ clearInterval(t); setTimeout(()=>el.classList.add('out'),400); }
  },70);
}

/* ────────────────────────────────────────────────────────────
   CURSOR
   ──────────────────────────────────────────────────────────── */
function initCursor(){
  const c=document.getElementById('v-cursor');
  const r=document.getElementById('v-cursor-ring');
  if(!c||!r||window.matchMedia('(hover:none)').matches) return;
  document.addEventListener('mousemove',e=>{
    c.style.left=e.clientX+'px'; c.style.top=e.clientY+'px';
    r.style.left=e.clientX+'px'; r.style.top=e.clientY+'px';
  },{passive:true});
  document.querySelectorAll('a,button,.p-card,.cat-item,.btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>r.classList.add('grow'));
    el.addEventListener('mouseleave',()=>r.classList.remove('grow'));
  });
  document.querySelectorAll('h1,h2,h3').forEach(el=>{
    el.addEventListener('mouseenter',()=>r.classList.add('text-hover'));
    el.addEventListener('mouseleave',()=>r.classList.remove('text-hover'));
  });
}

/* ────────────────────────────────────────────────────────────
   NAVBAR
   ──────────────────────────────────────────────────────────── */
function initNavbar(){
  const nav=document.getElementById('navbar');
  if(!nav) return;
  // Position below announcement bar
  function positionNav(){
    const ann=document.getElementById('ann-bar');
    const h=ann&&!ann.classList.contains('closed')? ann.offsetHeight:0;
    nav.style.top=h+'px';
  }
  positionNav();
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('solid', window.scrollY>60);
  },{passive:true});
  document.getElementById('ann-close')?.addEventListener('click',()=>{
    document.getElementById('ann-bar')?.classList.add('closed');
    setTimeout(positionNav, 350);
  });
  // Mobile
  const ham=document.getElementById('hamburger');
  const mob=document.getElementById('mobile-menu');
  ham?.addEventListener('click',()=>{
    ham.classList.toggle('open');
    mob?.classList.toggle('open');
    document.body.style.overflow=mob?.classList.contains('open')?'hidden':'';
  });
  document.getElementById('mobile-close')?.addEventListener('click',()=>{
    ham?.classList.remove('open'); mob?.classList.remove('open');
    document.body.style.overflow='';
  });
  // Cart
  document.getElementById('cart-icon')?.addEventListener('click',mcOpen);
  document.getElementById('cart-overlay')?.addEventListener('click',mcClose);
  document.getElementById('mc-close')?.addEventListener('click',mcClose);
}

/* ────────────────────────────────────────────────────────────
   SEARCH
   ──────────────────────────────────────────────────────────── */
function initSearch(){
  const overlay=document.getElementById('search-overlay');
  const input=document.getElementById('search-main-input');
  const results=document.getElementById('search-results-drop');
  document.getElementById('search-icon')?.addEventListener('click',()=>{
    overlay?.classList.add('open'); setTimeout(()=>input?.focus(),150);
  });
  document.getElementById('search-close-btn')?.addEventListener('click',()=>overlay?.classList.remove('open'));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') overlay?.classList.remove('open'); });
  input?.addEventListener('input',function(){
    const q=this.value.toLowerCase().trim();
    if(!results) return;
    if(!q){results.innerHTML='';return;}
    const hits=getProducts({q}).slice(0,6);
    if(!hits.length){results.innerHTML='<p style="color:var(--gray);font-size:.8rem">No results found</p>';return;}
    results.innerHTML=hits.map(p=>`
      <a href="product.html?id=${p.id}" class="search-result-row" onclick="overlay?.classList.remove('open')">
        <div class="sr-img" style="background:${p.grad}"></div>
        <div><p class="sr-name">${p.name}</p><p class="sr-meta">${p.cat} · $${p.price.toLocaleString()}</p></div>
        <i class="fas fa-arrow-right" style="color:var(--gold);margin-left:auto;font-size:.75rem"></i>
      </a>`).join('');
  });
  window.fillSearch=function(q){if(input){input.value=q;input.dispatchEvent(new Event('input'));input.focus();}};
}

/* ────────────────────────────────────────────────────────────
   SCROLL REVEAL
   ──────────────────────────────────────────────────────────── */
function initReveal(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);} });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

/* ────────────────────────────────────────────────────────────
   STAT COUNTERS
   ──────────────────────────────────────────────────────────── */
function initCounters(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target; const t=parseInt(el.dataset.target);
        let n=0; const step=t/70;
        const timer=setInterval(()=>{
          n+=step; if(n>=t){el.textContent=t;clearInterval(timer);}
          else el.textContent=Math.floor(n);
        },20);
        io.unobserve(el);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('[data-target]').forEach(el=>io.observe(el));
}

/* ────────────────────────────────────────────────────────────
   COUNTDOWN TIMER — replaced by renderLimitedEdition/tickCountdown
   ──────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────────
   REVIEWS CAROUSEL
   ──────────────────────────────────────────────────────────── */
function initReviews(){
  const track=document.getElementById('reviews-track');
  const dotsEl=document.getElementById('review-dots');
  if(!track) return;
  const cards=track.querySelectorAll('.review-card');
  let cur=0, auto;
  if(dotsEl) dotsEl.innerHTML=[...cards].map((_,i)=>`<div class="r-dot${i===0?' on':''}" data-i="${i}"></div>`).join('');
  function go(i){
    cards[cur].classList.remove('on');
    dotsEl?.querySelectorAll('.r-dot')[cur]?.classList.remove('on');
    cur=(i+cards.length)%cards.length;
    track.style.transform=`translateX(-${cur*100}%)`;
    cards[cur].classList.add('on');
    dotsEl?.querySelectorAll('.r-dot')[cur]?.classList.add('on');
  }
  cards[0]?.classList.add('on');
  document.getElementById('rev-prev')?.addEventListener('click',()=>{clearInterval(auto);go(cur-1);startAuto();});
  document.getElementById('rev-next')?.addEventListener('click',()=>{clearInterval(auto);go(cur+1);startAuto();});
  dotsEl?.addEventListener('click',e=>{const i=e.target.dataset.i;if(i!==undefined){clearInterval(auto);go(parseInt(i));startAuto();}});
  function startAuto(){auto=setInterval(()=>go(cur+1),5500);}
  startAuto();
}

/* ────────────────────────────────────────────────────────────
   EMPTY STATE HELPER
   ──────────────────────────────────────────────────────────── */
function emptyState(msg){
  return `<div style="grid-column:1/-1;text-align:center;padding:6rem 2rem;color:var(--gray)"><div style="font-size:3.5rem;color:var(--border);margin-bottom:1.5rem"><i class="fas fa-box-open"></i></div><h3 style="font-size:1.5rem;color:var(--white);margin-bottom:.8rem;font-family:var(--font-serif);font-weight:300">${msg}</h3><p style="font-size:.82rem;color:var(--gray)">Check back soon or explore our collection.</p></div>`;
}

/* ────────────────────────────────────────────────────────────
   PAGE RENDER REGISTRY & RERENDER MAP
   ──────────────────────────────────────────────────────────── */
const PAGE_RENDER = {};

const RERENDER = {
  vireon_products: function(){
    renderNewArrivals();
    initBestTabs();
    if(PAGE_RENDER.shop) PAGE_RENDER.shop();
    if(PAGE_RENDER.collections) PAGE_RENDER.collections();
    if(PAGE_RENDER.newarrivals) PAGE_RENDER.newarrivals();
    if(PAGE_RENDER.product) PAGE_RENDER.product();
    if(PAGE_RENDER.wishlist) PAGE_RENDER.wishlist();
  },
  vireon_categories: function(){ renderHomeCategories(); if(PAGE_RENDER.collections) PAGE_RENDER.collections(); },
  vireon_limited_edition: function(){ renderLimitedEdition(); },
  vireon_lookbook: function(){ renderLookbook(); },
  vireon_brand_settings: function(){ renderBrandSettings(); },
};

window.addEventListener('storage', function(e){
  if(!(e.key in RERENDER)) return;
  RERENDER[e.key]();
});

/* ────────────────────────────────────────────────────────────
   BESTSELLER TABS
   ──────────────────────────────────────────────────────────── */
let bsActive = 'all';
function initBestTabs(){
  const grid = document.getElementById('best-grid');
  const tabsContainer = document.getElementById('best-tabs');
  if(!grid) return;

  const bsProds = getAllProducts().filter(function(p){ return p.bestSeller === true; });
  const cats = ['ALL'];
  bsProds.forEach(function(p){ if(p.cat && cats.indexOf(p.cat) === -1) cats.push(p.cat); });

  if(tabsContainer){
    tabsContainer.style.cssText = 'display:flex;justify-content:center;gap:.6rem;margin-bottom:4rem;flex-wrap:wrap';
    tabsContainer.innerHTML = cats.map(function(c){
      const val = c === 'ALL' ? 'all' : c;
      const active = val === bsActive;
      return `<button class="btn btn--sm ${active?'btn--gold':'btn--outline'} ${active?'on':''}" data-bs-tab="${val}" style="padding:.5rem 1.2rem">${c}</button>`;
    }).join('');
    tabsContainer.querySelectorAll('[data-bs-tab]').forEach(function(btn){
      btn.addEventListener('click', function(){
        bsActive = this.dataset.bsTab;
        tabsContainer.querySelectorAll('[data-bs-tab]').forEach(function(b){
          b.classList.remove('on','btn--gold'); b.classList.add('btn--outline');
        });
        this.classList.add('on','btn--gold'); this.classList.remove('btn--outline');
        renderBestGrid();
      });
    });
  }
  renderBestGrid();
}

function renderBestGrid(){
  const grid = document.getElementById('best-grid');
  if(!grid) return;
  const bsProds = getAllProducts().filter(function(p){ return p.bestSeller === true; });
  let list = bsActive === 'all' ? bsProds : bsProds.filter(function(p){ return p.cat === bsActive; });
  list = list.slice(0,8);
  if(!list.length){
    grid.innerHTML = emptyState('Our best sellers are coming soon.');
  } else {
    grid.innerHTML = list.map(pCard).join('');
  }
  initReveal(); attachCardLinks();
}

/* ────────────────────────────────────────────────────────────
   NEW ARRIVALS (homepage section)
   ──────────────────────────────────────────────────────────── */
function renderNewArrivals(){
  const g = document.getElementById('new-arrivals-grid');
  if(!g) return;
  const list = getAllProducts().filter(function(p){ return p.newArrival === true; })
    .sort(function(a,b){ return new Date(b.dateAdded||0) - new Date(a.dateAdded||0); })
    .slice(0,8);
  if(!list.length){
    g.innerHTML = emptyState('New pieces arriving soon.');
  } else {
    g.innerHTML = list.map(pCard).join('');
  }
  initReveal(); attachCardLinks();
}

/* ────────────────────────────────────────────────────────────
   HOME CATEGORIES
   ──────────────────────────────────────────────────────────── */
function renderHomeCategories(){
  const g = document.getElementById('cat-grid-home');
  if(!g) return;
  const cats = (VireonStore.get('vireon_categories')||[]).filter(function(c){ return c.status === 'Active'; });
  if(!cats.length){
    g.innerHTML = emptyState('Categories coming soon.');
    return;
  }
  g.innerHTML = cats.map(function(cat, n){
    const imageOrGradient = cat.image ? 'url("'+cat.image+'") center/cover' : (cat.grad || DEFAULT_GRAD);
    const wideClass = n === 2 ? ' cat-item--wide' : '';
    const count = getAllProducts().filter(function(p){ return p.cat && p.cat.toLowerCase() === (cat.name||'').toLowerCase(); }).length;
    return `<a href="collections.html?cat=${encodeURIComponent(cat.slug||cat.name)}" class="cat-item reveal d${n+1}${wideClass}"><div class="cat-img" style="background:${imageOrGradient}"></div><div class="cat-name-wrap"><p class="cat-n">${(cat.name||'').toUpperCase()}</p><p class="cat-cnt">${count} Pieces</p></div></a>`;
  }).join('');
  initReveal();
}

/* ────────────────────────────────────────────────────────────
   LIMITED EDITION
   ──────────────────────────────────────────────────────────── */
let limitedTimer = null;

function tickCountdown(endISO){
  const remaining = new Date(endISO) - Date.now();
  const p = function(n){ return String(n).padStart(2,'0'); };
  const set = function(id,v){
    const el = document.getElementById(id);
    if(el && el.textContent !== v){ el.classList.add('flip'); el.textContent = v; setTimeout(function(){ el.classList.remove('flip'); }, 300); }
  };
  if(remaining <= 0){
    ['cd-d','cd-h','cd-m','cd-s'].forEach(function(id){ set(id,'00'); });
    const stockEl = document.getElementById('lim-stock');
    if(stockEl) stockEl.innerHTML = '<i class="fas fa-times-circle"></i> Sale ended';
    clearInterval(limitedTimer); limitedTimer = null;
    return;
  }
  const d = Math.floor(remaining/86400000);
  const h = Math.floor((remaining%86400000)/3600000);
  const m = Math.floor((remaining%3600000)/60000);
  const s = Math.floor((remaining%60000)/1000);
  set('cd-d',p(d)); set('cd-h',p(h)); set('cd-m',p(m)); set('cd-s',p(s));
}

function renderLimitedEdition(){
  const sec = document.getElementById('limited-edition-section');
  if(!sec) return;
  const cfg = VireonStore.get('vireon_limited_edition');
  if(!cfg || !cfg.active){
    sec.style.display = 'none';
    if(limitedTimer){ clearInterval(limitedTimer); limitedTimer = null; }
    return;
  }
  sec.style.display = '';

  // Fill elements
  const limImg = document.getElementById('lim-img');
  if(limImg) limImg.style.background = cfg.image ? 'url("'+cfg.image+'") center/cover' : (cfg.grad || 'linear-gradient(160deg,#1a0800,#2d1200,#0d0500)');

  const eyebrow = document.getElementById('lim-eyebrow');
  if(eyebrow) eyebrow.textContent = cfg.eyebrow || 'LIMITED EDITION';

  const title = document.getElementById('lim-title');
  if(title) title.innerHTML = (cfg.title||'Limited Drop') + (cfg.subtitle ? '<br><em>'+cfg.subtitle+'</em>' : '');

  const desc = document.getElementById('lim-desc');
  if(desc) desc.textContent = cfg.description || '';

  const stock = document.getElementById('lim-stock');
  if(stock) stock.innerHTML = '<i class="fas fa-fire"></i> ' + (cfg.stock !== undefined ? 'Only '+cfg.stock+' pieces remaining' : '');

  const priceEl = document.getElementById('lim-price');
  if(priceEl) priceEl.textContent = cfg.price ? '$'+Number(cfg.price).toLocaleString() : '';

  const claimBtn = sec.querySelector('.btn--gold[href],.btn--gold');
  if(claimBtn) claimBtn.href = cfg.productId ? 'product.html?id='+cfg.productId : 'collections.html';

  // Countdown
  if(limitedTimer){ clearInterval(limitedTimer); limitedTimer = null; }
  if(cfg.endDate){
    tickCountdown(cfg.endDate);
    limitedTimer = setInterval(function(){ tickCountdown(cfg.endDate); }, 1000);
  }
  initReveal();
}

/* ────────────────────────────────────────────────────────────
   LOOKBOOK
   ──────────────────────────────────────────────────────────── */
function renderLookbook(){
  const g = document.getElementById('lookbook-grid');
  if(!g) return;
  const entries = (VireonStore.get('vireon_lookbook')||[]).filter(function(e){ return e.active !== false; });
  if(!entries.length){
    g.innerHTML = emptyState('Lookbook coming soon.');
    return;
  }
  g.innerHTML = entries.map(function(entry, n){
    const isTall = n === 0;
    const bg = entry.image ? 'url("'+entry.image+'") center/cover' : (entry.grad || DEFAULT_GRAD);
    if(isTall){
      return `<a href="collections.html" class="ed-card ed-card--tall reveal reveal--left"><div class="ed-img" style="background:${bg}"></div><div class="ed-overlay"></div><div class="ed-body"><p class="ed-issue">${entry.vol||''}</p><h3 class="ed-title">${entry.title||''}</h3><p class="ed-link">EXPLORE <i class="fas fa-arrow-right"></i></p></div></a>`;
    }
    return `<a href="collections.html" class="ed-card reveal d${n+1}"><div class="ed-img" style="background:${bg}"></div><div class="ed-overlay"></div><div class="ed-body"><p class="ed-issue">${entry.vol||''}</p><h3 class="ed-title">${entry.title||''}</h3><p class="ed-link">EXPLORE <i class="fas fa-arrow-right"></i></p></div></a>`;
  }).join('');
  initReveal();
}

/* ────────────────────────────────────────────────────────────
   BRAND SETTINGS
   ──────────────────────────────────────────────────────────── */
function renderBrandSettings(){
  const cfg = VireonStore.get('vireon_brand_settings');
  const year = (cfg && cfg.foundedYear) ? cfg.foundedYear : 2025;
  document.querySelectorAll('[data-since-year]').forEach(function(el){ el.textContent = year; });
  if(cfg && cfg.craftImage){
    const craftImg = document.getElementById('craft-img');
    if(craftImg) craftImg.style.background = 'url("'+cfg.craftImage+'") center/cover';
  }
}

/* ────────────────────────────────────────────────────────────
   ATTACH CARD CLICK → PRODUCT PAGE
   ──────────────────────────────────────────────────────────── */
function attachCardLinks(){
  document.querySelectorAll('.p-card[data-id]').forEach(card=>{
    card.addEventListener('click',function(e){
      if(e.target.closest('button')) return;
      window.location.href=`product.html?id=${this.dataset.id}`;
    });
  });
}

/* ────────────────────────────────────────────────────────────
   AI CHAT ASSISTANT
   ──────────────────────────────────────────────────────────── */
const AI_MSGS=[
  "Based on your browsing, I'd suggest the Sovereign Coat — it pairs perfectly with our Imperial Trousers for a commanding look.",
  "For your measurements, I recommend size M in tailored pieces and S in our silk range. Would you like a full fit consultation?",
  "Our current limited drops include the Night Luxe collection — only 2 pieces remain in your size.",
  "VIREON Elite members enjoy 20% off every purchase, early drop access, and birthday rewards. Would you like to join?",
  "The Noir Velvet Dress comes in three colorways. The midnight black is most requested for evening events.",
  "Free worldwide shipping applies to orders over $500. Your current selection qualifies for complimentary express delivery.",
  "Each VIREON Signature piece undergoes 200+ hours of hand-crafting by our master artisans in Milan.",
  "I can suggest complete outfit pairings for any occasion. What event are you dressing for?",
];
function initAI(){
  const fab=document.getElementById('ai-fab');
  const panel=document.getElementById('ai-panel');
  const closeBtn=document.getElementById('ai-close');
  const input=document.getElementById('ai-input');
  const sendBtn=document.getElementById('ai-send');
  const body=document.getElementById('ai-body');
  if(!fab||!panel) return;
  fab.addEventListener('click',()=>{panel.classList.toggle('on');if(panel.classList.contains('on'))input?.focus();});
  closeBtn?.addEventListener('click',()=>panel.classList.remove('on'));
  function send(){
    const v=input.value.trim(); if(!v) return;
    body.innerHTML+=`<div style="display:flex;justify-content:flex-end;margin:.4rem 0"><div class="user-bubble">${v}</div></div>`;
    input.value=''; body.scrollTop=body.scrollHeight;
    const typing=document.createElement('div');
    typing.innerHTML=`<div class="ai-msg-wrap"><div class="ai-avatar">AI</div><div class="ai-bubble" style="display:flex;gap:.3rem;align-items:center"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`;
    body.appendChild(typing); body.scrollTop=body.scrollHeight;
    setTimeout(()=>{
      typing.remove();
      const resp=AI_MSGS[Math.floor(Math.random()*AI_MSGS.length)];
      body.innerHTML+=`<div class="ai-msg-wrap"><div class="ai-avatar">AI</div><div class="ai-bubble">${resp}</div></div>`;
      body.scrollTop=body.scrollHeight;
    },900);
  }
  sendBtn?.addEventListener('click',send);
  input?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
}

/* ────────────────────────────────────────────────────────────
   NEWSLETTER
   ──────────────────────────────────────────────────────────── */
function initNewsletter(){
  document.querySelectorAll('.nl-form').forEach(form=>{
    form.addEventListener('submit',function(e){
      e.preventDefault();
      toast('Welcome to the VIREON Inner Circle! Check your inbox.');
      this.reset();
    });
  });
}

/* ────────────────────────────────────────────────────────────
   BADGE UPDATES (reactive to cart/wishlist)
   ──────────────────────────────────────────────────────────── */
function updateBadges(){
  document.querySelectorAll('.cart-badge').forEach(el=>el.textContent=cartCount());
  document.querySelectorAll('.wish-badge').forEach(el=>el.textContent=store.wish().length);
}
cartBus.on(()=>{ updateBadges(); mcRender(); });
wishBus.on(()=>{ updateBadges(); });

/* ────────────────────────────────────────────────────────────
   SHOP PAGE
   ──────────────────────────────────────────────────────────── */
function initShopPage(){
  const grid=document.getElementById('shop-grid');
  if(!grid||grid.dataset.shopInit==='1') return;
  grid.dataset.shopInit='1';

  // Parse URL params
  const u=new URLSearchParams(window.location.search);
  const catParam = u.get('cat') || '';
  const badgeParam = u.get('badge') || '';
  grid.dataset.cat = catParam;
  grid.dataset.badge = badgeParam;
  grid.dataset.sort = '';
  grid.dataset.q = '';

  // Apply filter chip UI for cat
  if(catParam){
    document.querySelectorAll('[data-filter]').forEach(c=>{
      c.classList.toggle('on', c.dataset.filter===catParam);
    });
  }

  // Wire up filter chips
  document.querySelectorAll('[data-filter]').forEach(chip=>{
    chip.addEventListener('click',()=>{
      document.querySelectorAll('[data-filter]').forEach(c=>c.classList.remove('on'));
      chip.classList.add('on');
      grid.dataset.cat = chip.dataset.filter;
      grid.dataset.badge = '';
      renderShopGrid();
    });
  });

  const si=document.getElementById('shop-search');
  si?.addEventListener('input',function(){ grid.dataset.q=this.value.toLowerCase().trim(); renderShopGrid(); });

  const ss=document.getElementById('shop-sort');
  ss?.addEventListener('change',function(){ grid.dataset.sort=this.value; renderShopGrid(); });

  renderShopGrid();
  PAGE_RENDER.shop = renderShopGrid;
}

function renderShopGrid(){
  const grid=document.getElementById('shop-grid');
  if(!grid) return;
  const cat = grid.dataset.cat || '';
  const badge = grid.dataset.badge || '';
  const sort = grid.dataset.sort || '';
  const q = grid.dataset.q || '';
  const f={sort:sort||undefined, q:q||undefined};
  if(cat && cat!=='all') f.cat=cat;
  if(badge) f.badge=badge;
  const list=getProducts(f);
  const cnt=document.getElementById('shop-count');
  if(cnt) cnt.textContent=`${list.length} piece${list.length!==1?'s':''}`;
  if(!list.length){
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:6rem 2rem;color:var(--gray)"><div style="font-size:3.5rem;color:var(--border);margin-bottom:1.5rem"><i class="fas fa-search"></i></div><h3 style="font-size:1.5rem;color:var(--white);margin-bottom:.8rem">No pieces found</h3><p>Try adjusting your filters</p></div>`;
    return;
  }
  grid.innerHTML=list.map(pCard).join('');
  initReveal(); attachCardLinks();
}

/* ────────────────────────────────────────────────────────────
   COLLECTIONS PAGE
   ──────────────────────────────────────────────────────────── */
function initCollectionsPage(){
  const grid = document.getElementById('coll-products-grid');
  if(!grid || grid.dataset.collInit==='1') return;
  grid.dataset.collInit='1';

  // Resolve ?cat= slug → category name
  const u = new URLSearchParams(window.location.search);
  const catParam = u.get('cat') || '';
  let catName = '';
  if(catParam){
    const cats = VireonStore.get('vireon_categories') || [];
    const found = cats.find(function(c){ return (c.slug||'') === catParam || (c.name||'').toLowerCase() === catParam.toLowerCase(); });
    catName = found ? found.name : catParam;
  }
  grid.dataset.cat = catName;
  renderCollections();
  PAGE_RENDER.collections = renderCollections;
}

function renderCollections(){
  const grid = document.getElementById('coll-products-grid');
  if(!grid) return;
  const catName = grid.dataset.cat || '';
  const list = catName ? getProducts({cat: catName}) : getAllProducts();
  if(!list.length){
    grid.innerHTML = emptyState(catName ? 'No pieces found in this category.' : 'Collection coming soon.');
  } else {
    grid.innerHTML = list.slice(0,8).map(pCard).join('');
  }
  initReveal(); attachCardLinks();
}

/* ────────────────────────────────────────────────────────────
   NEW ARRIVALS PAGE
   ──────────────────────────────────────────────────────────── */
let naActive = 'all';

function initNewArrivalsPage(){
  const tabsContainer = document.getElementById('new-arrivals-tabs');
  const grid = document.getElementById('new-arrivals-full-grid');
  if(!grid) return;

  // Build dynamic tabs — always rebuild for re-render safety
  if(tabsContainer){
    const naProds = getAllProducts().filter(function(p){ return p.newArrival === true; });
    const cats = ['ALL'];
    naProds.forEach(function(p){ if(p.cat && cats.indexOf(p.cat) === -1) cats.push(p.cat); });
    tabsContainer.style.cssText = 'display:flex;gap:.6rem;margin-bottom:3rem;flex-wrap:wrap';
    tabsContainer.innerHTML = cats.map(function(c){
      const val = c === 'ALL' ? 'all' : c;
      const active = val === naActive;
      return `<button class="btn btn--sm ${active?'btn--gold':'btn--ghost'}" data-na-tab="${val}" style="padding:.5rem 1.2rem">${c}</button>`;
    }).join('');
    tabsContainer.querySelectorAll('[data-na-tab]').forEach(function(btn){
      btn.addEventListener('click', function(){
        naActive = this.dataset.naTab;
        tabsContainer.querySelectorAll('[data-na-tab]').forEach(function(b){
          b.className = 'btn btn--sm btn--ghost'; b.style.padding = '.5rem 1.2rem';
        });
        this.className = 'btn btn--sm btn--gold'; this.style.padding = '.5rem 1.2rem';
        renderNewArrivalsGrid();
      });
    });
  }
}

function renderNewArrivalsGrid(){
  const grid = document.getElementById('new-arrivals-full-grid');
  if(!grid) return;
  let list = getAllProducts().filter(function(p){ return p.newArrival === true; })
    .sort(function(a,b){ return new Date(b.dateAdded||0) - new Date(a.dateAdded||0); });
  if(naActive !== 'all'){
    list = list.filter(function(p){ return p.cat === naActive; });
  }
  if(!list.length){
    grid.innerHTML = emptyState('New pieces arriving soon.');
  } else {
    grid.innerHTML = list.map(pCard).join('');
  }
  initReveal(); attachCardLinks();
}

PAGE_RENDER.newarrivals = function(){ initNewArrivalsPage(); renderNewArrivalsGrid(); };

/* ────────────────────────────────────────────────────────────
   PRODUCT DETAIL PAGE
   ──────────────────────────────────────────────────────────── */
let pdId = null;

function renderProductNotFound(){
  const root = document.getElementById('pd-root');
  if(!root) return;
  root.innerHTML = `<div style="text-align:center;padding:8rem 2rem;color:var(--gray)"><div style="font-size:4rem;color:var(--border);margin-bottom:2rem"><i class="fas fa-search"></i></div><h2 style="font-family:var(--font-serif);font-size:2.5rem;color:var(--white);font-weight:300;margin-bottom:1rem">Product Not Found</h2><p style="font-size:.88rem;line-height:1.9;margin-bottom:2rem">The piece you're looking for isn't available or may have been removed.</p><a href="shop.html" class="btn btn--gold">EXPLORE COLLECTION <i class="fas fa-arrow-right"></i></a></div>`;
}

function initProductPage(){
  if(!document.getElementById('pd-root')) return;
  const u = new URLSearchParams(window.location.search);
  pdId = u.get('id');
  // Bind static .pt-btn tab buttons once (guarded)
  if(!document.getElementById('pd-root').dataset.tabsBound){
    document.getElementById('pd-root').dataset.tabsBound = '1';
    document.querySelectorAll('.pt-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.pt-btn').forEach(b=>b.classList.remove('on'));
        document.querySelectorAll('.pd-tab-body').forEach(b=>b.classList.remove('on'));
        btn.classList.add('on'); document.getElementById(btn.dataset.tab)?.classList.add('on');
      });
    });
    document.querySelector('.pt-btn')?.classList.add('on');
    document.querySelector('.pd-tab-body')?.classList.add('on');
  }
  renderProductPage();
  PAGE_RENDER.product = renderProductPage;
}

function renderProductPage(){
  const root = document.getElementById('pd-root');
  if(!root) return;
  const p = pdId ? findProduct(pdId) : getAllProducts()[0];
  if(!p){ renderProductNotFound(); return; }

  let selSize='', selColor='', qty=1;

  const set=(id,val,prop='textContent')=>{ const el=document.getElementById(id); if(el) el[prop]=val; };
  set('pd-name',p.name); set('pd-cat',p.cat); set('pd-price','$'+p.price.toLocaleString());
  set('pd-sku',p.sku); set('pd-desc',p.desc,'innerHTML');
  if(p.old){ set('pd-old','$'+p.old.toLocaleString()); const d=Math.round((1-p.price/p.old)*100); set('pd-disc',`-${d}%`); }
  else { document.getElementById('pd-old')?.parentElement?.querySelectorAll('[id="pd-old"],[id="pd-disc"]').forEach(e=>e.style.display='none'); }

  const imgs=['pd-img-1','pd-img-2','pd-img-3','pd-img-4'];
  imgs.forEach(id=>{ const el=document.getElementById(id); if(el) el.style.background=p.grad; });
  const mainImg=document.getElementById('pd-main-img');
  if(mainImg) mainImg.style.background = p.image ? 'url("'+p.image+'") center/cover' : p.grad;
  document.querySelectorAll('.g-thumb').forEach((t,i)=>{
    t.style.background=p.grad;
    t.addEventListener('click',()=>{ document.querySelectorAll('.g-thumb').forEach(x=>x.classList.remove('on')); t.classList.add('on'); });
  });
  document.querySelectorAll('.g-thumb')[0]?.classList.add('on');

  const cp=document.getElementById('pd-colors');
  if(cp) cp.innerHTML=p.colors.map(c=>`<button class="cp" style="background:${c}" data-color="${c}" onclick="selectColor(this)"></button>`).join('');
  window.selectColor=function(btn){ document.querySelectorAll('.cp').forEach(b=>b.classList.remove('on')); btn.classList.add('on'); selColor=btn.dataset.color; };

  const sp=document.getElementById('pd-sizes');
  if(sp) sp.innerHTML=p.sizes.map(s=>`<button class="sp" data-size="${s}" onclick="selectSize(this)">${s}</button>`).join('');
  window.selectSize=function(btn){ document.querySelectorAll('.sp').forEach(b=>b.classList.remove('on')); btn.classList.add('on'); selSize=btn.dataset.size; };

  // Re-bind qty (replace to avoid double listeners)
  const minusBtn = document.getElementById('pd-minus');
  const plusBtn = document.getElementById('pd-plus');
  if(minusBtn){ const nb=minusBtn.cloneNode(true); minusBtn.replaceWith(nb); nb.addEventListener('click',()=>{ if(qty>1){qty--;document.getElementById('pd-qty').textContent=qty;} }); }
  if(plusBtn){ const nb=plusBtn.cloneNode(true); plusBtn.replaceWith(nb); nb.addEventListener('click',()=>{ qty++; document.getElementById('pd-qty').textContent=qty; }); }

  const addBtn = document.getElementById('pd-add');
  const buyBtn = document.getElementById('pd-buy');
  if(addBtn){ const nb=addBtn.cloneNode(true); addBtn.replaceWith(nb); nb.addEventListener('click',()=>{ if(p.sizes.length>1&&!selSize){ toast('Please select a size','error'); shakeEl(document.getElementById('pd-sizes')); return; } cartAdd(p.id,qty,selSize,selColor); }); }
  if(buyBtn){ const nb=buyBtn.cloneNode(true); buyBtn.replaceWith(nb); nb.addEventListener('click',()=>{ if(p.sizes.length>1&&!selSize){ toast('Please select a size','error'); return; } cartAdd(p.id,qty,selSize,selColor); setTimeout(()=>window.location.href='cart.html',400); }); }

  const wishBtn=document.getElementById('pd-wish');
  if(wishBtn){
    wishBtn.classList.toggle('on',store.wish().includes(p.id));
    wishBtn.querySelector('i').className=store.wish().includes(p.id)?'fas fa-heart':'far fa-heart';
    const wb2=wishBtn.cloneNode(true); wishBtn.replaceWith(wb2);
    wb2.addEventListener('click',()=>{ wishToggle(p.id); wb2.classList.toggle('on',store.wish().includes(p.id)); wb2.querySelector('i').className=store.wish().includes(p.id)?'fas fa-heart':'far fa-heart'; });
  }

  const rec=document.getElementById('rec-grid');
  if(rec){ rec.innerHTML=getAllProducts().filter(x=>x.id!==p.id&&x.cat===p.cat).slice(0,4).concat(getAllProducts().filter(x=>x.id!==p.id&&x.cat!==p.cat).slice(0,4)).slice(0,4).map(pCard).join(''); initReveal(); attachCardLinks(); }

  let recent=store.recently().filter(id=>id!==p.id);
  recent.unshift(p.id); recent=recent.slice(0,8);
  store.set('vireon_recent',recent);
  const rvg=document.getElementById('recently-viewed');
  if(rvg){ rvg.innerHTML=recent.filter(id=>id!==p.id).slice(0,4).map(id=>{const pr=findProduct(id);return pr?pCard(pr):''}).join(''); initReveal(); attachCardLinks(); }
}

function shakeEl(el){ if(!el) return; el.animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(-4px)'},{transform:'translateX(0)'}],{duration:300,easing:'ease-in-out'}); }

/* ────────────────────────────────────────────────────────────
   CART PAGE
   ──────────────────────────────────────────────────────────── */
function initCartPage(){
  const rows=document.getElementById('cart-rows');
  if(!rows) return;
  function render(){
    const cart=store.cart();
    const sub=cartTotal(), ship=sub>0&&sub<500?25:0;
    document.getElementById('os-subtotal')&&(document.getElementById('os-subtotal').textContent='$'+sub.toLocaleString());
    document.getElementById('os-ship')&&(document.getElementById('os-ship').textContent=ship===0?'FREE':'$'+ship);
    document.getElementById('os-total')&&(document.getElementById('os-total').textContent='$'+(sub+ship).toLocaleString());
    if(!cart.length){
      rows.innerHTML=`<div class="cart-empty reveal"><i class="fas fa-shopping-bag"></i><h3>Your bag is empty</h3><p>Explore our collection and find your next statement piece.</p><a href="shop.html" class="btn btn--gold" style="margin-top:1.5rem">SHOP NOW</a></div>`;
      return;
    }
    rows.innerHTML=cart.map(item=>`
      <div class="ct-row reveal">
        <div class="ct-prod">
          <div class="ct-img" style="background:${item.grad}"></div>
          <div><p class="ct-pname">${item.name}</p><p class="ct-pvar">${item.cat}${item.size?' · Size '+item.size:''}</p></div>
        </div>
        <div class="ct-price ct-price-col">$${item.price.toLocaleString()}</div>
        <div>
          <div class="v-qty">
            <button onclick="cartQtyPage('${item.key}',-1)">−</button>
            <span class="v-qty-n">${item.qty}</span>
            <button onclick="cartQtyPage('${item.key}',1)">+</button>
          </div>
        </div>
        <div class="ct-total">$${(item.price*item.qty).toLocaleString()}</div>
        <button class="ct-remove" onclick="cartRemovePage('${item.key}')"><i class="fas fa-trash-alt"></i></button>
      </div>`).join('');
    initReveal();
  }
  window.cartQtyPage=function(k,d){ cartQty(k,d); render(); };
  window.cartRemovePage=function(k){ cartRemove(k); render(); store.saveCart(store.cart()); render(); };
  // Coupon
  document.getElementById('apply-coupon')?.addEventListener('click',()=>{
    const code=document.getElementById('coupon-input')?.value.trim().toUpperCase();
    const codes={'VIREON20':'20% off applied! Discount reflected at checkout.','ELITE':'Elite member benefits activated — free express shipping!','WELCOME10':'10% welcome discount applied!'};
    toast(codes[code]||'Invalid coupon code','error');
  });
  document.getElementById('go-checkout')?.addEventListener('click',()=>{
    if(!store.cart().length){toast('Your bag is empty','error');return;}
    window.location.href='cart.html#checkout';
  });
  // Check for checkout hash
  if(window.location.hash==='#checkout'){
    document.getElementById('cart-section')?.style&&(document.getElementById('cart-section').style.display='none');
    const co=document.getElementById('checkout-section'); if(co) co.style.display='block';
    renderCheckoutSummary();
  }
  render();
  cartBus.on(render);
}

function renderCheckoutSummary(){
  const items=store.cart(); const el=document.getElementById('co-items-list');
  if(el) el.innerHTML=items.map(i=>`<div class="co-item"><span>${i.name} ${i.qty>1?'×'+i.qty:''}</span><span>$${(i.price*i.qty).toLocaleString()}</span></div>`).join('');
  const sub=cartTotal();
  document.getElementById('co-sub')&&(document.getElementById('co-sub').textContent='$'+sub.toLocaleString());
  document.getElementById('co-total')&&(document.getElementById('co-total').textContent='$'+sub.toLocaleString());
}

window.placeOrder=function(){
  if(!store.cart().length){toast('Your bag is empty','error');return;}
  const orderId='VP-'+Math.floor(Math.random()*90000+10000);
  store.saveCart([]);
  toast('Order placed! Redirecting to tracking...');
  setTimeout(()=>window.location.href='tracking.html?order='+orderId,1800);
};

/* ────────────────────────────────────────────────────────────
   WISHLIST PAGE
   ──────────────────────────────────────────────────────────── */
function initWishlistPage(){
  const grid=document.getElementById('wish-grid');
  if(!grid || grid.dataset.wishInit==='1') return;
  grid.dataset.wishInit='1';

  document.getElementById('wish-add-all')?.addEventListener('click',()=>{
    store.wish().forEach(id=>cartAdd(id)); toast(`${store.wish().length} pieces added to bag`);
  });
  document.getElementById('wish-share')?.addEventListener('click',()=>{
    navigator.clipboard?.writeText(window.location.href).then(()=>toast('Wishlist link copied!'));
  });
  wishBus.on(renderWishlist);
  renderWishlist();
  PAGE_RENDER.wishlist = renderWishlist;
}

function renderWishlist(){
  const grid=document.getElementById('wish-grid');
  if(!grid) return;
  const ids=store.wish();
  const prods=getAllProducts().filter(p=>ids.includes(p.id));
  grid.innerHTML=!prods.length
    ?`<div style="grid-column:1/-1;text-align:center;padding:6rem;color:var(--gray)"><i class="far fa-heart" style="font-size:4rem;color:var(--border);display:block;margin-bottom:2rem"></i><h3 style="font-size:2rem;color:var(--white);font-weight:300;margin-bottom:1rem">Your wishlist is empty</h3><p style="margin-bottom:2.5rem">Save pieces you love and find them here.</p><a href="shop.html" class="btn btn--gold">EXPLORE COLLECTION</a></div>`
    :prods.map(pCard).join('');
  initReveal(); attachCardLinks();
}

/* ────────────────────────────────────────────────────────────
   TRACKING PAGE
   ──────────────────────────────────────────────────────────── */
function initTrackingPage(){
  const form=document.getElementById('track-form');
  if(!form) return;
  const STEPS=[
    {label:'Order Confirmed',icon:'fas fa-check-circle',desc:'Your order has been received and payment confirmed'},
    {label:'In Atelier',icon:'fas fa-ruler-combined',desc:'Master artisans are crafting your piece'},
    {label:'Quality Check',icon:'fas fa-shield-alt',desc:'300-point luxury quality inspection completed'},
    {label:'Dispatched',icon:'fas fa-box',desc:'Handed to VIREON Express courier'},
    {label:'Out for Delivery',icon:'fas fa-truck',desc:'Your luxury package is on its way'},
    {label:'Delivered',icon:'fas fa-gift',desc:'Enjoy your VIREON experience'},
  ];
  const ROUTE=[[51.5074,-0.1278],[51.5120,-0.0950],[51.5180,-0.0710],[51.5250,-0.0500],[51.5320,-0.0300],[51.5400,-0.0100]];
  let curStep=4,map,truck;
  function getTime(i){const d=new Date();d.setMinutes(d.getMinutes()-(curStep-i)*22);return d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})+' today';}
  function renderSteps(){
    const el=document.getElementById('track-steps'); if(!el) return;
    el.innerHTML=STEPS.map((s,i)=>`
      <div class="t-step ${i<curStep?'done':i===curStep?'current':''}">
        <div class="t-dot"><i class="${s.icon}"></i></div>
        <div><p class="t-label">${s.label}</p><p class="t-desc">${s.desc}</p>${i<=curStep?`<p class="t-time">${getTime(i)}</p>`:''}</div>
      </div>`).join('');
  }
  function initMap(){
    if(!window.L) return;
    map=L.map('v-map',{center:ROUTE[curStep],zoom:13,zoomControl:true});
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'© OSM © CARTO',subdomains:'abcd',maxZoom:20}).addTo(map);
    L.polyline(ROUTE.slice(0,curStep+1),{color:'#D4AF37',weight:3,opacity:.85,dashArray:'7,4'}).addTo(map);
    L.polyline(ROUTE.slice(curStep),{color:'#333',weight:2,opacity:.4,dashArray:'4,8'}).addTo(map);
    const mI=(html,sz)=>L.divIcon({html,className:'',iconSize:sz,iconAnchor:[sz[0]/2,sz[1]/2]});
    L.marker(ROUTE[0],{icon:mI('<div style="width:34px;height:34px;border-radius:50%;background:rgba(212,175,55,.9);border:2px solid #D4AF37;display:flex;align-items:center;justify-content:center;font-size:.9rem;color:#000"><i class="fas fa-store"></i></div>',[34,34])}).addTo(map).bindPopup('<b style="color:#D4AF37">VIREON Atelier</b><br>Origin');
    L.marker(ROUTE.at(-1),{icon:mI('<div style="width:34px;height:34px;border-radius:50%;background:rgba(59,130,246,.9);border:2px solid #3B82F6;display:flex;align-items:center;justify-content:center;font-size:.9rem;color:#fff"><i class="fas fa-home"></i></div>',[34,34])}).addTo(map).bindPopup('<b style="color:#3B82F6">Your Address</b><br>Destination');
    truck=L.marker(ROUTE[curStep],{icon:mI('<div style="width:44px;height:44px;border-radius:50%;background:rgba(16,185,129,.95);border:2px solid #10B981;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff;box-shadow:0 0 15px rgba(16,185,129,.5);animation:truckPop 2s ease-in-out infinite"><i class="fas fa-truck"></i></div>',[44,44])}).addTo(map).bindPopup('<b>Your Delivery</b><br>En route').openPopup();
    let pos=curStep;
    setInterval(()=>{
      if(pos<ROUTE.length-1){pos++;truck.setLatLng(ROUTE[pos]);map.panTo(ROUTE[pos],{animate:true});if(pos>curStep&&pos<STEPS.length){curStep=pos;renderSteps();}}
      if(pos===ROUTE.length-1) toast('Your VIREON order has arrived!');
    },9000);
  }
  function showPanel(orderNum){
    document.getElementById('track-form-section')?.style&&(document.getElementById('track-form-section').style.display='none');
    const panel=document.getElementById('track-panel'); if(!panel) return;
    panel.style.display='block';
    document.getElementById('tib-order')&&(document.getElementById('tib-order').textContent=orderNum);
    const eta=new Date(); eta.setHours(eta.getHours()+2);
    document.getElementById('tib-eta')&&(document.getElementById('tib-eta').textContent='Today, '+eta.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}));
    renderSteps(); setTimeout(initMap,200);
  }
  form.addEventListener('submit',function(e){e.preventDefault();const v=document.getElementById('order-input')?.value.trim();if(v) showPanel(v);});
  const u=new URLSearchParams(window.location.search);
  if(u.get('order')){document.getElementById('order-input')&&(document.getElementById('order-input').value=u.get('order'));showPanel(u.get('order'));}
}

/* ────────────────────────────────────────────────────────────
   ADMIN DASHBOARD
   ──────────────────────────────────────────────────────────── */
function initAdminDashboard(){
  if(!document.getElementById('admin-root')) return;
  const orders=[
    {id:'VP-2026-047',customer:'James Whitmore',product:'Sovereign Coat',amount:'$1,850',status:'Processing',date:'Jul 10'},
    {id:'VP-2026-046',customer:'Sofia Reyes',product:'Evening Gown',amount:'$4,800',status:'Shipped',date:'Jul 9'},
    {id:'VP-2026-045',customer:'Marcus Bell',product:'Imperial Suit',amount:'$3,200',status:'Delivered',date:'Jul 8'},
    {id:'VP-2026-044',customer:'Elara Voss',product:'Noir Velvet Dress',amount:'$2,200',status:'Processing',date:'Jul 7'},
    {id:'VP-2026-043',customer:'Hugo Laurent',product:'Obsidian Bag',amount:'$1,450',status:'Delivered',date:'Jul 6'},
    {id:'VP-2026-042',customer:'Isabella Cross',product:'Evening Gown',amount:'$4,800',status:'Cancelled',date:'Jul 5'},
  ];
  const sc={'Processing':'s-processing','Shipped':'s-shipped','Delivered':'s-delivered','Cancelled':'s-cancelled','Pending':'s-pending'};
  const tbody=document.querySelector('#orders-table tbody');
  if(tbody) tbody.innerHTML=orders.map(o=>`
    <tr>
      <td style="color:var(--gold);font-weight:500">${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.product}</td>
      <td style="color:var(--gold);font-family:var(--font-serif)">${o.amount}</td>
      <td>${o.date}</td>
      <td><span class="o-status ${sc[o.status]||''}">${o.status}</span></td>
      <td><button class="v-action-btn" onclick="window.location.href='tracking.html?order=${o.id}'">TRACK</button></td>
    </tr>`).join('');

  const topEl=document.getElementById('top-products-list');
  if(topEl) topEl.innerHTML=getAllProducts().slice(0,5).map((p,i)=>`
    <div style="display:flex;align-items:center;gap:1rem;padding:.8rem 0;border-bottom:1px solid var(--border)">
      <span style="font-size:.72rem;color:var(--gray);width:20px;font-weight:700">${i+1}</span>
      <div style="width:44px;height:55px;background:${p.grad};border:1px solid var(--border);flex-shrink:0"></div>
      <div style="flex:1"><p style="font-size:.8rem;color:var(--white)">${p.name}</p><p style="font-size:.68rem;color:var(--gray)">${p.cat} · ${p.reviews} reviews</p></div>
      <span style="font-family:var(--font-serif);font-size:1rem;color:var(--gold)">$${p.price.toLocaleString()}</span>
    </div>`).join('');

  // Charts
  if(window.Chart){
    const cg=(id,type,data,opts={})=>{const el=document.getElementById(id);if(!el) return;new Chart(el,{type,data,options:{responsive:true,plugins:{legend:{labels:{color:'#6B6B6B',font:{size:11}}}},scales:type!=='doughnut'&&type!=='pie'?{x:{grid:{color:'rgba(212,175,55,.06)'},ticks:{color:'#6B6B6B'}},y:{grid:{color:'rgba(212,175,55,.06)'},ticks:{color:'#6B6B6B',...(opts.ticks||{})}}}:undefined,...opts}});};
    const gold='rgba(212,175,55,';
    cg('revenue-chart','line',{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul'],datasets:[{label:'Revenue',data:[42000,58000,51000,72000,68000,89000,84250],borderColor:'#D4AF37',backgroundColor:gold+'0.07)',tension:.4,pointBackgroundColor:'#D4AF37',pointRadius:5,fill:true}]},{ticks:{callback:v=>'$'+v.toLocaleString()}});
    cg('cat-chart','doughnut',{labels:['Coats','Dresses','Suits','Bags','Accessories','Other'],datasets:[{data:[28,22,15,18,12,5],backgroundColor:['#D4AF37','#B8962E','#F5D76E','#8b6914','#5c4a0a','#2A2A2A'],borderColor:'#1B1B1B',borderWidth:3}]});
    cg('traffic-chart','bar',{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Visitors',data:[1200,1850,1420,2100,1780,2400,1900],backgroundColor:gold+'0.6)',borderColor:'#D4AF37',borderWidth:1}]});
  }
}

/* ────────────────────────────────────────────────────────────
   PAGE TRANSITION
   ──────────────────────────────────────────────────────────── */
function initPageTransitions(){
  const el=document.getElementById('page-transition'); if(!el) return;
  document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(a=>{
    a.addEventListener('click',function(e){
      const href=this.getAttribute('href');
      if(!href||href.startsWith('javascript')) return;
      e.preventDefault();
      el.classList.add('in');
      setTimeout(()=>window.location.href=href, 500);
    });
  });
}

/* ────────────────────────────────────────────────────────────
   PARTICLE CANVAS (Gold sparkles)
   ──────────────────────────────────────────────────────────── */
function initParticles(){
  const canvas=document.getElementById('v-particles');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,pts=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize,{passive:true});
  class Pt{
    constructor(){this.reset();}
    reset(){this.x=Math.random()*W;this.y=H+10;this.r=Math.random()*2+.5;this.vy=-(Math.random()*.6+.2);this.vx=(Math.random()-.5)*.3;this.op=Math.random()*.5+.1;this.life=0;this.max=Math.random()*180+80;}
    draw(){const f=this.life<20?this.life/20:this.life>this.max-20?(this.max-this.life)/20:1;ctx.save();ctx.globalAlpha=this.op*f;ctx.fillStyle='#D4AF37';ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();ctx.restore();}
    update(){this.x+=this.vx;this.y+=this.vy;this.life++;}
    alive(){return this.life<this.max&&this.y>-10;}
  }
  function loop(){ctx.clearRect(0,0,W,H);if(pts.length<30) pts.push(new Pt());pts=pts.filter(p=>{p.update();p.draw();return p.alive();});requestAnimationFrame(loop);}
  loop();
}

/* ────────────────────────────────────────────────────────────
   MAIN INIT
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  initLoader();
  initCursor();
  initNavbar();
  initSearch();
  initReveal();
  initCounters();
  initReviews();
  renderNewArrivals();
  renderHomeCategories();
  renderLimitedEdition();
  renderLookbook();
  renderBrandSettings();
  initBestTabs();
  initAI();
  initNewsletter();
  initShopPage();
  initCollectionsPage();
  initNewArrivalsPage();
  renderNewArrivalsGrid();
  initProductPage();
  initCartPage();
  initWishlistPage();
  initTrackingPage();
  initAdminDashboard();
  initParticles();
  initPageTransitions();
  updateBadges();
  mcRender();
  // Attach card links for any static cards
  attachCardLinks();
  // Page transition out on load
  const pt=document.getElementById('page-transition');
  if(pt){ pt.classList.add('in'); setTimeout(()=>pt.classList.remove('in'),50); }
});

/* ────────────────────────────────────────────────────────────
   BUTTON RIPPLE EFFECT
   ──────────────────────────────────────────────────────────── */
function initRipple(){
  document.addEventListener('click',function(e){
    const btn=e.target.closest('.btn');
    if(!btn) return;
    const ripple=document.createElement('span');
    ripple.className='ripple-effect';
    const rect=btn.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    ripple.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend',()=>ripple.remove());
  });
}

/* ────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
   ──────────────────────────────────────────────────────────── */
function initScrollProgress(){
  const el=document.getElementById('scroll-progress');
  if(!el) return;
  window.addEventListener('scroll',()=>{
    const p=window.scrollY/(document.body.scrollHeight-window.innerHeight);
    el.style.width=(Math.min(p,1)*100)+'%';
  },{passive:true});
}

/* ────────────────────────────────────────────────────────────
   ICON ANIMATIONS (wishlist heart, cart pop)
   ──────────────────────────────────────────────────────────── */
function initIconAnimations(){
  // Animate heart on wishlist toggle
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-wish],.p-btn-wish,.btn-heart');
    if(btn){
      const icon=btn.querySelector('i');
      if(icon){icon.classList.add('heart-beat');icon.addEventListener('animationend',()=>icon.classList.remove('heart-beat'),{once:true});}
    }
    // Cart pop on add to bag
    const cartBtn=e.target.closest('.p-btn-cart,.btn-add-to-cart,.btn-add');
    if(cartBtn){
      document.querySelectorAll('.cart-badge,.nav-badge').forEach(b=>{b.classList.add('pop');b.addEventListener('animationend',()=>b.classList.remove('pop'),{once:true});});
    }
  });
}

/* ────────────────────────────────────────────────────────────
   PRODUCT CARD TILT EFFECT
   ──────────────────────────────────────────────────────────── */
function initCardTilt(){
  if(window.matchMedia('(hover:none)').matches) return;
  document.addEventListener('mousemove',e=>{
    const card=e.target.closest('.p-card');
    if(!card) return;
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    const y=(e.clientY-rect.top)/rect.height-.5;
    card.style.transform=`translateY(-6px) rotateY(${x*6}deg) rotateX(${-y*4}deg)`;
    card.style.transition='transform .1s ease';
  });
  document.addEventListener('mouseleave',e=>{
    const card=e.target.closest('.p-card');
    if(card){card.style.transform='';card.style.transition='transform .4s ease';}
  },true);
}

/* ────────────────────────────────────────────────────────────
   MAGNETIC BUTTON EFFECT
   ──────────────────────────────────────────────────────────── */
function initMagnetic(){
  if(window.matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('.btn--gold,.btn--outline').forEach(btn=>{
    btn.addEventListener('mousemove',function(e){
      const rect=this.getBoundingClientRect();
      const x=(e.clientX-rect.left-rect.width/2)*.2;
      const y=(e.clientY-rect.top-rect.height/2)*.2;
      this.style.transform=`translate(${x}px,${y}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave',function(){
      this.style.transform='';
    });
  });
}

/* ────────────────────────────────────────────────────────────
   FILTER GROUP COLLAPSE
   ──────────────────────────────────────────────────────────── */
function initFilterGroups(){
  document.querySelectorAll('.fg-title').forEach(title=>{
    const opts=title.nextElementSibling;
    if(!opts) return;
    title.addEventListener('click',()=>{
      const open=opts.style.display!=='none';
      opts.style.display=open?'none':'';
      const icon=title.querySelector('i');
      if(icon) icon.style.transform=open?'rotate(-90deg)':'rotate(0)';
    });
  });
}

/* ────────────────────────────────────────────────────────────
   STAGGERED ENTRANCE ANIMATION FOR GRIDS
   ──────────────────────────────────────────────────────────── */
function initStaggeredGrids(){
  document.querySelectorAll('.p-grid, .cat-grid, .insta-grid, .kpi-grid').forEach(grid=>{
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          [...entry.target.children].forEach((child,i)=>{
            setTimeout(()=>child.classList.add('on'),i*60);
          });
          io.unobserve(entry.target);
        }
      });
    },{threshold:.05});
    // Only observe if children have reveal class
    if(grid.querySelector('.reveal')) io.observe(grid);
  });
}

// ── EXTEND DOMContentLoaded ──────────────────────────────── */
// Append to existing init
document.addEventListener('DOMContentLoaded',()=>{
  initRipple();
  initScrollProgress();
  initIconAnimations();
  initCardTilt();
  initMagnetic();
  initFilterGroups();
  initStaggeredGrids();
});

/* ─────────────────────────────────────────────────────────
   LUXURY CURSOR OVERRIDE — Gold Fleur-de-lis ⚜
   Replaces the basic dot cursor with the royal symbol.
   ───────────────────────────────────────────────────────── */
