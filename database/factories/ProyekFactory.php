<?php

namespace Database\Factories;

use App\Models\Sektor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proyek>
 */
class ProyekFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sektor_id' => Sektor::inRandomOrder()->first()->id,
            'name' => $this->faker->text(50),
            'kecamatan' => $this->faker->city,
            'deskripsi' => $this->faker->paragraph(),
            'image' => 'example.jpg',
            'status' => $this->faker->randomElement(['terbit', 'draf']),
            'tgl_awal' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'tgl_akhir' => $this->faker->dateTimeBetween('now', '+1 years'),
        ];
    }
}