<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
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

        $realisasi_per_sektor = Sektor::with(['laporans' => function ($query) {
            $query->where('status', 'Diterima');
        }])->get();

        $realisasi_totals = $realisasi_per_sektor->map(function ($sektor, $index) {
            return [
                'sektor' => $sektor->name,
                'total_laporan' => $sektor->laporans->count(),
                'total_realisasi' => $sektor->laporans->sum('realisasi'),
                'fill' => 'var(--chart-' . $index + 1 . ')'
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'statistik' => $statistik,
            'realisasi_per_sektor' => $realisasi_totals
        ]);
    }
}
