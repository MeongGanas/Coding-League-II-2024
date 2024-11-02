<?php

namespace Database\Factories;

use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Laporan>
 */
class LaporanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $pastYear = $this->faker->dateTimeBetween('-6 years', 'now');

        return [
            'name' => $this->faker->text(50),
            'mitra_id' => Mitra::inRandomOrder()->first()->id,
            'sektor_id' => Sektor::inRandomOrder()->first()->id,
            'proyek_id' => Proyek::inRandomOrder()->first()->id,
            'lokasi' => $this->faker->randomElement([
                'Gambir',
                'Tanah Abang',
                'Menteng',
                'Senen',
                'Cempaka Putih',
                'Johar Baru',
                'Kemayoran',
                'Sawah Besar',
                'Kelapa Gading',
                'Cilincing',
            ]),
            'realisasi' => $this->faker->randomFloat(2, 0, 1000000000),
            'realisasi_date' => $pastYear,
            'status' => $this->faker->randomElement(['Diterima', 'Revisi', 'Draf', 'Dikirim', 'Ditolak']),
            'rincian' => $this->faker->paragraph(4),
            'photos' => [
                'example.jpg',
                'example.jpg',
                'example.jpg',
            ],
        ];
    }
}
