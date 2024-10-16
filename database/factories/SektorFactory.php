<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sektor>
 */
class SektorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'deskripsi' => fake()->paragraph(),
            'image' => 'example.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
