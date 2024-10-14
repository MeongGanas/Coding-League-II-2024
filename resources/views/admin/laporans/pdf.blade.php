<!DOCTYPE html>
<html>

<head>
    <title>Laporans PDF</title>
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

        .card h2 {
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
    <h1>Laporans</h1>
    @foreach($laporans as $laporan)
    <div class="card">
        <h2>{{ $laporan->name }}</h2>
        <p><span class="label">ID:</span> {{ $laporan->id }}</p>
        <p><span class="label">Rincian:</span> {{ $laporan->rincian }}</p>
        <p><span class="label">Mitra:</span> {{ $laporan->mitra->perusahaan }}</p>
        <p><span class="label">Lokasi:</span> {{ $laporan->lokasi }}</p>
        <p><span class="label">Realisasi:</span> {{ $laporan->realisasi }}</p>
        <p><span class="label">Tanggal Realisasi:</span> {{ $laporan->realisasi_date }}</p>
        <p><span class="label">Tanggal Kirim:</span> {{ $laporan->tgl_kirim }}</p>
        <p><span class="label">Status:</span> {{ $laporan->status }}</p>
    </div>
    @endforeach
</body>

</html>
