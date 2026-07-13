/* ═══════════════════════════════════════════════════════════
   VIREON — ADMIN DASHBOARD ENGINE
   Full SPA panel system, data, charts, interactions
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ────── SAMPLE DATA ──────────────────────────────────────── */
const ORDERS_DATA = [
  {id:'VP-2026-047',customer:'James Whitmore',product:'Sovereign Coat',amount:1850,date:'Jul 10',delivery:'Express',status:'Processing'},
  {id:'VP-2026-046',customer:'Sofia Reyes',product:'Evening Gown',amount:4800,date:'Jul 9',delivery:'Standard',status:'Shipped'},
  {id:'VP-2026-045',customer:'Marcus Bell',product:'Imperial Suit',amount:3200,date:'Jul 8',delivery:'Express',status:'Delivered'},
  {id:'VP-2026-044',customer:'Elara Voss',product:'Noir Velvet Dress',amount:2200,date:'Jul 7',delivery:'Standard',status:'Processing'},
  {id:'VP-2026-043',customer:'Hugo Laurent',product:'Obsidian Shoulder Bag',amount:1450,date:'Jul 6',delivery:'Standard',status:'Delivered'},
  {id:'VP-2026-042',customer:'Isabella Cross',product:'Evening Gown',amount:4800,date:'Jul 5',delivery:'Express',status:'Cancelled'},
  {id:'VP-2026-041',customer:'Thomas Reed',product:'Crystal Eyewear',amount:520,date:'Jul 4',delivery:'Standard',status:'Delivered'},
  {id:'VP-2026-040',customer:'Priya Sharma',product:'Royal Dress Shirt',amount:680,date:'Jul 3',delivery:'Standard',status:'Delivered'},
  {id:'VP-2026-039',customer:'Leon Müller',product:'Gold Link Belt',amount:380,date:'Jul 2',delivery:'Standard',status:'Shipped'},
  {id:'VP-2026-038',customer:'Camille Blanc',product:'Silk Wide Trousers',amount:890,date:'Jul 1',delivery:'Express',status:'Delivered'},
];

const PRODUCTS_DATA = [
  {id:1,name:'Sovereign Coat',sku:'VR-C-001',cat:'Coats',price:1850,stock:7,sales:124,badge:'LIMITED'},
  {id:2,name:'Noir Velvet Dress',sku:'VR-D-001',cat:'Dresses',price:2200,stock:12,sales:76,badge:'NEW'},
  {id:3,name:'Imperial Suit',sku:'VR-S-001',cat:'Suits',price:3200,stock:5,sales:58,badge:null},
  {id:4,name:'Obsidian Shoulder Bag',sku:'VR-B-001',cat:'Bags',price:1450,stock:3,sales:63,badge:'SALE'},
  {id:5,name:'Royal Dress Shirt',sku:'VR-SH-001',cat:'Shirts',price:680,stock:28,sales:87,badge:'BESTSELLER'},
  {id:6,name:'Evening Gown',sku:'VR-D-002',cat:'Dresses',price:4800,stock:2,sales:43,badge:'LIMITED'},
  {id:7,name:'Signature Trench',sku:'VR-C-002',cat:'Coats',price:2600,stock:9,sales:34,badge:'SALE'},
  {id:8,name:'Gold Link Belt',sku:'VR-A-001',cat:'Accessories',price:380,stock:18,sales:25,badge:'NEW'},
  {id:9,name:'Crystal Eyewear',sku:'VR-E-001',cat:'Eyewear',price:520,stock:15,sales:41,badge:null},
  {id:10,name:'Caviar Handbag',sku:'VR-B-002',cat:'Bags',price:2900,stock:4,sales:16,badge:'LIMITED'},
  {id:11,name:'Bishop Wool Coat',sku:'VR-C-003',cat:'Coats',price:2100,stock:8,sales:22,badge:null},
  {id:12,name:'Silk Wide Trousers',sku:'VR-T-001',cat:'Trousers',price:890,stock:11,sales:38,badge:'SALE'},
];

const CUSTOMERS_DATA = [
  {name:'Alexandra Rothschild',email:'a.roth@email.com',tier:'VIREON Elite',orders:12,spent:28400,points:2840,joined:'Jan 2025'},
  {name:'Marcus Bellingham',email:'m.bell@email.com',tier:'VIREON Elite',orders:8,spent:19200,points:1920,joined:'Mar 2025'},
  {name:'James Whitmore',email:'j.whit@email.com',tier:'Premium',orders:5,spent:8250,points:825,joined:'Sep 2025'},
  {name:'Sofia Reyes',email:'s.reyes@email.com',tier:'Premium',orders:3,spent:6800,points:680,joined:'Nov 2025'},
  {name:'Hugo Laurent',email:'h.laur@email.com',tier:'VIREON Elite',orders:15,spent:34100,points:3410,joined:'Dec 2024'},
  {name:'Isabelle Fontaine',email:'i.font@email.com',tier:'Standard',orders:2,spent:2900,points:290,joined:'Feb 2026'},
  {name:'Thomas Reed',email:'t.reed@email.com',tier:'Premium',orders:4,spent:5200,points:520,joined:'Apr 2026'},
  {name:'Priya Sharma',email:'p.shar@email.com',tier:'Standard',orders:1,spent:680,points:68,joined:'Jun 2026'},
  {name:'Leon Müller',email:'l.mull@email.com',tier:'Premium',orders:6,spent:9840,points:984,joined:'Jul 2025'},
  {name:'Camille Blanc',email:'c.blan@email.com',tier:'VIREON Elite',orders:11,spent:22300,points:2230,joined:'Aug 2024'},
];

const INVENTORY_DATA = [
  {name:'Sovereign Coat',sku:'VR-C-001',stock:7,threshold:10,status:'Low Stock',warehouse:'London HQ'},
  {name:'Evening Gown',sku:'VR-D-002',stock:2,threshold:5,status:'Low Stock',warehouse:'London HQ'},
  {name:'Obsidian Shoulder Bag',sku:'VR-B-001',stock:3,threshold:8,status:'Low Stock',warehouse:'Milan Store'},
  {name:'Caviar Handbag',sku:'VR-B-002',stock:4,threshold:6,status:'Low Stock',warehouse:'Dubai Store'},
  {name:'Imperial Suit',sku:'VR-S-001',stock:5,threshold:4,status:'In Stock',warehouse:'London HQ'},
  {name:'Noir Velvet Dress',sku:'VR-D-001',stock:12,threshold:5,status:'In Stock',warehouse:'London HQ'},
  {name:'Royal Dress Shirt',sku:'VR-SH-001',stock:28,threshold:10,status:'In Stock',warehouse:'London HQ'},
  {name:'Gold Link Belt',sku:'VR-A-001',stock:18,threshold:8,status:'In Stock',warehouse:'London HQ'},
  {name:'Crystal Eyewear',sku:'VR-E-001',stock:15,threshold:5,status:'In Stock',warehouse:'London HQ'},
  {name:'Bishop Wool Coat',sku:'VR-C-003',stock:8,threshold:5,status:'In Stock',warehouse:'Milan Store'},
  {name:'Signature Trench',sku:'VR-C-002',stock:9,threshold:5,status:'In Stock',warehouse:'London HQ'},
  {name:'Silk Wide Trousers',sku:'VR-T-001',stock:11,threshold:5,status:'In Stock',warehouse:'London HQ'},
];

const AUDIT_LOG = [
  {time:'Today 09:14',admin:'Rockstar',action:'Logged in successfully',ip:'82.132.45.17',status:'ok'},
  {time:'Today 09:20',admin:'Rockstar',action:'Viewed Orders panel',ip:'82.132.45.17',status:'ok'},
  {time:'Today 08:45',admin:'Vanshika',action:'Logged in successfully',ip:'91.240.110.54',status:'ok'},
  {time:'Today 08:47',admin:'Vanshika',action:'Updated product: Evening Gown',ip:'91.240.110.54',status:'ok'},
  {time:'Yesterday 18:32',admin:'Lilith',action:'Sent email campaign: July Newsletter',ip:'176.32.88.21',status:'ok'},
  {time:'Yesterday 17:10',admin:'Prince',action:'Resolved ticket #TKT-085',ip:'192.168.1.14',status:'ok'},
  {time:'Yesterday 14:22',admin:'Unknown',action:'Failed login attempt: rockstar',ip:'45.33.221.9',status:'error'},
  {time:'Yesterday 14:23',admin:'Unknown',action:'Failed login attempt: rockstar',ip:'45.33.221.9',status:'error'},
];

