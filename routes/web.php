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
use Inertia\Inertia;

Route::get('/', [MasyarakatController::class, 'home'])->name('beranda');

Route::get('/tentang', [MasyarakatController::class, 'about'])->name('tentang');
Route::get('/tentang/pengajuan', [MasyarakatController::class, 'pengajuan'])->name('tentang.pengajuan');

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

Route::prefix('download')->group(function () {
    Route::get('statistik/csv', [MasyarakatController::class, 'downloadCSV']);
    Route::get('statistik/pdf', [MasyarakatController::class, 'downloadPDF']);
});

Route::prefix('admin')->middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get("dashboard", [DashboardController::class, 'index'])->name('dashboardAdmin');

    Route::prefix('download')->group(function () {
        Route::get('laporan/csv', [LaporanController::class, 'downloadCSV']);
        Route::get('laporan/pdf', [LaporanController::class, 'downloadPDF']);
        Route::get('proyek/csv', [ProyekController::class, 'downloadCSV']);
        Route::get('proyek/pdf', [ProyekController::class, 'downloadPDF']);
        Route::get('dashboard/csv', [DashboardController::class, 'downloadCSV']);
        Route::get('dashboard/pdf', [DashboardController::class, 'downloadPDF']);
    });

    Route::resource("laporan", LaporanController::class);
    Route::patch("laporan/{laporan}/updateStatus", [LaporanController::class, 'updateStatus']);

    Route::resource("proyek", ProyekController::class);
    Route::resource('sektor', SektorController::class);
    Route::resource("mitra", MitraController::class);
    Route::post("mitra/{mitra}/toggle", [MitraController::class, 'toggleStatus']);
    Route::resource("kegiatan", KegiatanController::class);

    Route::get("profile", function () {
        return Inertia::render('Admin/Profile/Index', [
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    })->name('adminProfile');
    Route::get("profile/{id}/edit", function () {
        return Inertia::render('Admin/Profile/Edit', [
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    })->name('editProfile');
});

Route::middleware(['auth'])->group(function () {
    Route::resource("notifications", NotificationController::class);
});

Route::prefix('mitra')->middleware(['auth', 'checkMitra'])->group(function () {
    Route::get("/dashboard", [DashboardMitraController::class, 'index'])->name('dashboardMitra');

    Route::get("/laporan/create", [DashboardMitraController::class, 'CreateLaporan'])->name('laporan.mitra.create');
    Route::post("/laporan", [LaporanController::class, 'store'])->name('laporan.store');
    Route::get("/laporan/{laporan}/edit", [DashboardMitraController::class, 'LaporanEdit'])->name('laporan.mitra.edit');
    Route::patch("/laporan/{laporan}", [LaporanController::class, 'update'])->name('laporan.mitra.update');
    Route::get("/laporan/{laporan}", [DashboardMitraController::class, 'LaporanDetail'])->name('laporan.mitra.detail');
    Route::delete("/laporan/{laporan}", [LaporanController::class, 'destroy'])->name('laporan.delete');

    Route::get('/user', [DashboardMitraController::class, 'profileUser'])->name('mitra.profile.user');
    Route::get('/user/{user}/edit', [DashboardMitraController::class, 'editProfileUser'])->name('mitra.profile.user.edit');
    Route::patch('/perusahaan/{mitra}', [MitraController::class, 'update'])->name('mitra.profile.perusahaan.patch');

    Route::get('/perusahaan', [DashboardMitraController::class, 'profilePerusahaan'])->name('mitra.profile.perusahaan');
    Route::get('/perusahaan/{mitra}/edit', [DashboardMitraController::class, 'editProfilePerusahaan'])->name('mitra.profile.perusahaan.edit');
    Route::patch('/perusahaan/{mitra}', [MitraController::class, 'update'])->name('mitra.profile.perusahaan.patch');
});

require __DIR__ . '/auth.php';
