/* ═══════════════════════════════════════════════════════════
   VIREON — ADMIN AUTHENTICATION SYSTEM
   ═══════════════════════════════════════════════════════════
   Accounts are stored hashed in sessionStorage.
   Email OTP via EmailJS (free tier — no backend needed).
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ── ADMIN ACCOUNTS ─────────────────────────────────────── */
/*
  firstLogin: true  = account has never logged in before
                      → skip OTP, go straight to PIN setup + optional password change
  firstLogin: false = normal login (username → password → OTP)
  pin: null         = no PIN set yet
  pin: '<hash>'     = hashed 6-digit PIN
*/
const ADMIN_ACCOUNTS = [
  {
    id: 'acc_001',
    username: 'rockstar',
    passwordHash: hashPassword('Rockstar@2008'),
    displayName: 'Rockstar',
    role: 'Super Admin',
    email: 'rockstar@vireon.com',
    avatar: 'R',
    color: '#D4AF37',
    lastLogin: null,
    loginAttempts: 0,
    locked: false,
    firstLogin: true,   // ← first ever login, no OTP required
    pin: null,          // ← no PIN set yet
  },
  {
    id: 'acc_002',
    username: 'vanshika',
    passwordHash: hashPassword('Vanshika@2026'),
    displayName: 'Vanshika',
    role: 'Manager',
    email: 'vanshika@vireon.com',
    avatar: 'V',
    color: '#F5D76E',
    lastLogin: null,
    loginAttempts: 0,
    locked: false,
    firstLogin: true,
    pin: null,
  },
  {
    id: 'acc_003',
    username: 'lilith',
    passwordHash: hashPassword('Rashi@2026'),
    displayName: 'Lilith',
    role: 'Marketing',
    email: 'lilith@vireon.com',
    avatar: 'L',
    color: '#B8962E',
    lastLogin: null,
    loginAttempts: 0,
    locked: false,
    firstLogin: true,
    pin: null,
  },
  {
    id: 'acc_004',
    username: 'prince',
    passwordHash: hashPassword('Prince@2026'),
    displayName: 'Prince',
    role: 'Sales',
    email: 'prince@vireon.com',
    avatar: 'P',
    color: '#10B981',
    lastLogin: null,
    loginAttempts: 0,
    locked: false,
    firstLogin: true,
    pin: null,
  },
];

/* ── SIMPLE HASH (deterministic for client-side demo) ────── */
function hashPassword(str) {
  // djb2 hash — deterministic, good enough for demo frontend auth
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0; // keep unsigned 32-bit
  }
  return h.toString(16).padStart(8, '0');
}

/* ── SESSION MANAGEMENT ─────────────────────────────────── */
const SESSION_KEY = 'vireon_admin_session';
const OTP_KEY     = 'vireon_admin_otp';
const MAX_ATTEMPTS = 5;
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

function getSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!s) return null;
    // Check expiry
    if (Date.now() > s.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch { return null; }
}

function setSession(account) {
  const s = {
    id: account.id,
    username: account.username,
    displayName: account.displayName,
    role: account.role,
    email: account.email,
    avatar: account.avatar,
    color: account.color,
    loginAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  return s;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(OTP_KEY);
}

/* ── ROUTE GUARD — call on every admin page ─────────────── */
function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.replace('admin-login.html');
    return null;
  }
  return session;
}

/* ── FIND ACCOUNT ───────────────────────────────────────── */
function findAccount(username) {
  return ADMIN_ACCOUNTS.find(
    a => a.username.toLowerCase() === username.toLowerCase().trim()
  ) || null;
}

function verifyPassword(account, password) {
  return account.passwordHash === hashPassword(password);
}

/* ── OTP GENERATION & STORAGE ───────────────────────────── */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOTP(otp, purpose, accountId) {
  sessionStorage.setItem(OTP_KEY, JSON.stringify({
    code: otp,
    purpose,      // 'login' | 'password_change'
    accountId,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
    used: false,
  }));
}

function verifyOTP(inputCode) {
  try {
    const stored = JSON.parse(sessionStorage.getItem(OTP_KEY));
    if (!stored) return { ok: false, reason: 'No OTP found. Please request a new one.' };
    if (stored.used) return { ok: false, reason: 'OTP already used.' };
    if (Date.now() > stored.expiresAt) {
      sessionStorage.removeItem(OTP_KEY);
      return { ok: false, reason: 'OTP expired. Please request a new one.' };
    }
    if (stored.code !== inputCode.toString().trim()) {
      return { ok: false, reason: 'Incorrect code. Please try again.' };
    }
    // Mark used
    stored.used = true;
    sessionStorage.setItem(OTP_KEY, JSON.stringify(stored));
    return { ok: true, stored };
  } catch { return { ok: false, reason: 'Verification error.' }; }
}

