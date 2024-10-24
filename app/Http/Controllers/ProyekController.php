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
        $query = Proyek::with(['sektor', 'partisipasi'])->latest();

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('kecamatan', 'like', '%' . $searchTerm . '%')
                ->orWhere('deskripsi', 'like', '%' . $searchTerm . '%');
        }

        if (request("sektor")) {
            $query->where('sektor_id', request("sektor"));
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        if (request("sort")) {
            $sort = request("sort");
            $order = request("order") ?? 'asc';
            $query->orderBy($sort, $order);
        }

        $possibleYearQuery = clone $query;
        $possibleYearQuery->getQuery()->orders = null;
        $possibleYear = $possibleYearQuery->selectRaw('YEAR(tgl_awal) as year')
            ->distinct()
            ->get()
            ->pluck('year');

        if (request("tahun")) {
            $query->whereYear('tgl_awal', request("tahun"));
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

        if ($request->status == 'terbit') {
            $v['tgl_terbit'] = now();
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
        $proyek->load(['sektor',  'partisipasi.mitra.laporan' => function ($query) use ($proyek) {
            $query->where('proyek_id', $proyek->id);
        }]);

        return Inertia::render('Admin/Proyek/Detail', [
            'proyek' => $proyek
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Proyek $proyek)
    {
        $proyek->update(['status' => 'terbit', 'tgl_terbit' => now()]);

        return redirect()->intended(route('proyek.index'));
    }

    public function downloadCSV()
    {
        $query = Proyek::query();

        if (request("sektor")) {
            $query->where('sektor_id', request("sektor"));
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        $proyeks = $query->get();

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
                $proyek->tgl_akhir,
                $proyek->tgl_terbit,
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
        $query = Proyek::query();

        if (request("sektor")) {
            $query->where('sektor_id', request("sektor"));
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        $proyeks = $query->get();

        $pdf = Pdf::loadView('pdfs.proyeks', compact('proyeks'));

        return $pdf->download(date('Y-m-d') . '-proyek.pdf');
    }
}
