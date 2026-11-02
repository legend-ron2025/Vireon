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
  {id:1,name:'Sovereign Coat',sku:'VR-C-001',cat:'Coats',price:1850,comparePrice:2400,stock:7,sales:124,badge:'LIMITED',
   grad:'linear-gradient(160deg,#1a0f05,#2d1a08,#0a0600)',
   description:'Hand-tailored in Milan. Double-breasted obsidian wool with 24k gold-button detailing. 200+ hours of craftsmanship.',
   colors:['#1a1a1a','#2d1a08','#0a0a0a'],sizes:['XS','S','M','L','XL','XXL'],
   rating:5,reviews:42,gender:'men',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-15T09:00:00Z'},
  {id:2,name:'Noir Velvet Dress',sku:'VR-D-001',cat:'Dresses',price:2200,comparePrice:null,stock:12,sales:76,badge:'NEW',
   grad:'linear-gradient(160deg,#050510,#0d0d20,#030308)',
   description:'Floor-length structured velvet. Bespoke couture craftsmanship. Worn by editorial icons worldwide.',
   colors:['#0d0d20','#1a0a00','#222222'],sizes:['XS','S','M','L','XL'],
   rating:5,reviews:28,gender:'women',image:null,newArrival:true,bestSeller:false,active:true,dateAdded:'2026-06-16T09:00:00Z'},
  {id:3,name:'Imperial Suit',sku:'VR-S-001',cat:'Suits',price:3200,comparePrice:null,stock:5,sales:58,badge:null,
   grad:'linear-gradient(160deg,#0a0a00,#1a1900,#050500)',
   description:'Savile Row inspired. Peak lapel, full canvas construction. Pure Loro Piana wool.',
   colors:['#0a0a0a','#1a1900','#2d2d00'],sizes:['36','38','40','42','44','46'],
   rating:4.8,reviews:19,gender:'men',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-17T09:00:00Z'},
  {id:4,name:'Obsidian Shoulder Bag',sku:'VR-B-001',cat:'Bags',price:1450,comparePrice:1800,stock:3,sales:63,badge:'SALE',
   grad:'linear-gradient(160deg,#080008,#150015,#040004)',
   description:'Crocodile-embossed genuine leather. 24k gold hardware. Comes with dust bag and certificate.',
   colors:['#080008','#1a0a00','#2d2d2d'],sizes:['One Size'],
   rating:4.9,reviews:63,gender:'women',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-18T09:00:00Z'},
  {id:5,name:'Royal Dress Shirt',sku:'VR-SH-001',cat:'Shirts',price:680,comparePrice:null,stock:28,sales:87,badge:'BESTSELLER',
   grad:'linear-gradient(160deg,#0a0a0a,#1a1a1a,#111111)',
   description:'Egyptian cotton, 200 thread count. French cuffs, spread collar. Monogram service available.',
   colors:['#ffffff','#1a1a1a','#0a0505'],sizes:['S','M','L','XL','XXL'],
   rating:4.7,reviews:87,gender:'men',image:null,newArrival:false,bestSeller:true,active:true,dateAdded:'2026-06-19T09:00:00Z'},
  {id:6,name:'Evening Gown',sku:'VR-D-002',cat:'Dresses',price:4800,comparePrice:null,stock:2,sales:43,badge:'LIMITED',
   grad:'linear-gradient(160deg,#150a00,#241500,#0a0600)',
   description:'Silk charmeuse, bias cut. Bespoke fit available. Worn at the Met Gala afterparty.',
   colors:['#150a00','#0a0a0a','#1a1a00'],sizes:['XS','S','M','L'],
   rating:5,reviews:11,gender:'women',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-20T09:00:00Z'},
  {id:7,name:'Signature Trench',sku:'VR-C-002',cat:'Coats',price:2600,comparePrice:3000,stock:9,sales:34,badge:'SALE',
   grad:'linear-gradient(160deg,#1a0a0a,#2d1515,#0d0606)',
   description:'Gabardine with silk lining. Detachable belt, storm flap. An icon reborn.',
   colors:['#1a0a0a','#0a0a0a','#2d1a08'],sizes:['XS','S','M','L','XL'],
   rating:4.8,reviews:34,gender:'women',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-21T09:00:00Z'},
  {id:8,name:'Gold Link Belt',sku:'VR-A-001',cat:'Accessories',price:380,comparePrice:null,stock:18,sales:25,badge:'NEW',
   grad:'linear-gradient(160deg,#1a1500,#2d2500,#0d0d00)',
   description:'18k gold-plated brass. Signature double-V buckle. Adjustable to 5 sizes.',
   colors:['#c9a84c','#1a1a1a'],sizes:['S/M','L/XL'],
   rating:4.6,reviews:25,gender:'unisex',image:null,newArrival:true,bestSeller:false,active:true,dateAdded:'2026-06-22T09:00:00Z'},
  {id:9,name:'Crystal Eyewear',sku:'VR-E-001',cat:'Eyewear',price:520,comparePrice:null,stock:15,sales:41,badge:null,
   grad:'linear-gradient(160deg,#001010,#002020,#001a1a)',
   description:'Acetate frame with anti-reflective sapphire-coated lenses. UV400 protection.',
   colors:['#001010','#1a0a00','#0a0a0a'],sizes:['One Size'],
   rating:4.7,reviews:41,gender:'unisex',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-23T09:00:00Z'},
  {id:10,name:'Caviar Handbag',sku:'VR-B-002',cat:'Bags',price:2900,comparePrice:null,stock:4,sales:16,badge:'LIMITED',
   grad:'linear-gradient(160deg,#0a0500,#1a0d00,#050300)',
   description:'Quilted caviar leather. Gold chain strap. Numbered certificate of authenticity included.',
   colors:['#0a0505','#1a1a1a','#2d1a08'],sizes:['One Size'],
   rating:5,reviews:16,gender:'women',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-24T09:00:00Z'},
  {id:11,name:'Bishop Wool Coat',sku:'VR-C-003',cat:'Coats',price:2100,comparePrice:null,stock:8,sales:22,badge:null,
   grad:'linear-gradient(160deg,#0a0a14,#141424,#050510)',
   description:'Double-face Merino wool. Clean modernist silhouette. Made in Italy.',
   colors:['#0a0a14','#1a1a1a','#2d1a08'],sizes:['S','M','L','XL','XXL'],
   rating:4.9,reviews:22,gender:'men',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-25T09:00:00Z'},
  {id:12,name:'Silk Wide Trousers',sku:'VR-T-001',cat:'Trousers',price:890,comparePrice:1100,stock:11,sales:38,badge:'SALE',
   grad:'linear-gradient(160deg,#100010,#200020,#0a000a)',
   description:'High-waisted silk crepe. Wide-leg silhouette, invisible zip. Dry clean only.',
   colors:['#100010','#1a1a1a','#f0f0f0'],sizes:['XS','S','M','L','XL'],
   rating:4.6,reviews:38,gender:'women',image:null,newArrival:false,bestSeller:false,active:true,dateAdded:'2026-06-26T09:00:00Z'},
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

const NOTIFICATIONS_DATA = [
  { id: 'notif_001', type: 'ticket', title: 'New support ticket from James Whitmore', unread: true, timestamp: 'Just now' },
  { id: 'notif_002', type: 'order', title: 'Order VP-2026-047 has shipped', unread: true, timestamp: '5 min ago' },
  { id: 'notif_003', type: 'stock', title: 'Low stock alert: Evening Gown', unread: false, timestamp: '30 min ago' },
];

const NOTIFICATIONS_STORE_KEY = 'vireon_admin_notifications';
const TICKETS_STORE_KEY = 'vireon_admin_tickets';
let notificationChannel = null;

const REALTIME = {
  socket: null,
  connected: false,
  clientId: Math.random().toString(36).slice(2),
};

function readStoredList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

function persistNotifications() {
  try { localStorage.setItem(NOTIFICATIONS_STORE_KEY, JSON.stringify(NOTIFICATIONS_DATA.slice(0, 50))); } catch {}
}

function persistTickets() {
  try { localStorage.setItem(TICKETS_STORE_KEY, JSON.stringify(TICKET_DATA)); } catch {}
}

function loadNotifications() {
  const stored = readStoredList(NOTIFICATIONS_STORE_KEY);
  if (!stored) {
    persistNotifications();
    return;
  }
  NOTIFICATIONS_DATA.length = 0;
  NOTIFICATIONS_DATA.push(...stored.slice(0, 50));
}

function loadSupportTickets() {
  try {
    const stored = JSON.parse(localStorage.getItem(TICKETS_STORE_KEY) || 'null');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) Object.assign(TICKET_DATA, stored);
    else persistTickets();
  } catch {
    persistTickets();
  }
}

function iconForNotification(type) {
  return type === 'ticket' ? 'fa-inbox'
    : type === 'order' ? 'fa-shopping-bag'
    : type === 'stock' ? 'fa-boxes-stacked'
    : type === 'security' ? 'fa-shield-alt'
    : 'fa-bell';
}

function renderNotificationInbox() {
  const list = document.getElementById('admin-notif-list');
  if (!list) return;
  if (!NOTIFICATIONS_DATA.length) {
    list.innerHTML = '<div class="notif-empty">No notifications yet.</div>';
    return;
  }
  list.innerHTML = NOTIFICATIONS_DATA.slice(0, 30).map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="openNotification('${n.id}')">
      <div class="notif-icon"><i class="fas ${iconForNotification(n.type)}"></i></div>
      <div>
        <p class="notif-item-title">${n.title}</p>
        <p class="notif-item-meta">${n.timestamp || 'Just now'}${n.unread ? ' - New' : ''}</p>
      </div>
    </div>`).join('');
}

function updateNotificationCounts() {
  const countEl = document.getElementById('topbar-notif-count');
  const unread = NOTIFICATIONS_DATA.filter(n => n.unread).length;
  if (countEl) {
    countEl.textContent = unread;
    countEl.style.display = unread ? 'inline-flex' : 'none';
  }
  renderNotificationInbox();
}

function addActivityEntry(entry) {
  ACTIVITIES.unshift(entry);
  if (ACTIVITIES.length > 20) ACTIVITIES.pop();
  const af = document.getElementById('dash-activity');
  if (!af) return;
  af.innerHTML = ACTIVITIES.map(a => `
      <div style="display:flex;gap:.8rem;align-items:flex-start;padding:.65rem 0;border-bottom:1px solid var(--border)">
        <div style="width:8px;height:8px;border-radius:50%;background:${a.dot};flex-shrink:0;margin-top:.4rem"></div>
        <div><p style="font-size:.74rem;color:var(--text-2);line-height:1.5">${a.text}</p><p style="font-size:.62rem;color:var(--gray);margin-top:.15rem">${a.time}</p></div>
      </div>`).join('');
}

function addAuditEntry(entry) {
  AUDIT_LOG.unshift(entry);
  if (AUDIT_LOG.length > 50) AUDIT_LOG.pop();
  renderAuditLog();
}

function renderAuditLog() {
  const logEl = document.getElementById('audit-log-body');
  if (!logEl) return;
  logEl.innerHTML = AUDIT_LOG.map(l => `
    <tr>
      <td style="font-size:.7rem;color:var(--gray);white-space:nowrap">${l.time}</td>
      <td style="color:var(--gold);font-weight:600">${l.admin}</td>
      <td>${l.action}</td>
      <td style="font-size:.7rem;color:var(--text-2);font-family:monospace">${l.ip}</td>
      <td><span class="badge ${l.status === 'ok' ? 'badge-active' : 'badge-cancelled'}">${l.status === 'ok' ? 'SUCCESS' : 'BLOCKED'}</span></td>
    </tr>`).join('');
}

function addNotificationEntry(entry) {
  const notification = {
    id: entry.id || 'notif_' + Date.now(),
    type: entry.type || 'system',
    title: entry.title || 'Dashboard update',
    unread: entry.unread !== false,
    timestamp: entry.timestamp || 'Just now',
  };
  NOTIFICATIONS_DATA.unshift(notification);
  if (NOTIFICATIONS_DATA.length > 50) NOTIFICATIONS_DATA.pop();
  if (notification.type === 'ticket') {
    const ticketId = entry.ticketId || 'TKT-' + Date.now().toString().slice(-3);
    if (!TICKET_DATA[ticketId]) {
      TICKET_DATA[ticketId] = {
        customer: entry.title.split(' from ')[1] || 'Customer',
        subject: entry.title,
        status: 'Open',
        priority: 'HIGH',
        priorityColor: 'var(--error)',
        type: 'Customer Message',
        assigned: 'Unassigned',
        created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        messages: [{ from: 'Customer', time: notification.timestamp, text: notification.title }],
      };
      persistTickets();
    }
  }
  persistNotifications();
  updateNotificationCounts();
  updateSupportPanel();
  renderSupportTable();
}

function handleServerMessage(msg) {
  if (!msg || !msg.type) return;
  if (msg.type === 'init') {
    if (msg.payload?.activity) {
      ACTIVITIES.length = 0;
      ACTIVITIES.push(...msg.payload.activity.slice(0, 20));
      initDashboardPanel();
    }
    if (msg.payload?.audit) {
      AUDIT_LOG.length = 0;
      AUDIT_LOG.push(...msg.payload.audit.slice(0, 50));
      renderAuditLog();
    }
    if (msg.payload?.notifications) {
      NOTIFICATIONS_DATA.length = 0;
      NOTIFICATIONS_DATA.push(...msg.payload.notifications.slice(0, 20));
      persistNotifications();
      updateNotificationCounts();
    }
    return;
  }
  if (msg.type === 'event') {
    if (msg.origin && msg.origin === REALTIME.clientId) return;
    if (msg.payload?.activity) addActivityEntry(msg.payload.activity);
    if (msg.payload?.audit) addAuditEntry(msg.payload.audit);
    if (msg.payload?.notification) addNotificationEntry(msg.payload.notification);
  }
}

function initRealtimeConnection() {
  try {
    const configuredUrl = window.VIREON_WS_URL || '';
    if (!configuredUrl) return;
    const wsUrl = configuredUrl;
    REALTIME.socket = new WebSocket(wsUrl);
    REALTIME.socket.addEventListener('open', () => {
      REALTIME.connected = true;
      console.log('Realtime websocket connected');
    });
    REALTIME.socket.addEventListener('message', event => {
      try { handleServerMessage(JSON.parse(event.data)); } catch (err) { console.error('Realtime message parse error', err); }
    });
    REALTIME.socket.addEventListener('close', () => { REALTIME.connected = false; console.log('Realtime websocket disconnected'); });
    REALTIME.socket.addEventListener('error', () => { REALTIME.connected = false; });
  } catch (err) {
    console.warn('Realtime init failed', err);
  }
}

function publishRealtimeEvent(payload) {
  const admin = AdminAuth.getSession()?.displayName || 'Admin';
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const activity = payload.activity ? { ...payload.activity, time: 'Just now' } : null;
  const audit = payload.audit ? { ...payload.audit, admin, time } : null;
  const notification = payload.notification ? { ...payload.notification, id: 'notif_' + Date.now(), unread: true, timestamp: 'Just now' } : null;

  if (activity) addActivityEntry(activity);
  if (audit) addAuditEntry(audit);
  if (notification) addNotificationEntry(notification);

  if (REALTIME.socket && REALTIME.socket.readyState === WebSocket.OPEN) {
    REALTIME.socket.send(JSON.stringify({ type: 'event', origin: REALTIME.clientId, payload: { activity, audit, notification } }));
  }
  if (notificationChannel) {
    notificationChannel.postMessage({ type: 'event', origin: REALTIME.clientId, payload: { activity, audit, notification } });
  }
}

function initNotificationInbox() {
  loadNotifications();
  try {
    notificationChannel = new BroadcastChannel('vireon_admin_realtime');
    notificationChannel.addEventListener('message', event => handleServerMessage(event.data));
  } catch {
    notificationChannel = null;
  }
  window.addEventListener('storage', event => {
    if (event.key === NOTIFICATIONS_STORE_KEY) {
      loadNotifications();
      updateNotificationCounts();
    }
    if (event.key === TICKETS_STORE_KEY) {
      loadSupportTickets();
      updateSupportPanel();
      renderSupportTable();
    }
  });
  document.addEventListener('click', event => {
    const popover = document.getElementById('admin-notif-popover');
    const button = document.getElementById('admin-notif-btn');
    if (!popover?.classList.contains('on')) return;
    if (popover.contains(event.target) || button?.contains(event.target)) return;
    closeNotificationInbox();
  });
  updateNotificationCounts();
}

function toggleNotificationInbox(event) {
  event?.stopPropagation();
  const popover = document.getElementById('admin-notif-popover');
  const button = document.getElementById('admin-notif-btn');
  if (!popover) return;
  const open = !popover.classList.contains('on');
  popover.classList.toggle('on', open);
  button?.setAttribute('aria-expanded', open ? 'true' : 'false');
  renderNotificationInbox();
}

function closeNotificationInbox() {
  document.getElementById('admin-notif-popover')?.classList.remove('on');
  document.getElementById('admin-notif-btn')?.setAttribute('aria-expanded', 'false');
}

function openNotification(id) {
  const item = NOTIFICATIONS_DATA.find(n => n.id === id);
  if (!item) return;
  item.unread = false;
  persistNotifications();
  updateNotificationCounts();
  if (item.type === 'ticket') showPanel('panel-support');
  else if (item.type === 'order') showPanel('panel-orders');
  else if (item.type === 'stock') showPanel('panel-inventory');
  else showPanel('panel-dashboard');
  closeNotificationInbox();
}

function markAllNotificationsRead(event) {
  event?.stopPropagation();
  NOTIFICATIONS_DATA.forEach(n => { n.unread = false; });
  persistNotifications();
  updateNotificationCounts();
}

function clearReadNotifications(event) {
  event?.stopPropagation();
  for (let i = NOTIFICATIONS_DATA.length - 1; i >= 0; i--) {
    if (!NOTIFICATIONS_DATA[i].unread) NOTIFICATIONS_DATA.splice(i, 1);
  }
  persistNotifications();
  updateNotificationCounts();
}
window.toggleNotificationInbox = toggleNotificationInbox;
window.closeNotificationInbox = closeNotificationInbox;
window.openNotification = openNotification;
window.markAllNotificationsRead = markAllNotificationsRead;
window.clearReadNotifications = clearReadNotifications;

function publishAuditAction(action, details) {
  publishRealtimeEvent({
    audit: { action: `${action}: ${details}`, ip: '127.0.0.1', status: 'ok' },
    activity: { dot: 'var(--gold)', text: `${action} — ${details}` },
    notification: { type: 'system', title: `${action}: ${details}` },
  });
}

function updateSupportPanel() {
  const openCount = document.getElementById('support-open-count');
  const progressCount = document.getElementById('support-progress-count');
  const resolvedCount = document.getElementById('support-resolved-count');
  const avgResponse = document.getElementById('support-avg-response');
  const ticketCount = Object.values(TICKET_DATA).length;
  const openTickets = Object.values(TICKET_DATA).filter(t => t.status === 'Open').length;
  const inProgress = Object.values(TICKET_DATA).filter(t => t.status === 'In Progress').length;
  const resolved = Object.values(TICKET_DATA).filter(t => t.status === 'Resolved').length;
  if (openCount) openCount.textContent = openTickets.toString();
  if (progressCount) progressCount.textContent = inProgress.toString();
  if (resolvedCount) resolvedCount.textContent = resolved.toString();
  if (avgResponse) avgResponse.textContent = ticketCount ? '1.8h' : '0h';
  renderSupportTable();
}

function addLiveNotification(notification) {
  NOTIFICATIONS_DATA.unshift(notification);
  if (NOTIFICATIONS_DATA.length > 12) NOTIFICATIONS_DATA.pop();
  updateNotificationCounts();
  updateSupportPanel();
  toast(notification.title, 'success');
}

function simulateLiveNotifications() {
  const events = [
    { type: 'ticket', title: 'New support ticket from Elara Voss', timestamp: 'Just now' },
    { type: 'order', title: 'Order VP-2026-048 received', timestamp: 'Just now' },
    { type: 'stock', title: 'Low stock alert: Caviar Handbag', timestamp: 'Just now' },
  ];
  setInterval(() => {
    const event = events[Math.floor(Math.random() * events.length)];
    publishRealtimeEvent({
      activity: { dot: 'var(--gold)', text: event.title },
      notification: { type: event.type, title: event.title },
      audit: { action: `System update: ${event.title}`, ip: '127.0.0.1', status: 'ok' },
    });
  }, 25000);
}

/* ────── PANEL NAVIGATION ─────────────────────────────────── */
function showPanel(id) {
  const panel = document.getElementById(id) || document.getElementById('panel-dashboard');
  const targetId = panel?.id || 'panel-dashboard';
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.admin-link').forEach(l => l.classList.remove('on'));

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
    'panel-credits':    ['Credits','System → Credits'],
    'panel-lookbook':   ['Lookbook','Catalogue → Lookbook'],
    'panel-limited':    ['Limited Edition','Marketing → Limited Edition'],
  };
  const info = titles[targetId] || ['Dashboard',''];
  const titleEl = document.getElementById('topbar-title');
  const breadEl = document.getElementById('topbar-breadcrumb');
  if (titleEl) titleEl.textContent = info[0];
  if (breadEl) breadEl.textContent = info[1];

  // Scroll area back to top
  const area = document.getElementById('admin-content-area');
  if (area) area.scrollTop = 0;

  // Lazy init for panels that need it
  try {
    if (targetId === 'panel-dashboard')  initDashboardCharts();
    if (targetId === 'panel-analytics')  initAnalyticsCharts();
    if (targetId === 'panel-security')   renderSecurityPanel();
    if (targetId === 'panel-settings')   renderSettingsPanel();
    if (targetId === 'panel-orders')     renderOrdersTable(ORDERS_DATA);
    if (targetId === 'panel-products')   renderProductsTable();
    if (targetId === 'panel-customers')  renderCustomersTable(CUSTOMERS_DATA);
    if (targetId === 'panel-inventory')  renderInventoryTable(INVENTORY_DATA);
    if (targetId === 'panel-categories') initCategoriesPanel();
    if (targetId === 'panel-credits')    initCreditsPanel();
    if (targetId === 'panel-support')    updateSupportPanel();
    if (targetId === 'panel-lookbook')   initLookbookPanel();
    if (targetId === 'panel-limited')    initLimitedPanel();
  } catch (err) {
    console.error('Panel init failed:', targetId, err);
    toast('This panel opened, but one widget could not load.', 'error');
  }
}
window.showPanel = showPanel;

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
let liveCountTimer = null;
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
    const topList = (VireonStore.get('vireon_products') || PRODUCTS_DATA).slice(0, 5);
    tp.innerHTML = topList.map((p, i) => `
      <div style="display:flex;align-items:center;gap:1rem;padding:.7rem 0;border-bottom:1px solid var(--border)">
        <span style="font-size:.72rem;color:var(--gray);width:18px;font-weight:700">${i+1}</span>
        <div style="width:40px;height:50px;background:${p.image ? 'url("'+p.image+'") center/cover' : 'linear-gradient(135deg,#1a0f05,#2d1a08)'};border:1px solid var(--border);flex-shrink:0"></div>
        <div style="flex:1;min-width:0"><p style="font-size:.78rem;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</p><p style="font-size:.65rem;color:var(--gray)">${p.cat} · ${p.sales||0} sold</p></div>
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
  if (liveCountTimer) return;
  let liveN = 142;
  liveCountTimer = setInterval(() => {
    liveN += Math.floor(Math.random() * 7) - 3;
    liveN = Math.max(80, Math.min(200, liveN));
    const el = document.getElementById('live-count');
    if (el) el.textContent = liveN;
  }, 3000);
}

let chartsInit = false;
function initDashboardCharts() {
  if (chartsInit) return;
  if (!window.Chart) return;
  chartsInit = true;
  const g = s => 'rgba(212,175,55,' + s + ')';
  const def = { responsive: true, plugins: { legend: { display: false } } };
  const gridOpts = { x: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } }, y: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } } };

  try {
    const rc = document.getElementById('ch-revenue');
    if (rc) new Chart(rc, { type: 'line', data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'], datasets: [{ data: [42000,58000,51000,72000,68000,89000,84250], borderColor: '#D4AF37', backgroundColor: g('.07'), tension: .4, pointBackgroundColor: '#D4AF37', pointRadius: 5, fill: true }] }, options: { ...def, scales: { ...gridOpts, y: { ...gridOpts.y, ticks: { ...gridOpts.y.ticks, callback: v => '$' + v.toLocaleString() } } } } });

    const cc = document.getElementById('ch-cat');
    if (cc) new Chart(cc, { type: 'doughnut', data: { labels: ['Coats','Dresses','Suits','Bags','Accessories','Other'], datasets: [{ data: [28,22,15,18,12,5], backgroundColor: ['#D4AF37','#B8962E','#F5D76E','#8b6914','#5c4a0a','#2A2A2A'], borderColor: '#1B1B1B', borderWidth: 3 }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#888', font: { size: 11 } } } } } });

    const tc = document.getElementById('ch-traffic');
    if (tc) new Chart(tc, { type: 'bar', data: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ data: [1200,1850,1420,2100,1780,2400,1900], backgroundColor: g('.55'), borderColor: '#D4AF37', borderWidth: 1 }] }, options: { ...def, scales: gridOpts } });
  } catch (err) {
    chartsInit = false;
    console.warn('Dashboard charts skipped', err);
  }
}

/* ────── ANALYTICS CHARTS ─────────────────────────────────── */
let analyticsInit = false;
function initAnalyticsCharts() {
  if (analyticsInit) return;
  if (!window.Chart) return;
  analyticsInit = true;
  const g = s => 'rgba(212,175,55,' + s + ')';
  const gridOpts = { x: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } }, y: { grid: { color: g('.06') }, ticks: { color: '#6B6B6B' } } };

  try {
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
  } catch (err) {
    analyticsInit = false;
    console.warn('Analytics charts skipped', err);
  }
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
  const list = data || VireonStore.get('vireon_products') || [];
  tbody.innerHTML = list.map(p => {
    const stockColor = p.stock <= 3 ? 'var(--error)' : p.stock <= 8 ? 'var(--warning)' : 'var(--success)';
    const stockStatus = p.stock <= 0 ? 'Out of Stock' : p.stock <= 8 ? 'Low Stock' : 'In Stock';
    const imgBg = p.image ? `url("${p.image}") center/cover` : 'linear-gradient(135deg,#1a0f05,#2d1a08)';
    return `
    <tr>
      <td><input type="checkbox" style="accent-color:var(--gold)"></td>
      <td>
        <div style="display:flex;align-items:center;gap:.8rem">
          <div style="width:36px;height:45px;background:${imgBg};border:1px solid var(--border);flex-shrink:0"></div>
          <div><p style="font-size:.78rem;color:var(--white)">${p.name}</p><p style="font-size:.62rem;color:var(--gray)">${p.badge||''}</p></div>
        </div>
      </td>
      <td style="font-size:.68rem;color:var(--text-2);letter-spacing:.05em">${p.sku}</td>
      <td>${p.cat}</td>
      <td style="color:var(--gold);font-family:var(--font-serif)">$${p.price.toLocaleString()}</td>
      <td style="color:${stockColor};font-weight:600">${p.stock}</td>
      <td><span class="badge ${STATUS_BADGE[stockStatus]||''}">${stockStatus}</span></td>
      <td style="color:var(--text-2)">${p.sales||0}</td>
      <td>
        <button class="tbl-action" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
        <button class="tbl-action-del tbl-action" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
  const cnt = document.getElementById('prod-count');
  if (cnt) cnt.textContent = `Showing ${list.length} products`;
}

function filterProducts() {
  const q      = (document.getElementById('prod-search')?.value||'').toLowerCase();
  const cat    = document.getElementById('prod-cat-filter')?.value || '';
  const status = document.getElementById('prod-status-filter')?.value || '';
  let list = (VireonStore.get('vireon_products') || []).filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchC = !cat || p.cat === cat;
    const s = p.stock <= 0 ? 'Out of Stock' : p.stock <= 8 ? 'Low Stock' : 'In Stock';
    const matchS = !status || s === status;
    return matchQ && matchC && matchS;
  });
  renderProductsTable(list);
}

function editProduct(id) {
  const products = VireonStore.get('vireon_products') || [];
  const p = products.find(function(x) { return String(x.id) === String(id); });
  if (!p) { toast('Product not found.', 'error'); return; }

  document.getElementById('prod-name').value         = p.name || '';
  document.getElementById('prod-sku').value          = p.sku || '';
  const catSel = document.getElementById('prod-category');
  if (catSel) catSel.value = p.cat || '';
  document.getElementById('prod-price').value        = p.price || '';
  document.getElementById('prod-compare-price').value= p.comparePrice || '';
  document.getElementById('prod-desc').value         = p.description || p.desc || '';
  document.getElementById('prod-sizes').value        = Array.isArray(p.sizes) ? p.sizes.join(',') : (p.sizes||'');
  document.getElementById('prod-colors').value       = Array.isArray(p.colors) ? p.colors.join(',') : (p.colors||'');
  document.getElementById('prod-stock').value        = p.stock != null ? p.stock : '';
  const badgeSel = document.getElementById('prod-badge');
  if (badgeSel) badgeSel.value = p.badge || '';

  const naEl = document.getElementById('prod-new-arrival');
  if (naEl) naEl.checked = !!p.newArrival;
  const bsEl = document.getElementById('prod-best-seller');
  if (bsEl) bsEl.checked = !!p.bestSeller;
  const acEl = document.getElementById('prod-active');
  if (acEl) acEl.checked = p.active !== false;

  // Image: restore preview from stored image; clear file data field
  const urlEl  = document.getElementById('main-img-url');
  const dataEl = document.getElementById('main-img-data');
  const prev   = document.getElementById('main-img-preview');
  if (urlEl)  urlEl.value  = p.image && !p.image.startsWith('data:') ? p.image : '';
  if (dataEl) dataEl.value = '';
  if (prev && p.image) {
    prev.style.backgroundImage   = `url("${p.image}")`;
    prev.style.backgroundSize    = 'cover';
    prev.style.backgroundPosition = 'center';
    prev.innerHTML = `<button onclick="clearImg('main-img-preview','main-img-input')" style="background:rgba(0,0,0,.7);border:1px solid var(--gold);color:var(--gold);padding:.3rem .8rem;font-size:.6rem;letter-spacing:.1em;cursor:pointer">REMOVE</button>`;
  } else if (prev) {
    prev.style.backgroundImage = '';
    prev.innerHTML = '<i class="fas fa-cloud-upload-alt" style="font-size:2rem;color:var(--gold);margin-bottom:.5rem"></i><p style="font-size:.72rem;color:var(--text-2)">Click to upload main image</p><p style="font-size:.62rem;color:var(--gray)">PNG, JPG, WEBP — max 5MB</p>';
  }

  const form = document.getElementById('add-product-form');
  if (form) form.dataset.editId = String(id);
  const titleEl = document.getElementById('prod-form-title');
  if (titleEl) titleEl.innerHTML = 'Edit <em style="font-style:italic;color:var(--gold)">Product</em>';

  const errEl = document.getElementById('prod-form-error');
  if (errEl) errEl.style.display = 'none';

  openAddProduct();
}

function deleteProduct(id) {
  var products = VireonStore.get('vireon_products') || [];
  var p = products.find(function(x) { return String(x.id) === String(id); });
  if (!p) return;
  if (!confirm('Delete "' + p.name + '"? This cannot be undone.')) return;
  var oldCat = p.cat;
  var newList = products.filter(function(x) { return String(x.id) !== String(id); });
  var ok = VireonStore.save('vireon_products', newList);
  if (!ok) { toast('Storage quota exceeded — product not deleted.', 'error'); return; }
  syncCategoryCount(oldCat);
  renderProductsTable();
  toast('"' + p.name + '" deleted.', 'error');
}

function openAddProduct() {
  const form = document.getElementById('add-product-form');
  if (!form) return;
  form.style.display = 'block';
  form.scrollIntoView({ behavior: 'smooth' });
}

function closeAddProduct() {
  const form = document.getElementById('add-product-form');
  if (!form) return;
  form.style.display = 'none';
  form.removeAttribute('data-edit-id');
  form.reset();
  // Reset form title
  const titleEl = document.getElementById('prod-form-title');
  if (titleEl) titleEl.innerHTML = 'Add <em style="font-style:italic;color:var(--gold)">New Product</em>';
  // Reset image preview
  const prev = document.getElementById('main-img-preview');
  if (prev) {
    prev.style.backgroundImage = '';
    prev.innerHTML = '<i class="fas fa-cloud-upload-alt" style="font-size:2rem;color:var(--gold);margin-bottom:.5rem"></i><p style="font-size:.72rem;color:var(--text-2)">Click to upload main image</p><p style="font-size:.62rem;color:var(--gray)">PNG, JPG, WEBP — max 5MB</p>';
  }
  const dataEl = document.getElementById('main-img-data');
  if (dataEl) dataEl.value = '';
  const errEl = document.getElementById('prod-form-error');
  if (errEl) errEl.style.display = 'none';
}

function saveProduct() {
  const form = document.getElementById('add-product-form');
  const errEl = document.getElementById('prod-form-error');
  const showErr = function(msg) {
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
  };
  if (errEl) errEl.style.display = 'none';

  const name  = document.getElementById('prod-name')?.value.trim();
  const sku   = document.getElementById('prod-sku')?.value.trim();
  const cat   = document.getElementById('prod-category')?.value;
  const price = document.getElementById('prod-price')?.value.trim();

  if (!name)  { showErr('Product name is required.'); return; }
  if (!sku)   { showErr('SKU is required.'); return; }
  if (!cat)   { showErr('Category is required.'); return; }
  if (!price) { showErr('Price is required.'); return; }

  const dataEl = document.getElementById('main-img-data');
  const urlEl  = document.getElementById('main-img-url');
  const image  = (dataEl && dataEl.value) ? dataEl.value
               : (urlEl  && urlEl.value.trim()) ? urlEl.value.trim()
               : null;

  const description  = document.getElementById('prod-desc')?.value.trim() || '';
  const comparePrice = parseFloat(document.getElementById('prod-compare-price')?.value) || null;
  const sizesRaw     = document.getElementById('prod-sizes')?.value || '';
  const colorsRaw    = document.getElementById('prod-colors')?.value || '';
  const stock        = parseInt(document.getElementById('prod-stock')?.value) || 0;
  const badge        = document.getElementById('prod-badge')?.value || null;
  const newArrival   = !!(document.getElementById('prod-new-arrival')?.checked);
  const bestSeller   = !!(document.getElementById('prod-best-seller')?.checked);
  const active       = document.getElementById('prod-active') ? !!(document.getElementById('prod-active').checked) : true;
  const sizes        = sizesRaw ? sizesRaw.split(',').map(function(s){ return s.trim(); }).filter(Boolean) : ['S','M','L'];
  const colors       = colorsRaw ? colorsRaw.split(',').map(function(s){ return s.trim(); }).filter(Boolean) : ['#1a1a1a'];

  const editId = form && form.dataset.editId;
  var products = VireonStore.get('vireon_products') || [];
  var oldCat = null;

  // Duplicate SKU check (warn but proceed)
  var skuDup = products.find(function(x) { return x.sku === sku && String(x.id) !== String(editId); });
  if (skuDup) toast('Warning: SKU "' + sku + '" already used by "' + skuDup.name + '".');

  var newProduct;
  if (editId) {
    var existing = products.find(function(x) { return String(x.id) === String(editId); });
    oldCat = existing ? existing.cat : null;
    newProduct = Object.assign({}, existing, {
      name, sku, cat, price: parseFloat(price), comparePrice, description,
      sizes, colors, stock, badge: badge || null,
      newArrival, bestSeller, active, image
    });
    products = products.map(function(x) { return String(x.id) === String(editId) ? newProduct : x; });
  } else {
    newProduct = {
      id: Date.now(),
      name, sku, cat, price: parseFloat(price), comparePrice, description,
      sizes, colors, stock, badge: badge || null,
      newArrival, bestSeller, active, image,
      sales: 0, rating: 5, reviews: 0, gender: 'unisex',
      grad: 'linear-gradient(160deg,#1a0f05,#2d1a08,#0a0600)',
      dateAdded: new Date().toISOString()
    };
    products.push(newProduct);
  }

  var ok = VireonStore.save('vireon_products', products);
  if (!ok) { toast('Storage quota exceeded — product not saved.', 'error'); return; }

  // Sync category counts
  if (oldCat && oldCat !== cat) syncCategoryCount(oldCat);
  syncCategoryCount(cat);

  renderProductsTable();
  closeAddProduct();
  toast(editId ? '"' + name + '" updated.' : '"' + name + '" added.', 'success');
}

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
        <button class="tbl-action" onclick="viewCustomer('${c.name}')">VIEW</button>
        <button class="tbl-action" onclick="emailCustomer('${c.name}')">EMAIL</button>
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
        ${item.stock <= item.threshold ? `<button class="d-btn" style="padding:.28rem .65rem;font-size:.56rem" onclick="restockItem('${item.sku}')"><i class="fas fa-plus"></i> RESTOCK</button>` : `<button class="tbl-action" onclick="adjustStock('${item.sku}')">ADJUST</button>`}
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
  'TKT-091': { customer: 'James Whitmore', subject: 'Order VP-2026-047 not arrived', status: 'Open', priority: 'HIGH', priorityColor: 'var(--error)', type: 'Order Issue', assigned: 'Rockstar', created: 'Jul 10, 2026', messages: [{ from: 'James Whitmore', time: 'Jul 10, 09:12', text: 'Hi, my order VP-2026-047 was supposed to arrive yesterday but still hasn\'t. Can you please check?' }, { from: 'Rockstar (Admin)', time: 'Jul 10, 09:45', text: 'Hello James, I\'m looking into this right now. I\'ll update you within the hour with tracking details.' }] },
  'TKT-090': { customer: 'Sofia Reyes', subject: 'Wrong size received — Evening Gown', status: 'In Progress', priority: 'MEDIUM', priorityColor: 'var(--warning)', type: 'Return Request', assigned: 'Vanshika', created: 'Jul 9, 2026', messages: [{ from: 'Sofia Reyes', time: 'Jul 9, 14:30', text: 'I received size L but ordered size S for the Evening Gown. Please arrange an exchange ASAP.' }, { from: 'Vanshika (Admin)', time: 'Jul 9, 15:00', text: 'Sofia, I\'m so sorry about that! I\'ve arranged a collection and will ship the correct size immediately.' }] },
  'TKT-089': { customer: 'Hugo Laurent', subject: 'Monogram request for Imperial Suit', status: 'In Progress', priority: 'LOW', priorityColor: 'var(--success)', type: 'Product Query', assigned: 'Lilith', created: 'Jul 8, 2026', messages: [{ from: 'Hugo Laurent', time: 'Jul 8, 11:00', text: 'I\'d like to add my initials "H.L." to the inside breast pocket of the Imperial Suit I ordered.' }] },
  'TKT-088': { customer: 'Elara Voss', subject: 'Payment declined — card error', status: 'Open', priority: 'HIGH', priorityColor: 'var(--error)', type: 'Payment Issue', assigned: 'Prince', created: 'Jul 8, 2026', messages: [{ from: 'Elara Voss', time: 'Jul 8, 18:22', text: 'I\'m trying to checkout but keep getting a payment declined error even though my card details are correct.' }] },
};
let currentTicketId = null;

function ticketPriorityMeta(ticket) {
  const priority = (ticket.priority || 'MEDIUM').toUpperCase();
  const color = ticket.priorityColor || (priority === 'HIGH' ? 'var(--error)' : priority === 'LOW' ? 'var(--success)' : 'var(--warning)');
  const label = priority === 'MEDIUM' ? 'MED' : priority;
  return { priority, color, label };
}

function ticketStatusBadge(status) {
  return status === 'Resolved' ? 'badge-delivered'
    : status === 'In Progress' ? 'badge-processing'
    : 'badge-pending';
}

function renderSupportTable(q='', typeFilter='', priFilter='') {
  const tbody = document.getElementById('support-table');
  if (!tbody) return;
  let entries = Object.entries(TICKET_DATA);
  if (q) entries = entries.filter(([,t]) => (t.customer||'').toLowerCase().includes(q) || (t.subject||'').toLowerCase().includes(q) || t.id?.toLowerCase().includes(q));
  if (typeFilter) entries = entries.filter(([,t]) => (t.type||'') === typeFilter);
  if (priFilter)  entries = entries.filter(([,t]) => (t.priority||'').toUpperCase() === priFilter.toUpperCase());
  tbody.innerHTML = entries.map(([id, ticket]) => {
    const priority = ticketPriorityMeta(ticket);
    return `
      <tr>
        <td style="color:var(--gold)">#${id}</td>
        <td>${ticket.customer || 'Customer'}</td>
        <td>${ticket.subject || 'Customer message'}</td>
        <td><span class="d-tag">${ticket.type || 'Order Issue'}</span></td>
        <td><span style="color:${priority.color};font-size:.68rem;font-weight:700">● ${priority.label}</span></td>
        <td>${ticket.assigned || 'Rockstar'}</td>
        <td><span class="badge ${ticketStatusBadge(ticket.status)}">${ticket.status || 'Open'}</span></td>
        <td><button class="tbl-action" onclick="openTicket('${id}')">${ticket.status === 'Resolved' ? 'VIEW' : 'OPEN'}</button></td>
      </tr>`;
  }).join('') || `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--gray)">No tickets found</td></tr>`;
}

function openTicket(id) {
  const data = TICKET_DATA[id]; if (!data) return;
  currentTicketId = id;
  const modal = document.getElementById('ticket-modal');
  if (!modal) return;
  modal.style.display = 'block';
  document.getElementById('ticket-id-display').textContent = '#' + id;
  document.getElementById('tkt-status').textContent = data.status;
  document.getElementById('tkt-status').className = 'badge ' + (data.status === 'Open' ? 'badge-pending' : data.status === 'In Progress' ? 'badge-processing' : 'badge-delivered');
  document.getElementById('tkt-priority').textContent = data.priority;
  document.getElementById('tkt-priority').style.color = data.priorityColor;
  document.getElementById('tkt-customer').textContent = data.customer;
  const dateEl = document.getElementById('tkt-date');
  if (dateEl) dateEl.textContent = data.created || 'Jul 10, 2026';
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
  const text = input.value.trim();
  const ticket = currentTicketId ? TICKET_DATA[currentTicketId] : null;
  if (ticket) {
    ticket.status = 'In Progress';
    ticket.messages.push({ from: `${s?.displayName || 'Admin'} (Admin)`, time: 'Just now', text });
    persistTickets();
    updateSupportPanel();
    renderSupportTable();
  }
  if (msgs) {
    const div = document.createElement('div');
    div.style.cssText = 'background:rgba(212,175,55,.07);border:1px solid var(--border);padding:1rem;margin-top:.5rem';
    div.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-size:.7rem;font-weight:700;color:var(--gold)">${s?.displayName||'Admin'} (Admin)</span><span style="font-size:.62rem;color:var(--gray)">Just now</span></div><p style="font-size:.8rem;color:var(--text-2);line-height:1.7">${text}</p>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
  input.value = '';
  toast('Reply sent to customer.', 'success');
}

function closeTicket() {
  if (currentTicketId && TICKET_DATA[currentTicketId]) {
    TICKET_DATA[currentTicketId].status = 'Resolved';
    persistTickets();
    updateSupportPanel();
    renderSupportTable();
  }
  document.getElementById('ticket-modal').style.display = 'none';
  toast('Ticket marked as resolved.', 'success');
}

function createTicket() {
  const form = document.getElementById('new-ticket-form');
  const inputs = form?.querySelectorAll('input, textarea, select') || [];
  const [customerInput, emailInput, typeInput, priorityInput, subjectInput, descriptionInput, assignedInput] = inputs;
  const customer = customerInput?.value.trim() || 'Customer';
  const subject = subjectInput?.value.trim() || 'New support ticket';
  const priority = (priorityInput?.value || 'Medium').toUpperCase();
  const id = 'TKT-' + Date.now().toString().slice(-3);
  TICKET_DATA[id] = {
    customer,
    subject,
    status: 'Open',
    priority,
    priorityColor: priority === 'HIGH' ? 'var(--error)' : priority === 'LOW' ? 'var(--success)' : 'var(--warning)',
    type: typeInput?.value || 'Other',
    assigned: assignedInput?.value?.replace(/\s*\(.+\)/, '') || 'Rockstar',
    created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    messages: [{ from: customer, time: 'Just now', text: descriptionInput?.value.trim() || subject }],
    email: emailInput?.value.trim() || '',
  };
  persistTickets();
  renderSupportTable();
  updateSupportPanel();
  addNotificationEntry({ id: 'notif_' + id, type: 'ticket', title: `New support ticket from ${customer}`, unread: true, timestamp: 'Just now', ticketId: id });
  toast('Support ticket created and assigned.', 'success');
  if (form) {
    form.style.display = 'none';
    form.querySelectorAll('input, textarea').forEach(el => { el.value = ''; });
  }
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
function seedProductsIfEmpty() {
  var stored = VireonStore.get('vireon_products');
  if (!stored || !stored.length) {
    VireonStore.save('vireon_products', PRODUCTS_DATA.map(function(p){ return Object.assign({}, p); }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const step = (name, fn) => {
    try { fn(); } catch (err) { console.error(`${name} failed`, err); }
  };
  step('Seed products', seedProductsIfEmpty);
  step('Loader', initLoader);
  step('Topbar', initTopbar);
  step('Sidebar', bindSidebar);
  step('Scroll progress', initScrollProgress);
  step('Stored tickets', loadSupportTickets);
  step('Notification inbox', initNotificationInbox);
  step('Dashboard panel', initDashboardPanel);
  step('Support panel', updateSupportPanel);
  step('Realtime connection', initRealtimeConnection);
  step('Live notifications', simulateLiveNotifications);
  step('Dashboard charts', initDashboardCharts);
  step('Initial panel', () => showPanel('panel-dashboard'));
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
  var stored = VireonStore.get('vireon_categories');
  return stored && stored.length ? stored : DEFAULT_CATEGORIES;
}

function saveCategories(cats) {
  VireonStore.save('vireon_categories', cats);
}

function syncCategoryCount(catName) {
  if (!catName) return;
  var products = VireonStore.get('vireon_products') || [];
  var count = products.filter(function(p) { return p.cat === catName; }).length;
  var cats = VireonStore.get('vireon_categories') || [];
  if (!cats.length) cats = DEFAULT_CATEGORIES.slice();
  var cat = cats.find(function(c) { return c.name.toLowerCase() === catName.toLowerCase(); });
  if (cat) {
    cat.products = count;
    VireonStore.save('vireon_categories', cats);
  }
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
  // NOTE: form submit is handled by the global document submit listener below.
  // This function only wires up the search input.
  const search = document.getElementById('cat-search');
  if (search && !search.dataset.bound) {
    search.dataset.bound = '1';
    search.addEventListener('input', function(){ renderCategoriesTable(this.value); });
  }
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
function previewProductImage(input, previewId, dataId) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById(previewId);
    if (!el) return;
    el.style.backgroundImage  = `url(${e.target.result})`;
    el.style.backgroundSize   = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = `<button onclick="clearImg('${previewId}','${input.id}')" style="background:rgba(0,0,0,.7);border:1px solid var(--gold);color:var(--gold);padding:.3rem .8rem;font-size:.6rem;letter-spacing:.1em;cursor:pointer">REMOVE</button>`;
    if (dataId) {
      const dataEl = document.getElementById(dataId);
      if (dataEl) dataEl.value = e.target.result;
    }
  };
  reader.onerror = function() {
    toast('Image read failed.', 'error');
    if (dataId) { const d = document.getElementById(dataId); if (d) d.value = ''; }
  };
  reader.readAsDataURL(file);
}

function updateImgPreviewFromUrl(input, previewId, dataId) {
  const url = input.value.trim();
  const el = document.getElementById(previewId);
  if (!el) return;
  if (url) {
    el.style.backgroundImage   = `url(${url})`;
    el.style.backgroundSize    = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = `<button onclick="clearImgUrl('${previewId}','${input.id}')" style="background:rgba(0,0,0,.7);border:1px solid var(--gold);color:var(--gold);padding:.3rem .8rem;font-size:.6rem;cursor:pointer">REMOVE</button>`;
    // Clear data field when URL is typed
    if (dataId) { const d = document.getElementById(dataId); if (d) d.value = ''; }
  }
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
  const submitRow = formSection.querySelector('button[type="submit"]')?.parentElement;
  if (submitRow && submitRow.parentElement === formSection) formSection.insertBefore(group, submitRow);
  else formSection.appendChild(group);
}

function previewCategoryImage(input, dataId) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById('cat-img-preview');
    if (!el) return;
    el.style.backgroundImage   = `url(${e.target.result})`;
    el.style.backgroundSize    = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = '';
    if (dataId) { const d = document.getElementById(dataId); if (d) d.value = e.target.result; }
  };
  reader.onerror = function() {
    toast('Image read failed.', 'error');
    if (dataId) { const d = document.getElementById(dataId); if (d) d.value = ''; }
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
window.previewCategoryImage  = previewCategoryImage;

/* ═══════════════════════════════════════════════════════════
   LOOKBOOK MANAGEMENT
   ═══════════════════════════════════════════════════════════ */
function getLookbook() { return VireonStore.get('vireon_lookbook') || []; }
function saveLookbook(list) { return VireonStore.save('vireon_lookbook', list); }

function renderLookbookTable() {
  const tbody = document.getElementById('lookbook-table-body');
  if (!tbody) return;
  const list = getLookbook();
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--gray)">No lookbook entries yet</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(function(entry) {
    return `<tr>
      <td style="color:var(--gold)">${entry.vol||''}</td>
      <td style="color:var(--white)">${entry.title||''}</td>
      <td><span class="badge ${entry.active!==false?'badge-active':'badge-inactive'}">${entry.active!==false?'Active':'Inactive'}</span></td>
      <td>
        <button class="tbl-action" onclick="editLookbook('${entry.id}')"><i class="fas fa-edit"></i></button>
        <button class="tbl-action-del tbl-action" onclick="deleteLookbook('${entry.id}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
}

function editLookbook(id) {
  const list = getLookbook();
  const entry = list.find(function(x) { return x.id === id; });
  if (!entry) return;
  document.getElementById('look-vol').value   = entry.vol   || '';
  document.getElementById('look-title').value = entry.title || '';
  document.getElementById('look-img-url').value = (!entry.image || entry.image.startsWith('data:')) ? '' : entry.image;
  var dataEl = document.getElementById('look-img-data');
  if (dataEl) dataEl.value = '';
  var acEl = document.getElementById('look-active');
  if (acEl) acEl.checked = entry.active !== false;
  var form = document.getElementById('lookbook-form');
  if (form) form.dataset.editId = id;
  var errEl = document.getElementById('look-form-error');
  if (errEl) errEl.style.display = 'none';
}

function deleteLookbook(id) {
  var list = getLookbook();
  var entry = list.find(function(x) { return x.id === id; });
  if (!entry || !confirm('Delete lookbook entry "' + entry.title + '"?')) return;
  saveLookbook(list.filter(function(x) { return x.id !== id; }));
  renderLookbookTable();
  toast('"' + entry.title + '" deleted.', 'error');
}

function initLookbookPanel() {
  renderLookbookTable();
  var form = document.getElementById('lookbook-form');
  if (form && !form.dataset.lookBound) {
    form.dataset.lookBound = '1';
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var errEl = document.getElementById('look-form-error');
      if (errEl) errEl.style.display = 'none';
      var vol   = document.getElementById('look-vol')?.value.trim();
      var title = document.getElementById('look-title')?.value.trim();
      if (!vol)   { if (errEl) { errEl.textContent='Volume is required.'; errEl.style.display='block'; } return; }
      if (!title) { if (errEl) { errEl.textContent='Title is required.'; errEl.style.display='block'; } return; }
      var dataEl = document.getElementById('look-img-data');
      var urlEl  = document.getElementById('look-img-url');
      var image  = (dataEl && dataEl.value) ? dataEl.value : (urlEl && urlEl.value.trim()) ? urlEl.value.trim() : null;
      var active = document.getElementById('look-active')?.checked !== false;
      var editId = form.dataset.editId;
      var list   = getLookbook();
      if (editId) {
        list = list.map(function(x) { return x.id===editId ? Object.assign({},x,{vol,title,image,active}) : x; });
        delete form.dataset.editId;
      } else {
        list.push({ id: 'look_'+Date.now().toString(36), vol, title, image, active });
      }
      var ok = saveLookbook(list);
      if (!ok) { toast('Storage quota exceeded.','error'); return; }
      renderLookbookTable();
      form.reset();
      if (dataEl) dataEl.value = '';
      // Reset image preview
      var prev = document.getElementById('look-img-preview');
      if (prev) { prev.style.backgroundImage=''; prev.style.backgroundSize=''; prev.innerHTML='<i class="fas fa-image" style="font-size:1.5rem;color:var(--gold)"></i>'; }
      toast(editId ? 'Lookbook entry updated.' : 'Lookbook entry added.', 'success');
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   LIMITED EDITION CONFIG
   ═══════════════════════════════════════════════════════════ */
function getLimited() { return VireonStore.get('vireon_limited_edition'); }
function saveLimited(cfg) { return VireonStore.save('vireon_limited_edition', cfg); }

function loadLimitedForm() {
  var cfg = getLimited();
  // Populate product select
  var sel = document.getElementById('lim-product');
  if (sel) {
    var products = VireonStore.get('vireon_products') || [];
    sel.innerHTML = '<option value="">— Select Product —</option>' +
      products.map(function(p) { return '<option value="'+p.id+'">'+(p.name||'Product #'+p.id)+'</option>'; }).join('');
    if (cfg && cfg.productId) sel.value = cfg.productId;
  }
  if (!cfg) return;
  var set = function(id, v) { var el = document.getElementById(id); if (el) el.value = v != null ? v : ''; };
  set('lim-title',     cfg.title||'');
  set('lim-subtitle',  cfg.subtitle||'');
  set('lim-desc',      cfg.description||'');
  set('lim-price',     cfg.price != null ? cfg.price : '');
  set('lim-total',     cfg.totalPieces != null ? cfg.totalPieces : '');
  set('lim-remaining', cfg.piecesRemaining != null ? cfg.piecesRemaining : '');
  // Convert ISO to datetime-local
  if (cfg.endDate) {
    try {
      var d = new Date(cfg.endDate);
      var local = new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,16);
      set('lim-end', local);
    } catch(e) {}
  }
  var acEl = document.getElementById('lim-active');
  if (acEl) acEl.checked = !!cfg.active;
  // Restore image preview
  var prev = document.getElementById('lim-img-preview');
  if (prev && cfg.image) {
    prev.style.backgroundImage   = 'url("'+cfg.image+'")';
    prev.style.backgroundSize    = 'cover';
    prev.style.backgroundPosition = 'center';
    prev.innerHTML = '';
  }
  // Clear data field
  var dataEl = document.getElementById('lim-img-data');
  if (dataEl) dataEl.value = '';
  // URL field: only set if not dataURL
  var urlEl = document.getElementById('lim-img-url');
  if (urlEl) urlEl.value = (cfg.image && !cfg.image.startsWith('data:')) ? cfg.image : '';
}

function saveLimitedConfig() {
  var errEl = document.getElementById('lim-form-error');
  if (errEl) errEl.style.display = 'none';
  var title = document.getElementById('lim-title')?.value.trim();
  var endRaw = document.getElementById('lim-end')?.value;
  if (!title)  { if (errEl) { errEl.textContent='Title is required.'; errEl.style.display='block'; } return; }
  if (!endRaw) { if (errEl) { errEl.textContent='End date is required.'; errEl.style.display='block'; } return; }
  var dataEl = document.getElementById('lim-img-data');
  var urlEl  = document.getElementById('lim-img-url');
  var image  = (dataEl && dataEl.value) ? dataEl.value : (urlEl && urlEl.value.trim()) ? urlEl.value.trim() : (getLimited()||{}).image || null;
  var cfg = {
    productId:      document.getElementById('lim-product')?.value || null,
    image:          image,
    title:          title,
    subtitle:       document.getElementById('lim-subtitle')?.value.trim() || '',
    description:    document.getElementById('lim-desc')?.value.trim() || '',
    price:          parseFloat(document.getElementById('lim-price')?.value) || null,
    totalPieces:    parseInt(document.getElementById('lim-total')?.value) || null,
    piecesRemaining:parseInt(document.getElementById('lim-remaining')?.value) || null,
    endDate:        new Date(endRaw).toISOString(),
    active:         !!(document.getElementById('lim-active')?.checked)
  };
  var ok = saveLimited(cfg);
  if (!ok) { toast('Storage quota exceeded.','error'); return; }
  toast('Limited Edition config saved.', 'success');
}

function clearLimitedForm() {
  var form = document.getElementById('lim-config-form');
  if (form) form.reset();
  var prev = document.getElementById('lim-img-preview');
  if (prev) { prev.style.backgroundImage=''; prev.innerHTML='<i class="fas fa-image" style="font-size:1.5rem;color:var(--gold)"></i>'; }
  var dataEl = document.getElementById('lim-img-data');
  if (dataEl) dataEl.value = '';
}

function initLimitedPanel() {
  loadLimitedForm();
}

/* ═══════════════════════════════════════════════════════════
   BRAND SETTINGS
   ═══════════════════════════════════════════════════════════ */
function getBrandSettings() { return VireonStore.get('vireon_brand_settings'); }
function saveBrandSettings(bs) { return VireonStore.save('vireon_brand_settings', bs); }

function renderBrandSettingsBlock() {
  var cfg = getBrandSettings();
  var craftEl = document.getElementById('setting-craft-image');
  var yearEl  = document.getElementById('setting-founded-year');
  if (craftEl) craftEl.value = (cfg && cfg.craftImage) ? cfg.craftImage : '';
  if (yearEl)  yearEl.value  = (cfg && cfg.foundedYear) ? cfg.foundedYear : 2025;
}

window.saveBrandSettingsFromForm = function() {
  var craftEl = document.getElementById('setting-craft-image');
  var yearEl  = document.getElementById('setting-founded-year');
  var craftImage   = craftEl ? craftEl.value.trim() : '';
  var foundedYear  = yearEl  ? (parseInt(yearEl.value) || 2025) : 2025;
  var ok = saveBrandSettings({ craftImage: craftImage, foundedYear: foundedYear });
  if (!ok) { toast('Storage quota exceeded.','error'); return; }
  toast('Brand settings saved.', 'success');
};

/* Extend renderSettingsPanel to also call renderBrandSettingsBlock */
document.addEventListener('DOMContentLoaded', function() {
  var __origRS = window.renderSettingsPanel;
  if (typeof __origRS === 'function') {
    window.renderSettingsPanel = function() { __origRS(); renderBrandSettingsBlock(); };
  }
});

/* ═══════════════════════════════════════════════════════════
   CREDITS MANAGEMENT — Team Members System
   ═══════════════════════════════════════════════════════════ */
const CREDITS_KEY = 'vireon_credits';

function getCredits() {
  try { return JSON.parse(localStorage.getItem(CREDITS_KEY)) || []; }
  catch { return []; }
}
function saveCredits(list) { localStorage.setItem(CREDITS_KEY, JSON.stringify(list)); }
function genCredId()       { return 'cred_' + Date.now().toString(36); }

/* ── RENDER CREDITS GRID ─────────────────────────────────── */
function renderCreditsGrid(filter = '') {
  const grid = document.getElementById('credits-grid');
  if (!grid) return;
  let list = getCredits();
  if (filter) list = list.filter(m => m.name.toLowerCase().includes(filter.toLowerCase()) || m.position.toLowerCase().includes(filter.toLowerCase()));

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:5rem;color:var(--gray)">
      <i class="fas fa-users" style="font-size:3rem;color:var(--border);display:block;margin-bottom:1.5rem"></i>
      <h3 style="font-size:1.5rem;color:var(--white);font-weight:300;margin-bottom:.8rem">No team members yet</h3>
      <p>Click "ADD MEMBER" to add your first team member.</p>
    </div>`;
    updateCreditsStats();
    return;
  }

  grid.innerHTML = list.map(m => {
    const socials = [
      m.instagram ? `<a href="${m.instagram}" target="_blank" style="color:#E1306C;font-size:1rem;transition:transform .3s" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform=''"><i class="fab fa-instagram"></i></a>` : '',
      m.facebook  ? `<a href="${m.facebook}"  target="_blank" style="color:#1877F2;font-size:1rem;transition:transform .3s" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform=''"><i class="fab fa-facebook-f"></i></a>` : '',
      m.whatsapp  ? `<a href="https://wa.me/${m.whatsapp.replace(/\D/g,'')}" target="_blank" style="color:#25D366;font-size:1rem;transition:transform .3s" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform=''"><i class="fab fa-whatsapp"></i></a>` : '',
      m.twitter   ? `<a href="${m.twitter}"   target="_blank" style="color:#1DA1F2;font-size:1rem;transition:transform .3s" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform=''"><i class="fab fa-twitter"></i></a>` : '',
    ].filter(Boolean).join('');

    return `
    <div style="background:var(--bg-2);border:1px solid var(--border);overflow:hidden;transition:all .3s;position:relative" onmouseover="this.style.borderColor='var(--gold)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='var(--border)';this.style.transform=''">
      ${!m.visible ? '<div style="position:absolute;top:.8rem;right:.8rem;background:rgba(107,114,128,.3);border:1px solid var(--border);color:var(--gray);font-size:.52rem;padding:.2rem .6rem;letter-spacing:.12em;text-transform:uppercase;z-index:2">HIDDEN</div>' : ''}
      <!-- Photo -->
      <div style="height:200px;overflow:hidden;background:var(--bg-3);position:relative">
        ${m.photo
          ? `<img src="${m.photo}" style="width:100%;height:100%;object-fit:cover;object-position:top" alt="${m.name}" onerror="this.style.display='none'">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--bg-3)"><i class="fas fa-user" style="font-size:4rem;color:var(--border)"></i></div>`
        }
      </div>
      <!-- Info -->
      <div style="padding:1.5rem;text-align:center">
        <h4 style="font-family:var(--font-serif);font-size:1.2rem;color:var(--white);margin-bottom:.3rem">${m.name}</h4>
        <p style="font-size:.6rem;letter-spacing:.22em;color:var(--gold);text-transform:uppercase;margin-bottom:.8rem">${m.position}</p>
        <p style="font-size:.75rem;color:var(--text-2);line-height:1.7;margin-bottom:1rem">${m.bio.length > 100 ? m.bio.substring(0,100)+'...' : m.bio}</p>
        ${socials ? `<div style="display:flex;gap:.8rem;justify-content:center;margin-bottom:1.2rem">${socials}</div>` : ''}
        <div style="display:flex;gap:.5rem;justify-content:center">
          <button class="tbl-action" onclick="editCredit('${m.id}')"><i class="fas fa-edit"></i> EDIT</button>
          <button class="tbl-action" style="border-color:rgba(107,114,128,.3);color:var(--gray)" onclick="toggleCreditVisibility('${m.id}')"><i class="fas fa-${m.visible ? 'eye-slash' : 'eye'}"></i></button>
          <button class="tbl-action-del tbl-action" onclick="deleteCredit('${m.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');

  updateCreditsStats();
}

/* ── STATS ───────────────────────────────────────────────── */
function updateCreditsStats() {
  const list = getCredits();
  const vis  = list.filter(m => m.visible).length;
  const set  = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('cred-total',   list.length);
  set('cred-visible', vis);
  set('cred-hidden',  list.length - vis);
}

/* ── OPEN / CLOSE FORM ───────────────────────────────────── */
function openCreditsForm(editId = null) {
  const sec = document.getElementById('credits-form-section');
  const form = document.getElementById('credits-form');
  if (!sec || !form) return;
  form.removeAttribute('data-edit-id');
  form.reset();
  document.getElementById('cred-img-preview').style.backgroundImage = '';
  document.getElementById('cred-img-preview').innerHTML = '<i class="fas fa-camera" style="font-size:1.3rem;color:var(--gold)"></i><p style="font-size:.55rem;color:var(--gray);margin-top:.3rem;text-align:center">Upload</p>';
  document.getElementById('cred-form-title').textContent = editId ? 'Edit Member' : 'Add Team Member';
  document.getElementById('cred-submit-label').textContent = editId ? 'UPDATE MEMBER' : 'SAVE MEMBER';
  document.getElementById('cred-visible-toggle').checked = true;
  document.getElementById('cred-visible-label').textContent = 'Visible on site';

  if (editId) {
    const m = getCredits().find(x => x.id === editId);
    if (!m) return;
    form.dataset.editId = editId;
    document.getElementById('cred-name').value     = m.name;
    document.getElementById('cred-position').value = m.position;
    document.getElementById('cred-bio').value       = m.bio;
    document.getElementById('cred-instagram').value = m.instagram || '';
    document.getElementById('cred-facebook').value  = m.facebook  || '';
    document.getElementById('cred-whatsapp').value  = m.whatsapp  || '';
    document.getElementById('cred-twitter').value   = m.twitter   || '';
    document.getElementById('cred-img-url').value   = m.photo     || '';
    document.getElementById('cred-visible-toggle').checked = m.visible !== false;
    if (m.photo) {
      const prev = document.getElementById('cred-img-preview');
      prev.style.backgroundImage   = `url(${m.photo})`;
      prev.style.backgroundSize    = 'cover';
      prev.style.backgroundPosition = 'center';
      prev.innerHTML = '';
    }
  }
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth' });
}

function closeCreditsForm() {
  const sec = document.getElementById('credits-form-section');
  if (sec) sec.style.display = 'none';
}

/* ── FORM SUBMIT ─────────────────────────────────────────── */
document.addEventListener('submit', function(e) {
  if (e.target.id !== 'credits-form') return;
  e.preventDefault();
  const editId   = e.target.dataset.editId;
  const name     = document.getElementById('cred-name')?.value.trim();
  const position = document.getElementById('cred-position')?.value.trim();
  const bio      = document.getElementById('cred-bio')?.value.trim();
  if (!name || !position || !bio) { toast('Name, position and bio are required.', 'error'); return; }

  const photo    = document.getElementById('cred-img-url')?.value.trim() || '';
  const instagram= document.getElementById('cred-instagram')?.value.trim() || '';
  const facebook = document.getElementById('cred-facebook')?.value.trim() || '';
  const whatsapp = document.getElementById('cred-whatsapp')?.value.trim() || '';
  const twitter  = document.getElementById('cred-twitter')?.value.trim() || '';
  const visible  = document.getElementById('cred-visible-toggle')?.checked !== false;

  const list = getCredits();
  if (editId) {
    const idx = list.findIndex(m => m.id === editId);
    if (idx > -1) list[idx] = { ...list[idx], name, position, bio, photo, instagram, facebook, whatsapp, twitter, visible };
    toast(`"${name}" updated`, 'success');
  } else {
    list.push({ id: genCredId(), name, position, bio, photo, instagram, facebook, whatsapp, twitter, visible, createdAt: new Date().toLocaleDateString() });
    toast(`"${name}" added to team`, 'success');
  }
  saveCredits(list);
  renderCreditsGrid();
  closeCreditsForm();
  updateAboutPageCredits();
});

/* ── EDIT / DELETE / TOGGLE ──────────────────────────────── */
function editCredit(id)   { openCreditsForm(id); }
function deleteCredit(id) {
  const m = getCredits().find(x => x.id === id);
  if (!m || !confirm(`Remove "${m.name}" from the team?`)) return;
  saveCredits(getCredits().filter(x => x.id !== id));
  renderCreditsGrid(); updateAboutPageCredits();
  toast(`"${m.name}" removed`, 'error');
}
function toggleCreditVisibility(id) {
  const list = getCredits(); const m = list.find(x => x.id === id); if (!m) return;
  m.visible = !m.visible;
  saveCredits(list); renderCreditsGrid(); updateAboutPageCredits();
  toast(`"${m.name}" ${m.visible ? 'now visible' : 'hidden'}`, m.visible ? 'success' : '');
}

/* ── SYNC WITH ABOUT PAGE ────────────────────────────────── */
function updateAboutPageCredits() {
  const ABOUT_KEY = 'vireon_about_team';
  localStorage.setItem(ABOUT_KEY, JSON.stringify(getCredits().filter(m => m.visible)));
}

/* ── CREDITS IMAGE UPLOAD ────────────────────────────────── */
function previewCredImg(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const prev = document.getElementById('cred-img-preview');
    if (!prev) return;
    prev.style.backgroundImage   = `url(${e.target.result})`;
    prev.style.backgroundSize    = 'cover';
    prev.style.backgroundPosition = 'center';
    prev.innerHTML = '';
    document.getElementById('cred-img-url').value = e.target.result;
  };
  reader.readAsDataURL(file);
}
function updateCredImgFromUrl(input) {
  const prev = document.getElementById('cred-img-preview');
  if (!prev || !input.value) return;
  prev.style.backgroundImage   = `url(${input.value})`;
  prev.style.backgroundSize    = 'cover';
  prev.style.backgroundPosition = 'center';
  prev.innerHTML = '';
}

/* ── VISIBLE TOGGLE LABEL ────────────────────────────────── */
document.addEventListener('change', function(e) {
  if (e.target.id === 'cred-visible-toggle') {
    const lbl = document.getElementById('cred-visible-label');
    if (lbl) lbl.textContent = e.target.checked ? 'Visible on site' : 'Hidden from site';
  }
});

/* ── SEARCH ──────────────────────────────────────────────── */
document.addEventListener('input', function(e) {
  if (e.target.id === 'cred-search') renderCreditsGrid(e.target.value);
});

/* ── INIT ────────────────────────────────────────────────── */
function initCreditsPanel() { renderCreditsGrid(); updateAboutPageCredits(); }
window.openCreditsForm   = openCreditsForm;
window.closeCreditsForm  = closeCreditsForm;
window.editCredit        = editCredit;
window.deleteCredit      = deleteCredit;
window.toggleCreditVisibility = toggleCreditVisibility;
window.previewCredImg    = previewCredImg;
window.updateCredImgFromUrl   = updateCredImgFromUrl;
// Lookbook, Limited Edition, Brand Settings
window.editLookbook      = editLookbook;
window.deleteLookbook    = deleteLookbook;
window.initLookbookPanel = initLookbookPanel;
window.saveLimitedConfig = saveLimitedConfig;
window.clearLimitedForm  = clearLimitedForm;
window.initLimitedPanel  = initLimitedPanel;

/* Extend showPanel for credits */
const _origShowPanelFinal = window.showPanel;
window.showPanel = function(id) {
  if (_origShowPanelFinal) _origShowPanelFinal(id);
  if (id === 'panel-credits') initCreditsPanel();
};

/* ═══════════════════════════════════════════════════════════
   VIREON — FULL BUTTON IMPLEMENTATION MODULE
   Collections · Inventory · Orders · Customers · Returns
   Coupons · Reviews · Flash Sales · Analytics · Reports · Support Filters
   ═══════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────
   SHARED MODAL HELPERS
   ──────────────────────────────────────────────────────────── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
window.openModal  = openModal;
window.closeModal = closeModal;

/* ═══════════════════════════════════════════════════════════
   1. COLLECTIONS
   ═══════════════════════════════════════════════════════════ */
const COLLECTIONS_KEY = 'vireon_collections';
const DEFAULT_COLLECTIONS = [
  { id:'col_001', name:'Signature Series', products:12, status:'Active',  gradient:'linear-gradient(135deg,#1a0700,#2d1000)', badge:'ACTIVE'   },
  { id:'col_002', name:'Limited Drops',    products:4,  status:'Active',  gradient:'linear-gradient(135deg,#050510,#0d0d20)', badge:'LIMITED'  },
  { id:'col_003', name:'Night Luxe',       products:6,  status:'Active',  gradient:'linear-gradient(135deg,#0a0a00,#1a1900)', badge:'ACTIVE'   },
];

function getCollections() {
  try { const s=JSON.parse(localStorage.getItem(COLLECTIONS_KEY)); return s && s.length ? s : DEFAULT_COLLECTIONS; } catch { return DEFAULT_COLLECTIONS; }
}
function saveCollections(c) { localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(c)); }
function genColId() { return 'col_'+Date.now().toString(36); }

function renderCollectionsGrid(filter='') {
  const grid = document.getElementById('collections-grid');
  if (!grid) return;
  let cols = getCollections();
  if (filter) cols = cols.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));

  const badgeClass = s => s==='Active'?'badge-active':s==='LIMITED'?'badge-limited':'badge-inactive';
  grid.innerHTML = cols.map(c => `
    <div class="d-form-section" style="transition:all .3s;padding:0;overflow:hidden" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="height:120px;background:${c.gradient};border-bottom:1px solid var(--border)"></div>
      <div style="padding:1.5rem">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.8rem">
          <div>
            <h3 style="font-size:1rem;color:var(--white);margin-bottom:.3rem">${c.name}</h3>
            <p style="font-size:.7rem;color:var(--text-2)">${c.products} products · ${c.status}</p>
          </div>
          <span class="badge ${badgeClass(c.badge||c.status)}">${c.badge||c.status.toUpperCase()}</span>
        </div>
        <div style="display:flex;gap:.5rem">
          <button class="tbl-action" onclick="editCollection('${c.id}')"><i class="fas fa-edit"></i> EDIT</button>
          <button class="tbl-action-del tbl-action" onclick="deleteCollection('${c.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>`).join('') +
  `<div class="d-form-section" style="border:2px dashed var(--border);background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:220px;cursor:pointer;transition:all .3s" onclick="openCollectionForm()" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
    <i class="fas fa-plus" style="font-size:2rem;color:var(--gray);margin-bottom:.8rem"></i>
    <p style="font-size:.72rem;color:var(--gray)">Create New Collection</p>
  </div>`;
}

function openCollectionForm(editId=null) {
  const modal = document.getElementById('collection-modal');
  if (!modal) return;
  const title = document.getElementById('col-modal-title');
  const form  = document.getElementById('col-form');
  form.reset();
  delete form.dataset.editId;
  if (title) title.textContent = editId ? 'Edit Collection' : 'New Collection';

  if (editId) {
    const c = getCollections().find(x=>x.id===editId);
    if (!c) return;
    form.dataset.editId = editId;
    document.getElementById('col-name').value     = c.name;
    document.getElementById('col-status').value   = c.status;
    document.getElementById('col-gradient').value = c.gradient;
    document.getElementById('col-badge').value    = c.badge||'';
    document.getElementById('col-products').value = c.products;
  }
  openModal('collection-modal');
}
function editCollection(id) { openCollectionForm(id); }
function deleteCollection(id) {
  const cols = getCollections();
  const c = cols.find(x=>x.id===id);
  if (!c || !confirm(`Delete "${c.name}"?`)) return;
  saveCollections(cols.filter(x=>x.id!==id));
  renderCollectionsGrid();
  toast(`"${c.name}" deleted`, 'error');
}

document.addEventListener('submit', function(e) {
  if (e.target.id !== 'col-form') return;
  e.preventDefault();
  const name   = document.getElementById('col-name')?.value.trim();
  if (!name) { toast('Collection name is required','error'); return; }
  const status   = document.getElementById('col-status')?.value || 'Active';
  const gradient = document.getElementById('col-gradient')?.value || 'linear-gradient(135deg,#1a0f05,#2d1a08)';
  const badge    = document.getElementById('col-badge')?.value || '';
  const products = parseInt(document.getElementById('col-products')?.value)||0;
  const cols     = getCollections();
  const editId   = e.target.dataset.editId;
  if (editId) {
    const c = cols.find(x=>x.id===editId);
    if (c) { c.name=name; c.status=status; c.gradient=gradient; c.badge=badge; c.products=products; }
    toast(`"${name}" updated`,'success');
  } else {
    cols.push({ id:genColId(), name, status, gradient, badge:badge||status, products });
    toast(`"${name}" created`,'success');
  }
  saveCollections(cols);
  renderCollectionsGrid();
  closeModal('collection-modal');
  publishAuditAction('Collection saved', name);
});

function initCollectionsPanel() {
  renderCollectionsGrid();
  const search = document.getElementById('col-search');
  if (search && !search.dataset.bound) {
    search.dataset.bound = '1';
    search.addEventListener('input', function() { renderCollectionsGrid(this.value); });
  }
}
window.renderCollectionsGrid = renderCollectionsGrid;
window.openCollectionForm    = openCollectionForm;
window.editCollection        = editCollection;
window.deleteCollection      = deleteCollection;
window.initCollectionsPanel  = initCollectionsPanel;

/* ═══════════════════════════════════════════════════════════
   2. INVENTORY — ADJUST modal + real RESTOCK
   ═══════════════════════════════════════════════════════════ */
function adjustStock(sku) {
  const item = INVENTORY_DATA.find(i=>i.sku===sku);
  if (!item) return;
  document.getElementById('adj-sku').textContent   = item.sku;
  document.getElementById('adj-name').textContent  = item.name;
  document.getElementById('adj-current').textContent = item.stock;
  document.getElementById('adj-new-qty').value     = item.stock;
  openModal('inventory-adjust-modal');
  document.getElementById('adj-confirm').onclick = function() {
    const qty = parseInt(document.getElementById('adj-new-qty').value);
    if (isNaN(qty) || qty < 0) { toast('Enter a valid quantity','error'); return; }
    item.stock = qty;
    item.status = qty === 0 ? 'Out of Stock' : qty <= item.threshold ? 'Low Stock' : 'In Stock';
    renderInventoryTable(INVENTORY_DATA);
    closeModal('inventory-adjust-modal');
    toast(`Stock for ${item.name} updated to ${qty}`,'success');
    publishAuditAction('Stock adjusted', `${item.name}: ${qty} units`);
  };
}

function restockItem(sku) {
  const item = INVENTORY_DATA.find(i=>i.sku===sku);
  if (!item) return;
  document.getElementById('rst-sku').textContent   = item.sku;
  document.getElementById('rst-name').textContent  = item.name;
  document.getElementById('rst-current').textContent = item.stock;
  document.getElementById('rst-qty').value         = 20;
  openModal('inventory-restock-modal');
  document.getElementById('rst-confirm').onclick = function() {
    const qty = parseInt(document.getElementById('rst-qty').value);
    if (isNaN(qty) || qty <= 0) { toast('Enter a valid restock quantity','error'); return; }
    item.stock += qty;
    item.status = item.stock <= item.threshold ? 'Low Stock' : 'In Stock';
    renderInventoryTable(INVENTORY_DATA);
    closeModal('inventory-restock-modal');
    toast(`Restocked ${item.name} +${qty} units (now ${item.stock})`,'success');
    publishAuditAction('Restock placed', `${item.name}: +${qty} units`);
  };
}
window.adjustStock  = adjustStock;
window.restockItem  = restockItem;

/* ═══════════════════════════════════════════════════════════
   3. ORDERS — Detail modal + status update + Export CSV
   ═══════════════════════════════════════════════════════════ */
function viewOrderDetail(id) {
  const o = ORDERS_DATA.find(x=>x.id===id);
  if (!o) return;

  document.getElementById('od-id').textContent       = o.id;
  document.getElementById('od-customer').textContent = o.customer;
  document.getElementById('od-product').textContent  = o.product;
  document.getElementById('od-amount').textContent   = '$'+o.amount.toLocaleString();
  document.getElementById('od-date').textContent     = o.date;
  document.getElementById('od-delivery').textContent = o.delivery;
  const badge = document.getElementById('od-status-badge');
  badge.textContent = o.status;
  badge.className   = 'badge '+(STATUS_BADGE[o.status]||'');

  const sel = document.getElementById('od-status-select');
  sel.value = o.status;
  sel.onchange = function() {
    o.status = this.value;
    badge.textContent = o.status;
    badge.className   = 'badge '+(STATUS_BADGE[o.status]||'');
    renderOrdersTable(ORDERS_DATA);
    toast(`Order ${o.id} → ${o.status}`, 'success');
    publishAuditAction('Order status updated', `${o.id}: ${o.status}`);
  };

  document.getElementById('od-track-btn').onclick = function() {
    window.open('tracking.html?order='+o.id,'_blank');
  };
  openModal('order-detail-modal');
}

function exportOrdersCSV() {
  const headers = ['Order ID','Customer','Product','Amount','Date','Delivery','Status'];
  const rows = ORDERS_DATA.map(o => [o.id,o.customer,o.product,'$'+o.amount,o.date,o.delivery,o.status].map(v=>`"${v}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  downloadCSV(csv, 'vireon-orders.csv');
}

function createManualOrder() {
  openModal('manual-order-modal');
}
document.addEventListener('submit', function(e) {
  if (e.target.id !== 'manual-order-form') return;
  e.preventDefault();
  const customer = document.getElementById('mo-customer')?.value.trim();
  const product  = document.getElementById('mo-product')?.value.trim();
  const amount   = parseFloat(document.getElementById('mo-amount')?.value)||0;
  const delivery = document.getElementById('mo-delivery')?.value||'Standard';
  if (!customer||!product) { toast('Customer and product are required','error'); return; }
  const newId = 'VP-2026-'+(Math.floor(Math.random()*900)+100);
  ORDERS_DATA.unshift({ id:newId, customer, product, amount, date:'Today', delivery, status:'Pending' });
  renderOrdersTable(ORDERS_DATA);
  closeModal('manual-order-modal');
  toast(`Manual order ${newId} created`,'success');
  publishAuditAction('Manual order created', `${newId} for ${customer}`);
});
window.viewOrderDetail  = viewOrderDetail;
window.exportOrdersCSV  = exportOrdersCSV;
window.createManualOrder = createManualOrder;

/* ═══════════════════════════════════════════════════════════
   4. CUSTOMERS — filter + VIEW modal + EMAIL modal
   ═══════════════════════════════════════════════════════════ */
function filterCustomers() {
  const q    = (document.getElementById('cust-search')?.value||'').toLowerCase();
  const tier = document.getElementById('cust-tier-filter')?.value||'';
  const list = CUSTOMERS_DATA.filter(c => {
    const matchQ   = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    const matchTier = !tier || c.tier === tier;
    return matchQ && matchTier;
  });
  renderCustomersTable(list);
}

function viewCustomer(name) {
  const c = CUSTOMERS_DATA.find(x=>x.name===name);
  if (!c) return;
  document.getElementById('cv-name').textContent    = c.name;
  document.getElementById('cv-email').textContent   = c.email;
  document.getElementById('cv-tier').textContent    = c.tier;
  document.getElementById('cv-orders').textContent  = c.orders;
  document.getElementById('cv-spent').textContent   = '$'+c.spent.toLocaleString();
  document.getElementById('cv-points').textContent  = c.points.toLocaleString()+' pts';
  document.getElementById('cv-joined').textContent  = c.joined;
  document.getElementById('cv-avatar').textContent  = c.name.charAt(0);
  document.getElementById('cv-email-btn').onclick   = function() { closeModal('customer-modal'); emailCustomer(c.name); };
  openModal('customer-modal');
}

function emailCustomer(name) {
  const c = CUSTOMERS_DATA.find(x=>x.name===name);
  document.getElementById('em-to').textContent = c ? `${c.name} <${c.email}>` : name;
  document.getElementById('em-form').reset();
  openModal('email-customer-modal');
}
document.addEventListener('submit', function(e) {
  if (e.target.id !== 'em-form') return;
  e.preventDefault();
  const subj = document.getElementById('em-subject')?.value.trim();
  const body = document.getElementById('em-body')?.value.trim();
  if (!subj||!body) { toast('Subject and body are required','error'); return; }
  closeModal('email-customer-modal');
  toast('Email sent successfully','success');
  publishAuditAction('Customer email sent', subj);
});
window.filterCustomers = filterCustomers;
window.viewCustomer    = viewCustomer;
window.emailCustomer   = emailCustomer;

/* ═══════════════════════════════════════════════════════════
   5. RETURNS
   ═══════════════════════════════════════════════════════════ */
const RETURNS_KEY = 'vireon_returns';
const DEFAULT_RETURNS = [
  { id:'RET-047', order:'VP-2026-031', customer:'Isabella Cross', product:'Evening Gown',  reason:'Size issue',    type:'Exchange', status:'Pending'    },
  { id:'RET-046', order:'VP-2026-028', customer:'Thomas Reed',    product:'Imperial Suit', reason:'Changed mind',  type:'Refund',   status:'Processing' },
  { id:'RET-045', order:'VP-2026-022', customer:'Leon Müller',    product:'Sovereign Coat',reason:'Damaged item',  type:'Refund',   status:'Resolved'   },
];

function getReturns() {
  try { const s=JSON.parse(localStorage.getItem(RETURNS_KEY)); return s && s.length ? s : DEFAULT_RETURNS; } catch { return DEFAULT_RETURNS; }
}
function saveReturns(r) { localStorage.setItem(RETURNS_KEY, JSON.stringify(r)); }

function renderReturnsTable() {
  const tbody = document.getElementById('returns-table-body');
  if (!tbody) return;
  const ret = getReturns();
  const pendingEl   = document.getElementById('ret-pending-count');
  const progressEl  = document.getElementById('ret-progress-count');
  const resolvedEl  = document.getElementById('ret-resolved-count');
  if (pendingEl)  pendingEl.textContent  = ret.filter(r=>r.status==='Pending').length;
  if (progressEl) progressEl.textContent = ret.filter(r=>r.status==='Processing').length;
  if (resolvedEl) resolvedEl.textContent = ret.filter(r=>r.status==='Resolved').length;

  tbody.innerHTML = ret.map(r => `
    <tr>
      <td style="color:var(--gold)">#${r.id}</td>
      <td style="color:var(--gold)">${r.order}</td>
      <td>${r.customer}</td>
      <td>${r.product}</td>
      <td>${r.reason}</td>
      <td><span class="badge ${r.type==='Exchange'?'badge-shipped':'badge-processing'}">${r.type}</span></td>
      <td><span class="badge ${STATUS_BADGE[r.status]||'badge-pending'}">${r.status}</span></td>
      <td><button class="tbl-action" onclick="reviewReturn('${r.id}')">REVIEW</button></td>
    </tr>`).join('') || `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--gray)">No returns found</td></tr>`;
}

function reviewReturn(id) {
  const r = getReturns().find(x=>x.id===id);
  if (!r) return;
  document.getElementById('ret-id').textContent       = '#'+r.id;
  document.getElementById('ret-customer').textContent = r.customer;
  document.getElementById('ret-product').textContent  = r.product;
  document.getElementById('ret-reason').textContent   = r.reason;
  document.getElementById('ret-type').textContent     = r.type;
  const badge = document.getElementById('ret-status-badge');
  badge.textContent = r.status;
  badge.className = 'badge '+(STATUS_BADGE[r.status]||'badge-pending');
  const sel = document.getElementById('ret-status-select');
  sel.value = r.status;
  sel.onchange = function() {
    const rets = getReturns();
    const item = rets.find(x=>x.id===id);
    if (item) { item.status=this.value; saveReturns(rets); renderReturnsTable(); badge.textContent=item.status; badge.className='badge '+(STATUS_BADGE[item.status]||'badge-pending'); toast(`Return ${r.id} → ${item.status}`,'success'); }
  };
  openModal('return-review-modal');
}
function initReturnsPanel() { renderReturnsTable(); }
window.renderReturnsTable = renderReturnsTable;
window.reviewReturn       = reviewReturn;
window.initReturnsPanel   = initReturnsPanel;

/* ═══════════════════════════════════════════════════════════
   6. COUPONS
   ═══════════════════════════════════════════════════════════ */
const COUPONS_KEY = 'vireon_coupons';
const DEFAULT_COUPONS = [
  { id:'coup_001', code:'VIREON20', type:'Percentage', value:'20',  used:47,  limit:'500',       expires:'2026-12-31', minOrder:0,  status:'Active'  },
  { id:'coup_002', code:'ELITE',    type:'Free Shipping', value:'', used:124, limit:'',          expires:'',          minOrder:0,  status:'Active'  },
  { id:'coup_003', code:'WELCOME10',type:'Percentage', value:'10',  used:238, limit:'1000',      expires:'2026-06-30', minOrder:0, status:'Expired' },
];

function getCoupons()    { try { const s=JSON.parse(localStorage.getItem(COUPONS_KEY)); return s&&s.length?s:DEFAULT_COUPONS; } catch { return DEFAULT_COUPONS; } }
function saveCoupons(c)  { localStorage.setItem(COUPONS_KEY, JSON.stringify(c)); }
function genCoupId()     { return 'coup_'+Date.now().toString(36); }

function renderCouponsTable(filter='') {
  const tbody = document.getElementById('coupons-table-body');
  if (!tbody) return;
  let list = getCoupons();
  if (filter) list = list.filter(c => c.code.toLowerCase().includes(filter.toLowerCase()));
  tbody.innerHTML = list.map(c => {
    const expired = c.expires && new Date(c.expires) < new Date();
    const status  = expired ? 'Expired' : c.status;
    const badgeCls = status==='Active'?'badge-active':'badge-inactive';
    const actions = status==='Expired'
      ? `<button class="tbl-action" onclick="renewCoupon('${c.id}')">RENEW</button> <button class="tbl-action-del tbl-action" onclick="deleteCoupon('${c.id}')">DELETE</button>`
      : `<button class="tbl-action" onclick="editCoupon('${c.id}')">EDIT</button> <button class="tbl-action-del tbl-action" onclick="deleteCoupon('${c.id}')">DELETE</button>`;
    const val = c.type==='Free Shipping' ? 'Free Express' : c.type==='Percentage' ? c.value+'% off' : '$'+c.value+' off';
    return `<tr>
      <td style="color:var(--gold);font-weight:600;letter-spacing:.1em">${c.code}</td>
      <td>${c.type}</td>
      <td>${val}</td>
      <td>${c.used}</td>
      <td>${c.limit||'Unlimited'}</td>
      <td>${c.expires ? new Date(c.expires).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : 'Never'}</td>
      <td><span class="badge ${badgeCls}">${status}</span></td>
      <td>${actions}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--gray)">No coupons found</td></tr>`;
}

function saveCoupon() {
  const code    = document.getElementById('coup-code')?.value.trim().toUpperCase();
  const type    = document.getElementById('coup-type')?.value;
  const value   = document.getElementById('coup-value')?.value||'';
  const limit   = document.getElementById('coup-limit')?.value||'';
  const expires = document.getElementById('coup-expires')?.value||'';
  const minOrder= parseFloat(document.getElementById('coup-minorder')?.value)||0;
  if (!code) { toast('Coupon code is required','error'); return; }
  const editId  = document.getElementById('coupon-form-section').dataset.editId;
  const list    = getCoupons();
  if (editId) {
    const c = list.find(x=>x.id===editId);
    if (c) { c.code=code; c.type=type; c.value=value; c.limit=limit; c.expires=expires; c.minOrder=minOrder; c.status='Active'; }
    toast(`Coupon "${code}" updated`,'success');
  } else {
    if (list.find(c=>c.code===code)) { toast(`Code "${code}" already exists`,'error'); return; }
    list.push({ id:genCoupId(), code, type, value, used:0, limit, expires, minOrder, status:'Active' });
    toast(`Coupon "${code}" created`,'success');
  }
  saveCoupons(list);
  renderCouponsTable();
  document.getElementById('coupon-form-section').style.display='none';
  delete document.getElementById('coupon-form-section').dataset.editId;
  document.getElementById('coup-form')?.reset();
  publishAuditAction('Coupon saved', code);
}

function editCoupon(id) {
  const c = getCoupons().find(x=>x.id===id);
  if (!c) return;
  document.getElementById('coup-code').value    = c.code;
  document.getElementById('coup-type').value    = c.type;
  document.getElementById('coup-value').value   = c.value;
  document.getElementById('coup-limit').value   = c.limit;
  document.getElementById('coup-expires').value = c.expires;
  document.getElementById('coup-minorder').value = c.minOrder||0;
  const sec = document.getElementById('coupon-form-section');
  sec.dataset.editId = id;
  sec.style.display='block';
  sec.scrollIntoView({behavior:'smooth'});
}
function deleteCoupon(id) {
  const c = getCoupons().find(x=>x.id===id);
  if (!c||!confirm(`Delete coupon "${c.code}"?`)) return;
  saveCoupons(getCoupons().filter(x=>x.id!==id));
  renderCouponsTable();
  toast(`"${c.code}" deleted`,'error');
}
function renewCoupon(id) {
  const list = getCoupons(); const c = list.find(x=>x.id===id);
  if (!c) return;
  const oneYear = new Date(); oneYear.setFullYear(oneYear.getFullYear()+1);
  c.expires = oneYear.toISOString().split('T')[0];
  c.status  = 'Active';
  saveCoupons(list); renderCouponsTable();
  toast(`"${c.code}" renewed until ${oneYear.toLocaleDateString()}`,'success');
}
function initCouponsPanel() {
  renderCouponsTable();
  const search = document.getElementById('coup-search');
  if (search && !search.dataset.bound) {
    search.dataset.bound = '1';
    search.addEventListener('input', function(){ renderCouponsTable(this.value); });
  }
}
window.saveCoupon    = saveCoupon;
window.editCoupon    = editCoupon;
window.deleteCoupon  = deleteCoupon;
window.renewCoupon   = renewCoupon;
window.initCouponsPanel = initCouponsPanel;

/* ═══════════════════════════════════════════════════════════
   7. REVIEWS
   ═══════════════════════════════════════════════════════════ */
const REVIEWS_KEY = 'vireon_reviews';
const DEFAULT_REVIEWS = [
  { id:'rev_001', customer:'Alexandra R.', product:'Sovereign Coat', rating:5, text:'"Absolutely exceptional quality. Every detail speaks to the level of craftsmanship."', date:'Jul 9', status:'Published' },
  { id:'rev_002', customer:'Marcus B.',    product:'Imperial Suit',  rating:5, text:'"Commands presence the moment you put it on. Worth every penny."',                      date:'Jul 8', status:'Published' },
  { id:'rev_003', customer:'Sofia V.',     product:'Evening Gown',   rating:4, text:'"Beautiful but delivery took longer than expected."',                                    date:'Jul 7', status:'Pending'   },
  { id:'rev_004', customer:'Unknown',      product:'Noir Velvet Dress',rating:1,text:'"Spam review content — fake purchase."',                                               date:'Jul 6', status:'Flagged'   },
];

function getReviews()   { try { const s=JSON.parse(localStorage.getItem(REVIEWS_KEY)); return s&&s.length?s:DEFAULT_REVIEWS; } catch { return DEFAULT_REVIEWS; } }
function saveReviews(r) { localStorage.setItem(REVIEWS_KEY, JSON.stringify(r)); }

function renderReviewsTable() {
  const tbody = document.getElementById('reviews-table-body');
  if (!tbody) return;
  const reviews = getReviews();
  const updateStat = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  updateStat('rev-total',    reviews.length);
  updateStat('rev-pending',  reviews.filter(r=>r.status==='Pending').length);
  updateStat('rev-flagged',  reviews.filter(r=>r.status==='Flagged').length);
  const avg = reviews.filter(r=>r.status==='Published').length
    ? (reviews.filter(r=>r.status==='Published').reduce((a,r)=>a+r.rating,0)/reviews.filter(r=>r.status==='Published').length).toFixed(2)
    : '—';
  updateStat('rev-avg', avg);

  tbody.innerHTML = reviews.map(r => {
    const stars = '★'.repeat(r.rating)+'☆'.repeat(5-r.rating);
    const starColor = r.rating>=4?'var(--gold)':r.rating>=3?'var(--warning)':'var(--error)';
    const badgeCls  = r.status==='Published'?'badge-active':r.status==='Pending'?'badge-pending':'badge-cancelled';
    const actions   = r.status==='Published'
      ? `<button class="tbl-action" onclick="viewReview('${r.id}')">VIEW</button> <button class="tbl-action-del tbl-action" onclick="removeReview('${r.id}')">REMOVE</button>`
      : r.status==='Pending'
      ? `<button class="d-btn" style="padding:.28rem .65rem;font-size:.56rem" onclick="approveReview('${r.id}')">APPROVE</button> <button class="tbl-action-del tbl-action" onclick="rejectReview('${r.id}')">REJECT</button>`
      : `<button class="tbl-action-del tbl-action" onclick="removeReview('${r.id}')">REMOVE</button>`;
    return `<tr>
      <td>${r.customer}</td>
      <td>${r.product}</td>
      <td style="color:${starColor}">${stars}</td>
      <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.text}</td>
      <td>${r.date}</td>
      <td><span class="badge ${badgeCls}">${r.status}</span></td>
      <td>${actions}</td>
    </tr>`;
  }).join('');
}

function viewReview(id) {
  const r = getReviews().find(x=>x.id===id); if (!r) return;
  document.getElementById('rv-customer').textContent = r.customer;
  document.getElementById('rv-product').textContent  = r.product;
  document.getElementById('rv-date').textContent     = r.date;
  document.getElementById('rv-text').textContent     = r.text;
  document.getElementById('rv-stars').textContent    = '★'.repeat(r.rating)+'☆'.repeat(5-r.rating);
  openModal('review-modal');
}
function approveReview(id) {
  const list=getReviews(); const r=list.find(x=>x.id===id); if(!r) return;
  r.status='Published'; saveReviews(list); renderReviewsTable();
  toast(`Review by ${r.customer} approved`,'success');
}
function rejectReview(id) {
  const list=getReviews(); const r=list.find(x=>x.id===id); if(!r) return;
  if(!confirm('Reject and remove this review?')) return;
  saveReviews(list.filter(x=>x.id!==id)); renderReviewsTable();
  toast('Review rejected','error');
}
function removeReview(id) {
  const list=getReviews(); const r=list.find(x=>x.id===id); if(!r) return;
  if(!confirm('Permanently remove this review?')) return;
  saveReviews(list.filter(x=>x.id!==id)); renderReviewsTable();
  toast('Review removed','error');
}
function initReviewsPanel() { renderReviewsTable(); }
window.renderReviewsTable = renderReviewsTable;
window.viewReview    = viewReview;
window.approveReview = approveReview;
window.rejectReview  = rejectReview;
window.removeReview  = removeReview;
window.initReviewsPanel = initReviewsPanel;

/* ═══════════════════════════════════════════════════════════
   8. FLASH SALES
   ═══════════════════════════════════════════════════════════ */
const FLASH_KEY = 'vireon_flash_sales';
const DEFAULT_FLASH = [
  { id:'fs_001', name:'Night Luxe Flash',  discount:25, products:6,  start:'Jul 8, 9:00am',  end:'Jul 11, 11:59pm', orders:31, status:'Live', startDT:'2026-07-08T09:00', endDT:'2026-07-11T23:59', cats:['Night Luxe'] },
  { id:'fs_002', name:'Summer Clearance',  discount:30, products:12, start:'Jun 20',         end:'Jun 30',          orders:89, status:'Ended',startDT:'2026-06-20T00:00', endDT:'2026-06-30T23:59', cats:['Coats','Dresses'] },
];

function getFlashSales()  { try { const s=JSON.parse(localStorage.getItem(FLASH_KEY)); return s&&s.length?s:DEFAULT_FLASH; } catch { return DEFAULT_FLASH; } }
function saveFlashSales(f){ localStorage.setItem(FLASH_KEY, JSON.stringify(f)); }
function genFsId()         { return 'fs_'+Date.now().toString(36); }

function renderFlashSalesTable() {
  const tbody = document.getElementById('flash-table-body');
  if (!tbody) return;
  tbody.innerHTML = getFlashSales().map(f => {
    const badgeCls = f.status==='Live'?'badge-active':'badge-inactive';
    const badge    = f.status==='Live'?'Live ⚡':'Ended';
    const actions  = f.status==='Live'
      ? `<button class="tbl-action" onclick="editFlashSale('${f.id}')">EDIT</button> <button class="tbl-action-del tbl-action" onclick="endFlashSale('${f.id}')">END</button>`
      : `<button class="tbl-action" onclick="cloneFlashSale('${f.id}')">CLONE</button>`;
    return `<tr>
      <td>${f.name}</td>
      <td style="color:var(--gold)">${f.discount}% OFF</td>
      <td>${f.products}</td>
      <td>${f.start}</td>
      <td>${f.end}</td>
      <td>${f.orders}</td>
      <td><span class="badge ${badgeCls}">${badge}</span></td>
      <td>${actions}</td>
    </tr>`;
  }).join('');
}

function launchFlashSale() {
  const name     = document.getElementById('fs-name')?.value.trim();
  const discount = document.getElementById('fs-discount')?.value;
  const startDT  = document.getElementById('fs-start')?.value;
  const endDT    = document.getElementById('fs-end')?.value;
  if (!name||!discount||!startDT||!endDT) { toast('Please fill all required fields','error'); return; }
  const cats = [...document.querySelectorAll('#flash-form input[type="checkbox"]:checked')].map(c=>c.nextSibling?.textContent?.trim()||'');
  const list = getFlashSales();
  const editId = document.getElementById('flash-form').dataset.editId;
  const fmt = dt => { const d=new Date(dt); return d.toLocaleDateString('en-GB',{day:'numeric',month:'short'})+', '+d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}); };
  if (editId) {
    const fs = list.find(x=>x.id===editId);
    if (fs) { fs.name=name; fs.discount=parseInt(discount); fs.startDT=startDT; fs.endDT=endDT; fs.start=fmt(startDT); fs.end=fmt(endDT); fs.cats=cats; }
    toast(`"${name}" updated`,'success');
  } else {
    list.push({ id:genFsId(), name, discount:parseInt(discount), products:0, start:fmt(startDT), end:fmt(endDT), orders:0, status:'Live', startDT, endDT, cats });
    toast(`Flash sale "${name}" launched!`,'success');
  }
  saveFlashSales(list); renderFlashSalesTable();
  document.getElementById('flash-form').style.display='none';
  delete document.getElementById('flash-form').dataset.editId;
  document.getElementById('fs-name').value=''; document.getElementById('fs-discount').value='';
  publishAuditAction('Flash sale launched', name);
}

function editFlashSale(id) {
  const f = getFlashSales().find(x=>x.id===id); if (!f) return;
  document.getElementById('fs-name').value     = f.name;
  document.getElementById('fs-discount').value = f.discount;
  document.getElementById('fs-start').value    = f.startDT||'';
  document.getElementById('fs-end').value      = f.endDT||'';
  const form = document.getElementById('flash-form');
  form.dataset.editId = id;
  form.style.display='block';
  form.scrollIntoView({behavior:'smooth'});
}
function endFlashSale(id) {
  const list=getFlashSales(); const f=list.find(x=>x.id===id); if(!f) return;
  if(!confirm(`End flash sale "${f.name}"?`)) return;
  f.status='Ended'; saveFlashSales(list); renderFlashSalesTable();
  toast(`"${f.name}" ended`,'');
}
function cloneFlashSale(id) {
  const list=getFlashSales(); const f=list.find(x=>x.id===id); if(!f) return;
  const clone={...f, id:genFsId(), name:f.name+' (Copy)', status:'Live', orders:0};
  list.push(clone); saveFlashSales(list); renderFlashSalesTable();
  toast(`"${f.name}" cloned`,'success');
}
function initFlashSalesPanel() { renderFlashSalesTable(); }
window.launchFlashSale   = launchFlashSale;
window.editFlashSale     = editFlashSale;
window.endFlashSale      = endFlashSale;
window.cloneFlashSale    = cloneFlashSale;
window.initFlashSalesPanel = initFlashSalesPanel;

/* ═══════════════════════════════════════════════════════════
   9. ANALYTICS — date range filter + EXPORT
   ═══════════════════════════════════════════════════════════ */
const ANALYTICS_DATASETS = {
  '7d': { revenue:[12400,9800,14200,11600,18700,15300,14250], labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], orders:[8,6,12,9,17,22,18] },
  '30d':{ revenue:[42000,38000,51000,44000,63000,55000,72000,68000,58000,74000,81000,66000,89000,84250], labels:['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14'], orders:[31,28,44,37,52,48,61,57,44,68,72,56,81,74] },
  '90d':{ revenue:[42000,58000,51000,72000,68000,89000,84250], labels:['Jan','Feb','Mar','Apr','May','Jun','Jul'], orders:[124,158,142,201,188,234,218] },
  'year':{ revenue:[42000,58000,51000,72000,68000,89000,84250,null,null,null,null,null], labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], orders:[124,158,142,201,188,234,218,null,null,null,null,null] },
};
let currentAnalyticsRange = '7d';

function setAnalyticsRange(range) {
  currentAnalyticsRange = range;
  document.querySelectorAll('[data-analytics-range]').forEach(btn => {
    btn.className = btn.dataset.analyticsRange===range ? 'd-btn' : 'd-btn-ghost';
  });
  const d = ANALYTICS_DATASETS[range];
  if (!d || !window.Chart) return;
  // Update monthly revenue chart (ch-rev-monthly)
  const revChart = Chart.getChart('ch-rev-monthly');
  if (revChart) {
    revChart.data.labels = d.labels;
    revChart.data.datasets[0].data = d.revenue;
    revChart.update();
  }
  // Update orders-by-day chart (ch-orders-day)
  const ordChart = Chart.getChart('ch-orders-day');
  if (ordChart) {
    ordChart.data.labels = d.labels;
    ordChart.data.datasets[0].data = d.orders.filter(v=>v!==null);
    ordChart.update();
  }
  toast(`Analytics updated — ${range==='7d'?'Last 7 days':range==='30d'?'Last 30 days':range==='90d'?'Last 90 days':'This year'}`,'');
}
window.setAnalyticsRange = setAnalyticsRange;

function exportAnalyticsCSV() {
  const d = ANALYTICS_DATASETS[currentAnalyticsRange];
  const rows = d.labels.map((l,i)=>[l, d.revenue[i]||'', d.orders[i]||''].map(v=>`"${v}"`).join(','));
  downloadCSV(['Period,Revenue,Orders'].concat(rows).join('\n'), 'vireon-analytics.csv');
}
window.exportAnalyticsCSV = exportAnalyticsCSV;

/* ═══════════════════════════════════════════════════════════
   10. REPORTS — real CSV download
   ═══════════════════════════════════════════════════════════ */
function downloadCSV(content, filename) {
  const blob = new Blob([content], {type:'text/csv;charset=utf-8;'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.style.display='none';
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); },500);
}
window.downloadCSV = downloadCSV;

function generateReport(type) {
  let csv = '', filename = 'vireon-'+type+'-report.csv';
  switch(type) {
    case 'sales':
      csv = 'Order ID,Customer,Product,Amount,Date,Delivery,Status\n' +
        ORDERS_DATA.map(o=>[o.id,o.customer,o.product,'$'+o.amount,o.date,o.delivery,o.status].map(v=>`"${v}"`).join(',')).join('\n');
      break;
    case 'customers':
      csv = 'Name,Email,Tier,Orders,Total Spent,Points,Joined\n' +
        CUSTOMERS_DATA.map(c=>[c.name,c.email,c.tier,c.orders,'$'+c.spent,c.points,c.joined].map(v=>`"${v}"`).join(',')).join('\n');
      break;
    case 'products':
      csv = 'Name,SKU,Category,Price,Stock,Sales,Badge\n' +
        PRODUCTS_DATA.map(p=>[p.name,p.sku,p.cat,'$'+p.price,p.stock,p.sales,p.badge||''].map(v=>`"${v}"`).join(',')).join('\n');
      break;
    case 'tax':
      csv = 'Order ID,Amount,Tax (20%),Net,Date\n' +
        ORDERS_DATA.map(o=>[o.id,'$'+o.amount,'$'+Math.round(o.amount*0.2),'$'+Math.round(o.amount*0.8),o.date].map(v=>`"${v}"`).join(',')).join('\n');
      break;
    case 'marketing':
      csv = 'Campaign,Type,Sent To,Opens,Clicks,Status\n'+
        '"Summer Collection Launch","Promotional","2341","71.2%","28.4%","Sent"\n'+
        '"Elite Members Exclusive Drop","Segmented","486","84.6%","41.2%","Sent"\n'+
        '"Limited Edition Countdown","Automated","2341","65.8%","22.1%","Sent"';
      break;
    case 'returns':
      csv = 'Return ID,Order,Customer,Product,Reason,Type,Status\n' +
        getReturns().map(r=>[r.id,r.order,r.customer,r.product,r.reason,r.type,r.status].map(v=>`"${v}"`).join(',')).join('\n');
      break;
  }
  downloadCSV(csv, filename);
  toast(`${type.charAt(0).toUpperCase()+type.slice(1)} report downloaded`,'success');
}
window.generateReport = generateReport;

/* ═══════════════════════════════════════════════════════════
   11. SUPPORT — filter tickets
   ═══════════════════════════════════════════════════════════ */
function filterTickets() {
  const q        = (document.getElementById('ticket-search')?.value||'').toLowerCase();
  const typeFilter = document.getElementById('ticket-type-filter')?.value||'';
  const priFilter  = document.getElementById('ticket-pri-filter')?.value||'';
  renderSupportTable(q, typeFilter, priFilter);
}
window.filterTickets = filterTickets;

/* ═══════════════════════════════════════════════════════════
   EXTEND showPanel FOR ALL NEW PANELS
   ═══════════════════════════════════════════════════════════ */
const _origSPFinal2 = window.showPanel;
window.showPanel = function(id) {
  if (_origSPFinal2) _origSPFinal2(id);
  if (id==='panel-collections') initCollectionsPanel();
  if (id==='panel-returns')     initReturnsPanel();
  if (id==='panel-coupons')     initCouponsPanel();
  if (id==='panel-reviews')     initReviewsPanel();
  if (id==='panel-flashsale')   initFlashSalesPanel();
};

/* ── Customer Export CSV ──────────────────────────────────── */
function exportCustomersCSV() {
  const csv = 'Name,Email,Tier,Orders,Total Spent,Points,Joined\n' +
    CUSTOMERS_DATA.map(c=>[c.name,c.email,c.tier,c.orders,'$'+c.spent,c.points,c.joined].map(v=>`"${v}"`).join(',')).join('\n');
  downloadCSV(csv,'vireon-customers.csv');
}
window.exportCustomersCSV = exportCustomersCSV;
