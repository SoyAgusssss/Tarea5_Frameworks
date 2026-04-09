<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Club>
 */
class ClubFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'nombre' => $this->faker->company() . ' Prueba Club',
        'ciudad' => $this->faker->city(),
        'categoria' => $this->faker->randomElement(['Primera', 'Segunda', 'Tercera']),
    ];
}
}