const LIVE_BREAKDOWN = [
  {page:'Homepage',count:48},
  {page:'Shop',count:62},
  {page:'Product Pages',count:32},
];

const ACTIVITIES = [
  {dot:'var(--gold)',text:'New order VP-2026-047 — $1,850',time:'2 min ago'},
  {dot:'var(--success)',text:'Order VP-2026-043 delivered',time:'18 min ago'},
  {dot:'var(--info)',text:'New customer: Alexandra R.',time:'45 min ago'},
  {dot:'var(--gold)',text:'5-star review: Sovereign Coat',time:'1h ago'},
  {dot:'var(--error)',text:'Return request: VP-2026-031',time:'2h ago'},
  {dot:'var(--warning)',text:'Low stock: Evening Gown (2 left)',time:'3h ago'},
  {dot:'var(--success)',text:'Email campaign sent — 2,341 recipients',time:'4h ago'},
  {dot:'var(--gold)',text:'Coupon VIREON20 used 3 times today',time:'5h ago'},
];

/* ────── PANEL NAVIGATION ─────────────────────────────────── */
function showPanel(id) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.admin-link').forEach(l => l.classList.remove('on'));

  const panel = document.getElementById(id);
  const link  = document.querySelector(`[data-panel="${id}"]`);
  if (panel) panel.classList.add('on');
  if (link)  link.classList.add('on');

  // Update topbar
  const titles = {
    'panel-dashboard':  ['Dashboard','Overview → Dashboard'],
    'panel-analytics':  ['Analytics','Overview → Analytics'],
    'panel-reports':    ['Reports','Overview → Reports'],
    'panel-products':   ['Products','Catalogue → Products'],
    'panel-collections':['Collections','Catalogue → Collections'],
    'panel-categories': ['Categories','Catalogue → Categories'],
    'panel-inventory':  ['Inventory','Catalogue → Inventory'],
    'panel-orders':     ['Orders','Commerce → Orders'],
    'panel-customers':  ['Customers','Commerce → Customers'],
    'panel-returns':    ['Returns','Commerce → Returns'],
    'panel-coupons':    ['Coupons','Commerce → Coupons'],
    'panel-email':      ['Email Campaigns','Marketing → Email'],
    'panel-push':       ['Push Campaigns','Marketing → Push'],
    'panel-reviews':    ['Reviews','Marketing → Reviews'],
    'panel-flashsale':  ['Flash Sales','Marketing → Flash Sales'],
    'panel-support':    ['Support Tickets','System → Support'],
    'panel-security':   ['Security','System → Security'],
    'panel-settings':   ['Settings','System → Settings'],
  };
  const info = titles[id] || ['Dashboard',''];
  const titleEl = document.getElementById('topbar-title');
  const breadEl = document.getElementById('topbar-breadcrumb');
  if (titleEl) titleEl.textContent = info[0];
  if (breadEl) breadEl.textContent = info[1];

  // Scroll area back to top
  const area = document.getElementById('admin-content-area');
  if (area) area.scrollTop = 0;

  // Lazy init for panels that need it
  if (id === 'panel-dashboard') initDashboardCharts();
  if (id === 'panel-analytics')  initAnalyticsCharts();
  if (id === 'panel-security')   renderSecurityPanel();
  if (id === 'panel-settings')   renderSettingsPanel();
  if (id === 'panel-orders')     renderOrdersTable(ORDERS_DATA);
  if (id === 'panel-products')   renderProductsTable(PRODUCTS_DATA);
  if (id === 'panel-customers')  renderCustomersTable(CUSTOMERS_DATA);
  if (id === 'panel-inventory')  renderInventoryTable(INVENTORY_DATA);
}

/* ────── SIDEBAR CLICK BINDING ───────────────────────────── */
function bindSidebar() {
  document.querySelectorAll('[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => showPanel(btn.dataset.panel));
  });
  document.getElementById('sidebar-settings-btn')?.addEventListener('click', () => showPanel('panel-settings'));
}

/* ────── TOAST ────────────────────────────────────────────── */
function toast(msg, type = '') {
  const el = document.getElementById('v-toast');
  const m  = document.getElementById('v-toast-msg');
  if (!el || !m) return;
  m.textContent = msg;
  el.className = `on ${type}`;
  setTimeout(() => el.classList.remove('on'), 3200);
}
window.toast = toast;

/* ────── BADGE MAP ────────────────────────────────────────── */
const STATUS_BADGE = {
  'Delivered': 'badge-delivered', 'Processing': 'badge-processing',
  'Shipped': 'badge-shipped', 'Cancelled': 'badge-cancelled',
  'Pending': 'badge-pending', 'Refunded': 'badge-refunded',
  'In Stock': 'badge-active', 'Low Stock': 'badge-pending',
  'Out of Stock': 'badge-cancelled',
};

/* ────── DASHBOARD PANEL ──────────────────────────────────── */
function initDashboardPanel() {
  // Recent orders (short)
  const tbody = document.querySelector('#dash-orders-table tbody');
  if (tbody) {
    tbody.innerHTML = ORDERS_DATA.slice(0, 6).map(o => `
      <tr>
        <td style="color:var(--gold);cursor:pointer" onclick="showPanel('panel-orders')">${o.id}</td>
        <td>${o.customer}</td>
        <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.product}</td>
        <td style="color:var(--gold);font-family:var(--font-serif)">$${o.amount.toLocaleString()}</td>
        <td>${o.date}</td>
        <td><span class="badge ${STATUS_BADGE[o.status]||''}">${o.status}</span></td>
        <td><button class="tbl-action" onclick="showPanel('panel-orders')">VIEW</button></td>
      </tr>`).join('');
  }

  // Top products
  const tp = document.getElementById('dash-top-products');
  if (tp) {
    tp.innerHTML = PRODUCTS_DATA.slice(0, 5).map((p, i) => `
      <div style="display:flex;align-items:center;gap:1rem;padding:.7rem 0;border-bottom:1px solid var(--border)">
        <span style="font-size:.72rem;color:var(--gray);width:18px;font-weight:700">${i+1}</span>
        <div style="width:40px;height:50px;background:linear-gradient(135deg,#1a0f05,#2d1a08);border:1px solid var(--border);flex-shrink:0"></div>
        <div style="flex:1;min-width:0"><p style="font-size:.78rem;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</p><p style="font-size:.65rem;color:var(--gray)">${p.cat} · ${p.sales} sold</p></div>
        <span style="font-family:var(--font-serif);font-size:.95rem;color:var(--gold);white-space:nowrap">$${p.price.toLocaleString()}</span>
      </div>`).join('');
  }

  // Activity feed
  const af = document.getElementById('dash-activity');
  if (af) {
    af.innerHTML = ACTIVITIES.map(a => `
      <div style="display:flex;gap:.8rem;align-items:flex-start;padding:.65rem 0;border-bottom:1px solid var(--border)">
        <div style="width:8px;height:8px;border-radius:50%;background:${a.dot};flex-shrink:0;margin-top:.4rem"></div>
        <div><p style="font-size:.74rem;color:var(--text-2);line-height:1.5">${a.text}</p><p style="font-size:.62rem;color:var(--gray);margin-top:.15rem">${a.time}</p></div>
      </div>`).join('');
  }

  // Live visitors breakdown
  const lb = document.getElementById('live-breakdown');
  if (lb) {
    lb.innerHTML = LIVE_BREAKDOWN.map(b => `
      <div style="display:flex;justify-content:space-between;font-size:.7rem;padding:.3rem 0;border-bottom:1px solid var(--border)">
        <span style="color:var(--text-2)">${b.page}</span>
        <span style="color:var(--gold)">${b.count}</span>
      </div>`).join('');
  }

  // Animate live count
  let liveN = 142;
  setInterval(() => {
    liveN += Math.floor(Math.random() * 7) - 3;
    liveN = Math.max(80, Math.min(200, liveN));
    const el = document.getElementById('live-count');
    if (el) el.textContent = liveN;
  }, 3000);
}

