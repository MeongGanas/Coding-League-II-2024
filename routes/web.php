<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::middleware(['auth'])->group(function () {
Route::get("/admin/dashboard", function () {
    return Inertia::render('Admin/Dashboard');
})->name('adminDashboard');
// });

require __DIR__ . '/auth.php';
