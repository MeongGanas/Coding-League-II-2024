<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use ZipArchive;

class MasyarakatController extends Controller
{
    public function home()
    {
        $proyek = Proyek::where('status', 'Terbit');
        $mitra = Mitra::where('status', '!=', 'Pengajuan');
        $laporan = Laporan::where('status', 'Diterima');

        return Inertia::render('Masyarakat/Home', [
            'kegiatans' => Kegiatan::where('status', 'Terbit')->latest()->take(4)->get(),
            'mitras' => Mitra::where('status', 'Aktif')->orderBy('tgl_daftar', 'desc')->take(10)->select('name', 'image', 'tgl_daftar')->get(),
            'laporans' => Laporan::with('mitra')->where('status', 'Diterima')->orderBy('tgl_kirim')->take(4)->get(),
            'sektors' => Sektor::latest()->take(6)->get(),
            'counts' => [
                'countProyek' => $proyek->count(),
                'countProyekRealized' => $laporan->count(),
                'countMitra' => $mitra->count(),
                'countTotalDanaRealized' => $laporan->sum('realisasi'),
            ],
        ]);
    }

    public function statistik()
    {
        $proyek = Proyek::where('status', 'Terbit');
        $mitra = Mitra::where('status', '!=', 'Pengajuan');
        $laporan = Laporan::where('status', 'Diterima');

        $this->applyFilters($proyek, $mitra, $laporan);

        return Inertia::render('Masyarakat/Statistik', [
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
            ]
        ]);
    }

    private function applyFilters($proyek = null, $mitra = null, $laporan = null)
    {
        if (request("tahun")) {
            $tahun = request("tahun");
            if ($proyek) $proyek->whereYear('tgl_awal', $tahun);
            if ($mitra) $mitra->whereYear('tgl_daftar', $tahun);
            if ($laporan) $laporan->whereYear('realisasi_date', $tahun);
        }
        if (request("kuartal")) {
            $kuartal = request("kuartal");
            if ($proyek) $proyek->whereRaw('QUARTER(tgl_awal) = ?', $kuartal);
            if ($mitra) $mitra->whereRaw('QUARTER(tgl_daftar) = ?', $kuartal);
            if ($laporan) $laporan->whereRaw('QUARTER(realisasi_date) = ?', $kuartal);
        }
        if (request("sektor")) {
            if ($proyek) $proyek->where('sektor_id', request("sektor"));
            if ($laporan) $laporan->where('sektor_id', request("sektor"));
        }
        if (request("mitra")) {
            if ($laporan) $laporan->where('mitra_id', request("mitra"));
            // if ($proyek) $proyek->where('mitra_id', request("mitra"));
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

    private function getRealisasiBy($laporan, $groupBy, $label, $relation, $useCount = false, $limit = 6, $noLimit = false)
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
                // 'sektor' => request("sektor") ?? Sektor::find(request("sektor")) get the name
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
                'dataCSR' => $this->getRealisasiBy($laporan, 'sektor_id', 'sektor', 'name', true, null, true)->values(),
                'persenTotalMitra' => $this->getRealisasiBy($laporan, 'mitra_id', 'mitra', 'name', null, null, true)->values(),
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
            'Proyek Name',
            'Mitra ID',
            'Sektor ID',
            'Proyek ID',
            'Lokasi',
            'Realisasi',
            'Realisasi Date',
            'Rincian',
            'Tgl Kirim',
            'Status',
        ], [
            'id',
            'name',
            'proyek_name',
            'mitra_id',
            'sektor_id',
            'proyek_id',
            'lokasi',
            'realisasi',
            'realisasi_date',
            'rincian',
            'tgl_kirim',
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

    private function generateCSVData($data, $headers, $columnNames)
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

    public function about()
    {
        return Inertia::render('Masyarakat/Tentang/Index', [
            'laporans' => Laporan::where('status', 'Diterima')->with('mitra')->take(3)->get()
        ]);
    }
    public function pengajuan()
    {
        return Inertia::render('Masyarakat/Tentang/Pengajuan');
    }

    public function sektor()
    {
        $proyek = Proyek::query()->where('status', 'Terbit');

        if (request("sektor")) {
            $proyek->where('sektor_id', request("sektor"));
        }

        if (request("search")) {
            $searchTerm = request("search");

            $proyek->where('name', 'like', '%' . $searchTerm . '%');
        }

        return Inertia::render('Masyarakat/Sektor/Index', [
            'sektors' => Sektor::with(['proyeks' => function ($query) {
                $query->where('status', 'Terbit');
            }])->latest()->get(),
            'proyeks' => $proyek->with('sektor')->latest()->get(),
        ]);
    }
    public function sektorDetail(Sektor $sektor)
    {
        $sektor->load(['proyeks' => function ($query) {
            $query->where('status', 'Terbit');
        }]);

        return Inertia::render('Masyarakat/Sektor/Detail', [
            'sektor' => $sektor
        ]);
    }
    public function sektorProyek(Proyek $proyek)
    {
        $proyek->load(['sektor',  'partisipasi.mitra.laporan' => function ($query) use ($proyek) {
            $query->where('proyek_id', $proyek->id);
        }]);

        return Inertia::render('Masyarakat/Sektor/Proyek', [
            'proyek' => $proyek
        ]);
    }

    public function laporan()
    {
        $query = Laporan::query()->where('status', 'Diterima');

        if (request("sortall") == "terlama") {
            $query->orderBy('tgl_kirim', 'asc');
        } else {
            $query->orderBy('tgl_kirim', 'desc');
        }

        if (request("mitra")) {
            $query->where('mitra_id', request("mitra"));
        }

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        return Inertia::render('Masyarakat/Laporan/Index', [
            'laporans' => $query->with('mitra')->get(),
            'mitras' => Mitra::where('status', 'Aktif')->get()
        ]);
    }
    public function laporanDetail(Laporan $laporan)
    {
        $laporan->load('mitra');
        $laporan->load('sektor');

        return Inertia::render('Masyarakat/Laporan/Detail', [
            'laporan' => $laporan,
            'laporanLainnya' => Laporan::where('id', '!=', $laporan->id)->where('status', 'Diterima')->with('mitra')->take(3)->get()
        ]);
    }

    public function kegiatan()
    {
        $query = Kegiatan::query()->where('status', 'Terbit');

        if (request("sortall") == "terlama") {
            $query->orderBy('tgl_terbit', 'asc');
        } else {
            $query->orderBy('tgl_terbit', 'desc');
        }

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        return Inertia::render('Masyarakat/Kegiatan/Index', [
            'kegiatans' => $query->get()
        ]);
    }
    public function kegiatanDetail(Kegiatan $kegiatan)
    {
        return Inertia::render('Masyarakat/Kegiatan/Detail', [
            'kegiatan' => $kegiatan,
            'kegiatanLainnya' => Kegiatan::where('id', '!=', $kegiatan->id)->where('status', 'Terbit')->latest()->take(3)->get()
        ]);
    }

    public function mitra()
    {
        $query = Mitra::withCount(['laporan as terbit_count' => function ($query) {
            $query->where('status', 'Diterima');
        }])->where('status', 'Aktif');

        if (request("sortall") == "tersedikit") {
            $query->orderBy('terbit_count', 'asc');
        } else {
            $query->orderBy('terbit_count', 'desc');
        }

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('perusahaan', 'like', '%' . $searchTerm . '%');
        }

        return Inertia::render('Masyarakat/Mitra/Index', [
            'mitras' => $query->get()
        ]);
    }
    public function mitraDetail(Mitra $mitra)
    {
        $mitra->load(['laporan' => function ($query) {
            $query->where('status', 'Diterima')->limit(3);
        }]);

        return Inertia::render('Masyarakat/Mitra/Detail', [
            'mitra' => $mitra
        ]);
    }
}
