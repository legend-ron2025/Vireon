# 🚀 VIREON — Deploy to Netlify (Step by Step)

## Method 1: Drag & Drop (Easiest — 60 seconds)

1. Go to **https://app.netlify.com**
2. Sign up or log in (free account)
3. On your dashboard, find the **"Sites"** section
4. Look for the box that says **"Drag and drop your site folder here"**
5. Open File Explorer on your computer
6. Navigate to: `d:\Discord Projects\Vireon`
7. **Drag the entire `Vireon` folder** into that Netlify box
8. Wait ~30 seconds for it to upload and build
9. Netlify gives you a URL like: `https://random-name-12345.netlify.app`
10. Done! Your site is live 24/7 ✅

---

## Method 2: GitHub + Auto-Deploy (Recommended for updates)

This method means every time you push changes to GitHub, Netlify automatically redeploys.

### Step 1 — Create a GitHub repository
1. Go to **https://github.com/new**
2. Repository name: `vireon-luxury`
3. Set it to **Private**
4. Click **Create repository**

### Step 2 — Push your code
Open a terminal in `d:\Discord Projects\Vireon` and run:
```bash
git init
git add .
git commit -m "Initial VIREON deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vireon-luxury.git
git push -u origin main
```

### Step 3 — Connect to Netlify
1. Go to **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub
5. Select your `vireon-luxury` repository
6. Build settings:
   - **Base directory:** (leave empty)
   - **Build command:** (leave empty)
   - **Publish directory:** `.` (just a dot)
7. Click **"Deploy site"**

---

## Set a Custom Domain (e.g. vireon.com)

1. In Netlify → your site → **Domain settings**
2. Click **"Add custom domain"**
3. Enter: `vireon.com` (or whatever domain you own)
4. Netlify will show you DNS records to add
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Add the DNS records Netlify gives you
7. Wait up to 24 hours for DNS to propagate
8. Netlify automatically installs **free SSL (HTTPS)** ✅

---

## Admin Panel URL

Once deployed, your admin panel is at:

```
https://your-site.netlify.app/admin-panel
```
or with custom domain:
```
https://vireon.com/admin-panel
```

The `netlify.toml` file already handles the redirect — `/admin-panel` → `admin-panel.html` automatically.

---

## Free Netlify Limits

| Feature | Free Tier |
|---|---|
| Bandwidth | 100 GB/month |
| Build minutes | 300 min/month |
| Sites | Unlimited |
| Custom domains | Unlimited |
| SSL (HTTPS) | Free, automatic |
| Form submissions | 100/month |

This is more than enough for VIREON to run 24/7 with no costs.

---

## EmailJS Setup (for Admin OTP emails)

To enable real OTP emails from `vireonsecurity@gmail.com`:

1. Go to **https://emailjs.com** → Sign up free
2. **Email Services** → Add New Service → Gmail → Connect `vireonsecurity@gmail.com`
3. **Email Templates** → Create New Template:
   - Subject: `VIREON Security — Your Verification Code`
   - Body: Include `{{otp_code}}`, `{{to_name}}`, `{{purpose}}`
   - To Email: `{{to_email}}`
4. Copy your 3 IDs from EmailJS dashboard
5. Open `js/admin-auth.js` and replace lines 115-119:

```javascript
const EJS = {
  serviceId:  'service_YOUR_ID',
  templateId: 'template_YOUR_ID',
  publicKey:  'YOUR_PUBLIC_KEY',
};
```

6. Push the change to GitHub → Netlify auto-redeploys in ~30 seconds ✅

---

## File Structure Summary

```
Vireon/
├── index.html          ← Homepage
├── shop.html           ← Shop with filters
├── product.html        ← Product detail
├── cart.html           ← Cart + checkout
├── collections.html    ← All collections
├── newarrivals.html    ← New arrivals
├── elite.html          ← Elite membership
├── about.html          ← About page
├── contact.html        ← Contact + map
├── tracking.html       ← Live order tracking
├── wishlist.html       ← Wishlist
├── admin-panel.html    ← Admin router (goes to login or dashboard)
├── admin-login.html    ← Secure 3-step login
├── dashboard.html      ← Full ERP admin dashboard
├── 404.html            ← Custom 404 page
├── netlify.toml        ← Netlify config + redirects + headers
├── _redirects          ← Netlify redirect rules
├── css/
│   ├── vireon.css      ← Main design system
│   └── animations.css  ← All animations
└── js/
    ├── vireon.js       ← Full frontend engine
    ├── admin-auth.js   ← Authentication + PIN system
    └── dashboard.js    ← Dashboard panels + charts
```
