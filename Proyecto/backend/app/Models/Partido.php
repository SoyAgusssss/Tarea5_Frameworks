<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;

    protected $fillable = [
        'liga_id',
        'club_local_id',
        'club_visitante_id',
        'fecha',
        'resultado',
    ];

    // Relación con Liga
    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    // Relación con Club local
    public function clubLocal()
    {
        return $this->belongsTo(Club::class, 'club_local_id');
    }

    // Relación con Club visitante
    public function clubVisitante()
    {
        return $this->belongsTo(Club::class, 'club_visitante_id');
    }
}

