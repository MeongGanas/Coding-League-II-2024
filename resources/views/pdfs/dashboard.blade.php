<!DOCTYPE html>
<html>

<head>
    <title>Dashboard PDF</title>
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

        .select-style {
            display: block;
            margin-top: 1rem;
            width: 100%;
            padding: 10px;
            font-size: 14px;
            line-height: 1.5;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        }

        .select-style>span {
            display: block;
            padding: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table th,
        table td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        table th {
            background-color: #f2f2f2;
        }

        table th:first-child,
        table td:first-child {
            text-align: left;
        }

        table th:last-child,
        table td:last-child {
            text-align: right;
        }
    </style>
</head>

<body>
    <h1>Dashboard</h1>
    <p>{{ date('Y-m-d H:i:s') }}</p>

    <div class="card">
        <h3>Filters</h3>
        @if(!empty($filters['tahun']))
            <span class="select-style"><span class="label">Tahun:</span> {{ $filters['tahun'] }}</span>
        @endif
        @if(!empty($filters['kuartal']))
            <span class="select-style"><span class="label">Kuartal:</span> {{ $filters['kuartal'] }}</span>
        @endif
        @if(!empty($filters['sektor']))
            <span class="select-style"><span class="label">Sektor:</span> {{ $filters['sektor']->name }}</span>
        @endif
        @if(!empty($filters['mitra']))
            <span class="select-style"><span class="label">Mitra:</span> {{ $filters['mitra']->name }}</span>
        @endif
    </div>

    <div class="card">
        <h3>Counts</h3>
        @if(!empty($counts['countProyek']))
            <p><span class="label">Total Proyek:</span> {{ $counts['countProyek'] }}</p>
        @endif
        @if(!empty($counts['countProyekRealized']))
            <p><span class="label">Total Proyek Terealisasi:</span> {{ $counts['countProyekRealized'] }}</p>
        @endif
        @if(!empty($counts['countMitra']))
            <p><span class="label">Total Mitra:</span> {{ $counts['countMitra'] }}</p>
        @endif
        @if(!empty($counts['countTotalDanaRealized']))
            <p><span class="label">Total Dana Terealisasi:</span> Rp {{ number_format($counts['countTotalDanaRealized'], 0, ',', '.') }}</p>
        @endif
    </div>

    <div class="card">
        <h3>Realisasi</h3>
        @if(!empty($realisasi['dataCSR']))
        <h4>Data CSR</h4>
            <table border="1">
                <thead>
                    <tr>
                        <th>Sektor</th>
                        <th>Total</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($realisasi['dataCSR'] as $item)
                    <tr>
                        <td>{{ $item['sektor'] }}</td>
                        <td>Rp {{ number_format($item['total'], 2, ',', '.') }}</td>
                        <td>{{ $item['count'] }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @endif

        @if(!empty($realisasi['persenTotalMitra']))
        <h4>Total Mitra</h4>
            <table border="1">
                <thead>
                    <tr>
                        <th>Mitra</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($realisasi['persenTotalMitra'] as $item)
                    <tr>
                        <td>{{ $item['mitra'] }}</td>
                        <td>Rp {{ number_format($item['total'], 2, ',', '.') }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @endif

        @if(!empty($realisasi['persenTotalKecamatan']))
        <h4>Total Kecamatan</h4>
            <table border="1">
                <thead>
                    <tr>
                        <th>Kecamatan</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($realisasi['persenTotalKecamatan'] as $item)
                    <tr>
                        <td>{{ $item['kecamatan'] }}</td>
                        <td>Rp {{ number_format($item['total'], 2, ',', '.') }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

</body>

</html>
