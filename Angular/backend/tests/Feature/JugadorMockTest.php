<?php

namespace Tests\Feature;

use App\Models\Jugador;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JugadorMockTest extends TestCase
{
    use RefreshDatabase;

    public function test_listado_jugadores_con_datos_controlados(): void
    {
        Jugador::factory()->count(3)->sequence(
            ['nombre' => 'Mock A', 'posicion' => 'Portero', 'dorsal' => 1],
            ['nombre' => 'Mock B', 'posicion' => 'Defensa', 'dorsal' => 4],
            ['nombre' => 'Mock C', 'posicion' => 'Delantero', 'dorsal' => 9],
        )->create();

        $response = $this->getJson('/api/jugadores');

        $response->assertStatus(200)
                 ->assertJsonCount(3)
                 ->assertJsonFragment(['nombre' => 'Mock A', 'dorsal' => 1])
                 ->assertJsonFragment(['nombre' => 'Mock B', 'dorsal' => 4])
                 ->assertJsonFragment(['nombre' => 'Mock C', 'dorsal' => 9]);
    }
}