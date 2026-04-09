<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Jugador;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JugadorControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_jugadores()
{
    Jugador::factory()->count(3)->create(); 
    $response = $this->get('/api/jugadores');
    $response->assertStatus(200);
    $response->assertJsonCount(3);
}
}