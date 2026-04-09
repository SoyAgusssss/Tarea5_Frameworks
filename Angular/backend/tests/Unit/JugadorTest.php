<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Jugador;

class JugadorTest extends TestCase
{
    public function test_atributos_correctos()
    {
        $jugador = new Jugador([
            'nombre' => 'Prueba1',
            'posicion' => 'Centrocampista',
            'dorsal' => 10,
            'club_id' => 1
        ]);
        $this->assertEquals('Prueba1', $jugador->nombre);
        $this->assertEquals('Centrocampista', $jugador->posicion);
        $this->assertEquals(10, $jugador->dorsal);
        $this->assertIsInt($jugador->dorsal);
    }
}