<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'loginPost']);
    Route::get('register', [AuthController::class, 'register'])->name('register');
    Route::post('register', [AuthController::class, 'registerPost']);
    Route::post('email/verify', [AuthController::class, 'sendEmailVerification'])->name('email.verify.get');
    Route::get('email/verify/{id}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
});

Route::middleware('auth')->group(function () {
    Route::patch('/profile/patch', [AuthController::class, 'updateUser']);

    Route::post('logout', [AuthController::class, 'destroy'])
        ->name('logout');
});
