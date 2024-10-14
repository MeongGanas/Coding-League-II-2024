<?php

use App\Http\Controllers\ProyekController;
use App\Http\Controllers\SektorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'checkAdmin'])->group(function () {
    Route::get("/admin/dashboard", function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboardAdmin');

    Route::get("/admin/laporan", function () {
        return Inertia::render('Admin/Laporan/Index');
    })->name('adminLaporan');
    Route::get("/admin/laporan/{id}/detail", function () {
        return Inertia::render('Admin/Laporan/Detail');
    })->name('adminDetailLaporan');

    Route::resource("/admin/proyek", ProyekController::class);

    Route::resource('/admin/sektor', SektorController::class);

    Route::get("/admin/kegiatan", function () {
        return Inertia::render('Admin/Kegiatan/Index');
    })->name('adminKegiatan');
    Route::get("/admin/kegiatan/{id}/detail", function () {
        return Inertia::render('Admin/Kegiatan/Detail');
    })->name('detailKegiatan');
    Route::get("/admin/kegiatan/create", function () {
        return Inertia::render('Admin/Kegiatan/Create');
    })->name('addKegiatan');
    Route::get("/admin/kegiatan/{id}/edit", function () {
        return Inertia::render('Admin/Kegiatan/Edit');
    })->name('editKegiatan');

    Route::get("/admin/mitra", function () {
        return Inertia::render('Admin/Mitra/Index');
    })->name('adminMitra');
    Route::get("/admin/mitra/{id}/detail", function () {
        return Inertia::render('Admin/Mitra/Detail');
    })->name('detailMitra');
    Route::get("/admin/mitra/create", function () {
        return Inertia::render('Admin/Mitra/Create');
    })->name('addMitra');
    Route::get("/admin/mitra/{id}/edit", function () {
        return Inertia::render('Admin/Mitra/Edit');
    })->name('editMitra');

    Route::get("/admin/profile", function () {
        return Inertia::render('Admin/Profile/Index');
    })->name('adminProfile');
    Route::get("/admin/profile/{id}/edit", function () {
        return Inertia::render('Admin/Profile/Edit');
    })->name('editProfile');
});

Route::middleware(['auth', 'checkMitra'])->group(function () {
    Route::get("/mitra/dashboard", function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboardMitra');
});

require __DIR__ . '/auth.php';
