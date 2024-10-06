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
Route::get("/admin/proyek/create", function () {
    return Inertia::render('Admin/Proyek/Create');
})->name('addProyek');
Route::get("/admin/proyek/{id}/detail", function () {
    return Inertia::render('Admin/Proyek/Detail');
})->name('detailProyek');

Route::get("/admin/sektor", function () {
    return Inertia::render('Admin/Sektor/Index');
})->name('adminSektor');
Route::get("/admin/sektor/{id}/detail", function () {
    return Inertia::render('Admin/Sektor/Detail');
})->name('detailSektor');
Route::get("/admin/sektor/create", function () {
    return Inertia::render('Admin/Sektor/Create');
})->name('addSektor');
Route::get("/admin/sektor/{id}/edit", function () {
    return Inertia::render('Admin/Sektor/Edit');
})->name('editSektor');

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
// });

require __DIR__ . '/auth.php';
