<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kegiatan>
 */
class KegiatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['Terbit', 'Draf']);

        return [
            'image' => 'example.jpg',
            'name' => $this->faker->text(50),
            'deskripsi' => $this->faker->text(100),
            'rincian' => $this->faker->paragraph(),
            'tgl_terbit' => $status === 'Terbit' ? $this->faker->dateTimeBetween('-1 years', 'now') : null,
            'status' => $status,
            'tags' => $this->faker->words(3),
        ];
    }
}
