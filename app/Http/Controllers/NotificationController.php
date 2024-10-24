<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        return response()->json([
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }

    public function read()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return response()->json([
            'message' => 'Notifications marked as read',
        ]);
    }
}
