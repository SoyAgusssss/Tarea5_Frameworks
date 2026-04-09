<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegacyTeam extends Model
{
    use HasFactory;

    protected $table = 'teams';

    protected $fillable = [
        'nombre',
        'deporte',
        'capitan',
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
