<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use ZipArchive;

class DashboardController extends Controller
{
    public function index()
    {
        $proyek = Proyek::where('status', 'Terbit');
        $mitra = Mitra::where('status', '!=', 'Pengajuan');
        $laporan = Laporan::where('status', 'Diterima')->with('sektor', 'mitra');
        $this->applyFilters(clone $proyek, clone $mitra, clone $laporan);

        return Inertia::render('Admin/Dashboard', [
            'notifications' => Auth::user()->notifications->take(5),
            'counts' => [
                'countProyek' => $proyek->count(),
                'countProyekRealized' => $laporan->count(),
                'countMitra' => $mitra->count(),
                'countTotalDanaRealized' => $laporan->sum('realisasi'),
            ],
            'realisasi' => [
                'dataCSR' => $this->getRealisasiBy($laporan, 'sektor_id', 'sektor', 'name', true, 6, null, true)->values(),
                'persenTotalMitra' => $this->getRealisasiBy($laporan, 'mitra_id', 'mitra', 'name', null, 6, null, true)->values(),
                'persenTotalKecamatan' => $this->getRealisasiBy($laporan, 'lokasi', 'kecamatan', 'lokasi', null, 6, null, false)->values(),
            ],
            'filters' => [
                'tahun' => $this->getPossibleYear(clone $proyek, clone $mitra, clone $laporan)->values(),
                'sektors' => Sektor::latest()->get()->values(),
                'mitras' => Mitra::where('status', '!=', 'Pengajuan')->get()->values()
            ]
        ]);
    }

    public function applyFilters($proyek = null, $mitra = null, $laporan = null,
     $yearfilter = ['tgl_awal', 'tgl_daftar', 'realisasi_date'],
     $quarterfilter = ['tgl_awal', 'tgl_daftar', 'realisasi_date'],
     $sektorfilter = ['sektor_id', 'sektor_id'], $mitrafilter = ['mitra_id'])
    {
        if (request("tahun")) {
            $tahun = request("tahun");
            if ($proyek) $proyek->whereYear($yearfilter[0], $tahun);
            if ($mitra) $mitra->whereYear($yearfilter[1], $tahun);
            if ($laporan) $laporan->whereYear($yearfilter[2], $tahun);
        }
        if (request("kuartal")) {
            $kuartal = request("kuartal");
            if ($proyek) $proyek->whereRaw('QUARTER(' . $quarterfilter[0] . ') = ?', $kuartal);
            if ($mitra) $mitra->whereRaw('QUARTER(' . $quarterfilter[1] . ') = ?', $kuartal);
            if ($laporan) $laporan->whereRaw('QUARTER(' . $quarterfilter[2] . ') = ?', $kuartal);
        }
        if (request("sektor")) {
            if ($proyek) $proyek->where($sektorfilter[0], request("sektor"));
            if ($laporan) $laporan->where($sektorfilter[1], request("sektor"));
        }
        if (request("mitra")) {
            if ($laporan) $laporan->where($mitrafilter[0], request("mitra"));
            // if ($proyek) $proyek->where('mitra_id', request("mitra"));

        }
    }

    public function getPossibleYear($proyek = null, $mitra = null, $laporan = null, $selectOptions = ['tgl_awal', 'tgl_daftar', 'realisasi_date'])
    {
        $possibleYearProyek = collect();
        $possibleYearMitra = collect();
        $possibleYearLaporan = collect();

        if ($proyek) {
            $possibleYearProyek = $proyek->selectRaw('YEAR(' . $selectOptions[0] . ') as year')->distinct()->get()->pluck('year');
        }
        if ($mitra) {
            $possibleYearMitra = $mitra->selectRaw('YEAR(' . $selectOptions[1] . ') as year')->distinct()->get()->pluck('year');
        }
        if ($laporan) {
            $possibleYearLaporan = $laporan->selectRaw('YEAR(' . $selectOptions[2] . ') as year')->distinct()->get()->pluck('year');
        }
        $possibleYear = $possibleYearProyek->merge($possibleYearMitra)->merge($possibleYearLaporan)->unique();

        return $possibleYear;
    }

    public function getRealisasiBy($laporan, $groupBy, $label, $relation, $useCount = false, $limit = 6, $noLimit = false, $labelAsRelation = false)
    {
        $realisasi = $laporan->get()->groupBy($groupBy)->map(function ($item) use ($useCount, $label, $relation, $labelAsRelation) {
            $result = [
                'total' => $item->sum('realisasi')
            ];
            if ($useCount) {
                $result['count'] = $item->count();
            }
            if ($labelAsRelation) {
                $result[$label] = $item->first()->$label->$relation;
            } else {
                $result[$label] = $item->first()->$relation;
            }
            return $result;
        });

        if (!$noLimit) {
            $newRealisasi = $realisasi->take($limit)->values();
            if ($realisasi->count() > $limit) {
                $totalSum = $realisasi->sum('total');
                $topSixSum = $realisasi->take($limit)->sum('total');
                $data = [
                    $label => 'Lainnya',
                    'total' => $totalSum - $topSixSum
                ];
                if ($useCount) {
                    $countSum = $realisasi->sum('count');
                    $countSixSum = $realisasi->take($limit)->sum('count');
                    $data['count'] = $countSum - $countSixSum;
                }

                $newRealisasi->push($data);
            }
        } else {
            $newRealisasi = $realisasi->values();
        }

        return $newRealisasi;
    }

