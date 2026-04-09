<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('deporte');
            $table->string('equipo1');
            $table->string('equipo2');
            $table->integer('goles1')->default(0);
            $table->integer('goles2')->default(0);
            $table->integer('puntos1')->default(0);
            $table->integer('puntos2')->default(0);
            $table->string('fecha');
            $table->string('arbitro');
            $table->string('estado')->default('pendiente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
