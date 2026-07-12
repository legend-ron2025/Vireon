/* ═══════════════════════════════════════════════════════════
   VIREON LUXURY COUTURE — ENTERPRISE ENGINE v3.0
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────────────────────
   PRODUCT DATABASE
   ──────────────────────────────────────────────────────────── */
const DB = {
  products: [
    {id:1,name:'Sovereign Coat',cat:'Coats',gender:'men',price:1850,old:2400,badge:'LIMITED',rating:5,reviews:42,sku:'VR-C-001',
     desc:'Hand-tailored in Milan. Double-breasted obsidian wool with 24k gold-button detailing. 200+ hours of craftsmanship.',
     colors:['#1a1a1a','#2d1a08','#0a0a0a'],sizes:['XS','S','M','L','XL','XXL'],
     grad:'linear-gradient(160deg,#1a0f05,#2d1a08,#0a0600)',stock:7},
    {id:2,name:'Noir Velvet Dress',cat:'Dresses',gender:'women',price:2200,old:null,badge:'NEW',rating:5,reviews:28,sku:'VR-D-001',
     desc:'Floor-length structured velvet. Bespoke couture craftsmanship. Worn by editorial icons worldwide.',
     colors:['#0d0d20','#1a0a00','#222222'],sizes:['XS','S','M','L','XL'],
     grad:'linear-gradient(160deg,#050510,#0d0d20,#030308)',stock:12},
    {id:3,name:'Imperial Suit',cat:'Suits',gender:'men',price:3200,old:null,badge:null,rating:4.8,reviews:19,sku:'VR-S-001',
     desc:'Savile Row inspired. Peak lapel, full canvas construction. Pure Loro Piana wool.',
     colors:['#0a0a0a','#1a1900','#2d2d00'],sizes:['36','38','40','42','44','46'],
     grad:'linear-gradient(160deg,#0a0a00,#1a1900,#050500)',stock:5},
    {id:4,name:'Obsidian Shoulder Bag',cat:'Bags',gender:'women',price:1450,old:1800,badge:'SALE',rating:4.9,reviews:63,sku:'VR-B-001',
     desc:'Crocodile-embossed genuine leather. 24k gold hardware. Comes with dust bag and certificate.',
     colors:['#080008','#1a0a00','#2d2d2d'],sizes:['One Size'],
     grad:'linear-gradient(160deg,#080008,#150015,#040004)',stock:3},
    {id:5,name:'Royal Dress Shirt',cat:'Shirts',gender:'men',price:680,old:null,badge:'BESTSELLER',rating:4.7,reviews:87,sku:'VR-SH-001',
     desc:'Egyptian cotton, 200 thread count. French cuffs, spread collar. Monogram service available.',
     colors:['#ffffff','#1a1a1a','#0a0505'],sizes:['S','M','L','XL','XXL'],
     grad:'linear-gradient(160deg,#0a0a0a,#1a1a1a,#111111)',stock:28},
    {id:6,name:'Evening Gown',cat:'Dresses',gender:'women',price:4800,old:null,badge:'LIMITED',rating:5,reviews:11,sku:'VR-D-002',
     desc:'Silk charmeuse, bias cut. Bespoke fit available. Worn at the Met Gala afterparty.',
     colors:['#150a00','#0a0a0a','#1a1a00'],sizes:['XS','S','M','L'],
     grad:'linear-gradient(160deg,#150a00,#241500,#0a0600)',stock:2},
    {id:7,name:'Signature Trench',cat:'Coats',gender:'women',price:2600,old:3000,badge:'SALE',rating:4.8,reviews:34,sku:'VR-C-002',
     desc:'Gabardine with silk lining. Detachable belt, storm flap. An icon reborn.',
     colors:['#1a0a0a','#0a0a0a','#2d1a08'],sizes:['XS','S','M','L','XL'],
     grad:'linear-gradient(160deg,#1a0a0a,#2d1515,#0d0606)',stock:9},
    {id:8,name:'Gold Link Belt',cat:'Accessories',gender:'unisex',price:380,old:null,badge:'NEW',rating:4.6,reviews:25,sku:'VR-A-001',
     desc:'18k gold-plated brass. Signature double-V buckle. Adjustable to 5 sizes.',
     colors:['#c9a84c','#1a1a1a'],sizes:['S/M','L/XL'],
     grad:'linear-gradient(160deg,#1a1500,#2d2500,#0d0d00)',stock:18},
    {id:9,name:'Crystal Eyewear',cat:'Eyewear',gender:'unisex',price:520,old:null,badge:null,rating:4.7,reviews:41,sku:'VR-E-001',
     desc:'Acetate frame with anti-reflective sapphire-coated lenses. UV400 protection.',
     colors:['#001010','#1a0a00','#0a0a0a'],sizes:['One Size'],
     grad:'linear-gradient(160deg,#001010,#002020,#001a1a)',stock:15},
    {id:10,name:'Caviar Handbag',cat:'Bags',gender:'women',price:2900,old:null,badge:'LIMITED',rating:5,reviews:16,sku:'VR-B-002',
     desc:'Quilted caviar leather. Gold chain strap. Numbered certificate of authenticity included.',
     colors:['#0a0505','#1a1a1a','#2d1a08'],sizes:['One Size'],
     grad:'linear-gradient(160deg,#0a0500,#1a0d00,#050300)',stock:4},
    {id:11,name:'Bishop Wool Coat',cat:'Coats',gender:'men',price:2100,old:null,badge:null,rating:4.9,reviews:22,sku:'VR-C-003',
     desc:'Double-face Merino wool. Clean modernist silhouette. Made in Italy.',
     colors:['#0a0a14','#1a1a1a','#2d1a08'],sizes:['S','M','L','XL','XXL'],
     grad:'linear-gradient(160deg,#0a0a14,#141424,#050510)',stock:8},
    {id:12,name:'Silk Wide Trousers',cat:'Trousers',gender:'women',price:890,old:1100,badge:'SALE',rating:4.6,reviews:38,sku:'VR-T-001',
     desc:'High-waisted silk crepe. Wide-leg silhouette, invisible zip. Dry clean only.',
     colors:['#100010','#1a1a1a','#f0f0f0'],sizes:['XS','S','M','L','XL'],
     grad:'linear-gradient(160deg,#100010,#200020,#0a000a)',stock:11},
  ],
  collections: [
    {id:'signature',name:'Signature Series',desc:'The pinnacle of VIREON craftsmanship.',season:'2026'},
    {id:'limited',name:'Limited Drops',desc:'Exclusive numbered pieces.',season:'2026'},
    {id:'editorial',name:'Editorial',desc:'Magazine-worthy couture.',season:'2026'},
    {id:'evening',name:'Night Luxe',desc:'For evenings that demand presence.',season:'2026'},
  ]
};

