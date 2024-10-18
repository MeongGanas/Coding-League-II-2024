<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sektor extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function proyeks()
    {
        return $this->hasMany(Proyek::class);
    }

    public function laporans()
    {
        return $this->hasMany(Laporan::class);
    }
}
