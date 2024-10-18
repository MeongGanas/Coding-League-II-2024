<!DOCTYPE html>
<html>

<head>
    <title>Proyeks PDF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        .card {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
            margin-top: 0;
            color: #333;
        }

        .card p {
            margin: 5px 0;
            color: #555;
        }

        .card .label {
            font-weight: bold;
            color: #333;
        }
    </style>
</head>

<body>
    <h1>Proyek</h1>
    <p>{{ date('Y-m-d H:i:s') }}</p>
    @foreach($proyeks as $proyek)
    <div class="card">
        <h3>{{ $proyek->name }}</h3>
        <p><span class="label">ID:</span> {{ $proyek->id }}</p>
        <p><span class="label">Sektor:</span> {{ $proyek->sektor->name }}</p>
        <p><span class="label">Kecamatan:</span> {{ $proyek->kecamatan }}</p>
        <p><span class="label">Deskripsi:</span> {{ $proyek->deskripsi }}</p>
        <p><span class="label">Status:</span> {{ $proyek->status }}</p>
        <p><span class="label">Tanggal Awal:</span> {{ $proyek->tgl_awal }}</p>
        <p><span class="label">Tanggal Akhir:</span> {{ $proyek->tgl_akhir }}</p>
        @if($proyek->status == 'Terbit')
        <p><span class="label">Tanggal Terbit:</span> {{ $proyek->tgl_terbit }}</p>
        @endif
    </div>
    @endforeach
</body>

</html>
