<?php

use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MasyarakatController;
use App\Http\Controllers\MitraController;
use App\Http\Controllers\ProyekController;
use App\Http\Controllers\SektorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MasyarakatController::class, 'home']);
Route::get('/tentang', [MasyarakatController::class, 'about']);
Route::get('/statistik', [MasyarakatController::class, 'statistik']);

Route::get('/sektor', [MasyarakatController::class, 'sektor']);
Route::get('/sektor/{sektor}/detail', [MasyarakatController::class, 'sektorDetail']);
Route::get('/sektor/{sektor}/proyek', [MasyarakatController::class, 'sektorProyek']);

Route::get('/laporan', [MasyarakatController::class, 'laporan']);
Route::get('/laporan/{laporan}/detail', [MasyarakatController::class, 'laporanDetail']);

Route::get('/kegiatan', [MasyarakatController::class, 'kegiatan']);
Route::get('/kegiatan/{kegiatan}/detail', [MasyarakatController::class, 'kegiatanDetail']);

Route::get('/mitra', [MasyarakatController::class, 'mitra']);
Route::get('/mitra/{mitra}/detail', [MasyarakatController::class, 'mitraDetail']);

Route::prefix('admin')->middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get("dashboard", function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboardAdmin');

    Route::resource("laporan", LaporanController::class);
    Route::get('download/laporan/csv', [LaporanController::class, 'downloadCSV']);
    Route::get('download/laporan/pdf', [LaporanController::class, 'downloadPDF']);
    Route::resource("proyek", ProyekController::class);
    Route::resource('sektor', SektorController::class);
    Route::resource("mitra", MitraController::class);
    Route::resource("kegiatan", KegiatanController::class);

    Route::get("profile", function () {
        return Inertia::render('Admin/Profile/Index');
    })->name('adminProfile');
    Route::get("profile/{id}/edit", function () {
        return Inertia::render('Admin/Profile/Edit');
    })->name('editProfile');
});

Route::middleware(['auth', 'checkMitra'])->group(function () {
    Route::get("/mitra/dashboard", function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboardMitra');
});

require __DIR__ . '/auth.php';
