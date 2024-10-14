<?php

namespace Database\Factories;

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

        $pastYear = $this->faker->dateTimeBetween('-1 years', 'now');

        return [
            'name' => $this->faker->text(50),
            'mitra_id' => 1,
            'kecamatan' => $this->faker->city,
            'realisasi' => $this->faker->randomFloat(2, 0, 1000000000),
            'realisasi_date' => $pastYear,
            'tgl_kirim' => $this->faker->dateTimeBetween($pastYear, '+30 days'),
            'status' => $this->faker->randomElement(['Diterima', 'Revisi', 'Draf']),
        ];
    }
}
