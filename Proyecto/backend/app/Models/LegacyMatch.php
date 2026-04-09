<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegacyMatch extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'deporte',
        'equipo1',
        'equipo2',
        'goles1',
        'goles2',
        'puntos1',
        'puntos2',
        'fecha',
        'arbitro',
        'estado',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'goles1' => 'integer',
        'goles2' => 'integer',
        'puntos1' => 'integer',
        'puntos2' => 'integer',
        'id' => 'string',
    ];

    public function toArray(): array
    {
        $data = parent::toArray();
        $data['_id'] = (string) ($this->attributes['id'] ?? '');
        return $data;
    }
}