    public function downloadPDF()
    {
        $proyek = Proyek::where('status', 'Terbit');
        $mitra = Mitra::where('status', '!=', 'Pengajuan');
        $laporan = Laporan::where('status', 'Diterima');

        $this->applyFilters($proyek, $mitra, $laporan);

        $kuartalOptions = [
            1 => "Kuartal 1 (Januari, Februari, Maret)",
            2 => "Kuartal 2 (April, Mei, Juni)",
            3 => "Kuartal 3 (Juli, Agustus, September)",
            4 => "Kuartal 4 (Oktober, November, Desember)",
        ];

        $pdf = Pdf::loadView('pdfs.dashboard', [
            'filters' => [
                'tahun' => request("tahun"),
                'kuartal' => request("kuartal") ? $kuartalOptions[request("kuartal")] : null,
                'sektor' => request("sektor") ? Sektor::find(request("sektor")) : null,
                'mitra' => request("mitra") ? Mitra::find(request("mitra")) : null,
            ],
            'counts' => [
                'countProyek' => $proyek->count(),
                'countProyekRealized' => $laporan->count(),
                'countMitra' => $mitra->count(),
                'countTotalDanaRealized' => $laporan->sum('realisasi'),
            ],
            'realisasi' => [
                'dataCSR' => $this->getRealisasiBy($laporan, 'sektor_id', 'sektor', 'name', true, null, true, true)->values(),
                'persenTotalMitra' => $this->getRealisasiBy($laporan, 'mitra_id', 'mitra', 'name', null, null, true, true)->values(),
                'persenTotalKecamatan' => $this->getRealisasiBy($laporan, 'lokasi', 'kecamatan', 'lokasi', null, null, true)->values(),
            ],
        ]);

        return $pdf->download(date('Y-m-d') . '-dashboard.pdf');
    }

    public function downloadCSV()
    {
        $proyek = Proyek::where('status', 'Terbit')->get();
        $mitra = Mitra::where('status', '!=', 'Pengajuan')->get();
        $laporan = Laporan::where('status', 'Diterima')->get();

        $this->applyFilters($proyek, $mitra, $laporan);

        $csvDataProyek = $this->generateCSVData($proyek, [
            'ID',
            'Sektor ID',
            'Name',
            'Kecamatan',
            'Deskripsi',
            'Status',
            'Tgl Awal',
            'Tgl Akhir',
            'Tgl Terbit',
        ], [
            'id',
            'sektor_id',
            'name',
            'kecamatan',
            'deskripsi',
            'status',
            'tgl_awal',
            'tgl_akhir',
            'tgl_terbit'
        ]);

        $csvDataMitra = $this->generateCSVData($mitra, [
            'ID',
            'Name',
            'Perusahaan',
            'No Telepon',
            'Alamat',
            'Email',
            'Deskripsi',
            'Tgl Daftar',
            'Status'
        ], [
            'id',
            'name',
            'perusahaan',
            'no_telepon',
            'alamat',
            'email',
            'deskripsi',
            'tgl_daftar',
            'status'
        ]);

        $csvDataLaporan = $this->generateCSVData($laporan, [
            'ID',
            'Name',
            'Mitra ID',
            'Sektor ID',
            'Proyek ID',
            'Lokasi',
            'Realisasi',
            'Realisasi Date',
            'Deskripsi',
            'Tgl Kirim',
            'Status',
        ], [
            'id',
            'name',
            'mitra_id',
            'sektor_id',
            'proyek_id',
            'lokasi',
            'realisasi',
            'realisasi_date',
            'deskripsi',
            'created_at',
            'status'
        ]);

        $zipFileName = 'data-' . date('Y-m-d-H-i-s') . '.zip';
        $zip = new ZipArchive;

        if ($zip->open(storage_path($zipFileName), ZipArchive::CREATE) === TRUE) {
            $zip->addFromString('proyek.csv', $csvDataProyek);
            $zip->addFromString('mitra.csv', $csvDataMitra);
            $zip->addFromString('laporan.csv', $csvDataLaporan);
            $zip->close();
        }

        return response()->download(storage_path($zipFileName))->deleteFileAfterSend(true);
    }

    public function generateCSVData($data, $headers, $columnNames)
    {
        $csvData = implode(',', $headers) . "\n";

        foreach ($data as $item) {
            $row = [];
            foreach ($columnNames as $column) {
                $value = $item->$column ?? '';
                $value = str_replace(["\r", "\n"], ' ', $value);
                $row[] = '"' . str_replace('"', '""', $value) . '"';
            }
            $csvData .= implode(',', $row) . "\n";
        }

        return $csvData;
    }
}
