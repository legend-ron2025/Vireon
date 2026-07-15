const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { WebSocketServer } = require('ws');

const STATIC_ROOT = process.cwd();
const PORT = process.env.PORT || 3000;

const STATE = {
  activities: [
    { dot: 'var(--gold)', text: 'New order VP-2026-047 — $1,850', time: '2 min ago' },
    { dot: 'var(--success)', text: 'Order VP-2026-043 delivered', time: '18 min ago' },
    { dot: 'var(--info)', text: 'New customer: Alexandra R.', time: '45 min ago' },
  ],
  audit: [
    { time: 'Today 09:14', admin: 'Rockstar', action: 'Logged in successfully', ip: '82.132.45.17', status: 'ok' },
    { time: 'Today 09:20', admin: 'Rockstar', action: 'Viewed Orders panel', ip: '82.132.45.17', status: 'ok' },
  ],
  notifications: [
    { id: 'notif_001', type: 'ticket', title: 'New support ticket from James Whitmore', unread: true, timestamp: 'Just now' },
    { id: 'notif_002', type: 'order', title: 'Order VP-2026-047 has shipped', unread: true, timestamp: '5 min ago' },
    { id: 'notif_003', type: 'stock', title: 'Low stock alert: Evening Gown', unread: false, timestamp: '30 min ago' },
  ],
};

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const wss = new WebSocketServer({ noServer: true });
const clients = new Set();

function broadcast(message) {
  const payload = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  }
}

wss.on('connection', socket => {
  clients.add(socket);
  socket.send(JSON.stringify({ type: 'init', payload: STATE }));

  socket.on('message', raw => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg?.type === 'event' && msg.payload) {
        if (msg.payload.activity) STATE.activities.unshift(msg.payload.activity);
        if (msg.payload.audit) STATE.audit.unshift(msg.payload.audit);
        if (msg.payload.notification) STATE.notifications.unshift(msg.payload.notification);
        broadcast({ type: 'event', origin: msg.origin || null, payload: msg.payload });
      }
    } catch (err) {
      console.error('Invalid message from client:', err.message);
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
  });
});

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
    if (urlPath === '/ws') {
      res.writeHead(400);
      return res.end('WebSocket endpoint');
    }

    let filePath = path.join(STATIC_ROOT, urlPath === '/' ? 'dashboard.html' : urlPath);
    if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const data = await fs.readFile(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.on('upgrade', (req, socket, head) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  if (pathname === '/ws') {
    wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws, req));
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`VIREON server running at http://localhost:${PORT}`);
  console.log(`WebSocket endpoint available at ws://localhost:${PORT}/ws`);
});
