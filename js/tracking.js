/* =============================================
   VARPELLA LUXURY CHOCOLATE - ORDER TRACKING
   ============================================= */

/* ===== TRACKING STEPS ===== */
const trackingSteps = [
  { id: 1, label: 'Order Confirmed', icon: 'fas fa-check-circle', desc: 'Your order has been received and confirmed' },
  { id: 2, label: 'In Production', icon: 'fas fa-cookie-bite', desc: 'Our master chocolatiers are crafting your order' },
  { id: 3, label: 'Quality Check', icon: 'fas fa-star', desc: 'Rigorous quality inspection in progress' },
  { id: 4, label: 'Dispatched', icon: 'fas fa-box', desc: 'Your order has been handed to our courier' },
  { id: 5, label: 'Out for Delivery', icon: 'fas fa-truck', desc: 'Your luxury package is on its way' },
  { id: 6, label: 'Delivered', icon: 'fas fa-gift', desc: 'Enjoy your Varpella experience' },
];

/* Sample delivery coordinates (London area) */
const routeCoords = [
  [51.5074, -0.1278],  // Origin: London
  [51.5120, -0.0950],
  [51.5180, -0.0710],
  [51.5250, -0.0500],
  [51.5320, -0.0300],
  [51.5400, -0.0100],  // Destination
];

let map = null;
let routePolyline = null;
let deliveryMarker = null;
let currentStepIndex = 3; // Simulate mid-delivery
let animationInterval = null;

/* ===== INIT TRACKING PAGE ===== */
function initTracking() {
  const orderForm = document.getElementById('trackingForm');
  const trackingPanel = document.getElementById('trackingPanel');
  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get('order');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('orderInput');
      if (input && input.value.trim()) {
        showTrackingPanel(input.value.trim());
      }
    });
  }

  if (orderNum) {
    if (trackingPanel) trackingPanel.style.display = 'block';
    const formSection = document.getElementById('trackingFormSection');
    if (formSection) formSection.style.display = 'none';
    showTrackingPanel(orderNum);
  }
}

/* ===== SHOW TRACKING PANEL ===== */
function showTrackingPanel(orderNum) {
  const formSection = document.getElementById('trackingFormSection');
  const panel = document.getElementById('trackingPanel');
  if (formSection) formSection.style.display = 'none';
  if (panel) {
    panel.style.display = 'block';
    panel.classList.add('fade-in-up', 'visible');
  }

  // Set order number
  const orderNumEl = document.getElementById('displayOrderNum');
  if (orderNumEl) orderNumEl.textContent = orderNum;

  // ETA
  const eta = new Date();
  eta.setHours(eta.getHours() + 2);
  const etaEl = document.getElementById('etaTime');
  if (etaEl) etaEl.textContent = eta.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  renderTimeline();
  initMap();
  startSimulation();
}

/* ===== RENDER TIMELINE ===== */
function renderTimeline() {
  const container = document.getElementById('trackingTimeline');
  if (!container) return;

  container.innerHTML = trackingSteps.map((step, i) => {
    let state = '';
    if (i < currentStepIndex) state = 'completed';
    else if (i === currentStepIndex) state = 'active';
    return `
      <div class="timeline-step ${state}" id="step-${i}">
        <div class="step-dot"><i class="${step.icon}"></i></div>
        <div class="step-content">
          <h4 class="step-label">${step.label}</h4>
          <p class="step-desc">${step.desc}</p>
          ${i <= currentStepIndex ? `<p class="step-time">${getStepTime(i)}</p>` : ''}
        </div>
      </div>`;
  }).join('');
}

function getStepTime(index) {
  const now = new Date();
  now.setHours(now.getHours() - (currentStepIndex - index) * 1.5);
  return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' today';
}

/* ===== INIT LEAFLET MAP ===== */
function initMap() {
  const mapEl = document.getElementById('deliveryMap');
  if (!mapEl || !window.L) return;

  map = L.map('deliveryMap', {
    center: routeCoords[currentStepIndex] || routeCoords[0],
    zoom: 13,
    zoomControl: true,
    attributionControl: true,
  });

  // Dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map);

  // Route polyline
  routePolyline = L.polyline(routeCoords.slice(0, currentStepIndex + 1), {
    color: '#c9a84c',
    weight: 3,
    opacity: 0.8,
    dashArray: '6, 4',
  }).addTo(map);

  // Future route (dimmed)
  L.polyline(routeCoords.slice(currentStepIndex), {
    color: '#555',
    weight: 2,
    opacity: 0.4,
    dashArray: '4, 8',
  }).addTo(map);

  // Origin marker
  const originIcon = L.divIcon({
    html: '<div class="map-marker-origin"><i class="fas fa-store"></i></div>',
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
  L.marker(routeCoords[0], { icon: originIcon }).addTo(map).bindPopup('<b>Varpella Factory</b><br>Your order started here');

  // Destination marker
  const destIcon = L.divIcon({
    html: '<div class="map-marker-dest"><i class="fas fa-home"></i></div>',
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
  L.marker(routeCoords[routeCoords.length - 1], { icon: destIcon }).addTo(map).bindPopup('<b>Your Address</b><br>Delivery destination');

  // Delivery truck marker
  const truckIcon = L.divIcon({
    html: '<div class="map-marker-truck tracking-marker"><i class="fas fa-truck"></i></div>',
    className: '',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
  deliveryMarker = L.marker(routeCoords[currentStepIndex] || routeCoords[0], { icon: truckIcon })
    .addTo(map)
    .bindPopup('<b>Your Delivery</b><br>Currently en route');
}

/* ===== SIMULATE DELIVERY MOVEMENT ===== */
function startSimulation() {
  let positionIndex = currentStepIndex;
  animationInterval = setInterval(() => {
    if (positionIndex < routeCoords.length - 1) {
      positionIndex++;
      if (deliveryMarker) {
        deliveryMarker.setLatLng(routeCoords[positionIndex]);
        if (map) map.panTo(routeCoords[positionIndex], { animate: true });
      }
      if (routePolyline) {
        routePolyline.setLatLngs(routeCoords.slice(0, positionIndex + 1));
      }
      // Advance step
      if (positionIndex > currentStepIndex && positionIndex < trackingSteps.length) {
        currentStepIndex = positionIndex;
        renderTimeline();
        if (positionIndex === routeCoords.length - 1) {
          clearInterval(animationInterval);
          showToast('Your order has been delivered!', 'success');
        }
      }
    } else {
      clearInterval(animationInterval);
    }
  }, 8000); // Move every 8 seconds for demo
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initTracking();
});
