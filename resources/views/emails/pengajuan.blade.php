<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Pengajuan Kerjasama Baru</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 20px;
            text-align: center;
        }
        p {
            margin: 10px 0;
            font-size: 16px;
        }
        p strong {
            color: #333;
        }
        .contact-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #dc3545;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .contact-button:hover {
            background-color: #c82333;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Surat Pengajuan Kerjasama Baru</h1>
        <p>Berikut adalah data pengajuan kerjasama baru yang telah diajukan:</p>
        <br>
        <p><strong>Nama Lengkap:</strong> {{ $data->full_name }}</p>
        <p><strong>Tanggal Lahir:</strong> {{ $data->tgl_lahir }}</p>
        <p><strong>No Handphone:</strong> {{ $data->no_handphone }}</p>
        <p><strong>Instansi:</strong> {{ $data->instansi }}</p>
        <p><strong>ID Proyek:</strong> {{ $data->proyek_id }}</p>
        <p><strong>ID Mitra:</strong> {{ $data->mitra_id }}</p>

        @php
            $phone = preg_replace('/\D/', '', $data->no_handphone);
            $phone = preg_replace('/[ -\.]/', '', $phone);
            if (preg_match('/^0/', $phone)) {
                $phone = '62' . substr($phone, 1);
            }
        @endphp

        <a href="https://wa.me/{{ $phone }}" target="_blank" class="contact-button" style="color: #fff;">Hubungi via WhatsApp  &#x1F855;</a>
    </div>
    <div class="footer">
        &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
    </div>
</body>
</html>
