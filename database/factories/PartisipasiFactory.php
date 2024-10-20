<?php

namespace Database\Factories;

use App\Models\Mitra;
use App\Models\Proyek;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Partisipasi>
 */
class PartisipasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mitra_id' => Mitra::inRandomOrder()->first()->id,
            'proyek_id' => Proyek::inRandomOrder()->first()->id,
        ];
    }
}
