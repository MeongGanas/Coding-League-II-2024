<?php

namespace App\Http\Controllers;

use App\Events\NotificationEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{

    public function read()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return response()->json([
            'message' => 'Notifications marked as read',
        ]);
    }
}
