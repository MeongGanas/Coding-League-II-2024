<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Notifications\TestNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UserCreatedNotification;
use App\Notifications\WelcomeNotification;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'SMK Telkom Makassar',
                'email' => 'emforakaem@gmail.com',
                'role' => 'admin',
                'password' => '123123'
            ],
            [
                'name' => 'Mitra User',
                'email' => 'arfounded@gmail.com',
                'password' => '123123'
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);
            Notification::send($user, new WelcomeNotification(['database', 'mail'], $user));
        }
    }
}
