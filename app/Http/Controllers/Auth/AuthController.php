<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Notifications\verifyNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Display the login view.
     */
    public function login(): Response
    {
        $severity = session('severity');
        $message = session('message');

        Log::channel('main')->info('login', [
            'severity' => $severity,
            'message' => $message,
        ]);

        if (!$severity || !$message) {
            return Inertia::render('Auth/Login');
        }

        return Inertia::render('Auth/Login', [
            'severity' => $severity,
            'message' => $message,
        ]);
    }

    public function register(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function loginPost(LoginRequest $request)
    {

        $v = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string',
        ]);

        $request->authenticate();

        $user = User::where('email', $request->email)->first();
        if (!$user->email_verified_at) {
            Auth::logout();
            return response()->json([
                'message' => 'Email belum terverifikasi',
            ], 403);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboardMitra'));
    }

    public function registerPost(Request $request)
    {
        $v = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);
        $v['role'] = 'mitra';

        $user = User::create($v);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboardMitra'));
    }

    public function updateUser(Request $request, User $user)
    {
        $v = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'deskripsi' => 'nullable|string|min:5',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
        ]);

        if ($request->has('image')) {
            if ($user->image) {
                Storage::delete($user->image);
            }
            $v['image'] = $request->file('image')->store('user_image', 'public');
        }

        $user->update($v);

        return redirect()->intended(route('dashboardMitra'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function sendEmailVerification(Request $request)
    {

        $v = $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        $user = User::where('email', $v['email'])->first();

        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Email sudah terverifikasi',
            ], 400);
        }

        $notification = new verifyNotification($user->id);
        Notification::send($user, $notification);

        return response()->json([
            'message' => 'Email verifikasi telah dikirim',
        ]);
    }

    public function verifyEmail(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->route('login')->with([
                'severity' => 'error',
                'message' => 'User tidak ditemukan'
            ]);
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->route('login')->with([
                'severity' => 'error',
                'message' => 'Email sudah terverifikasi'
            ]);
        }

        if (!URL::hasValidSignature($request)) {
            return redirect()->route('login')->with([
                'severity' => 'error',
                'message' => 'Invalid signature'
            ]);
        }

        $user->markEmailAsVerified();
        return redirect()->route('login')->with([
            'severity' => 'success',
            'message' => 'Email berhasil diverifikasi'
        ]);
    }
}
