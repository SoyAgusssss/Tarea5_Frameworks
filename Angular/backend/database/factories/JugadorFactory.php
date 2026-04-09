<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jugador>
 */
class JugadorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'nombre' => $this->faker->name(),
        'posicion' => $this->faker->randomElement(['Portero', 'Defensa', 'Centrocampista', 'Delantero']),
        'dorsal' => $this->faker->numberBetween(1, 99),
        'club_id' => \App\Models\Club::factory(),
    ];
}
}
