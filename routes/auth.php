<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'loginPost']);

    Route::get('register', [AuthController::class, 'register'])->name('register');
    Route::post('register', [AuthController::class, 'registerPost']);
});

Route::middleware('auth')->group(function () {
    Route::patch('/profil/{user}', [AuthController::class, 'updateUser']);

    Route::post('logout', [AuthController::class, 'destroy'])
        ->name('logout');
});
