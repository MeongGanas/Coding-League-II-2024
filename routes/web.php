<?php

use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MasyarakatController;
use App\Http\Controllers\MitraController;
use App\Http\Controllers\ProyekController;
use App\Http\Controllers\SektorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MasyarakatController::class, 'home'])->name('beranda');
Route::get('/tentang', [MasyarakatController::class, 'about'])->name('tentang');
Route::get('/statistik', [MasyarakatController::class, 'statistik'])->name('statistik');

Route::get('/sektor', [MasyarakatController::class, 'sektor'])->name('sektor');
Route::get('/sektor/{sektor}/detail', [MasyarakatController::class, 'sektorDetail'])->name('sektor.detail');
Route::get('/sektor/{sektor}/proyek', [MasyarakatController::class, 'sektorProyek'])->name('sektor.proyek');

Route::get('/laporan', [MasyarakatController::class, 'laporan'])->name('laporan');
Route::get('/laporan/{laporan}/detail', [MasyarakatController::class, 'laporanDetail'])->name('laporan.detail');

Route::get('/kegiatan', [MasyarakatController::class, 'kegiatan'])->name('kegiatan');
Route::get('/kegiatan/{kegiatan}/detail', [MasyarakatController::class, 'kegiatanDetail'])->name('kegiatan.detail');

Route::get('/mitra', [MasyarakatController::class, 'mitra'])->name('mitra');
Route::get('/mitra/{mitra}/detail', [MasyarakatController::class, 'mitraDetail'])->name('mitra.detail');

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
    Route::post("mitra/{mitra}/toggle", [MitraController::class, 'toggleStatus']);
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
