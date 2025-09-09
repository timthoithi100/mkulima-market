This deployment guide is tailored for **Mkulima Market** and assumes you’re delivering to a client who needs a live, production-ready system.

---

# Mkulima Market – Deployment Guide

This document explains how to deploy **Mkulima Market** (backend + frontend) to a production environment. Follow these steps to prepare a secure, ready-to-use installation.

---

## 1. Prerequisites

* A **Linux VPS** or cloud instance (e.g., DigitalOcean, AWS EC2, Linode) with at least:

  * 2 vCPU
  * 4 GB RAM
  * Ubuntu 22.04 LTS (recommended)

* **Domain name** (e.g., `mkulima-market.com`)

* **SSL certificate** (we’ll use Let’s Encrypt)

* Installed software:

  * Node.js 22.x + npm
  * PostgreSQL 15+
  * Redis (optional, for caching/notifications)
  * Nginx (reverse proxy + static hosting)
  * Git

---

## 2. Environment Variables

Create `.env.production` in the backend folder:

```ini
# Database
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>:5432/<DB_NAME>?schema=public

# JWT
JWT_SECRET=<a-very-strong-random-secret>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# Redis (optional)
REDIS_URL=redis://:<PASSWORD>@<HOST>:6379

# M-Pesa Production
MPESA_CONSUMER_KEY=<daraja-consumer-key>
MPESA_CONSUMER_SECRET=<daraja-consumer-secret>
MPESA_PASSKEY=<daraja-passkey>
MPESA_SHORTCODE=<paybill-or-till-number>
MPESA_CALLBACK_URL=https://api.mkulima-market.com/api/payments/callback
```

---

## 3. Backend Deployment

1. **Clone the repo** on your server:

```bash
git clone https://github.com/<your-org>/mkulima-market.git
cd mkulima-market/backend
```

2. **Install dependencies**:

```bash
npm ci --only=production
```

3. **Run database migrations**:

```bash
npx prisma migrate deploy
```

4. **Start the server** with PM2:

```bash
npm install -g pm2
pm2 start server.js --name mkulima-backend
pm2 save
```

5. **Configure Nginx reverse proxy** (`/etc/nginx/sites-available/mkulima-market`):

```nginx
server {
    server_name api.mkulima-market.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
ln -s /etc/nginx/sites-available/mkulima-market /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

6. **Enable HTTPS** with Let’s Encrypt:

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d api.mkulima-market.com
```

---

## 4. Frontend Deployment

1. Go to `frontend/`:

```bash
cd ../frontend
npm install
npm run build
```

2. Copy build output to Nginx:

```bash
cp -r dist/* /var/www/mkulima-market/
```

3. Configure Nginx for frontend:

```nginx
server {
    server_name mkulima-market.com www.mkulima-market.com;

    root /var/www/mkulima-market;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

4. Enable SSL:

```bash
certbot --nginx -d mkulima-market.com -d www.mkulima-market.com
```

---

## 5. Payments Setup (M-Pesa)

1. Log into [Safaricom Daraja Portal](https://developer.safaricom.co.ke/).
2. Register your **production app**.
3. Replace sandbox keys in `.env.production` with production keys.
4. Set **callback URL** to:

   ```
   https://api.mkulima-market.com/api/payments/callback
   ```

   Ensure this endpoint is live and accessible.
5. Test a transaction with a real Safaricom number.

---

## 6. Verification & Notifications

* **Verification (Smile Identity / Twilio)**: Configure keys in `.env.production` (when enabled).
* **Notifications**: Uses Socket.io over the same backend, no extra config needed.

---

## 7. Maintenance

* Restart backend:

  ```bash
  pm2 restart mkulima-backend
  ```
* View logs:

  ```bash
  pm2 logs mkulima-backend
  ```
* Backup DB:

  ```bash
  pg_dump -U <USER> mkulima_market > backup.sql
  ```

---

With this setup, your getting:

* `mkulima-market.com` → frontend React app
* `api.mkulima-market.com` → backend API
* M-Pesa integrated in production
* HTTPS-secured transactions

---