<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
        return Inertia::render('Auth/Login');
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
        $request->authenticate();

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
}
