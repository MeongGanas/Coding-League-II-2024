<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardMitraController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MasyarakatController;
use App\Http\Controllers\MitraController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProyekController;
use App\Http\Controllers\SektorController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use Inertia\Inertia;

// Masyarakat
Route::group([], function () {
    Route::prefix('download')->group(function () {
        Route::get('statistik/csv', [MasyarakatController::class, 'downloadCSV']);
        Route::get('statistik/pdf', [MasyarakatController::class, 'downloadPDF']);
    });

    Route::get('/', [MasyarakatController::class, 'home'])->name('beranda');

    Route::get('/tentang', [MasyarakatController::class, 'about'])->name('tentang');
    Route::get('/tentang/pengajuan', [MasyarakatController::class, 'pengajuan'])->name('tentang.pengajuan');
    Route::post('/tentang/pengajuan', [MasyarakatController::class, 'PengajuanPost'])->name('tentang.pengajuan.create');

    Route::get('/statistik', [MasyarakatController::class, 'statistik'])->name('statistik');

    Route::get('/sektor', [MasyarakatController::class, 'sektor'])->name('sektor');
    Route::get('/sektor/{sektor}/detail', [MasyarakatController::class, 'sektorDetail'])->name('sektor.detail');
    Route::get('/program/{proyek}/proyek', [MasyarakatController::class, 'sektorProyek'])->name('sektor.proyek');

    Route::get('/laporan', [MasyarakatController::class, 'laporan'])->name('laporan');
    Route::get('/laporan/{laporan}/detail', [MasyarakatController::class, 'laporanDetail'])->name('laporan.detail');

    Route::get('/kegiatan', [MasyarakatController::class, 'kegiatan'])->name('kegiatan');
    Route::get('/kegiatan/{kegiatan}/detail', [MasyarakatController::class, 'kegiatanDetail'])->name('kegiatan.detail');

    Route::get('/mitra', [MasyarakatController::class, 'mitra'])->name('mitra');
    Route::get('/mitra/{mitra}/detail', [MasyarakatController::class, 'mitraDetail'])->name('mitra.detail');
});

// Admin
Route::prefix('admin')->middleware(['auth', 'mustVerify', 'checkAdmin'])->group(function () {
    Route::prefix('download')->group(function () {
        Route::get('laporan/csv', [LaporanController::class, 'downloadCSV']);
        Route::get('laporan/pdf', [LaporanController::class, 'downloadPDF']);
        Route::get('proyek/csv', [ProyekController::class, 'downloadCSV']);
        Route::get('proyek/pdf', [ProyekController::class, 'downloadPDF']);
        Route::get('dashboard/csv', [DashboardController::class, 'downloadCSV']);
        Route::get('dashboard/pdf', [DashboardController::class, 'downloadPDF']);
    });
    Route::resources([
        'laporan' => LaporanController::class,
        'proyek' => ProyekController::class,
        'sektor' => SektorController::class,
        'mitra' => MitraController::class,
        'kegiatan' => KegiatanController::class,
    ]);
    Route::get("dashboard", [DashboardController::class, 'index'])->name('dashboardAdmin');
    Route::patch("laporan/{laporan}/updateStatus", [LaporanController::class, 'updateStatus']);
    Route::post("mitra/{mitra}/toggle", [MitraController::class, 'toggleStatus']);
    Route::get("profile", [DashboardController::class, 'profile'])->name('adminProfile');
    Route::get("profile/edit", [DashboardController::class, 'profileEdit'])->name('adminProfileUpdate');
});

// Notification
Route::middleware(['auth'])->group(function () {
    Route::post("notifications/read", [NotificationController::class, 'read']);
    Route::get("notifications", [NotificationController::class, 'index']);
});

// Mitra
Route::prefix('mitra')->middleware(['auth', 'mustVerify', 'checkMitra'])->group(function () {
    Route::prefix('download')->group(function () {
        Route::get('dashboard/csv', [DashboardMitraController::class, 'downloadCSV']);
        Route::get('dashboard/pdf', [DashboardMitraController::class, 'downloadPDF']);
    });

    Route::get("/dashboard", [DashboardMitraController::class, 'index'])->name('dashboardMitra');
    Route::get('/user', [DashboardMitraController::class, 'profileUser'])->name('mitra.profile.user');
    Route::get('/user/edit', [DashboardMitraController::class, 'editProfileUser'])->name('mitra.profile.user.edit');

    // Laporan
    Route::group([], function () {
        Route::get("/laporan/create", [DashboardMitraController::class, 'CreateLaporan'])->name('laporan.mitra.create');
        Route::get("/laporan/{laporan}", [DashboardMitraController::class, 'LaporanDetail'])->name('laporan.mitra.detail');
        Route::get("/laporan/{laporan}/edit", [DashboardMitraController::class, 'LaporanEdit'])->name('laporan.mitra.edit');
        Route::post("/laporan", [LaporanController::class, 'store'])->name('laporan.store');
        Route::patch("/laporan/{laporan}", [LaporanController::class, 'update'])->name('laporan.mitra.update');
        Route::delete("/laporan/{laporan}", [LaporanController::class, 'destroy'])->name('laporan.delete');
    });

    // Perusahaan
    Route::group([], function () {
        Route::patch('/perusahaan', [MitraController::class, 'update'])->name('mitra.profile.perusahaan.patch');
        Route::get('/perusahaan', [DashboardMitraController::class, 'profilePerusahaan'])->name('mitra.profile.perusahaan');
        Route::get('/perusahaan/edit', [DashboardMitraController::class, 'editProfilePerusahaan'])->name('mitra.profile.perusahaan.edit');
    });
});

require __DIR__ . '/auth.php';
