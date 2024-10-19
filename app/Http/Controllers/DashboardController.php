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

        $this->applyFilters($proyek, $mitra, $laporan);

        return Inertia::render('Admin/Dashboard', [
            'counts' => [
                'countProyek' => $proyek->count(),
                'countProyekRealized' => $laporan->count(),
                'countMitra' => $mitra->count(),
                'countTotalDanaRealized' => $laporan->sum('realisasi'),
            ],
            'realisasi' => [
                'dataCSR' => $this->getRealisasiBy($laporan, 'sektor_id', 'sektor', 'name', true)->values(),
                'persenTotalMitra' => $this->getRealisasiBy($laporan, 'mitra_id', 'mitra', 'name')->values(),
                'persenTotalKecamatan' => $this->getRealisasiBy($laporan, 'lokasi', 'kecamatan', 'lokasi')->values(),
            ],
            'filters' => [
                'tahun' => $this->getPossibleYear(clone $proyek, clone $mitra, clone $laporan)->values(),
                'sektors' => Sektor::latest()->get()->values(),
                'mitras' => Mitra::where('status', '!=', 'Pengajuan')->get()->values()
            ]
        ]);
    }

    private function applyFilters($proyek, $mitra, $laporan)
    {
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
        }
    }

    private function getPossibleYear($proyek, $mitra, $laporan)
    {
        $possibleYearProyek = $proyek->selectRaw('YEAR(tgl_awal) as year')->distinct()->get()->pluck('year');
        $possibleYearMitra = $mitra->selectRaw('YEAR(tgl_daftar) as year')->distinct()->get()->pluck('year');
        $possibleYearLaporan = $laporan->selectRaw('YEAR(realisasi_date) as year')->distinct()->get()->pluck('year');
        $possibleYear = $possibleYearProyek->merge($possibleYearMitra)->merge($possibleYearLaporan)->unique();

        return $possibleYear;
    }

    private function getRealisasiBy($laporan, $groupBy, $label, $relation, $useCount = false)
    {
        $realisasi = $laporan->get()->groupBy($groupBy)->map(function ($item) use ($useCount, $label, $relation) {
            $result = [
                $label => $item->first()->$relation ?? 'Unknown',
                'total' => $item->sum('realisasi')
            ];
            if ($useCount) {
                $result['count'] = $item->count();
            }
            return $result;
        });

        $newRealisasi = $realisasi->take(6)->values();
        if ($realisasi->count() > 6) {
            $totalSum = $realisasi->sum('total');
            $topSixSum = $realisasi->take(6)->sum('total');
            $data = [
                $label => 'Lainnya',
                'total' => $totalSum - $topSixSum
            ];
            if ($useCount) {
                $countSum = $realisasi->sum('count');
                $countSixSum = $realisasi->take(6)->sum('count');
                $data['count'] = $countSum - $countSixSum;
            }

            $newRealisasi->push($data);
        }
        return $newRealisasi;
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
