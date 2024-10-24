<?php

namespace Database\Seeders;

use App\Models\Mitra;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as faker;

class MitraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = faker::create();

        $name = [
            "Dharma Dexa",
            "Bank Indonesia",
            "Coca Cola",
            "Marunda Center",
            "Loreal",
            "Medco Foundation",
            "Mulia Industry Group"
        ];

        $found = false;
        foreach ($name as $n) {
            if (Mitra::where('name', $n)->first()) {
                $found = true;
                break;
            }
        }

        if ($found) {
            return;
        }

        $image = [];
        foreach ($name as $n) {
            $image[] = "mitra_image/" . str_replace(" ", "_", strtolower($n)) . ".png";
        }
        $email = [];
        foreach ($name as $n) {
            $email[] = str_replace(" ", "_", strtolower($n)) . "@mail.com";
        }
        $no_telepon = [];
        foreach ($name as $n) {
            $no_telepon[] = $faker->phoneNumber();
        }
        $alamat = [];
        foreach ($name as $n) {
            $alamat[] = $faker->address();
        }
        $perusahaan = [];
        foreach ($name as $n) {
            $perusahaan[] = "PT. " . $n;
        }
        $deskripsi = [];
        foreach ($name as $n) {
            $deskripsi[] = $faker->paragraph();
        }
        $tgl_daftar = [];
        $starting_date = $faker->dateTimeBetween('-5 days', now());
        foreach ($name as $n) {
            $starting_date->add(new \DateInterval('PT1H'));
            $tgl_daftar[] = $starting_date;
        }
        $status = [];
        foreach ($name as $n) {
            $status[] = 'Aktif';
        }

        foreach ($name as $key => $n) {
            Mitra::create([
                'user_id' => $key + 2,
                'image' => $image[$key],
                'name' => $n,
                'email' => $email[$key],
                'no_telepon' => $no_telepon[$key],
                'alamat' => $alamat[$key],
                'perusahaan' => $perusahaan[$key],
                'deskripsi' => $deskripsi[$key],
                'tgl_daftar' => $tgl_daftar[$key],
                'status' => $status[$key],
            ]);
        }
    }
}
