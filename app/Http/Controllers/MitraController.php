<?php

namespace App\Http\Controllers;

use App\Models\Mitra;
use App\Http\Requests\StoreMitraRequest;
use App\Http\Requests\UpdateMitraRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Mitra/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Mitra/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $v = $request->validate([
            'image' => 'required|file',
            'name' => 'required|string|min:3',
            'perusahaan' => 'required|string|min:3',
            'deskripsi' => 'required|string|min:5',
        ]);

        $v['image'] = $request->file('image')->store('mitra_image', 'public');

        Mitra::create($v);

        return redirect()->intended(route('mitra.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Mitra $mitra)
    {
        return Inertia::render('Admin/Mitra/Detail', [
            'mitra' => $mitra
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mitra $mitra)
    {
        return Inertia::render('Admin/Mitra/Edit', [
            'mitra' => $mitra
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mitra $mitra)
    {
        $v = $request->validate([
            'name' => 'required|string|min:3',
            'perusahaan' => 'required|string|min:3',
            'deskripsi' => 'required|string|min:5',
        ]);

        if ($request->file('image')) {
            $v['image'] = $request->file('image')->store('mitra_image', 'public');
        }

        $mitra->update($v);

        return redirect()->intended(route('mitra.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mitra $mitra)
    {
        //
    }
}
