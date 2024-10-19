<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $countProyek = Proyek::where('status', 'Terbit')->count();
        $proyekRealized = Laporan::where('status', 'Diterima');
        $countProyekRealized = $proyekRealized->count();
        $countMitra = Mitra::where('status', '!=', 'Pengajuan')->count();
        $countTotalDanaRealized = $proyekRealized->sum('realisasi');

        $realisasiBySektor = Laporan::where('status', 'Diterima')->get()->groupBy('sektor_id')->map(function ($item) {
            return [
                'sektor' => $item->first()->sektor->name,
                'count' => $item->count(),
                'total' => $item->sum('realisasi')
            ];
        });
        $realisasiBySektor = $realisasiBySektor->take(6)->values();
        $realisasiBySektor->push([
            'sektor' => 'Lainnya',
            'count' => $realisasiBySektor->sum('count'),
            'total' => $realisasiBySektor->sum('total')
        ]);

        return Inertia::render('Admin/Dashboard', [
            'counts' => [
                'countProyek' => $countProyek,
                'countProyekRealized' => $countProyekRealized,
                'countMitra' => $countMitra,
                'countTotalDanaRealized' => $countTotalDanaRealized,
            ],
            'realisasi' => [
                'dataCSR' => $realisasiBySektor->values(),
                'persenTotalMitra' => [],
                'persenTotalKec' => [],
            ]
        ]);
    }
}
