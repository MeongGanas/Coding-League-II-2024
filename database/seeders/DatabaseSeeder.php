<?php

namespace Database\Seeders;

use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Partisipasi;
use App\Models\Proyek;
use App\Models\Sektor;
use App\Models\User;
use Database\Factories\UserFactory;
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
                'name' => 'Mitra User',
                'email' => 'mitra@gmail.com',
                'password' => '123123'
            ]);

            User::create([
                'name' => 'Eririk',
                'email' => 'emforakaem@gmail.com',
                'password' => '123123'
            ]);

            User::create([
                'name' => 'Eririk Admin',
                'email' => 'arfounded@gmail.com',
                'role' => 'admin',
                'password' => '123123'
            ]);
        } catch (\Throwable $th) {
            // do nothing
        }

        User::factory(10)->create();

        // realdata
        $this->call([
            MitraSeeder::class,
            SektorSeeder::class,
        ]);

        // Sektor::factory(15)->create();
        Proyek::factory(15)->create();
        // Mitra::factory(15)->create();
        Laporan::factory(30)->create();
        Kegiatan::factory(30)->create();
        // Partisipasi::factory(30)->create();
    }
}
