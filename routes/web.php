<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\PortfolioController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/blog', [PortfolioController::class, 'indexBlog'])->name('blog.index');
Route::get('/blog/{blog:slug}', [PortfolioController::class, 'showBlog'])->name('blog.show');
Route::post('/contact', [PortfolioController::class, 'storeMessage'])->name('contact.store');
Route::post('/testimonials', [PortfolioController::class, 'storeTestimonial'])->name('testimonials.store');
Route::get('/api/terminal-data', [PortfolioController::class, 'terminalData'])->name('api.terminal-data');
Route::inertia('/faq', 'faq')->name('faq');
Route::get('/sitemap.xml', [PortfolioController::class, 'sitemap'])->name('sitemap');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    Route::post('/api/upload', [\App\Http\Controllers\Admin\UploadController::class, 'upload'])->name('api.upload');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::post('projects/bulk-destroy', [ProjectController::class, 'bulkDestroy'])->name('projects.bulk-destroy');
        Route::resource('projects', ProjectController::class);
        
        Route::post('blogs/bulk-destroy', [BlogController::class, 'bulkDestroy'])->name('blogs.bulk-destroy');
        Route::resource('blogs', BlogController::class);
        
        Route::post('messages/bulk-destroy', [MessageController::class, 'bulkDestroy'])->name('messages.bulk-destroy');
        Route::resource('messages', MessageController::class)->only(['index', 'destroy']);
        
        Route::post('experience/bulk-destroy', [ExperienceController::class, 'bulkDestroy'])->name('experience.bulk-destroy');
        Route::resource('experience', ExperienceController::class);
        
        Route::post('certificates/bulk-destroy', [CertificateController::class, 'bulkDestroy'])->name('certificates.bulk-destroy');
        Route::resource('certificates', CertificateController::class);
        
        Route::post('skills/bulk-destroy', [SkillController::class, 'bulkDestroy'])->name('skills.bulk-destroy');
        Route::resource('skills', SkillController::class);

        Route::post('testimonials/bulk-destroy', [\App\Http\Controllers\Admin\TestimonialController::class, 'bulkDestroy'])->name('testimonials.bulk-destroy');
        Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->only(['index', 'update', 'destroy']);
        
        Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
        Route::post('settings/upload-resume', [SettingController::class, 'uploadResume'])->name('settings.upload-resume');
        // Other admin routes will go here
    });
    
    Route::inertia('settings/profile', 'settings/profile')->name('profile.edit');
});

require __DIR__.'/settings.php';
