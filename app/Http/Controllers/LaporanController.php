<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Http\Requests\StoreLaporanRequest;
use App\Http\Requests\UpdateLaporanRequest;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Laporan::latest()->with('mitra');

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        $paginate = request("paginate") ?? 5;

        $items = $query->paginate($paginate);

        return Inertia::render('Admin/Laporan/Index', [
            'laporans' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLaporanRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan)
    {
        return Inertia::render('Admin/Laporan/Detail', [
            'laporan' => $laporan->load('mitra')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Laporan $laporan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLaporanRequest $request, Laporan $laporan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        //
    }

    public function downloadCSV()
    {
        $laporans = Laporan::all();

        $csvData = [];
        $csvData[] = ['ID', 'Name', 'Description', 'Realisasi', 'Realisasi Date']; // Add your column headers here

        foreach ($laporans as $laporan) {
            $csvData[] = [
                $laporan->id,
                $laporan->name,
                $laporan->proyek_name,
                $laporan->mitra_id,
                $laporan->lokasi,
                $laporan->realisasi,
                $laporan->realisasi_date,
                $laporan->rincian,
                $laporan->tgl_kirim,
                $laporan->status,
            ];
        }

        $filename = 'laporans.csv';
        $handle = fopen('php://output', 'w');
        ob_start();

        foreach ($csvData as $row) {
            fputcsv($handle, $row);
        }

        fclose($handle);
        $content = ob_get_clean();

        return Response::make($content, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename={$filename}",
        ]);
    }

    public function downloadPDF()
    {
        $laporans = Laporan::all();

        $pdf = FacadePdf::loadView('admin.laporans.pdf', compact('laporans'));

        return $pdf->download('laporans.pdf');
    }
}
