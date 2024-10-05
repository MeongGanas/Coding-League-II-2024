<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::middleware(['auth'])->group(function () {
Route::get("/admin/dashboard", function () {
    return Inertia::render('Admin/Dashboard');
})->name('adminDashboard');

Route::get("/admin/laporan", function () {
    return Inertia::render('Admin/Laporan/Index');
})->name('adminLaporan');

Route::get("/admin/laporan/{id}/detail", function () {
    return Inertia::render('Admin/Laporan/Detail');
})->name('adminDetailLaporan');

Route::get("/admin/proyek", function () {
    return Inertia::render('Admin/Proyek/Index');
})->name('adminProyek');

Route::get("/admin/proyek/{id}/detail", function () {
    return Inertia::render('Admin/Proyek/Detail');
})->name('detailProyek');
// });

require __DIR__ . '/auth.php';
