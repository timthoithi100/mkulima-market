# Mkulima Market

Mkulima Market is a livestock marketplace platform for farmers and buyers.
It supports user authentication, animal listings, real-time messaging, M-Pesa payments, notifications, and admin dashboards.

---

## Features

* **User Authentication** – Farmers and buyers can sign up and log in
* **Listings Management** – Farmers can create and manage animal listings
* **Real-time Chat** – Buyers and farmers can communicate instantly
* **Payments** – Secure payments with M-Pesa integration
* **Notifications** – Alerts for new messages, payment updates, and admin broadcasts
* **Admin Dashboard** – Manage users, listings, transactions, and view analytics

---

## Tech Stack

* **Backend**: Node.js, Express, Prisma, PostgreSQL, Socket.io
* **Frontend**: React + Vite (served with Nginx)
* **Payments**: M-Pesa Daraja API
* **Deployment**: Docker & Docker Compose

---

## Deployment

1. **Clone repo**

   ```bash
   git clone https://github.com/timthoithi100/mkulima-market.git
   cd mkulima-market
   ```

2. **Set environment variables** → in `backend/.env`

3. **Run stack** → `docker compose up -d --build`

4. **Apply database migrations**

   ```bash
   docker exec -it mkulima-market-backend npx prisma migrate deploy
   docker exec -it mkulima-market-backend node prisma/seed.js
   ```

5. **Access app**

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend: [http://localhost:5000/api](http://localhost:5000/api)

6. **(Optional) Domain + SSL** with Nginx + Certbot

---

## Admin Access

Manually insert an admin account into DB:

```sql
INSERT INTO "User" (id, firstName, lastName, email, password, role, isEmailVerified, isActive)
VALUES (gen_random_uuid(), 'Admin', 'User', 'admin@mkulima.com', '<hashed_password>', 'admin', true, true);
```

Replace `<hashed_password>` with a bcrypt hash.

---

## Useful Commands

* **Logs**

  ```bash
  docker logs mkulima-market-backend -f
  docker logs mkulima-market-frontend -f
  ```

* **Rebuild & restart**

  ```bash
  docker compose up -d --build
  ```

* **Stop everything**

  ```bash
  docker compose down
  ```

---