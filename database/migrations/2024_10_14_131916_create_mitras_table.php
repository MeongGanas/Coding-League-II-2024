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
            $table->string('image')->nullable();
            $table->string('name');
            $table->string('perusahaan')->unique();
            $table->string('no_telepon')->nullable()->unique();
            $table->string('alamat')->nullable();
            $table->string('email')->unique();
            $table->text('deskripsi')->nullable();
            $table->dateTime('tgl_daftar')->nullable();
            $table->enum('status', ['Aktif', 'Non-Aktif', 'Pengajuan'])->default('Pengajuan');
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
