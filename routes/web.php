<?php

use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProyekController;
use App\Http\Controllers\SektorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get("dashboard", function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboardAdmin');

    Route::resource("laporan", LaporanController::class);
    Route::get('download/laporan/csv', [LaporanController::class, 'downloadCSV']);
    Route::get('download/laporan/pdf', [LaporanController::class, 'downloadPDF']);
    Route::resource("proyek", ProyekController::class);
    Route::resource('sektor', SektorController::class);

    Route::get("kegiatan", function () {
        return Inertia::render('Admin/Kegiatan/Index');
    })->name('adminKegiatan');
    Route::get("kegiatan/{id}/detail", function () {
        return Inertia::render('Admin/Kegiatan/Detail');
    })->name('detailKegiatan');
    Route::get("kegiatan/create", function () {
        return Inertia::render('Admin/Kegiatan/Create');
    })->name('addKegiatan');
    Route::get("kegiatan/{id}/edit", function () {
        return Inertia::render('Admin/Kegiatan/Edit');
    })->name('editKegiatan');

    Route::get("mitra", function () {
        return Inertia::render('Admin/Mitra/Index');
    })->name('adminMitra');
    Route::get("mitra/{id}/detail", function () {
        return Inertia::render('Admin/Mitra/Detail');
    })->name('detailMitra');
    Route::get("mitra/create", function () {
        return Inertia::render('Admin/Mitra/Create');
    })->name('addMitra');
    Route::get("mitra/{id}/edit", function () {
        return Inertia::render('Admin/Mitra/Edit');
    })->name('editMitra');

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
