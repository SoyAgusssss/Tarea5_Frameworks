<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    use HasFactory;

    // Campos jugador
    protected $fillable = [
        'nombre',
        'posicion',
        'dorsal',
        'club_id',
    ];

    // Relación con Club
    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}

