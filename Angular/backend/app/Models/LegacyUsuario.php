<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegacyUsuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'usuario',
        'email',
        'password',
        'rol',
        'equipo',
        'deporte',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public function toArray(): array
    {
        $data = parent::toArray();
        $data['_id'] = (string) ($this->attributes['id'] ?? '');
        return $data;
    }
}
