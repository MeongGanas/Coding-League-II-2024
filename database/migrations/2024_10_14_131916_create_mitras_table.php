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
        Schema::create('mitras', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('name');
            $table->string('perusahaan');
            $table->string('deskripsi');
            $table->dateTime('tgl_daftar')->nullable();
            $table->enum('status', ['Aktif', 'Non-Aktif'])->default('Non-Aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mitras');
    }
};
