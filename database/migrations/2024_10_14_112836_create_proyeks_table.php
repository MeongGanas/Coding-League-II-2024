<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proyeks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sektor_id');
            $table->text('name');
            $table->string('kecamatan');
            $table->text('deskripsi');
            $table->string('image');
            $table->enum('status', ['Terbit', 'Draf'])->default('Draf');
            $table->dateTime('tgl_awal');
            $table->dateTime('tgl_akhir')->nullable();
            $table->dateTime('tgl_terbit')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyeks');
    }
};
