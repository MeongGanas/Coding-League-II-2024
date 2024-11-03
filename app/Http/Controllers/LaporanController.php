<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Partisipasi;
use App\Models\User;
use App\Notifications\generalDatabaseNotification;
use App\Notifications\StatusNotification;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Laporan::latest()->with('mitra');

        $possibleYear = Laporan::selectRaw('YEAR(realisasi_date) as year')
            ->distinct()
            ->get()
            ->pluck('year');

        if (request("tahun")) {
            $query->whereYear('realisasi_date', request("tahun"));
        }

        if (request("kuartal")) {
            $kuartal = request("kuartal");
            $query->whereRaw('QUARTER(realisasi_date) = ?', $kuartal);
        }

        if (request("search")) {
            $searchTerm = request("search");
            $query->where('mitras.name', 'like', '%' . $searchTerm . '%')
                ->orWhere('laporans.name', 'like', '%' . $searchTerm . '%');
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        // if it works, don't touch it
        if (request("sort")) {
            $sort = request("sort");
            $order = request("order") ?? 'asc';
            if (request("with")) {
                $relationTable = $sort . 's';
                $relationColumn = request("with");
                $query->join($relationTable, 'laporans.' . $sort . '_id', '=', $relationTable . '.id')
                    ->orderBy($relationTable . '.' . $relationColumn, $order)
                    ->select('laporans.*');
            } else {
                $query->orderBy($sort, $order);
            }
        } else {
            $query->orderBy('updated_at', 'desc');
        }

        $paginate = request("paginate") ?? 5;

        $items = $query->paginate($paginate);

        return Inertia::render('Admin/Laporan/Index', [
            'notifications' => Auth::user()->notifications->take(5),
            'laporans' => $items,
            'possibleYear' => $possibleYear
        ]);
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'name' => 'required|string|min:2',
            'realisasi' => 'required|string',
            'proyek_id' => 'required|string|exists:proyeks,id',
            'sektor_id' => 'required|string|exists:sektors,id',
            'rincian' => 'required|string',
            'status' => 'required|string',
            'lokasi' => 'required|string',
            'realisasi_date' => 'required|string'
        ]);

        $v['mitra_id'] = $request->user()->mitra->id;

        $imagesFile = $request->file('images');

        $imagesPath = [];

        foreach ($imagesFile as $image) {
            $imagesPath[] = $image->store('laporan_image', 'public');
        }

        $v['photos'] = $imagesPath;

        $laporan = Laporan::create($v);

        $notification = new generalDatabaseNotification(
            'Laporan ' . strtolower($v['name']),
            $request->user()->mitra->name,
            'Laporan baru!',
            'info',
            url('/admin/laporan/' . $laporan->id)
        );
        $admins = User::where('role', 'admin')->get();
        Notification::send($admins, $notification);


        return redirect()->intended(route('dashboardMitra'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan)
    {
        return Inertia::render('Admin/Laporan/Detail', [
            'notifications' => Auth::user()->notifications->take(5),
            'laporan' => $laporan->load(['mitra', 'sektor', 'proyek'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Laporan $laporan)
    {
        $v = $request->validate([
            'name' => 'required|string|min:2',
            'realisasi' => 'required|string',
            'proyek_id' => 'required|string|exists:proyeks,id',
            'sektor_id' => 'required|string|exists:sektors,id',
            'rincian' => 'required|string',
            'status' => 'required|string',
            'lokasi' => 'required|string',
            'realisasi_date' => 'required|string'
        ]);

        if ($request->hasFile('images')) {
            $imagesFile = $request->file('images');

            $imagesPath = [];

            foreach ($imagesFile as $image) {
                $imagesPath[] = $image->store('laporan_image', 'public');
            }

            $v['photos'] = $imagesPath;
        }

        $laporan->update($v);

        $notification = new generalDatabaseNotification(
            'Laporan ' . strtolower($v['name']),
            $request->user()->mitra->name,
            'Laporan diperbarui!',
            'info',
            url('/admin/laporan/' . $laporan->id)
        );

        $admins = User::where('role', 'admin')->get();
        Notification::send($admins, $notification);

        return redirect()->intended(route('dashboardMitra'));
    }

    public function updateStatus(Request $request, Laporan $laporan)
    {
        $laporan->update([
            'status' => $request->status,
            'pesan' => $request->message
        ]);

        if ($request->status === "Diterima") {
            Partisipasi::create([
                'proyek_id' => $laporan->proyek_id,
                'mitra_id' => $laporan->mitra_id
            ]);
        }

        $notification = new StatusNotification(
//            ['mail', 'database'],
            ['database'],
            $laporan->mitra->user,
            $request->status,
            $request->message,
            $laporan,
            Auth::user()->id
        );
        Notification::send($laporan->mitra->user, $notification);

        return redirect()->intended(route('laporan.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        foreach ($laporan->photos as $image) {
            Storage::delete($image);
        }

        $laporan->delete();

        return redirect()->intended(route('dashboardMitra'));
    }

    public function downloadCSV()
    {
        $query = Laporan::query();

        if (request("tahun")) {
            $query->whereYear('realisasi_date', request("tahun"));
        }

        if (request("kuartal")) {
            $kuartal = request("kuartal");
            $query->whereRaw('QUARTER(realisasi_date) = ?', $kuartal);
        }

        $laporans = $query->get();

        $csvData[] = [
            'ID',
            'Name',
            'Proyek Name',
            'Mitra ID',
            'Lokasi',
            'Realisasi',
            'Realisasi Date',
            'Rincian',
            'Tgl Kirim',
            'Status',
        ];

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
                $laporan->created_at,
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
        $query = Laporan::query();

        if (request("tahun")) {
            $query->whereYear('realisasi_date', request("tahun"));
        }

        if (request("kuartal")) {
            $kuartal = request("kuartal");
            $query->whereRaw('QUARTER(realisasi_date) = ?', $kuartal);
        }

        $laporans = $query->get();

        $pdf = Pdf::loadView('pdfs.laporans', compact('laporans'));

        return $pdf->download(date('Y-m-d') . '-laporan.pdf');
    }
}
