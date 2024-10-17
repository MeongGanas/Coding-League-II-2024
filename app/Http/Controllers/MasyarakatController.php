<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\Mitra;
use App\Models\Proyek;
use App\Models\Sektor;
use Inertia\Inertia;

class MasyarakatController extends Controller
{
    public function home()
    {
        return Inertia::render('Masyarakat/Home', [
            'kegiatans' => Kegiatan::where('status', 'Terbit')->latest()->take(4)->get(),
            // 'proyeks' => Proyek::where('status', 'Terbit')->latest()->take(4)->get(),
            // 'mitras' => Mitra::latest()->take(4)->get(),
            'laporans' => Laporan::where('status', 'Diterima')->latest()->take(4)->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('Masyarakat/Tentang/Index');
    }
    public function pengajuan()
    {
        return Inertia::render('Masyarakat/Tentang/Pengajuan');
    }

    public function statistik()
    {
        return Inertia::render('Masyarakat/Statistik');
    }

    public function sektor()
    {
        return Inertia::render('Masyarakat/Sektor/Index', [
            'sektors' => Sektor::with('proyeks')->latest()->get(),
            'proyeks' => Proyek::where('status', 'Terbit')->with('sektor')->latest()->get(),
        ]);
    }
    public function sektorDetail(Sektor $sektor)
    {
        $sektor->load('proyeks');

        return Inertia::render('Masyarakat/Sektor/Detail', [
            'sektor' => $sektor
        ]);
    }
    public function sektorProyek(Proyek $proyek)
    {
        $proyek->load('sektor');

        return Inertia::render('Masyarakat/Sektor/Proyek', [
            'proyek' => $proyek
        ]);
    }

    public function laporan()
    {
        return Inertia::render('Masyarakat/Laporan/Index');
    }
    public function laporanDetail(Laporan $laporan)
    {
        return Inertia::render('Masyarakat/Laporan/Detail', [
            'laporan' => $laporan
        ]);
    }

    public function kegiatan()
    {
        return Inertia::render('Masyarakat/Kegiatan/Index', [
            'kegiatans' => Kegiatan::where('status', 'Terbit')->latest()->get()
        ]);
    }
    public function kegiatanDetail(Kegiatan $kegiatan)
    {
        return Inertia::render('Masyarakat/Kegiatan/Detail', [
            'kegiatan' => $kegiatan,
            'kegiatanLainnya' => Kegiatan::where('id', '!=', $kegiatan->id)->latest()->take(3)->get()
        ]);
    }

    public function mitra()
    {
        return Inertia::render('Masyarakat/Mitra/Index');
    }
    public function mitraDetail(Mitra $mitra)
    {
        return Inertia::render('Masyarakat/Mitra/Detail', [
            'mitra' => $mitra
        ]);
    }
}