let chartsInit = false;
function initDashboardCharts() {
  if (chartsInit) return; chartsInit = true;
  if (!window.Chart) return;
  const g = s => 'rgba(212,175,55,' + s + ')';
  const def = { responsive: true, plugins: { legend: { display: false } } };
  const gridOpts = { x: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } }, y: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } } };

  const rc = document.getElementById('ch-revenue');
  if (rc) new Chart(rc, { type: 'line', data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'], datasets: [{ data: [42000,58000,51000,72000,68000,89000,84250], borderColor: '#D4AF37', backgroundColor: g('.07'), tension: .4, pointBackgroundColor: '#D4AF37', pointRadius: 5, fill: true }] }, options: { ...def, scales: { ...gridOpts, y: { ...gridOpts.y, ticks: { ...gridOpts.y.ticks, callback: v => '$' + v.toLocaleString() } } } } });

  const cc = document.getElementById('ch-cat');
  if (cc) new Chart(cc, { type: 'doughnut', data: { labels: ['Coats','Dresses','Suits','Bags','Accessories','Other'], datasets: [{ data: [28,22,15,18,12,5], backgroundColor: ['#D4AF37','#B8962E','#F5D76E','#8b6914','#5c4a0a','#2A2A2A'], borderColor: '#1B1B1B', borderWidth: 3 }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#888', font: { size: 11 } } } } } });

  const tc = document.getElementById('ch-traffic');
  if (tc) new Chart(tc, { type: 'bar', data: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ data: [1200,1850,1420,2100,1780,2400,1900], backgroundColor: g('.55'), borderColor: '#D4AF37', borderWidth: 1 }] }, options: { ...def, scales: gridOpts } });
}

/* ────── ANALYTICS CHARTS ─────────────────────────────────── */
let analyticsInit = false;
function initAnalyticsCharts() {
  if (analyticsInit) return; analyticsInit = true;
  if (!window.Chart) return;
  const g = s => 'rgba(212,175,55,' + s + ')';
  const gridOpts = { x: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } }, y: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } } };

  const rm = document.getElementById('ch-rev-monthly');
  if (rm) new Chart(rm, { type: 'line', data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], datasets: [{ label: '2026', data: [42000,58000,51000,72000,68000,89000,84250,null,null,null,null,null], borderColor: '#D4AF37', backgroundColor: g('.07'), tension: .4, pointBackgroundColor: '#D4AF37', fill: true }, { label: '2025', data: [31000,45000,42000,55000,52000,71000,66000,58000,74000,80000,68000,92000], borderColor: '#555', backgroundColor: 'transparent', tension: .4, borderDash: [4,4] }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#888' } } }, scales: { ...gridOpts, y: { ...gridOpts.y, ticks: { ...gridOpts.y.ticks, callback: v => '$' + (v/1000).toFixed(0) + 'k' } } } } });

  const ts = document.getElementById('ch-traffic-sources');
  if (ts) new Chart(ts, { type: 'doughnut', data: { labels: ['Direct','Social','Search','Email','Referral'], datasets: [{ data: [35,28,22,10,5], backgroundColor: ['#D4AF37','#B8962E','#F5D76E','#5c4a0a','#2A2A2A'], borderColor: '#1B1B1B', borderWidth: 3 }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#888', font: { size: 11 } } } } } });

  const od = document.getElementById('ch-orders-day');
  if (od) new Chart(od, { type: 'bar', data: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ data: [12,18,9,22,17,31,24], backgroundColor: g('.55'), borderColor: '#D4AF37', borderWidth: 1 }] }, options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } }, y: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } } } } });

  const dv = document.getElementById('ch-devices');
  if (dv) new Chart(dv, { type: 'pie', data: { labels: ['Desktop','Mobile','Tablet'], datasets: [{ data: [52,38,10], backgroundColor: ['#D4AF37','#B8962E','#5c4a0a'], borderColor: '#1B1B1B', borderWidth: 3 }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#888', font: { size: 11 } } } } } });

  const rg = document.getElementById('ch-regions');
  if (rg) new Chart(rg, { type: 'doughnut', data: { labels: ['UK','USA','UAE','FR','SG','Other'], datasets: [{ data: [38,24,18,10,6,4], backgroundColor: ['#D4AF37','#B8962E','#F5D76E','#8b6914','#5c4a0a','#2A2A2A'], borderColor: '#1B1B1B', borderWidth: 3 }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#888', font: { size: 11 } } } } } });
}

/* ────── ORDERS TABLE ─────────────────────────────────────── */
function renderOrdersTable(data) {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;
  tbody.innerHTML = data.map(o => `
    <tr>
      <td style="color:var(--gold);font-weight:500;cursor:pointer" onclick="viewOrderDetail('${o.id}')">${o.id}</td>
      <td>${o.customer}</td>
      <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.product}</td>
      <td style="color:var(--gold);font-family:var(--font-serif)">$${o.amount.toLocaleString()}</td>
      <td>${o.date}</td>
      <td><span class="d-tag" style="font-size:.55rem">${o.delivery}</span></td>
      <td><span class="badge ${STATUS_BADGE[o.status]||''}">${o.status}</span></td>
      <td>
        <button class="tbl-action" onclick="viewOrderDetail('${o.id}')">VIEW</button>
        <button class="tbl-action" onclick="window.open('tracking.html?order=${o.id}','_blank')">TRACK</button>
      </td>
    </tr>`).join('');
  const cnt = document.getElementById('orders-count');
  if (cnt) cnt.textContent = `Showing ${data.length} of 347 orders`;
}

function filterOrders() {
  const q      = (document.getElementById('order-search')?.value||'').toLowerCase();
  const status = document.getElementById('order-status-filter')?.value || '';
  let list = ORDERS_DATA.filter(o => {
    const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.product.toLowerCase().includes(q);
    const matchS = !status || o.status === status;
    return matchQ && matchS;
  });
  renderOrdersTable(list);
}

function viewOrderDetail(id) {
  const o = ORDERS_DATA.find(x => x.id === id);
  if (!o) return;
  toast(`Order ${id}: ${o.product} — ${o.status}`);
}

function createManualOrder() {
  toast('Manual order creation — feature coming soon.');
}

/* ────── PRODUCTS TABLE ───────────────────────────────────── */
function renderProductsTable(data) {
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  tbody.innerHTML = data.map(p => {
    const stockColor = p.stock <= 3 ? 'var(--error)' : p.stock <= 8 ? 'var(--warning)' : 'var(--success)';
    const stockStatus = p.stock <= 0 ? 'Out of Stock' : p.stock <= 8 ? 'Low Stock' : 'In Stock';
    return `
    <tr>
      <td><input type="checkbox" style="accent-color:var(--gold)"></td>
      <td>
        <div style="display:flex;align-items:center;gap:.8rem">
          <div style="width:36px;height:45px;background:linear-gradient(135deg,#1a0f05,#2d1a08);border:1px solid var(--border);flex-shrink:0"></div>
          <div><p style="font-size:.78rem;color:var(--white)">${p.name}</p><p style="font-size:.62rem;color:var(--gray)">${p.badge||''}</p></div>
        </div>
      </td>
      <td style="font-size:.68rem;color:var(--text-2);letter-spacing:.05em">${p.sku}</td>
      <td>${p.cat}</td>
      <td style="color:var(--gold);font-family:var(--font-serif)">$${p.price.toLocaleString()}</td>
      <td style="color:${stockColor};font-weight:600">${p.stock}</td>
      <td><span class="badge ${STATUS_BADGE[stockStatus]||''}">${stockStatus}</span></td>
      <td style="color:var(--text-2)">${p.sales}</td>
      <td>
        <button class="tbl-action" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
        <button class="tbl-action-del tbl-action" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
  const cnt = document.getElementById('prod-count');
  if (cnt) cnt.textContent = `Showing ${data.length} products`;
}

function filterProducts() {
  const q      = (document.getElementById('prod-search')?.value||'').toLowerCase();
  const cat    = document.getElementById('prod-cat-filter')?.value || '';
  const status = document.getElementById('prod-status-filter')?.value || '';
  let list = PRODUCTS_DATA.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchC = !cat || p.cat === cat;
    const s = p.stock <= 0 ? 'Out of Stock' : p.stock <= 8 ? 'Low Stock' : 'In Stock';
    const matchS = !status || s === status;
    return matchQ && matchC && matchS;
  });
  renderProductsTable(list);
}

function editProduct(id) { toast(`Editing product #${id} — form loaded.`); openAddProduct(); }
function deleteProduct(id) { if (confirm(`Delete product #${id}?`)) toast('Product deleted.', 'error'); }
function openAddProduct() { document.getElementById('add-product-form').style.display = 'block'; document.getElementById('add-product-form').scrollIntoView({ behavior: 'smooth' }); }
function closeAddProduct() { document.getElementById('add-product-form').style.display = 'none'; }
function saveProduct() { toast('Product saved successfully.', 'success'); closeAddProduct(); }

/* ────── CUSTOMERS TABLE ──────────────────────────────────── */
function renderCustomersTable(data) {
  const tbody = document.getElementById('customers-table');
  if (!tbody) return;
  const tierColor = { 'VIREON Elite': 'var(--gold)', 'Premium': '#3B82F6', 'Standard': 'var(--gray)' };
  tbody.innerHTML = data.map(c => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:.7rem">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--gold-grad);display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;color:var(--bg);flex-shrink:0">${c.name.charAt(0)}</div>
          <span style="font-size:.78rem;color:var(--white)">${c.name}</span>
        </div>
      </td>
      <td style="font-size:.72rem;color:var(--text-2)">${c.email}</td>
      <td><span style="font-size:.62rem;font-weight:700;color:${tierColor[c.tier]||'var(--gray)'}">${c.tier}</span></td>
      <td>${c.orders}</td>
      <td style="color:var(--gold);font-family:var(--font-serif)">$${c.spent.toLocaleString()}</td>
      <td style="color:var(--gold)">${c.points.toLocaleString()} pts</td>
      <td style="font-size:.72rem;color:var(--text-2)">${c.joined}</td>
      <td>
        <button class="tbl-action">VIEW</button>
        <button class="tbl-action">EMAIL</button>
      </td>
    </tr>`).join('');
}

/* ────── INVENTORY TABLE ──────────────────────────────────── */
function renderInventoryTable(data) {
  const tbody = document.getElementById('inventory-table');
  if (!tbody) return;
  tbody.innerHTML = data.map(item => {
    const pct = Math.min(100, Math.round(item.stock / 30 * 100));
    const color = item.stock <= item.threshold ? (item.stock <= 3 ? 'var(--error)' : 'var(--warning)') : 'var(--success)';
    return `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:.8rem">
          <div style="width:36px;height:45px;background:linear-gradient(135deg,#1a0f05,#2d1a08);border:1px solid var(--border);flex-shrink:0"></div>
          <span style="font-size:.78rem;color:var(--white)">${item.name}</span>
        </div>
      </td>
      <td style="font-size:.68rem;color:var(--text-2)">${item.sku}</td>
      <td>
        <span style="font-family:var(--font-serif);font-size:1.1rem;color:${color}">${item.stock}</span>
        <div class="d-progress" style="margin-top:.3rem;width:80px"><div class="d-progress-fill" style="width:${pct}%;background:${color}"></div></div>
      </td>
      <td style="color:var(--text-2)">${item.threshold}</td>
      <td><span class="badge ${STATUS_BADGE[item.status]||''}">${item.status}</span></td>
      <td style="font-size:.72rem;color:var(--text-2)">${item.warehouse}</td>
      <td>
        ${item.stock <= item.threshold ? `<button class="d-btn" style="padding:.28rem .65rem;font-size:.56rem" onclick="toast('Restock order placed for ${item.name}.','success')"><i class="fas fa-plus"></i> RESTOCK</button>` : '<button class="tbl-action">ADJUST</button>'}
      </td>
    </tr>`;
  }).join('');
}

/* ────── SECURITY PANEL ───────────────────────────────────── */
function renderSecurityPanel() {
  // Account cards
  const grid = document.getElementById('sec-accounts-grid');
  if (grid) {
    grid.innerHTML = AdminAuth.accounts.map(acc => `
      <div style="background:var(--bg-3);border:1px solid ${acc.locked ? 'var(--error)' : 'var(--border)'};padding:1.5rem;display:flex;align-items:center;gap:1rem">
        <div style="width:44px;height:44px;border-radius:50%;background:${acc.color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;color:var(--bg);flex-shrink:0">${acc.avatar}</div>
        <div style="flex:1">
          <p style="font-size:.82rem;color:var(--white);font-weight:600;margin-bottom:.2rem">${acc.displayName}</p>
          <p style="font-size:.65rem;color:var(--text-2);margin-bottom:.4rem">${acc.role} · ${acc.username}</p>
          <p style="font-size:.62rem;color:var(--gray)">Last login: ${acc.lastLogin || 'Never'}</p>
        </div>
        <div style="text-align:right">
          <span class="badge ${acc.locked ? 'badge-cancelled' : 'badge-active'}">${acc.locked ? 'LOCKED' : 'ACTIVE'}</span>
          ${acc.locked ? `<button class="tbl-action" style="display:block;margin-top:.4rem" onclick="unlockAccount('${acc.id}')">UNLOCK</button>` : ''}
        </div>
      </div>`).join('');
  }
  // Audit log
  const logEl = document.getElementById('audit-log-body');
  if (logEl) {
    logEl.innerHTML = AUDIT_LOG.map(l => `
      <tr>
        <td style="font-size:.7rem;color:var(--gray);white-space:nowrap">${l.time}</td>
        <td style="color:var(--gold);font-weight:600">${l.admin}</td>
        <td>${l.action}</td>
        <td style="font-size:.7rem;color:var(--text-2);font-family:monospace">${l.ip}</td>
        <td><span class="badge ${l.status === 'ok' ? 'badge-active' : 'badge-cancelled'}">${l.status === 'ok' ? 'SUCCESS' : 'BLOCKED'}</span></td>
      </tr>`).join('');
  }
}

function unlockAccount(id) {
  const acc = AdminAuth.accounts.find(a => a.id === id);
  if (acc) { acc.locked = false; acc.loginAttempts = 0; renderSecurityPanel(); toast(`${acc.displayName}'s account unlocked.`, 'success'); }
}

/* ────── SETTINGS PANEL ───────────────────────────────────── */
function renderSettingsPanel() {
  const s = AdminAuth.getSession(); if (!s) return;
  const acc = AdminAuth.findAccount(s.username); if (!acc) return;

  // Avatar & profile
  const avatarBig = document.getElementById('settings-avatar-big');
  if (avatarBig) { avatarBig.textContent = s.avatar; avatarBig.style.background = acc.color + ' linear-gradient(135deg,' + acc.color + ',' + acc.color + '99)'; }

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('settings-display-name', s.displayName);
  set('settings-role-badge', s.role);
  set('settings-email-display', s.email);
  set('s-username', s.username);
  set('s-last-login', acc.lastLogin || 'First session');
  const exp = new Date(s.expiresAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  set('s-session-exp', exp + ' today');

  // OTP email target
  const ote = document.getElementById('otp-email-target');
  if (ote) ote.textContent = s.email;

  // Bind OTP digit navigation
  document.querySelectorAll('.otp-digit-s').forEach((inp, i, all) => {
    inp.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '').slice(-1);
      this.style.borderColor = this.value ? 'var(--gold)' : 'var(--border)';
      if (this.value && i < all.length - 1) all[i + 1].focus();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !this.value && i > 0) { all[i - 1].focus(); all[i - 1].value = ''; all[i - 1].style.borderColor = 'var(--border)'; }
    });
  });
}

function updateStrength(pw) {
  const r = AdminAuth.validatePasswordStrength(pw);
  const bar = document.getElementById('pw-strength-bar');
  const txt = document.getElementById('pw-strength-txt');
  if (bar) { bar.style.width = (r.score / 5 * 100) + '%'; bar.style.background = r.color; }
  if (txt) { txt.textContent = pw ? r.label : ''; txt.style.color = r.color; }
}

function toggleField(inputId, iconId) {
  const i = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (i.type === 'password') { i.type = 'text'; if (icon) icon.className = 'fas fa-eye-slash'; }
  else { i.type = 'password'; if (icon) icon.className = 'fas fa-eye'; }
}

async function requestSettingsPwOTP() {
  const errEl = document.getElementById('pw-error-inline');
  const errMsg = document.getElementById('pw-error-inline-msg');
  const showErr = msg => { if (errEl) { errEl.style.display = 'flex'; if (errMsg) errMsg.textContent = msg; } };
  const hideErr = () => { if (errEl) errEl.style.display = 'none'; };
  hideErr();

  const s = AdminAuth.getSession(); if (!s) return;
  const acc = AdminAuth.findAccount(s.username); if (!acc) return;
  const curPw  = document.getElementById('s-cur-pw')?.value;
  const newPw  = document.getElementById('s-new-pw')?.value;
  const confPw = document.getElementById('s-conf-pw')?.value;

  if (!curPw)  { showErr('Please enter your current password.'); return; }
  if (!AdminAuth.verifyPassword(acc, curPw)) { showErr('Current password is incorrect.'); return; }
  if (!newPw)  { showErr('Please enter a new password.'); return; }
  if (!AdminAuth.validatePasswordStrength(newPw).valid) { showErr('New password is too weak. Include uppercase, number and special character.'); return; }
  if (newPw !== confPw) { showErr('Passwords do not match.'); return; }
  if (newPw === curPw)  { showErr('New password must differ from current password.'); return; }

  const otp = AdminAuth.generateOTP();
  AdminAuth.storeOTP(otp, 'password_change', acc.id);
  const result = await AdminAuth.sendOTPEmail(acc, otp, 'password_change');
  if (!result.ok && result.demoOtp) alert(`[DEMO] Password Change OTP: ${result.demoOtp}`);

  document.getElementById('pw-step-a').style.display = 'none';
  document.getElementById('pw-step-b').style.display = 'block';
  document.querySelector('.otp-digit-s')?.focus();
}

function confirmSettingsPwChange() {
  const code = [...document.querySelectorAll('.otp-digit-s')].map(i => i.value).join('');
  const errEl = document.getElementById('otp-s-error');
  const succEl = document.getElementById('otp-s-success');
  if (errEl) errEl.style.display = 'none';
  if (code.length < 6) { if (errEl) { errEl.textContent = 'Enter all 6 digits.'; errEl.style.display = 'block'; } return; }
  const result = AdminAuth.verifyOTP(code);
  if (!result.ok) { if (errEl) { errEl.textContent = result.reason; errEl.style.display = 'block'; } return; }
  const s = AdminAuth.getSession();
  const acc = AdminAuth.findAccount(s.username);
  AdminAuth.changePassword(acc.id, document.getElementById('s-new-pw')?.value);
  if (succEl) { succEl.textContent = 'Password changed successfully!'; succEl.style.display = 'block'; }
  setTimeout(() => {
    document.getElementById('pw-step-a').style.display = 'block';
    document.getElementById('pw-step-b').style.display = 'none';
    ['s-cur-pw','s-new-pw','s-conf-pw'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.querySelectorAll('.otp-digit-s').forEach(d => { d.value = ''; d.style.borderColor = 'var(--border)'; });
    if (succEl) succEl.style.display = 'none';
    toast('Password changed successfully!', 'success');
  }, 2000);
}

async function resendSettingsOTP() {
  const s = AdminAuth.getSession(); if (!s) return;
  const acc = AdminAuth.findAccount(s.username); if (!acc) return;
  const otp = AdminAuth.generateOTP();
  AdminAuth.storeOTP(otp, 'password_change', acc.id);
  const result = await AdminAuth.sendOTPEmail(acc, otp, 'password_change');
  if (!result.ok && result.demoOtp) alert(`[DEMO] New OTP: ${result.demoOtp}`);
  toast('New verification code sent!', 'success');
}

/* ────── SUPPORT TICKETS ──────────────────────────────────── */
const TICKET_DATA = {
  'TKT-091': { customer: 'James Whitmore', subject: 'Order VP-2026-047 not arrived', status: 'Open', priority: 'HIGH', priorityColor: 'var(--error)', messages: [{ from: 'James Whitmore', time: 'Jul 10, 09:12', text: 'Hi, my order VP-2026-047 was supposed to arrive yesterday but still hasn\'t. Can you please check?' }, { from: 'Rockstar (Admin)', time: 'Jul 10, 09:45', text: 'Hello James, I\'m looking into this right now. I\'ll update you within the hour with tracking details.' }] },
  'TKT-090': { customer: 'Sofia Reyes', subject: 'Wrong size received — Evening Gown', status: 'In Progress', priority: 'MEDIUM', priorityColor: 'var(--warning)', messages: [{ from: 'Sofia Reyes', time: 'Jul 9, 14:30', text: 'I received size L but ordered size S for the Evening Gown. Please arrange an exchange ASAP.' }, { from: 'Vanshika (Admin)', time: 'Jul 9, 15:00', text: 'Sofia, I\'m so sorry about that! I\'ve arranged a collection and will ship the correct size immediately.' }] },
  'TKT-089': { customer: 'Hugo Laurent', subject: 'Monogram request for Imperial Suit', status: 'In Progress', priority: 'LOW', priorityColor: 'var(--success)', messages: [{ from: 'Hugo Laurent', time: 'Jul 8, 11:00', text: 'I\'d like to add my initials "H.L." to the inside breast pocket of the Imperial Suit I ordered.' }] },
  'TKT-088': { customer: 'Elara Voss', subject: 'Payment declined — card error', status: 'Open', priority: 'HIGH', priorityColor: 'var(--error)', messages: [{ from: 'Elara Voss', time: 'Jul 8, 18:22', text: 'I\'m trying to checkout but keep getting a payment declined error even though my card details are correct.' }] },
};

function openTicket(id) {
  const data = TICKET_DATA[id]; if (!data) return;
  const modal = document.getElementById('ticket-modal');
  if (!modal) return;
  modal.style.display = 'block';
  document.getElementById('ticket-id-display').textContent = '#' + id;
  document.getElementById('tkt-status').textContent = data.status;
  document.getElementById('tkt-status').className = 'badge ' + (data.status === 'Open' ? 'badge-pending' : data.status === 'In Progress' ? 'badge-processing' : 'badge-delivered');
  document.getElementById('tkt-priority').textContent = data.priority;
  document.getElementById('tkt-priority').style.color = data.priorityColor;
  document.getElementById('tkt-customer').textContent = data.customer;
  const msgs = document.getElementById('ticket-messages');
  if (msgs) {
    msgs.innerHTML = data.messages.map(m => `
      <div style="background:${m.from.includes('Admin') ? 'rgba(212,175,55,.07)' : 'var(--bg-2)'};border:1px solid var(--border);padding:1rem;border-radius:0">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
          <span style="font-size:.7rem;font-weight:700;color:${m.from.includes('Admin') ? 'var(--gold)' : 'var(--white)'}">${m.from}</span>
          <span style="font-size:.62rem;color:var(--gray)">${m.time}</span>
        </div>
        <p style="font-size:.8rem;color:var(--text-2);line-height:1.7">${m.text}</p>
      </div>`).join('');
    msgs.scrollTop = msgs.scrollHeight;
  }
  modal.scrollIntoView({ behavior: 'smooth' });
}

function sendTicketReply() {
  const input = document.getElementById('ticket-reply-input');
  if (!input?.value.trim()) { toast('Please type a reply first.', 'error'); return; }
  const msgs = document.getElementById('ticket-messages');
  const s = AdminAuth.getSession();
  if (msgs) {
    const div = document.createElement('div');
    div.style.cssText = 'background:rgba(212,175,55,.07);border:1px solid var(--border);padding:1rem;margin-top:.5rem';
    div.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-size:.7rem;font-weight:700;color:var(--gold)">${s?.displayName||'Admin'} (Admin)</span><span style="font-size:.62rem;color:var(--gray)">Just now</span></div><p style="font-size:.8rem;color:var(--text-2);line-height:1.7">${input.value}</p>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
  input.value = '';
  toast('Reply sent to customer.', 'success');
}

function closeTicket() {
  document.getElementById('ticket-modal').style.display = 'none';
  toast('Ticket marked as resolved.', 'success');
}

function createTicket() {
  toast('Support ticket created and assigned.', 'success');
  document.getElementById('new-ticket-form').style.display = 'none';
}

/* ────── MARKETING HELPERS ────────────────────────────────── */
function sendCampaign() { toast('Campaign sent to 2,341 subscribers!', 'success'); document.getElementById('email-compose').style.display = 'none'; }
function saveDraft()     { toast('Campaign saved as draft.'); document.getElementById('email-compose').style.display = 'none'; }
function generateReport(type) { toast(`${type.charAt(0).toUpperCase()+type.slice(1)} report generated. Download starting...`, 'success'); }
function saveCoupon()    { toast('Coupon saved successfully.', 'success'); document.getElementById('coupon-form-section').style.display = 'none'; }

/* ────── LOGOUT ───────────────────────────────────────────── */
function adminLogout() {
  if (!confirm('Are you sure you want to logout?')) return;
  AdminAuth.clearSession();
  window.location.replace('admin-login.html');
}

/* ────── SCROLL PROGRESS ──────────────────────────────────── */
function initScrollProgress() {
  const area = document.getElementById('admin-content-area');
  const bar  = document.getElementById('scroll-progress');
  if (!area || !bar) return;
  area.addEventListener('scroll', () => {
    const p = area.scrollTop / (area.scrollHeight - area.clientHeight);
    bar.style.width = (Math.min(p, 1) * 100) + '%';
  }, { passive: true });
}

/* ────── LOADER ───────────────────────────────────────────── */
function initLoader() {
  const el  = document.getElementById('v-loader');
  const bar = document.getElementById('loader-fill');
  const pct = document.getElementById('loader-pct');
  if (!el) return;
  let p = 0;
  const t = setInterval(() => {
    p += Math.random() * 18 + 5;
    if (bar) bar.style.width = Math.min(p, 100) + '%';
    if (pct) pct.textContent = Math.min(Math.floor(p), 100) + '%';
    if (p >= 100) { clearInterval(t); setTimeout(() => el.classList.add('out'), 350); }
  }, 60);
}

/* ────── TOPBAR SESSION INFO ──────────────────────────────── */
function initTopbar() {
  const s = AdminAuth.getSession(); if (!s) return;
  const av   = document.getElementById('admin-topbar-avatar');
  const role = document.getElementById('admin-topbar-role');
  const su   = document.getElementById('sidebar-user');
  if (av)   { av.textContent = s.avatar; av.style.background = AdminAuth.findAccount(s.username)?.color || 'var(--gold-grad)'; av.style.color = '#0B0B0B'; }
  if (role) role.textContent = s.role;
  if (su)   su.textContent   = s.displayName + ' · ' + s.role;
}

/* ────── MASTER INIT ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTopbar();
  bindSidebar();
  initScrollProgress();
  initDashboardPanel();
  initDashboardCharts();
  showPanel('panel-dashboard');
});

/* ────────────────────────────────────────────────────────────
   CATEGORIES MANAGEMENT
   ──────────────────────────────────────────────────────────── */
const CATEGORIES_STORE_KEY = 'vireon_categories';

const DEFAULT_CATEGORIES = [
  { id: 'cat_001', name: 'Coats',       slug: 'coats',       parent: null,  products: 5,  status: 'Active',   icon: 'fas fa-vest' },
  { id: 'cat_002', name: 'Dresses',     slug: 'dresses',     parent: null,  products: 4,  status: 'Active',   icon: 'fas fa-female' },
  { id: 'cat_003', name: 'Suits',       slug: 'suits',       parent: null,  products: 2,  status: 'Active',   icon: 'fas fa-user-tie' },
  { id: 'cat_004', name: 'Shirts',      slug: 'shirts',      parent: null,  products: 1,  status: 'Active',   icon: 'fas fa-tshirt' },
  { id: 'cat_005', name: 'Trousers',    slug: 'trousers',    parent: null,  products: 1,  status: 'Active',   icon: 'fas fa-arrows-alt-v' },
  { id: 'cat_006', name: 'Bags',        slug: 'bags',        parent: null,  products: 2,  status: 'Active',   icon: 'fas fa-shopping-bag' },
  { id: 'cat_007', name: 'Accessories', slug: 'accessories', parent: null,  products: 3,  status: 'Active',   icon: 'fas fa-ring' },
  { id: 'cat_008', name: 'Eyewear',     slug: 'eyewear',     parent: null,  products: 1,  status: 'Active',   icon: 'fas fa-glasses' },
  { id: 'cat_009', name: 'Shoes',       slug: 'shoes',       parent: null,  products: 0,  status: 'Inactive', icon: 'fas fa-shoe-prints' },
  { id: 'cat_010', name: 'Jewelry',     slug: 'jewelry',     parent: 'cat_007', products: 0, status: 'Inactive', icon: 'fas fa-gem' },
];

function getCategories() {
  try {
    const stored = JSON.parse(localStorage.getItem(CATEGORIES_STORE_KEY));
    return stored && stored.length ? stored : DEFAULT_CATEGORIES;
  } catch { return DEFAULT_CATEGORIES; }
}

function saveCategories(cats) {
  localStorage.setItem(CATEGORIES_STORE_KEY, JSON.stringify(cats));
}

function generateCatId() {
  return 'cat_' + Date.now().toString(36);
}

function initCategoriesPanel() {
  const panel = document.getElementById('panel-categories');
  if (!panel) return;

  renderCategoriesTable();
  bindCategoryForm();
}

function renderCategoriesTable(filter = '') {
  const tbody = document.getElementById('categories-table-body');
  if (!tbody) return;
  let cats = getCategories();
  if (filter) cats = cats.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.slug.toLowerCase().includes(filter.toLowerCase())
  );

  tbody.innerHTML = cats.map(cat => {
    const parent = cat.parent ? getCategories().find(c => c.id === cat.parent)?.name || '—' : 'Top Level';
    return `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:.8rem">
          <div style="width:36px;height:36px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.2);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:.85rem;flex-shrink:0">
            <i class="${cat.icon}"></i>
          </div>
          <div>
            <p style="font-size:.8rem;color:var(--white);font-weight:500">${cat.name}</p>
            <p style="font-size:.65rem;color:var(--gray)">#${cat.slug}</p>
          </div>
        </div>
      </td>
      <td style="font-size:.72rem;color:var(--text-2)">${parent}</td>
      <td style="font-size:.82rem;color:var(--gold);font-family:var(--font-serif)">${cat.products}</td>
      <td><span class="o-status ${cat.status === 'Active' ? 's-delivered' : 's-cancelled'}">${cat.status}</span></td>
      <td>
        <button class="v-action-btn" onclick="editCategory('${cat.id}')"><i class="fas fa-edit"></i> EDIT</button>
        <button class="v-action-btn" style="border-color:rgba(239,68,68,.3);color:#EF4444;margin-left:.3rem" onclick="deleteCategory('${cat.id}')"><i class="fas fa-trash"></i></button>
        <button class="v-action-btn" style="margin-left:.3rem" onclick="toggleCategoryStatus('${cat.id}')"><i class="fas fa-power-off"></i></button>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--gray)">No categories found</td></tr>`;

  // Update count
  const countEl = document.getElementById('cat-count');
  if (countEl) countEl.textContent = cats.length + ' categories';
}

function bindCategoryForm() {
  const form = document.getElementById('cat-add-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cat-name-input')?.value.trim();
    if (!name) { toast('Please enter a category name', 'error'); return; }

    const cats = getCategories();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const icon = document.getElementById('cat-icon-input')?.value || 'fas fa-tag';
    const parent = document.getElementById('cat-parent-input')?.value || null;
    const desc  = document.getElementById('cat-desc-input')?.value || '';

    // Check duplicate
    if (cats.find(c => c.slug === slug)) { toast(`Category "${name}" already exists`, 'error'); return; }

    const newCat = {
      id: generateCatId(),
      name,
      slug,
      parent: parent || null,
      products: 0,
      status: 'Active',
      icon,
      description: desc,
    };
    cats.push(newCat);
    saveCategories(cats);
    renderCategoriesTable();
    updateParentDropdown();
    form.reset();
    document.getElementById('cat-form-section').style.display = 'none';
    toast(`Category "${name}" created successfully`, 'success');
  });

  // Search
  document.getElementById('cat-search')?.addEventListener('input', function(){
    renderCategoriesTable(this.value);
  });
}

function editCategory(id) {
  const cats = getCategories();
  const cat = cats.find(c => c.id === id);
  if (!cat) return;

  // Fill form with existing values
  document.getElementById('cat-form-section').style.display = 'block';
  document.getElementById('cat-form-title').textContent = 'Edit Category';
  const nameEl = document.getElementById('cat-name-input');
  const iconEl = document.getElementById('cat-icon-input');
  const descEl = document.getElementById('cat-desc-input');
  if (nameEl) nameEl.value = cat.name;
  if (iconEl) iconEl.value = cat.icon;
  if (descEl) descEl.value = cat.description || '';

  // Change submit to update
  const form = document.getElementById('cat-add-form');
  form.dataset.editId = id;
  document.getElementById('cat-submit-btn').textContent = 'UPDATE CATEGORY';
  document.getElementById('cat-form-section').scrollIntoView({ behavior: 'smooth' });
}

function deleteCategory(id) {
  const cats = getCategories();
  const cat = cats.find(c => c.id === id);
  if (!cat) return;
  if (!confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return;
  saveCategories(cats.filter(c => c.id !== id));
  renderCategoriesTable();
  toast(`"${cat.name}" deleted`, 'error');
}

function toggleCategoryStatus(id) {
  const cats = getCategories();
  const cat = cats.find(c => c.id === id);
  if (!cat) return;
  cat.status = cat.status === 'Active' ? 'Inactive' : 'Active';
  saveCategories(cats);
  renderCategoriesTable();
  toast(`"${cat.name}" ${cat.status.toLowerCase()}`, cat.status === 'Active' ? 'success' : '');
}

function updateParentDropdown() {
  const sel = document.getElementById('cat-parent-input');
  if (!sel) return;
  const cats = getCategories();
  const topLevel = cats.filter(c => !c.parent);
  sel.innerHTML = '<option value="">None (Top Level)</option>' +
    topLevel.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// Extend showPanel to init categories
const _origShowPanel = window.showPanel;
window.showPanel = function(id) {
  if (_origShowPanel) _origShowPanel(id);
  if (id === 'panel-categories') {
    initCategoriesPanel();
    updateParentDropdown();
  }
};

/* ── CATEGORY FORM LIVE INTERACTIONS ─────────────────────── */
document.addEventListener('DOMContentLoaded', function() {

  // Auto-generate slug from name
  document.addEventListener('input', function(e) {
    if (e.target.id === 'cat-name-input') {
      const slug = e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const preview = document.getElementById('cat-slug-preview');
      if (preview) preview.value = slug;
    }
    // Live icon preview
    if (e.target.id === 'cat-icon-input') {
      const icon = document.getElementById('cat-icon-preview');
      if (icon) icon.className = e.target.value || 'fas fa-tag';
    }
  });

  // Status toggle label
  document.addEventListener('change', function(e) {
    if (e.target.id === 'cat-status-toggle') {
      const label = document.getElementById('cat-status-label');
      if (label) label.textContent = e.target.checked ? 'Active' : 'Inactive';
    }
  });

  // Category form submit override to handle edit mode
  document.addEventListener('submit', function(e) {
    if (e.target.id !== 'cat-add-form') return;
    e.preventDefault();
    const editId = e.target.dataset.editId;
    const name   = document.getElementById('cat-name-input')?.value.trim();
    if (!name) { toast('Please enter a category name', 'error'); return; }
    const slug   = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const icon   = document.getElementById('cat-icon-input')?.value || 'fas fa-tag';
    const parent = document.getElementById('cat-parent-input')?.value || null;
    const desc   = document.getElementById('cat-desc-input')?.value || '';
    const active = document.getElementById('cat-status-toggle')?.checked !== false;
    const cats   = getCategories();

    if (editId) {
      // UPDATE
      const cat = cats.find(c => c.id === editId);
      if (cat) {
        cat.name = name; cat.slug = slug; cat.icon = icon;
        cat.parent = parent || null; cat.description = desc;
        cat.status = active ? 'Active' : 'Inactive';
        saveCategories(cats);
        renderCategoriesTable();
        renderCategoryTree();
        toast(`"${name}" updated`, 'success');
      }
    } else {
      // CREATE
      if (cats.find(c => c.slug === slug)) { toast(`"${name}" already exists`, 'error'); return; }
      cats.push({ id: generateCatId(), name, slug, parent: parent||null, products:0, status: active?'Active':'Inactive', icon, description:desc });
      saveCategories(cats);
      renderCategoriesTable();
      renderCategoryTree();
      updateParentDropdown();
      updateCategoryStats();
      toast(`"${name}" created`, 'success');
    }
    document.getElementById('cat-form-section').style.display = 'none';
    e.target.reset();
    delete e.target.dataset.editId;
    document.getElementById('cat-submit-btn').textContent = 'CREATE CATEGORY';
    document.getElementById('cat-form-title').textContent  = 'Add New Category';
  });
});

/* ── CATEGORY TREE VIEW ───────────────────────────────────── */
function renderCategoryTree() {
  const tree = document.getElementById('cat-tree');
  if (!tree) return;
  const cats = getCategories();
  const topLevel = cats.filter(c => !c.parent);
  tree.innerHTML = topLevel.map(cat => {
    const children = cats.filter(c => c.parent === cat.id);
    const childHtml = children.map(ch => `
      <div style="display:flex;align-items:center;gap:.8rem;padding:.5rem .8rem;margin-left:2rem;background:var(--bg-3);border:1px solid var(--border);margin-top:.3rem">
        <i class="${ch.icon}" style="color:var(--gold);width:14px;font-size:.78rem"></i>
        <span style="font-size:.75rem;color:var(--text-2)">${ch.name}</span>
        <span style="font-size:.6rem;color:var(--gray);margin-left:auto">${ch.products} products</span>
        <span class="o-status ${ch.status==='Active'?'s-delivered':'s-cancelled'}" style="font-size:.5rem">${ch.status}</span>
      </div>`).join('');
    return `
      <div style="background:var(--bg-2);border:1px solid rgba(212,175,55,.2);border-left:3px solid var(--gold)">
        <div style="display:flex;align-items:center;gap:1rem;padding:.8rem 1.2rem">
          <i class="${cat.icon}" style="color:var(--gold);width:18px;font-size:1rem"></i>
          <span style="font-size:.82rem;color:var(--white);font-weight:600">${cat.name}</span>
          <span style="font-size:.68rem;color:var(--gray)">${cat.products} products</span>
          ${children.length ? `<span style="font-size:.6rem;color:var(--gold);margin-left:.3rem">${children.length} sub-categories</span>` : ''}
          <span class="o-status ${cat.status==='Active'?'s-delivered':'s-cancelled'}" style="margin-left:auto">${cat.status}</span>
        </div>
        ${childHtml}
      </div>`;
  }).join('');
}

/* ── CATEGORY STATS UPDATE ────────────────────────────────── */
function updateCategoryStats() {
  const cats = getCategories();
  const activeCount   = cats.filter(c => c.status === 'Active').length;
  const inactiveCount = cats.filter(c => c.status !== 'Active').length;
  const totalProducts = cats.reduce((s, c) => s + c.products, 0);
  const set = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set('cat-total-count',    cats.length);
  set('cat-active-count',   activeCount);
  set('cat-inactive-count', inactiveCount);
  set('cat-products-count', totalProducts);
}

/* ── EXTEND initCategoriesPanel ──────────────────────────── */
const _origInitCat = window.initCategoriesPanel;
window.initCategoriesPanel = function() {
  if (_origInitCat) _origInitCat();
  renderCategoryTree();
  updateCategoryStats();
};

/* ────────────────────────────────────────────────────────────
   PRODUCT IMAGE UPLOAD HELPERS
   ──────────────────────────────────────────────────────────── */
function previewProductImage(input, previewId) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById(previewId);
    if (!el) return;
    el.style.backgroundImage  = `url(${e.target.result})`;
    el.style.backgroundSize   = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = `<button onclick="clearImg('${previewId}','${input.id}')" style="background:rgba(0,0,0,.7);border:1px solid var(--gold);color:var(--gold);padding:.3rem .8rem;font-size:.6rem;letter-spacing:.1em;cursor:pointer">REMOVE</button>`;
  };
  reader.readAsDataURL(file);
}

function updateImgPreviewFromUrl(input, previewId) {
  const url = input.value.trim(); if (!url) return;
  const el = document.getElementById(previewId);
  if (!el) return;
  el.style.backgroundImage   = `url(${url})`;
  el.style.backgroundSize    = 'cover';
  el.style.backgroundPosition = 'center';
  el.innerHTML = `<button onclick="clearImgUrl('${previewId}','${input.id}')" style="background:rgba(0,0,0,.7);border:1px solid var(--gold);color:var(--gold);padding:.3rem .8rem;font-size:.6rem;cursor:pointer">REMOVE</button>`;
}

function clearImg(previewId, inputId) {
  const el = document.getElementById(previewId);
  const inp = document.getElementById(inputId);
  if (el)  { el.style.backgroundImage=''; el.innerHTML='<i class="fas fa-cloud-upload-alt" style="font-size:2rem;color:var(--gold);margin-bottom:.5rem"></i><p style="font-size:.72rem;color:var(--text-2)">Click to upload main image</p>'; }
  if (inp) inp.value = '';
}
function clearImgUrl(previewId, inputId) { clearImg(previewId, inputId); }

function previewGallerySlot(input, idx) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const slots = document.querySelectorAll('.gallery-img-slot');
    if (slots[idx]) {
      slots[idx].style.backgroundImage   = `url(${e.target.result})`;
      slots[idx].style.backgroundSize    = 'cover';
      slots[idx].style.backgroundPosition = 'center';
      slots[idx].innerHTML = '<i class="fas fa-check" style="color:var(--gold)"></i>';
    }
  };
  reader.readAsDataURL(file);
}

let colorVariantCount = 0;
function addColorVariant() {
  colorVariantCount++;
  const list = document.getElementById('color-variants-list');
  if (!list) return;
  const variantId = 'cv-' + colorVariantCount;
  const div = document.createElement('div');
  div.style.cssText = 'display:grid;grid-template-columns:auto 1fr 1fr auto;gap:.8rem;align-items:center;padding:1rem;background:var(--bg-3);border:1px solid var(--border)';
  div.id = variantId;
  div.innerHTML = `
    <div style="width:36px;height:36px;border-radius:50%;background:#1a1a1a;border:2px solid var(--border);cursor:pointer;position:relative;overflow:hidden" onclick="document.getElementById('cp-${variantId}').click()" title="Pick color">
      <input type="color" id="cp-${variantId}" value="#1a1a1a" style="position:absolute;inset:-4px;width:calc(100%+8px);height:calc(100%+8px);opacity:0;cursor:pointer" onchange="this.parentElement.style.background=this.value">
    </div>
    <input type="text" class="d-form-input" placeholder="Color name (e.g. Midnight Black)" style="margin:0">
    <div style="position:relative">
      <div id="cvp-${variantId}" style="width:100%;height:44px;background:var(--bg-2);border:1px dashed rgba(212,175,55,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.62rem;color:var(--gray)" onclick="document.getElementById('cvi-${variantId}').click()">
        <i class="fas fa-image" style="margin-right:.4rem;color:var(--gold)"></i> Upload color image
      </div>
      <input type="file" id="cvi-${variantId}" accept="image/*" style="display:none" onchange="previewColorVariantImg(this,'cvp-${variantId}')">
    </div>
    <button type="button" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#EF4444;padding:.5rem;cursor:pointer;font-size:.75rem" onclick="document.getElementById('${variantId}').remove()"><i class="fas fa-trash"></i></button>`;
  list.appendChild(div);
}

function previewColorVariantImg(input, previewId) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById(previewId);
    if (!el) return;
    el.style.backgroundImage   = `url(${e.target.result})`;
    el.style.backgroundSize    = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = '';
  };
  reader.readAsDataURL(file);
}

/* ── CATEGORY IMAGE UPLOAD ───────────────────────────────── */
function addCategoryImageUpload() {
  const formSection = document.querySelector('#cat-add-form');
  if (!formSection || document.getElementById('cat-img-group')) return;
  const group = document.createElement('div');
  group.className = 'd-form-group';
  group.id = 'cat-img-group';
  group.innerHTML = `
    <label class="d-form-label">Category Image</label>
    <div id="cat-img-preview" style="width:100%;height:140px;background:var(--bg-3);border:2px dashed rgba(212,175,55,.3);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:border-color .3s;margin-bottom:.8rem" onclick="document.getElementById('cat-img-file').click()" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='rgba(212,175,55,.3)'">
      <i class="fas fa-image" style="font-size:1.8rem;color:var(--gold);margin-bottom:.5rem"></i>
      <p style="font-size:.7rem;color:var(--text-2)">Click to upload category image</p>
    </div>
    <input type="file" id="cat-img-file" accept="image/*" style="display:none" onchange="previewCategoryImage(this)">
    <label class="d-form-label" style="margin-top:.5rem">Or paste image URL</label>
    <input type="url" class="d-form-input" id="cat-img-url" placeholder="https://example.com/category.jpg" oninput="updateCatImgFromUrl(this)">`;
  formSection.insertBefore(group, formSection.querySelector('.d-form-group:last-of-type'));
}

function previewCategoryImage(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById('cat-img-preview');
    if (!el) return;
    el.style.backgroundImage   = `url(${e.target.result})`;
    el.style.backgroundSize    = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = '';
  };
  reader.readAsDataURL(file);
}

function updateCatImgFromUrl(input) {
  const el = document.getElementById('cat-img-preview');
  if (!el || !input.value) return;
  el.style.backgroundImage   = `url(${input.value})`;
  el.style.backgroundSize    = 'cover';
  el.style.backgroundPosition = 'center';
  el.innerHTML = '';
}

// Auto-attach category image upload when panel opens
const _origInitCat2 = window.initCategoriesPanel;
window.initCategoriesPanel = function() {
  if (_origInitCat2) _origInitCat2();
  setTimeout(addCategoryImageUpload, 100);
};
window.previewProductImage   = previewProductImage;
window.updateImgPreviewFromUrl = updateImgPreviewFromUrl;
window.previewGallerySlot    = previewGallerySlot;
window.addColorVariant       = addColorVariant;
window.previewColorVariantImg = previewColorVariantImg;
