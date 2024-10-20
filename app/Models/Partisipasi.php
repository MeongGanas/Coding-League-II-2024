<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partisipasi extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function mitra()
    {
        return $this->belongsTo(Mitra::class);
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class);
    }
}
