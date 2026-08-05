# Laravel Manifest / Settings 🚀

[![Versi Stabil Terbaru](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/IlhamHattaManggala/laravel-settings)
[![Lisensi](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Versi PHP](https://img.shields.io/badge/php-%5E8.2%20%7C%20%5E8.3%20%7C%20%5E8.4-777BB4.svg)](composer.json)
[![Versi Laravel](https://img.shields.io/badge/laravel-%5E10.0%20%7C%20%5E11.0%20%7C%20%5E12.0%20%7C%20%5E13.0-FF2D20.svg)](composer.json)

**Laravel Manifest** (`manggala/laravel-manifest`) adalah platform konfigurasi dan pengelola manifest berbasis skema yang siap untuk produksi pada aplikasi Laravel.

Berbeda dengan paket key-value biasa, **Laravel Manifest** menyediakan mesin skema yang mengelola transparansi database, validasi, rendering UI dinamis, REST API, pembanyangan (*caching*), enkripsi bawaan, otorisasi RBAC, dan penemuan paket ekosistem secara otomatis.

---

## 🌟 Fitur Utama

* **Kompatibilitas Multi-Versi**: Kompatibel dengan **PHP 8.2, 8.3, 8.4** dan **Laravel 10.x, 11.x, 12.x, 13.x**.
* **Arsitektur Utamakan Skema**: Definisikan skema konfigurasi sekali di PHP, dan biarkan mesin menghasilkan UI, validasi, REST API, dan migrasi database secara otomatis.
* **Sistem Adapter Independen UI**: Mesin inti terpisah dari frontend dan menyediakan adapter bawaan untuk **Blade**, **Livewire**, **Inertia React**, dan **API Only**.
* **Driver Penyimpanan Terpisah**: Beralih tanpa hambatan antara driver penyimpanan **Database**, **JSON**, dan **Redis**.
* **Pembanyangan & Invalidasi Otomatis**: Performa tinggi dengan pembersihan cache instan saat ada pembaruan pengaturan.
* **Sub-sistem Enkripsi Bawaan**: Enkripsi otomatis untuk nilai sensitif (kata sandi, kunci API, rahasia OAuth) menggunakan `Crypt` bawaan Laravel.
* **Otorisasi RBAC**: Dukungan asli untuk **Spatie Permission**, **Laravel Gates**, Policies, dan Middleware.
* **Jejak Audit & Riwayat Rollback**: Lacak riwayat perubahan pengaturan secara lengkap (`old_value`, `new_value`, `user_id`, `ip_address`) dengan kemampuan pembatalan (*rollback*).
* **Perintah Artisan Diagnostic Doctor**: Wizard penyiapan interaktif `php artisan settings:install` dan pemeriksaan kesehatan `php artisan settings:doctor`.
* **Manggala Ecosystem Discovery**: Mesin penemu paket (`Settings::discover()`) untuk mendaftarkan pengaturan dari paket seperti `laravel-dashboard-builder` secara otomatis.

---

## 📦 Instalasi

Instal paket melalui Composer:

```bash
composer require manggala/laravel-manifest
```

Jalankan wizard penyiapan interaktif:

```bash
php artisan settings:install
```

Opsi mempublikasikan sumber daya secara manual:

```bash
php artisan settings:publish --tag=config
php artisan settings:publish --tag=migrations
```

---

## 🚀 Panduan Cepat (PHP API)

Definisikan pengaturan aplikasi Anda secara ekspresif di Service Provider atau bootstrap paket:

```php
use Manggala\Settings\Facades\Settings;
use Manggala\Settings\Schema\SettingsGroup;

Settings::group('General', function (SettingsGroup $group) {
    $group->text('site_name')
        ->label('Nama Situs')
        ->default('Aplikasi Laravel Saya')
        ->required();

    $group->password('smtp_password')
        ->label('Kata Sandi SMTP')
        ->encrypted();

    $group->toggle('maintenance_mode')
        ->label('Mode Pemeliharaan')
        ->default(false);
});
```

### Mengakses & Memperbarui Pengaturan

```php
// Mengambil nilai pengaturan melalui helper atau Facade
$siteName = setting('general.site_name', 'Situs Default');

// Menyimpan nilai pengaturan
setting(['general.site_name' => 'Acme Corp']);

// Memeriksa keberadaan
if (Settings::has('general.site_name')) {
    // ...
}

// Menghapus pengaturan
Settings::forget('general.site_name');
```

---

## 🔒 Otorisasi (RBAC)

Lindungi grup pengaturan menggunakan peran/izin Spatie atau Gerbang Laravel:

```php
Settings::group('Mail')
    ->roles(['super-admin', 'admin'])
    ->permissions(['manage-mail-settings']);
```

---

## 🏥 Perintah Doctor Diagnostik Kesehatan

Jalankan perintah diagnostik doctor untuk memeriksa status penyimpanan, cache, enkripsi, dan izin:

```bash
php artisan settings:doctor
```

---

## 📜 Lisensi

Lisensi MIT (MIT). Silakan lihat [LICENSE](LICENSE) untuk informasi lebih lanjut.
