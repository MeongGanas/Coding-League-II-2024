<?php

namespace Database\Seeders;

use App\Models\Mitra;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
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
                'role' => 'mitra',
                'password' => '123123'
            ],
        ];

        foreach ($users as $userData) {
            $userExists = User::where('email', $userData['email'])->first();
            if ($userExists) {
                continue;
            }
            $user = User::create($userData);
            if ($user->role === "mitra") {
                Mitra::factory()->create([
                    'user_id' => $user->id
                ]);
            }
            Notification::send($user, new WelcomeNotification(['database', 'mail'], $user));
        }
    }
}
