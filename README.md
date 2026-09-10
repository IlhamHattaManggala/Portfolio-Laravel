# 🚀 Portfolio — Ilham Hatta Manggala

[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefik&logoColor=white)](https://traefik.io)

Sebuah aplikasi web **Interactive Personal Portfolio & CMS** modern yang dirancang dengan performa tinggi, tampilan estetis, serta manajemen konten penuh via **SuperAdmin Dashboard**. Dibangun menggunakan **Laravel 13**, **React 19**, **Inertia.js v3**, **TypeScript**, dan **Tailwind CSS v4**, serta didukung arsitektur **Docker Multi-Stage Container** terintegrasi **Traefik Reverse Proxy**.

---

## 🌟 Fitur Utama (Features)

### 🎨 1. Front-end & User Experience
* **Responsive & Adaptive Dual-Theme**: Dukungan penuh **Light Mode** dan **Dark Mode** instan tanpa lag di seluruh halaman dan komponen (termasuk Preloader & Terminal Preview).
* **Interactive Hero Section**: Efek ketik otomatis (*Typewriter*), preview Terminal kode interaktif adaptif tema, tombol download CV modal, serta link sosial media (LinkedIn, GitHub, Email).
* **Interactive Terminal Preview**: Tampilan kode preview terminal nyata yang mengikuti tema aktif.
* **Work Experience Roadmap**: Timeline riwayat karir dan pengalaman kerja terstruktur.
* **Filterable Projects Showcase**: Galeri proyek interaktif dengan pengelompokan kategori, badge teknologi, galeri foto, dan link demo/github.
* **Service / Service Packages**: Penawaran paket layanan & jasa pengembangan perangkat lunak.
* **Certificates Showcase**: Galeri sertifikat profesional & lisensi.
* **GitHub Integration**: Menampilkan statistik kontribusi & aktivitas GitHub secara realtime.
* **Testimonials Slider**: Slider ulasan klien dan kolega interaktif berbasis Swiper.
* **Dynamic Blog System**: Artikel blog lengkap dengan pembagian kategori, halaman detail artikel, dan fitur pencarian.
* **Contact Form**: Formulir pesan langsung ke sistem database dengan proteksi validasi backend.

### 🛡️ 2. SuperAdmin Management Dashboard (CMS)
* **Dashboard Overview**: Ringkasan statistik konten, pesan masuk, proyek, dan artikel.
* **Content Management**: Complete CRUD untuk **Projects**, **Blogs**, **Experiences**, **Certificates**, **Skills**, dan **Testimonials**.
* **Inbox Messages**: Manajer pesan masuk dari pengunjung dengan fitur penandaan pesan.
* **Website Settings**: Pengaturan dinamis teks Hero, informasi biografi, foto profil, dokumen CV, dan tautan sosial media.

---

## 🛠️ Teknologi & Stack (Tech Stack)

### **Backend Stack**
* **Framework**: Laravel 13 (PHP 8.3)
* **SPA Bridge**: Inertia.js Laravel v3.0
* **Authentication**: Laravel Fortify
* **Image Processing**: Intervention Image v4
* **Localization / Multilingual**: Spatie Translatable
* **Testing Framework**: Pest PHP

### **Frontend Stack**
* **Library**: React 19 & TypeScript
* **Styling**: Tailwind CSS v4 & Lucide React Icons
* **UI Components**: Radix UI Primitives & Headless UI
* **Animation & Motion**: Framer Motion & TW Animate CSS
* **Slider & Notifications**: Swiper, SweetAlert2 & Sonner Toast

### **DevOps & Infrastructure**
* **Containerization**: Docker (3-Stage Alpine Multi-stage Build)
* **Process Manager**: Supervisord (PHP-FPM + Nginx + Queue Worker)
* **Web Server**: Nginx Alpine
* **Reverse Proxy**: Traefik v2.11 (SSL Auto-Certificates)
* **Database**: MySQL 8.0

---

## 🏗️ Arsitektur Infrastructure Production

```text
[ Internet ]
     │
     ▼ (HTTPS Port 443)
[ Traefik v2.11 Container ] (Network: proxy)
     │
     ▼ (HTTP Port 80 Internal)
[ portfolio-web Container ] (PHP 8.3-FPM + Nginx Alpine)
     │                     │
     │ (Docker Network)    │ (Queue Jobs)
     ▼                     ▼
[ mysql Container ] ◄──── [ portfolio-worker Container ]
(Network: database)       (Network: database)
```

---

## 🚀 Panduan Memulai (Getting Started)

### 💻 Local Development (Tanpa Docker)

#### Prerequisites
* **PHP** `>= 8.3` dengan ekstensi (`pdo_mysql`, `mbstring`, `gd`, `zip`)
* **Composer** `>= 2.7`
* **Node.js** `>= 20.x` & **npm**
* **MySQL Database**

#### Langkah Setup Local:
1. **Clone Repository**
   ```bash
   git clone https://github.com/IlhamHattaManggala/Portfolio-Laravel.git
   cd Portfolio-Laravel
   ```

2. **Install PHP & Node Dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Buka file `.env` dan sesuaikan koneksi database MySQL lokal Anda.*

4. **Jalankan Database Migration & Seeder**
   ```bash
   php artisan migrate --seed
   ```

5. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   *Aplikasi akan berjalan di `http://localhost:8000`.*

---

## 🐳 Deployment dengan Docker (Production / VPS)

Untuk deployment di server VPS Ubuntu menggunakan Docker & Traefik, ikuti langkah ringkas berikut (Panduan lengkap tersedia di [DOCKER.md](file:///d:/Ilham%20Hatta%20Manggala/PortfolioWeb/Portfolio-Laravel/DOCKER.md)):

1. **Build & Start Container**
   ```bash
   docker compose build
   docker compose up -d
   ```

2. **Inisialisasi Database di Container**
   ```bash
   docker exec portfolio-web php artisan key:generate --force
   docker exec portfolio-web php artisan migrate --force
   docker exec portfolio-web php artisan db:seed --force
   docker exec portfolio-web php artisan config:cache
   docker exec portfolio-web php artisan route:cache
   docker exec portfolio-web php artisan view:cache
   ```

---

## 📁 Struktur Direktori Utama

```text
Portfolio-Laravel/
├── app/
│   ├── Http/Controllers/    # Controller Public & Admin Dashboard
│   └── Models/              # Eloquent Models (Project, Blog, Experience, dll)
├── docker/                  # Docker Entrypoint, Nginx, & Supervisord Config
├── database/                # Migrations, Seeders & Factories
├── resources/
│   ├── css/                 # App CSS & Tailwind CSS v4 setup
│   ├── js/
│   │   ├── components/      # UI Components (Navbar, Footer, Terminal, Sections)
│   │   ├── pages/           # Inertia React Pages (Welcome, Blog, Admin)
│   │   └── types/           # TypeScript Definitions
├── Dockerfile               # 3-Stage Production Dockerfile
├── docker-compose.yml       # Traefik & Production Service Composition
├── DOCKER.md                # Dokumentasi Lengkap Deployment Docker
└── README.md                # Dokumentasi Utama Repositori
```

---

## 📄 Lisensi & Hak Cipta

Project ini dikembangkan oleh **Ilham Hatta Manggala** di bawah lisensi [MIT License](LICENSE).
