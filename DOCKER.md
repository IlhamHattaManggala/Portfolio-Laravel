# 🚀 Portfolio — Docker Deployment & Production Guide

Dokumen ini berisi panduan terperinci untuk mendeploy, mengelola, dan memperbarui aplikasi **Portfolio-Laravel** pada server VPS (Ubuntu 22.04) menggunakan **Docker**, **Traefik v2.11**, dan **MySQL** (container `mysql` existing).

---

## 🏗️ 1. Arsitektur Infrastruktur Production

```text
[ Internet ]
     │
     ▼ (HTTPS Port 443)
[ Traefik v2.11 Container ] (Network: proxy)
     │
     ▼ (HTTP Port 80 internal)
[ portfolio-web Container ] (PHP 8.3-FPM + Nginx Alpine)
     │                     │
     │ (Docker Network)    │ (Queue Jobs)
     ▼                     ▼
[ mysql Container ] ◄──── [ portfolio-worker Container ]
(Network: database)       (Network: database)
```

* **Docker External Networks:** `proxy` (Traefik) & `database` (MySQL `mysql`)
* **Service Container:**
  1. `portfolio-web`: Menangani HTTP request dari Traefik.
  2. `portfolio-worker`: Menangani background queue jobs.

---

## 🛠️ 2. Langkah-Langkah Deployment Pertama Kali (Initial Setup)

### Langkah 1: Clone Repository ke VPS
```bash
mkdir -p /opt/apps
cd /opt/apps
git clone https://github.com/IlhamHattaManggala/Portfolio-Laravel.git portfolio
cd /opt/apps/portfolio
```

### Langkah 2: Buat & Sesuaikan File `.env`
Salin template `.env.example` menjadi `.env`:
```bash
cp .env.example .env
nano .env
```

**Konfigurasi wajib yang harus diisi di `.env`:**
* `PORTFOLIO_DOMAIN`: Domain aplikasi Anda (misal: `portfolio.my.id`).
* `APP_URL`: URL lengkap aplikasi (misal: `https://portfolio.my.id`).
* `DB_HOST`: `mysql` *(nama container MySQL existing)*.
* `DB_DATABASE`: `portfolio_db` *(nama database)*.
* `DB_USERNAME`: User MySQL produksi Anda.
* `DB_PASSWORD`: Password MySQL produksi Anda.

### Langkah 3: Build & Jalankan Docker Container
```bash
docker compose build
docker compose up -d
```

### Langkah 4: Generate APP_KEY & Jalankan Database Migration & Seeder
```bash
# Generate Key Aplikasi Laravel
docker exec portfolio-web php artisan key:generate --force

# Jalankan Database Migration & Seeder
docker exec portfolio-web php artisan migrate --force
docker exec portfolio-web php artisan db:seed --force

# Bersihkan dan Optimalkan Cache
docker exec portfolio-web php artisan config:cache
docker exec portfolio-web php artisan route:cache
docker exec portfolio-web php artisan view:cache
```

---

## 🔄 3. Prosedur Update Aplikasi (Setelah Git Pull)

Ketika ada update kode baru dari GitHub, jalankan langkah berikut di VPS:

```bash
cd /opt/apps/portfolio

# 1. Pull perubahan kode terbaru
git pull origin main

# 2. Re-build image Docker
docker compose build

# 3. Restrukturisasi container secara seamless (zero/minimal downtime)
docker compose up -d

# 4. Jalankan migrasi basis data (jika ada struktur baru)
docker exec portfolio-web php artisan migrate --force

# 5. Flush & refresh cache aplikasi
docker exec portfolio-web php artisan config:cache
docker exec portfolio-web php artisan route:cache
docker exec portfolio-web php artisan view:cache

# 6. Restart Queue Worker
docker compose restart portfolio-worker
```

---

## 🛠️ 4. Perintah Operasional & Monitoring

```bash
# Status Container
docker compose ps

# Log Realtime Web Server
docker compose logs -f portfolio-web

# Log Realtime Worker
docker compose logs -f portfolio-worker

# Shell Interactive inside container
docker exec -it portfolio-web bash
```
