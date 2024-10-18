<?php

namespace Database\Factories;

use App\Models\Mitra;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MitraRealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
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
            return [];
        }

        $image = [];
        foreach ($name as $n) {
            $image[] = str_replace(" ", "_", strtolower($n)) . ".png";
        }
        $email = [];
        foreach ($name as $n) {
            $email[] = str_replace(" ", "_", strtolower($n)) . "@mail.com";
        }
        $no_telepon = [];
        foreach ($name as $n) {
            $no_telepon[] = $this->faker->phoneNumber();
        }
        $alamat = [];
        foreach ($name as $n) {
            $alamat[] = $this->faker->address();
        }
        $perusahaan = [];
        foreach ($name as $n) {
            $perusahaan[] = "PT. " . $n;
        }
        $deskripsi = [];
        foreach ($name as $n) {
            $deskripsi[] = $this->faker->paragraph();
        }
        $tgl_daftar = [];
        $starting_date = new \DateTime('-5 days');
        foreach ($name as $n) {
            $starting_date->add(new \DateInterval('PT1H'));
            $tgl_daftar[] = $starting_date->format('Y-m-d H:i:s');
        }
        $status = [];
        foreach ($name as $n) {
            $status[] = 'Aktif';
        }

        foreach ($name as $key => $n) {
            Mitra::create([
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

        return [];
    }
}
