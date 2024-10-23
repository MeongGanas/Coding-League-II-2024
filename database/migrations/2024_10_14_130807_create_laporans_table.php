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
            $table->foreignId('sektor_id');
            $table->foreignId('proyek_id');
            $table->string('lokasi');
            $table->decimal('realisasi', 18, 2);
            $table->dateTime('realisasi_date');
            $table->text('rincian');
            $table->text('pesan')->nullable();
            $table->enum('status', ['Diterima', 'Revisi', 'Draf', 'Dikirim', 'Ditolak'])->default('Dikirim');
            $table->json('photos')->nullable();
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
