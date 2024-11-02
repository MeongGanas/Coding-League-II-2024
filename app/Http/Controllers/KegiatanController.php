<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Http\Requests\StoreKegiatanRequest;
use App\Http\Requests\UpdateKegiatanRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Kegiatan::latest();

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        if (request("category")) {
            $query->where('status', request("category"));
        }

        if (request("sort")) {
            $sort = request("sort");
            $order = request("order") ?? 'asc';
            $query->orderBy($sort, $order);
        }



        $paginate = request("paginate") ?? 5;

        $items = $query->paginate($paginate);

        $items->getCollection()->transform(function ($item) {
            $item->deskripsi = strip_tags($item->deskripsi);
            $item->deskripsi = mb_strimwidth($item->deskripsi, 0, 200, '...');
            $item->deskripsi = str_replace(["\r", "\n", "&nbsp;"], ' ', $item->deskripsi);
            return $item;
        });
        return Inertia::render('Admin/Kegiatan/Index', [
            'notifications' => Auth::user()->notifications->take(5),
            'kegiatans' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Kegiatan/Create', [
            'notifications' => Auth::user()->notifications->take(5),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $v = $request->validate([
            'image' => 'required',
            'name' => 'required',
            'deskripsi' => 'required',
            'status' => 'required',
            'tags' => 'required|array',
        ]);

        $v['image'] = $request->file('image')->store('kegiatan_image', 'public');
        if ($v['status'] === 'Terbit') {
            $v['tgl_terbit'] = now();
        }

        Kegiatan::create($v);

        return redirect()->intended(route('kegiatan.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Kegiatan $kegiatan)
    {
        return Inertia::render('Admin/Kegiatan/Detail', [
            'notifications' => Auth::user()->notifications->take(5),
            'kegiatan' => $kegiatan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kegiatan $kegiatan)
    {
        return Inertia::render('Admin/Kegiatan/Edit', [
            'notifications' => Auth::user()->notifications->take(5),
            'kegiatan' => $kegiatan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kegiatan $kegiatan)
    {

        $v = $request->validate([
            'image' => 'nullable',
            'name' => 'required',
            'deskripsi' => 'required',
            'status' => 'required',
            'tags' => 'required|array',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($kegiatan->image);
            $v['image'] = $request->file('image')->store('kegiatan_image', 'public');
        } else {
            $v['image'] = $kegiatan->image;
        }

        if ($v['status'] === 'Terbit') {
            $v['tgl_terbit'] = now();
        } else {
            $v['tgl_terbit'] = null;
        }

        $kegiatan->update($v);

        return redirect()->intended(route('kegiatan.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        //
    }
}
