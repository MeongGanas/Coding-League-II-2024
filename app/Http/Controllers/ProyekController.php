<?php

namespace App\Http\Controllers;

use App\Models\Proyek;
use App\Http\Requests\StoreProyekRequest;
use App\Http\Requests\UpdateProyekRequest;
use App\Models\Sektor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Proyek/Index');
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
            'sektor_id' => 'required|string|exists:sektor,id',
            'deskripsi' => 'required|string|min:5',
            'kecamatan' => 'required|string',
            'image' => 'required|file',
            'tgl_awal' => 'required|string',
            'tgl_akhir' => 'required|string',
        ]);

        $v['image'] = $request->file('image')->store('proyek_image', 'public');

        Proyek::create($v);

        return redirect()->intended(route('proyek.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Proyek $proyek)
    {
        return Inertia::render('Admin/Proyek/Detail');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proyek $proyek)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proyek $proyek)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proyek $proyek)
    {
        //
    }
}
