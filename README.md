# Mkulima Market

Mkulima Market is a livestock marketplace platform for farmers and buyers.
It supports user authentication, animal listings, real-time messaging, M-Pesa payments, notifications, and admin dashboards.

---

## Features

* **User Authentication** – Farmers and buyers can sign up and log in.
* **Listings Management** – Farmers can create and manage animal listings.
* **Real-time Chat** – Buyers and farmers can communicate instantly.
* **Payments** – Secure payments with M-Pesa integration.
* **Notifications** – Alerts for new messages, payment updates, and admin broadcasts.
* **Admin Dashboard** – Manage users, listings, transactions, and view analytics.

---

## Tech Stack

* **Backend**: Node.js, Express, Prisma, PostgreSQL, Redis, Socket.io
* **Frontend**: React + Vite (served with Nginx)
* **Payments**: M-Pesa Daraja API
* **Deployment**: Docker & Nginx reverse proxy

---

## Deployment

### Prerequisites

* A VPS or server (Ubuntu/Debian recommended)
* Docker and Docker Compose installed
* A domain name (e.g., `mkulima-market.com`)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/timthoithi100/mkulima-market.git
   cd mkulima-market
   ```

2. **Set environment variables**
   Create `backend/.env.production` with:

   ```env
   DATABASE_URL=postgresql://mkulima:mkulima123@db:5432/mkulima_market?schema=public
   JWT_SECRET=supersecretjwtkey
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=yourapppassword
   FRONTEND_URL=https://mkulima-market.com
   MPESA_CONSUMER_KEY=xxxx
   MPESA_CONSUMER_SECRET=xxxx
   MPESA_SHORTCODE=174379
   MPESA_PASSKEY=xxxx
   CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
   ```

3. **Start the application**

   ```bash
   docker compose up -d --build
   ```

4. **Apply database migrations**

   ```bash
   docker exec -it mkulima-backend npx prisma migrate deploy
   ```

5. **Access the application**

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend API: [http://localhost:5000/api](http://localhost:5000/api)

6. **Domain & SSL**

   * Point your domain (`mkulima-market.com`) to your server IP.
   * Update `nginx.conf` and run Certbot for HTTPS.

---

## Admin Access

An admin account must be created manually:

```sql
INSERT INTO "User" (id, firstName, lastName, email, password, role, isEmailVerified, isActive)
VALUES (gen_random_uuid(), 'Admin', 'User', 'admin@mkulima.com', '<hashed_password>', 'admin', true, true);
```

Replace `<hashed_password>` with a bcrypt hash.

---

## Useful Commands

* **Check logs**

  ```bash
  docker logs mkulima-backend -f
  docker logs mkulima-frontend -f
  ```

* **Rebuild and restart**

  ```bash
  docker compose up -d --build
  ```

* **Stop everything**

  ```bash
  docker compose down
  ```

---