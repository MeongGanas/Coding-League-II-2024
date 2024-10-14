<?php

namespace Database\Seeders;

use App\Models\Proyek;
use App\Models\Sektor;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        try {
            User::create([
                'name' => 'SMK Telkom Makassar',
                'email' => 'admin@gmail.com',
                'role' => 'admin',
                'password' => '123123'
            ]);

            User::create([
                'name' => 'Farrel',
                'email' => 'farreluken@gmail.com',
                'password' => '123123'
            ]);
        } catch (\Throwable $th) {
            // do nothing
        }

        Sektor::factory(15)->create();
        Proyek::factory(15)->create();
    }
}