/* ── SEND OTP EMAIL via EmailJS ─────────────────────────── */
/*
  EmailJS Setup (FREE):
  1. Go to https://www.emailjs.com and create a free account
  2. Add a Gmail service → connect vireonsecurity@gmail.com
  3. Create an email template with these variables:
       {{to_email}} {{to_name}} {{otp_code}} {{purpose}} {{expires_in}}
  4. Replace the 3 IDs below with yours from EmailJS dashboard
*/
const EJS = {
  serviceId:  'service_XXXXXXX',   // ← Your EmailJS Service ID
  templateId: 'template_XXXXXXX',  // ← Your EmailJS Template ID
  publicKey:  'XXXXXXXXXXXX',      // ← Your EmailJS Public Key
};

async function sendOTPEmail(account, otp, purpose) {
  const purposeLabel = purpose === 'login' ? 'Admin Login' : 'Password Change';

  // Load EmailJS SDK lazily if not present
  if (!window.emailjs) {
    await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
    emailjs.init({ publicKey: EJS.publicKey });
  }

  const templateParams = {
    from_name:  'VIREON Security',
    from_email: 'vireonsecurity@gmail.com',
    to_email:   account.email,
    to_name:    account.displayName,
    otp_code:   otp,
    purpose:    purposeLabel,
    expires_in: '10 minutes',
  };

  try {
    await emailjs.send(EJS.serviceId, EJS.templateId, templateParams);
    return { ok: true };
  } catch (err) {
    console.error('EmailJS error:', err);
    // DEMO FALLBACK: show OTP in console + alert so dev can test
    console.warn(`[VIREON DEMO] OTP for ${account.username}: ${otp}`);
    return { ok: false, demoOtp: otp };
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ── PASSWORD CHANGE ────────────────────────────────────── */
function changePassword(accountId, newPassword) {
  const acc = ADMIN_ACCOUNTS.find(a => a.id === accountId);
  if (!acc) return false;
  // Validate strength
  if (!validatePasswordStrength(newPassword).valid) return false;
  acc.passwordHash = hashPassword(newPassword);
  return true;
}

function validatePasswordStrength(pw) {
  const checks = {
    length:  pw.length >= 8,
    upper:   /[A-Z]/.test(pw),
    lower:   /[a-z]/.test(pw),
    number:  /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return {
    valid: score >= 4 && checks.length,
    score,
    checks,
    label: score <= 2 ? 'Weak' : score === 3 ? 'Fair' : score === 4 ? 'Strong' : 'Very Strong',
    color: score <= 2 ? '#EF4444' : score === 3 ? '#F59E0B' : score === 4 ? '#10B981' : '#D4AF37',
  };
}

/* ── LOGIN ATTEMPT TRACKING ─────────────────────────────── */
function trackLoginAttempt(account, success) {
  if (success) {
    account.loginAttempts = 0;
    account.locked = false;
    account.lastLogin = new Date().toLocaleString('en-GB');
  } else {
    account.loginAttempts = (account.loginAttempts || 0) + 1;
    if (account.loginAttempts >= MAX_ATTEMPTS) {
      account.locked = true;
    }
  }
}

/* ── PIN MANAGEMENT ──────────────────────────────────────── */
/*
  PINs are stored in localStorage (persists across sessions).
  Key: vireon_pin_<account_id>
  Value: hashed PIN string
*/
const PIN_STORE_KEY = id => `vireon_pin_${id}`;

function setPin(accountId, pin) {
  if (!/^\d{6}$/.test(pin)) return false;
  localStorage.setItem(PIN_STORE_KEY(accountId), hashPassword(pin));
  // Also update the in-memory account object
  const acc = ADMIN_ACCOUNTS.find(a => a.id === accountId);
  if (acc) acc.pin = hashPassword(pin);
  return true;
}

function verifyPin(accountId, pin) {
  const stored = localStorage.getItem(PIN_STORE_KEY(accountId));
  if (!stored) return false;
  return stored === hashPassword(pin.toString().trim());
}

function hasPin(accountId) {
  return !!localStorage.getItem(PIN_STORE_KEY(accountId));
}

/* ── FIRST LOGIN TRACKING ────────────────────────────────── */
/*
  Stored in localStorage so it persists.
  Key: vireon_first_<account_id>
  Value: 'done' once they've completed setup
*/
const FIRST_LOGIN_KEY = id => `vireon_first_${id}`;

function isFirstLogin(accountId) {
  return localStorage.getItem(FIRST_LOGIN_KEY(accountId)) !== 'done';
}

function markFirstLoginDone(accountId) {
  localStorage.setItem(FIRST_LOGIN_KEY(accountId), 'done');
  const acc = ADMIN_ACCOUNTS.find(a => a.id === accountId);
  if (acc) acc.firstLogin = false;
}

/* ── EXPOSE GLOBALLY ─────────────────────────────────────── */
window.AdminAuth = {
  accounts: ADMIN_ACCOUNTS,
  hashPassword,
  getSession, setSession, clearSession, requireAuth,
  findAccount, verifyPassword,
  generateOTP, storeOTP, verifyOTP, sendOTPEmail,
  changePassword, validatePasswordStrength, trackLoginAttempt,
  /* PIN */
  setPin, verifyPin, hasPin, isFirstLogin, markFirstLoginDone,
};
