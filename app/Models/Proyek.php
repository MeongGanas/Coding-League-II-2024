<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyek extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function sektor()
    {
        return $this->belongsTo(Sektor::class);
    }

    public function laporans()
    {
        return $this->hasMany(Laporan::class);
    }

    public function partisipasi()
    {
        return $this->hasMany(Partisipasi::class);
    }
}
