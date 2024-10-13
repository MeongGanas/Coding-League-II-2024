<?php

namespace App\Http\Controllers;

use App\Models\Sektor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SektorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Sektor::latest();

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('deskripsi', 'like', '%' . $searchTerm . '%');
        }

        $paginate = request("paginate") ?? 5;

        $sektors = $query->paginate($paginate);

        return Inertia::render('Admin/Sektor/Index', [
            'sektors' => $sektors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Sektor/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $v = $request->validate([
            'image' => 'required|file',
            'name' => 'required|string|min:2|max:255',
            'deskripsi' => 'required|string'
        ]);

        $v['image'] = $request->file('image')->store('sektor_image', 'public');

        Sektor::create($v);

        return redirect()->intended(route('sektor.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Sektor $sektor)
    {
        return Inertia::render('Admin/Sektor/Detail', [
            'sektor' => $sektor
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sektor $sektor)
    {
        return Inertia::render('Admin/Sektor/Edit', [
            'sektor' => $sektor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sektor $sektor)
    {
        $v = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'deskripsi' => 'required|string|min:5',
        ]);

        if ($request->has('image')) {
            Storage::delete($sektor->image);
            $v['image'] = $request->file('image')->store('sektor_image', 'public');
        }

        $sektor->update($v);

        return redirect()->intended(route('sektor.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sektor $sektor)
    {
        //
    }
}