function getProducts(f={}){
  let list=[...DB.products];
  if(f.cat&&f.cat!=='all') list=list.filter(p=>p.cat.toLowerCase()===f.cat.toLowerCase()||p.gender===f.cat.toLowerCase());
  if(f.badge) list=list.filter(p=>p.badge===f.badge);
  if(f.q) list=list.filter(p=>p.name.toLowerCase().includes(f.q)||p.cat.toLowerCase().includes(f.q)||p.desc.toLowerCase().includes(f.q)||p.sku.toLowerCase().includes(f.q));
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
  const p = DB.products.find(x=>x.id===id); if(!p) return;
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
      <div class="p-card-bg" style="background:${p.grad}"></div>
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
  const p=DB.products.find(x=>x.id===id); if(!p) return;
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
   COUNTDOWN TIMER
   ──────────────────────────────────────────────────────────── */
function initCountdown(){
  const end=new Date(Date.now()+((2*86400+14*3600+32*60+9)*1000));
  function tick(){
    const diff=Math.max(0,end-Date.now());
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    const p=n=>String(n).padStart(2,'0');
    const set=(id,v)=>{const el=document.getElementById(id);if(el&&el.textContent!==v){el.classList.add('flip');el.textContent=v;setTimeout(()=>el.classList.remove('flip'),300);}};
    set('cd-d',p(d)); set('cd-h',p(h)); set('cd-m',p(m)); set('cd-s',p(s));
  }
  tick(); setInterval(tick,1000);
}

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
   BESTSELLER TABS
   ──────────────────────────────────────────────────────────── */
function initBestTabs(){
  const grid=document.getElementById('best-grid');
  if(!grid) return;
  const tabs=document.querySelectorAll('[data-bs-tab]');
  function render(cat){
    let list=cat==='all'?getProducts().slice(0,8):getProducts({cat}).slice(0,8);
    grid.innerHTML=list.map(pCard).join('');
    initReveal(); attachCardLinks();
  }
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('on'));
    t.classList.add('on'); render(t.dataset.bsTab);
  }));
  render('all');
}

