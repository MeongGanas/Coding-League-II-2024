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
    </style>
</head>

<body>
    <h1>Dashboard</h1>
    <p>{{ date('Y-m-d H:i:s') }}</p>
    <div class="card">
        <h3>Proyek</h3>
        <p><span class="label">Total:</span> {{ $proyek['Draf']['count'] + $proyek['Terbit']['count'] }}</p>
        <p><span class="label">Draf:</span> {{ $proyek['Draf']['count'] }}</p>
        <p><span class="label">Terbit:</span> {{ $proyek['Terbit']['count'] }}</p>
    </div>
</body>

</html>
