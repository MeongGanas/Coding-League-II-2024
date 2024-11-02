<?php
// TODO: refactir this controller, use dashboardController function instead to filter etc

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Partisipasi;
use App\Models\Proyek;
use App\Models\Sektor;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use ZipArchive;

class DashboardMitraController extends Controller
{
    public function index()
    {
        // $proyek = Laporan::where('mitra_id', Auth::user()->mitra->id);
        $laporan = Laporan::where('status', 'Diterima')->where('mitra_id', Auth::user()->mitra->id);
        $proyek = Laporan::where('mitra_id', Auth::user()->mitra->id);

        $dashboardFunction = new DashboardController();
        $possibleYear = $dashboardFunction->getPossibleYear(clone $proyek, null, clone $laporan, ['realisasi_date', 'tgl_daftar', 'realisasi_date']);
        $dashboardFunction->applyFilters($proyek, null,  $laporan, ['realisasi_date', 'tgl_daftar', 'realisasi_date']);

        $secondQuery = Laporan::query();

        if (request('search')) {
            $search = request('search');
            $secondQuery->where('name', 'like', '%' . $search . '%');
        }

        if (request("sort")) {
            $sort = request("sort");
            $order = request("order") ?? 'asc';
            if (request("with")) {
                $relationTable = $sort . 's';
                $relationColumn = request("with");
                $secondQuery->join($relationTable, 'laporans.' . $sort . '_id', '=', $relationTable . '.id')
                    ->orderBy($relationTable . '.' . $relationColumn, $order)
                    ->select('laporans.*');
            } else {
                $secondQuery->orderBy($sort, $order);
            }
        } else {
            $secondQuery->orderBy('updated_at', 'desc');
        }


        return Inertia::render('Mitra/Dashboard', [
            'notifications' => Auth::user()->notifications->take(5),
            'counts' => [
                'countProyek' => $proyek->distinct('proyek_id')->count('proyek_id'),
                // 'countProyek' => $proyek->count(),
                'countProyekRealized' => $laporan->count(),
                'countTotalDanaRealized' => $laporan->sum('realisasi'),
            ],
            'realisasi' => [
                'dataCSR' => $dashboardFunction->getRealisasiBy($laporan, 'sektor_id', 'sektor', 'name', true, 6, null, true)->values(),
                'persenTotalKecamatan' => $dashboardFunction->getRealisasiBy($laporan, 'lokasi', 'kecamatan', 'lokasi', null, 6, null, false)->values(),
            ],
            'filters' => [
                'tahun' => $possibleYear->values(),
                'search' => request('search'),
            ],
            'laporans' => $secondQuery->latest()->paginate(5)
        ]);
    }

    public function downloadPDF()
    {
        $laporan = Laporan::where('mitra_id', Auth::user()->mitra->id)->where('status', 'Diterima');
        $proyek = Laporan::where('mitra_id', Auth::user()->mitra->id);

        $dashboardFunction = new DashboardController();
        $dashboardFunction->applyFilters($proyek, null,  $laporan, ['realisasi_date', 'tgl_daftar', 'realisasi_date']);

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
                'mitra' => Auth::user()->mitra,
            ],
            'counts' => [
                'countProyek' => $proyek->distinct('proyek_id')->count('proyek_id'),
                // 'countProyek' => $proyek->count(),
                'countProyekRealized' => $laporan->count(),
                'countTotalDanaRealized' => $laporan->sum('realisasi'),
            ],
            'realisasi' => [
                'dataCSR' => $dashboardFunction->getRealisasiBy($laporan, 'sektor_id', 'sektor', 'name', true, null, true, true)->values(),
                'persenTotalKecamatan' => $dashboardFunction->getRealisasiBy($laporan, 'lokasi', 'kecamatan', 'lokasi', null, null, true)->values(),
            ],
        ]);

        return $pdf->download(date('Y-m-d') . '-mitra-dashboard.pdf');
    }

    public function downloadCSV()
    {
        $laporan = Laporan::where('status', 'Diterima')->where('mitra_id', Auth::user()->mitra->id)->get();
        $proyek = $laporan->map(function ($item) {
            return $item->proyek;
        });
        $dashboardFunction = new DashboardController();

        $dashboardFunction->applyFilters($proyek, null, $laporan);

        $csvDataProyek = $dashboardFunction->generateCSVData($proyek, [
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

        $csvDataLaporan = $dashboardFunction->generateCSVData($laporan, [
            'ID',
            'Name',
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
            'mitra_id',
            'sektor_id',
            'proyek_id',
            'lokasi',
            'realisasi',
            'realisasi_date',
            'rincian',
            'created_at',
            'status'
        ]);

        $zipFileName = 'data-mitra-' . date('Y-m-d-H-i-s') . '.zip';
        $zip = new ZipArchive;

        if ($zip->open(storage_path($zipFileName), ZipArchive::CREATE) === TRUE) {
            $zip->addFromString('proyek.csv', $csvDataProyek);
            $zip->addFromString('laporan.csv', $csvDataLaporan);
            $zip->close();
        }

        return response()->download(storage_path($zipFileName))->deleteFileAfterSend(true);
    }

    public function CreateLaporan()
    {
        return Inertia::render('Mitra/Laporan/Create', [
            'sektors' => Sektor::latest()->get(),
            'proyeks' => Proyek::where('status', 'Terbit')->latest()->get(),
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }

    public function LaporanDetail(Laporan $laporan)
    {
        $laporan->load(['sektor', 'proyek']);

        return Inertia::render('Mitra/Laporan/Detail', [
            'laporan' => $laporan,
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }

    public function LaporanEdit(Laporan $laporan)
    {
        return Inertia::render('Mitra/Laporan/Edit', [
            'laporan' => $laporan,
            'sektors' => Sektor::latest()->get(),
            'proyeks' => Proyek::where('status', 'Terbit')->latest()->get(),
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }

    public function profilePerusahaan()
    {
        return Inertia::render('Mitra/Profile/Perusahaan/Index', [
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }
    public function editProfilePerusahaan(Mitra $mitra)
    {
        return Inertia::render('Mitra/Profile/Perusahaan/Edit', [
            'notifications' => Auth::user()->notifications->take(5),
            'mitra' => $mitra
        ]);
    }

    public function profileUser()
    {
        return Inertia::render('Mitra/Profile/User/Index', [
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }
    public function editProfileUser()
    {
        return Inertia::render('Mitra/Profile/User/Edit', [
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }
}