/* ────────────────────────────────────────────────────────────
   NEW ARRIVALS
   ──────────────────────────────────────────────────────────── */
function initNewArrivals(){
  const g=document.getElementById('new-arrivals-grid');
  if(!g) return;
  const list=getProducts({badge:'NEW'}).concat(getProducts().filter(p=>!p.badge)).slice(0,4);
  g.innerHTML=list.map(pCard).join('');
  initReveal(); attachCardLinks();
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
  if(!grid) return;
  let activeFilter='all', searchQ='', sortVal='';
  function render(){
    const f={sort:sortVal,q:searchQ||undefined};
    if(activeFilter!=='all') f.cat=activeFilter;
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
  document.querySelectorAll('[data-filter]').forEach(chip=>{
    chip.addEventListener('click',()=>{
      document.querySelectorAll('[data-filter]').forEach(c=>c.classList.remove('on'));
      chip.classList.add('on'); activeFilter=chip.dataset.filter; render();
    });
  });
  const si=document.getElementById('shop-search');
  si?.addEventListener('input',function(){searchQ=this.value.toLowerCase().trim();render();});
  const ss=document.getElementById('shop-sort');
  ss?.addEventListener('change',function(){sortVal=this.value;render();});
  // URL params
  const u=new URLSearchParams(window.location.search);
  if(u.get('cat')){
    activeFilter=u.get('cat');
    document.querySelectorAll('[data-filter]').forEach(c=>{
      c.classList.toggle('on',c.dataset.filter===activeFilter);
    });
  }
  render();
}

/* ────────────────────────────────────────────────────────────
   PRODUCT DETAIL PAGE
   ──────────────────────────────────────────────────────────── */
function initProductPage(){
  if(!document.getElementById('pd-root')) return;
  const u=new URLSearchParams(window.location.search);
  const p=DB.products.find(x=>x.id===parseInt(u.get('id')))||DB.products[0];
  let selSize='', selColor='', qty=1;

  // Populate fields
  const set=(id,val,prop='textContent')=>{ const el=document.getElementById(id); if(el) el[prop]=val; };
  set('pd-name',p.name); set('pd-cat',p.cat); set('pd-price','$'+p.price.toLocaleString());
  set('pd-sku',p.sku); set('pd-desc',p.desc,'innerHTML');
  if(p.old){ set('pd-old','$'+p.old.toLocaleString()); const d=Math.round((1-p.price/p.old)*100); set('pd-disc',`-${d}%`); }
  else { document.getElementById('pd-old')?.parentElement?.querySelectorAll('[id="pd-old"],[id="pd-disc"]').forEach(e=>e.style.display='none'); }

  // Gallery
  const imgs=['pd-img-1','pd-img-2','pd-img-3','pd-img-4'];
  imgs.forEach(id=>{ const el=document.getElementById(id); if(el) el.style.background=p.grad; });
  const mainImg=document.getElementById('pd-main-img');
  if(mainImg) mainImg.style.background=p.grad;
  document.querySelectorAll('.g-thumb').forEach((t,i)=>{
    t.style.background=p.grad;
    t.addEventListener('click',()=>{ document.querySelectorAll('.g-thumb').forEach(x=>x.classList.remove('on')); t.classList.add('on'); });
  });
  document.querySelectorAll('.g-thumb')[0]?.classList.add('on');

  // Colors
  const cp=document.getElementById('pd-colors');
  if(cp) cp.innerHTML=p.colors.map(c=>`<button class="cp" style="background:${c}" data-color="${c}" onclick="selectColor(this)"></button>`).join('');
  window.selectColor=function(btn){ document.querySelectorAll('.cp').forEach(b=>b.classList.remove('on')); btn.classList.add('on'); selColor=btn.dataset.color; };

  // Sizes
  const sp=document.getElementById('pd-sizes');
  if(sp) sp.innerHTML=p.sizes.map(s=>`<button class="sp" data-size="${s}" onclick="selectSize(this)">${s}</button>`).join('');
  window.selectSize=function(btn){ document.querySelectorAll('.sp').forEach(b=>b.classList.remove('on')); btn.classList.add('on'); selSize=btn.dataset.size; };

  // Qty
  document.getElementById('pd-minus')?.addEventListener('click',()=>{ if(qty>1){qty--;document.getElementById('pd-qty').textContent=qty;} });
  document.getElementById('pd-plus')?.addEventListener('click',()=>{ qty++; document.getElementById('pd-qty').textContent=qty; });

  // Actions
  document.getElementById('pd-add')?.addEventListener('click',()=>{
    if(p.sizes.length>1&&!selSize){ toast('Please select a size','error'); shakeEl(document.getElementById('pd-sizes')); return; }
    cartAdd(p.id,qty,selSize,selColor);
  });
  document.getElementById('pd-buy')?.addEventListener('click',()=>{
    if(p.sizes.length>1&&!selSize){ toast('Please select a size','error'); return; }
    cartAdd(p.id,qty,selSize,selColor); setTimeout(()=>window.location.href='cart.html',400);
  });
  const wishBtn=document.getElementById('pd-wish');
  if(wishBtn){
    wishBtn.classList.toggle('on',store.wish().includes(p.id));
    wishBtn.querySelector('i').className=store.wish().includes(p.id)?'fas fa-heart':'far fa-heart';
    wishBtn.addEventListener('click',()=>{ wishToggle(p.id); wishBtn.classList.toggle('on',store.wish().includes(p.id)); wishBtn.querySelector('i').className=store.wish().includes(p.id)?'fas fa-heart':'far fa-heart'; });
  }

  // Tabs
  document.querySelectorAll('.pt-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.pt-btn').forEach(b=>b.classList.remove('on'));
      document.querySelectorAll('.pd-tab-body').forEach(b=>b.classList.remove('on'));
      btn.classList.add('on'); document.getElementById(btn.dataset.tab)?.classList.add('on');
    });
  });
  document.querySelector('.pt-btn')?.classList.add('on');
  document.querySelector('.pd-tab-body')?.classList.add('on');

  // Recommended
  const rec=document.getElementById('rec-grid');
  if(rec){ rec.innerHTML=DB.products.filter(x=>x.id!==p.id&&x.cat===p.cat).slice(0,4).concat(DB.products.filter(x=>x.id!==p.id&&x.cat!==p.cat).slice(0,4)).slice(0,4).map(pCard).join(''); attachCardLinks(); }

  // Recently viewed
  let recent=store.recently().filter(id=>id!==p.id);
  recent.unshift(p.id); recent=recent.slice(0,8);
  store.set('vireon_recent',recent);
  const rvg=document.getElementById('recently-viewed');
  if(rvg){ rvg.innerHTML=recent.filter(id=>id!==p.id).slice(0,4).map(id=>{const pr=DB.products.find(x=>x.id===id);return pr?pCard(pr):''}).join(''); attachCardLinks(); }
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
  if(!grid) return;
  function render(){
    const ids=store.wish();
    const prods=DB.products.filter(p=>ids.includes(p.id));
    grid.innerHTML=!prods.length
      ?`<div style="grid-column:1/-1;text-align:center;padding:6rem;color:var(--gray)"><i class="far fa-heart" style="font-size:4rem;color:var(--border);display:block;margin-bottom:2rem"></i><h3 style="font-size:2rem;color:var(--white);font-weight:300;margin-bottom:1rem">Your wishlist is empty</h3><p style="margin-bottom:2.5rem">Save pieces you love and find them here.</p><a href="shop.html" class="btn btn--gold">EXPLORE COLLECTION</a></div>`
      :prods.map(pCard).join('');
    initReveal(); attachCardLinks();
  }
  render();
  wishBus.on(render);
  document.getElementById('wish-add-all')?.addEventListener('click',()=>{
    store.wish().forEach(id=>cartAdd(id)); toast(`${store.wish().length} pieces added to bag`);
  });
  document.getElementById('wish-share')?.addEventListener('click',()=>{
    navigator.clipboard?.writeText(window.location.href).then(()=>toast('Wishlist link copied!'));
  });
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
  if(topEl) topEl.innerHTML=DB.products.slice(0,5).map((p,i)=>`
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
  initCountdown();
  initReviews();
  initBestTabs();
  initNewArrivals();
  initAI();
  initNewsletter();
  initShopPage();
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
(function overrideCursor(){
  document.addEventListener('DOMContentLoaded', function(){
    const c    = document.getElementById('v-cursor');
    const ring = document.getElementById('v-cursor-ring');
    if(!c || !ring || window.matchMedia('(hover:none)').matches) return;

    /* Set the ⚜ symbol */
    c.innerHTML = '';
    c.textContent = '\u269C';
    c.style.cssText = [
      'position:fixed','pointer-events:none','z-index:999999',
      'transform:translate(-50%,-50%)','font-size:1.35rem','line-height:1',
      'color:#D4AF37','transition:transform .15s ease, opacity .3s',
      'animation:cursorGlow 2.5s ease-in-out infinite',
      'will-change:left,top','user-select:none'
    ].join(';');

    ring.style.cssText = [
      'position:fixed','pointer-events:none','z-index:999998',
      'transform:translate(-50%,-50%)','width:34px','height:34px',
      'border-radius:50%','border:1px solid rgba(212,175,55,.4)',
      'transition:width .3s,height .3s,border-color .3s','will-change:left,top'
    ].join(';');

    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',function(e){
      mx=e.clientX; my=e.clientY;
      c.style.left=mx+'px'; c.style.top=my+'px';
    },{passive:true});

    function trail(){
      rx+=(mx-rx)*0.16; ry+=(my-ry)*0.16;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(trail);
    }
    trail();

    document.addEventListener('mouseover',function(e){
      if(e.target.closest('a,button,.p-card,.cat-item,.btn,.ed-card,.vireon-logo')){
        ring.style.width='56px'; ring.style.height='56px';
        ring.style.borderColor='rgba(212,175,55,.75)';
        ring.style.background='rgba(212,175,55,.04)';
        c.style.transform='translate(-50%,-50%) scale(1.2) rotate(12deg)';
      }
    });
    document.addEventListener('mouseout',function(e){
      if(e.target.closest('a,button,.p-card,.cat-item,.btn,.ed-card,.vireon-logo')){
        ring.style.width='34px'; ring.style.height='34px';
        ring.style.borderColor='rgba(212,175,55,.4)';
        ring.style.background='';
        c.style.transform='translate(-50%,-50%) scale(1) rotate(0deg)';
      }
    });
    document.addEventListener('mousedown',function(){
      ring.style.width='20px'; ring.style.height='20px';
      ring.style.borderColor='#D4AF37'; ring.style.borderWidth='2px';
      c.style.transform='translate(-50%,-50%) scale(0.7)';
    });
    document.addEventListener('mouseup',function(){
      ring.style.width='34px'; ring.style.height='34px';
      ring.style.borderWidth='1px';
      c.style.transform='translate(-50%,-50%) scale(1)';
    });
    document.addEventListener('mouseleave',function(){ c.style.opacity='0'; ring.style.opacity='0'; });
    document.addEventListener('mouseenter',function(){ c.style.opacity='1'; ring.style.opacity='1'; });
  });
})();