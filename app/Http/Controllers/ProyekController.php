<?php

namespace App\Http\Controllers;

use App\Models\Proyek;
use App\Models\Sektor;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Proyek::latest();

        $possibleYear = Proyek::selectRaw('YEAR(tgl_awal) as year')
            ->distinct()
            ->get()
            ->pluck('year');

        if (request("tahun")) {
            $query->whereYear('tgl_awal', request("tahun"));
        }

        if (request("sektor")) {
            $query->where('sektor_id', request("sektor"));
        }

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('kecamatan', 'like', '%' . $searchTerm . '%')
                ->orWhere('deskripsi', 'like', '%' . $searchTerm . '%');
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        $paginate = request("paginate") ?? 5;

        $proyeks = $query->paginate($paginate);

        return Inertia::render('Admin/Proyek/Index', [
            'proyeks' => $proyeks,
            'sektors' => Sektor::latest()->get(),
            'possibleYear' => $possibleYear
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Proyek/Create', [
            'sektors' => Sektor::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $v = $request->validate([
            'name' => 'required|string|min:2',
            'sektor_id' => 'required|string|exists:sektors,id',
            'deskripsi' => 'required|string|min:5',
            'kecamatan' => 'required|string',
            'status' => 'required|string|in:terbit,draf',
            'image' => 'required|file',
            'tgl_awal' => 'required|string',
        ]);

        if ($request->tgl_akhir) {
            $v['tgl_akhir'] = $request->tgl_akhir;
        }

        $v['image'] = $request->file('image')->store('proyek_image', 'public');

        Proyek::create($v);

        return redirect()->intended(route('proyek.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Proyek $proyek)
    {
        return Inertia::render('Admin/Proyek/Detail', [
            'proyek' => $proyek
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Proyek $proyek)
    {
        $proyek->update(['status' => 'terbit']);

        return redirect()->intended(route('proyek.index'));
    }

    public function downloadCSV()
    {
        $proyeks = Proyek::all();

        $filename = date('Y-m-d') . '-proyek.csv';

        $handle = fopen($filename, 'w+');

        fputcsv($handle, ['ID', 'Sektor ID', 'Name', 'Kecamatan', 'Deskripsi', 'Image', 'Status', 'Tanggal Awal', 'Tanggal Akhir']);

        foreach ($proyeks as $proyek) {
            fputcsv($handle, [
                $proyek->id,
                $proyek->sektor_id,
                $proyek->name,
                $proyek->kecamatan,
                $proyek->deskripsi,
                $proyek->image,
                $proyek->status,
                $proyek->tgl_awal,
                $proyek->tgl_akhir
            ]);
        }

        fclose($handle);

        $headers = [
            'Content-Type' => 'text/csv'
        ];

        return response()->download($filename, 'proyek.csv', $headers);
    }

    public function downloadPDF()
    {
        $proyeks = Proyek::all();

        $pdf = Pdf::loadView('pdfs.proyeks', compact('proyeks'));

        return $pdf->download(date('Y-m-d') . '-proyek.pdf');
    }
}
