<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mitra>
 */
class MitraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $name = $this->faker->word();
        $perusahaan = "PT. " . $name;

        return [
            'image' => 'example.jpg',
            'name' => $name,
            'email' => $this->faker->email(),
            'no_telepon' => $this->faker->phoneNumber(),
            'alamat' => $this->faker->address(),
            'perusahaan' => $perusahaan,
            'deskripsi' => $this->faker->paragraph(),
            'tgl_daftar' => $this->faker->dateTimeBetween('-1 years', '-1 months'),
            'status' => "Non-Aktif",
            'user_id' => User::where('role', 'mitra')->inRandomOrder()->first()->id,
        ];
    }
}
