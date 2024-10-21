<?php

namespace App\Http\Controllers;

use App\Models\Mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Mitra::query();

        if (request("sortall") == "terlama") {
            $query->oldest();
        } else {
            $query->latest();
        }

        if (request("search")) {
            $searchTerm = request("search");

            $query->where('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('perusahaan', 'like', '%' . $searchTerm . '%')
                ->orWhere('deskripsi', 'like', '%' . $searchTerm . '%');
        }

        if (request("sort")) {
            $sort = request("sort");
            $order = request("order") ?? 'asc';
            $query->orderBy($sort, $order);
        }

        $paginate = request("paginate") ?? 5;

        $mitras = $query->paginate($paginate);

        return Inertia::render('Admin/Mitra/Index', [
            'mitras' => $mitras,
        ]);
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
            'name' => 'string|min:3',
            'perusahaan' => 'required|string|min:3',
            'no_telepon' => 'string|min:3',
            'alamat' => 'string|min:3',
            'email' => 'required|string|min:3',
            'deskripsi' => 'string|min:5',
        ]);

        $v['status'] = 'Non-Aktif';

        if ($request->file('image')) {
            $v['image'] = $request->file('image')->store('mitra_image', 'public');
        }

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
            'name' => 'string|min:3',
            'no_telepon' => 'string|min:3',
            'email' => [
                'required',
                'email',
                Rule::unique('mitras')->ignore($mitra->id),
            ],
            'alamat' => 'required|string|min:3',
            'perusahaan' => 'required|string|min:3',
            'deskripsi' => 'string|min:5',
        ]);

        if ($request->file('image')) {
            Storage::delete($mitra->image);
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

    public function toggleStatus(Mitra $mitra)
    {
        $status = $mitra->status == 'Aktif' ? 'Non-Aktif' : 'Aktif';

        $mitra->update(['status' => $status]);

        return redirect()->intended(route('mitra.show', $mitra->id));
    }
}
