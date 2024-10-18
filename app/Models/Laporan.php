<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function mitra()
    {
        return $this->belongsTo(Mitra::class);
    }

    public function sektor()
    {
        return $this->belongsTo(Sektor::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class);
    }

    protected $casts = [
        'photos' => 'array',
        'realisasi_date' => 'datetime',
        'tgl_kirim' => 'datetime',
    ];
}
