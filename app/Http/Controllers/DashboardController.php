<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $proyek = Proyek::where('status', 'Terbit');
        $mitra = Mitra::where('status', '!=', 'Pengajuan');
        $laporan = Laporan::where('status', 'Diterima');
        if (request("tahun")) {
            $tahun = request("tahun");
            $proyek->whereYear('tgl_awal', $tahun);
            $mitra->whereYear('tgl_daftar', $tahun);
            $laporan->whereYear('realisasi_date', $tahun);
        }
        if (request("kuartal")) {
            $kuartal = request("kuartal");
            $proyek->whereRaw('QUARTER(tgl_awal) = ?', $kuartal);
            $mitra->whereRaw('QUARTER(tgl_daftar) = ?', $kuartal);
            $laporan->whereRaw('QUARTER(realisasi_date) = ?', $kuartal);
        }
        if (request("sektor")) {
            $proyek->where('sektor_id', request("sektor"));
            $laporan->where('sektor_id', request("sektor"));
        }
        if (request("mitra")) {
            $laporan->where('mitra_id', request("mitra"));
            // $proyek->where('mitra_id', request("mitra"));
            // TODO: for proyek, add partisipasi table and use where
        }
        $countProyek = $proyek->count();
        $countMitra = $mitra->count();
        $countProyekRealized = $laporan->count();
        $countTotalDanaRealized = $laporan->sum('realisasi');

        $possibleYearProyek = Proyek::where('status', 'Terbit')
            ->selectRaw('YEAR(tgl_awal) as year')
            ->distinct()
            ->get()
            ->pluck('year');
        $possibleYearMitra = Mitra::where('status', '!=', 'Pengajuan')
            ->selectRaw('YEAR(tgl_daftar) as year')
            ->distinct()
            ->get()
            ->pluck('year');
        $possibleYearLaporan = Laporan::where('status', 'Diterima')
            ->selectRaw('YEAR(realisasi_date) as year')
            ->distinct()
            ->get()
            ->pluck('year');
        $possibleYear = $possibleYearProyek->merge($possibleYearMitra)->merge($possibleYearLaporan)->unique();


        $realisasiBySektor = $laporan->get()->groupBy('sektor_id')->map(function ($item) {
            return [
                'sektor' => $item->first()->sektor->name,
                'count' => $item->count(),
                'total' => $item->sum('realisasi')
            ];
        });
        $newRealisasiBySektor = $realisasiBySektor->take(6)->values();
        if ($realisasiBySektor->count() > 6) {
            $totalSum = $realisasiBySektor->sum('total');
            $topSixSum = $realisasiBySektor->take(6)->sum('total');
            $countSum = $realisasiBySektor->sum('count');
            $countSixSum = $realisasiBySektor->take(6)->sum('count');

            $newRealisasiBySektor->push([
                'sektor' => 'Lainnya',
                'count' => $countSum - $countSixSum,
                'total' => $totalSum - $topSixSum
            ]);
        }
        $realisasiByMitra = $laporan->get()->groupBy('mitra_id')->map(function ($item) {
            return [
                'mitra' => $item->first()->mitra->name,
                'total' => $item->sum('realisasi')
            ];
        });
        $newRealisasiByMitra = $realisasiByMitra->take(6)->values();
        if ($realisasiByMitra->count() > 6) {
            $totalSum = $realisasiByMitra->sum('total');
            $topSixSum = $realisasiByMitra->take(6)->sum('total');
            $newRealisasiByMitra->push([
                'mitra' => 'Lainnya',
                'total' => $totalSum - $topSixSum
            ]);
        }

        $realisasiByKecamatan = $laporan->get()->groupBy('lokasi')->map(function ($item) {
            return [
                'kecamatan' => $item->first()->lokasi,
                'total' => $item->sum('realisasi')
            ];
        });
        $newRealisasiByKecamatan = $realisasiByKecamatan->take(6)->values();
        if ($realisasiByKecamatan->count() > 6) {
            $totalSum = $realisasiByKecamatan->sum('total');
            $countSixSum = $realisasiByKecamatan->take(6)->sum('total');
            $newRealisasiByKecamatan->push([
                'kecamatan' => 'Lainnya',
                'total' => $totalSum - $countSixSum
            ]);
        }

        return Inertia::render('Admin/Dashboard', [
            'counts' => [
                'countProyek' => $countProyek,
                'countProyekRealized' => $countProyekRealized,
                'countMitra' => $countMitra,
                'countTotalDanaRealized' => $countTotalDanaRealized,
            ],
            'realisasi' => [
                'dataCSR' => $newRealisasiBySektor->values(),
                'persenTotalMitra' => $newRealisasiByMitra->values(),
                'persenTotalKecamatan' => $newRealisasiByKecamatan->values(),
            ],
            'filters' => [
                'tahun' => $possibleYear->values(),
                'sektors' => Sektor::latest()->get()->values(),
                'mitras' => Mitra::where('status', '!=', 'Pengajuan')->get()->values()
            ]
        ]);
    }

    public function downloadPDF()
    {
        $proyek = Proyek::get()->groupBy('status')->map(function ($item) {
            return [
                'count' => $item->count()
            ];
        });

        $pdf = Pdf::loadView('pdfs.dashboard', [
            'proyek' => $proyek
        ]);

        return $pdf->download(date('Y-m-d') . '-dashboard.pdf');
    }
}
