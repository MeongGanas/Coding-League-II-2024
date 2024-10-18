<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $statistik = [
            'total_proyek' => Proyek::where('status', 'Terbit')->count(),
            'proyek_terealisasi' => Laporan::where('status', 'Diterima')->count(),
            'mitra_bergabung' => Mitra::where('status', 'Aktif')->count(),
            'dana_realisasi' => Laporan::where('status', 'Diterima')->sum('realisasi')
        ];

        return Inertia::render('Admin/Dashboard', [
            'statistik' => $statistik,
        ]);
    }
}
