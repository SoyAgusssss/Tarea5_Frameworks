<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Jugador;

class JugadorApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_listado_jugadores()
    {
        $jugador = Jugador::factory()->create([
            'nombre' => 'Prueba',
            'posicion' => 'Delantero',
            'dorsal' => 9,
        ]);
        $response = $this->getJson('/api/jugadores');

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'nombre' => 'Prueba',
                     'posicion' => 'Delantero',
                     'dorsal' => 9,
                 ]);
    }
}
