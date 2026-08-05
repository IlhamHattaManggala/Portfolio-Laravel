# Laravel Dashboard Builder 🚀

[![Versi Stabil Terbaru](https://img.shields.io/badge/version-1.0.6-blue.svg)](https://github.com/IlhamHattaManggala/laravel-dashboard-builder)
[![Lisensi](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status Pengujian](https://img.shields.io/badge/tests-34%20lulus-brightgreen.svg)](https://github.com/IlhamHattaManggala/laravel-dashboard-builder)

**Laravel Dashboard Builder** (`manggala/laravel-dashboard-builder`) adalah paket pembuat dashboard yang sangat modular, *open-source*, dan siap produksi untuk aplikasi Laravel.

Paket ini memungkinkan pengembang membuat dashboard yang interaktif dan responsif secara visual melalui pembuat drag-and-drop React/Inertia atau secara terprogram menggunakan API PHP yang ekspresif.

---

## 🌟 Fitur Utama

* **Dukungan Laravel & PHP**: Kompatibel penuh dengan Laravel 11.x, 12.x, dan 13.x (PHP 8.3+) serta Inertia.js v1, v2, v3.
* **Canvas Interaktif Drag-and-Drop**: Editor tata letak visual dengan penataan posisi widget interaktif & *handle* pengubah ukuran dinamis.
* **Pemilih Rentang Tanggal Global**: Filter rentang tanggal terpusat (Semua Waktu, Hari Ini, 7 Hari Terakhir, Bulan Ini, 30 Hari Terakhir) yang disebarkan ke seluruh widget.
* **Opsi Ekspor**: Ekspor dashboard visual ke dokumen cetak PNG/PDF & skema JSON.
* **Inspektur Visual Query Builder**: Konfigurasi sumber Model/Tabel, Fungsi Agregasi (`COUNT`, `SUM`, `AVG`, `MAX`, `MIN`), kolom target, dan Pengelompokan Tanggal (`groupByDay`, `groupByMonth`, `groupByYear`) secara visual dari UI inspektur.
* **Otorisasi RBAC & Kebijakan**: Integrasi Gate/Policy bawaan Laravel (`DashboardPolicy`) untuk kontrol akses pelihat vs editor.
* **API Pembuat PHP yang Ekspresif**: Sintaks `Dashboard::make('Penjualan')` yang terinspirasi dari Spatie & Filament.
* **Driver Sumber Data Dinamis**: Kueri Model Eloquent, DB Query Builder, Koleksi Memori, Raw SQL, file JSON, atau endpoint REST API dengan dukungan pembanyangan (*caching*).
* **Artisan Generators & Publikasi Tampilan**: Perintah generator `make:dashboard`, `make:dashboard-widget`, dan tag publikasi untuk halaman Inertia (`dashboard-builder-views`).

---

## 📦 Instalasi

Instal paket melalui Composer:

```bash
composer require manggala/laravel-dashboard-builder
```

Jalankan perintah instalasi paket untuk mempublikasikan konfigurasi, migrasi database, aset, dan tampilan halaman Inertia React:

```bash
php artisan dashboard:install
```

Opsi mempublikasikan sumber daya secara individu:

```bash
php artisan dashboard:publish --tag=config
php artisan dashboard:publish --tag=migrations
php artisan dashboard:publish --tag=assets
php artisan dashboard:publish --tag=views
```

---

## 🔒 Otorisasi (Kontrol Akses Berbasis Peran / RBAC)

Paket ini secara otomatis mendaftarkan `DashboardPolicy` untuk otorisasi. Anda dapat mengotorisasi tindakan di pengontrol aplikasi atau gerbang Anda:

```php
use Manggala\DashboardBuilder\Models\Dashboard;
use Illuminate\Support\Facades\Gate;

// Periksa otorisasi sebelum merender atau mengedit
Gate::authorize('update', $dashboard);
```

---

## 🚀 Panduan Cepat (PHP API)

Definisikan dashboard dengan fleksibel di PHP:

```php
use Manggala\DashboardBuilder\Facades\Dashboard;
use Manggala\DashboardBuilder\Widgets\Stats\CardWidget;
use Manggala\DashboardBuilder\Widgets\Charts\LineChartWidget;
use Manggala\DashboardBuilder\Widgets\Special\TableWidget;
use App\Models\User;
use App\Models\Order;

$salesDashboard = Dashboard::make('Penjualan & Pendapatan')
    ->description('Metrik penjualan bulanan dan rincian performa')
    ->widget(
        CardWidget::make('Total Pengguna')
            ->model(User::class)
            ->count()
            ->icon('users')
            ->width(3)
            ->height(2)
    )
    ->widget(
        LineChartWidget::make('Tren Pendapatan')
            ->model(Order::class)
            ->sum('total_amount')
            ->groupByMonth()
            ->width(6)
            ->height(4)
    )
    ->widget(
        TableWidget::make('Pesanan Terbaru')
            ->table('orders')
            ->columns(['id', 'user_id', 'total_amount', 'status'])
            ->perPage(5)
            ->width(12)
    );

// Konversi ke array atau payload JSON
$payload = $salesDashboard->toArray();
```

---

## 🛠️ Perintah Artisan

Hasilkan kelas dashboard baru, widget kustom, atau bersihkan cache:

```bash
# Hasilkan kelas Dashboard baru di app/Dashboards/
php artisan make:dashboard SalesDashboard

# Hasilkan kelas Widget kustom baru di app/Dashboards/Widgets/
php artisan make:dashboard-widget RevenueWidget

# Bersihkan dataset widget yang dicache
php artisan dashboard:clear-cache
```

---

## 📜 Lisensi

Lisensi MIT (MIT). Silakan lihat [LICENSE](LICENSE) untuk informasi lebih lanjut.
