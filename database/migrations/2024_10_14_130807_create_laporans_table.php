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
        Schema::create('laporans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('mitra_id');
            $table->string('kecamatan');
            $table->decimal('realisasi', 18, 2);
            $table->dateTime('realisasi_date');
            $table->dateTime('tgl_kirim');
            $table->enum('status', ['Diterima', 'Revisi', 'Draf'])->default('Draf');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};
