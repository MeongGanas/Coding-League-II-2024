<?php

namespace Database\Factories;

use App\Models\Mitra;
use App\Models\Sektor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Laporan>
 */
class LaporanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $pastYear = $this->faker->dateTimeBetween('-6 years', 'now');

        return [
            'name' => $this->faker->text(50),
            'proyek_name' => $this->faker->text(50),
            'mitra_id' => Mitra::inRandomOrder()->first()->id,
            'sektor_id' => Sektor::inRandomOrder()->first()->id,
            'lokasi' => $this->faker->randomElement([
                'Gambir',
                'Tanah Abang',
                'Menteng',
                'Senen',
                'Cempaka Putih',
                'Johar Baru',
                'Kemayoran',
                'Sawah Besar',
                'Jatinegara',
                'Matraman',
                'Pulo Gadung',
                'Duren Sawit',
                'Kramat Jati',
                'Pasar Rebo',
                'Cipayung',
                'Ciracas',
                'Cengkareng',
                'Grogol Petamburan',
                'Kalideres',
                'Kebon Jeruk',
                'Kembangan',
                'Palmerah',
                'Tambora',
                'Taman Sari',
                'Penjaringan',
                'Pademangan',
                'Tanjung Priok',
                'Koja',
                'Cilincing',
                'Kelapa Gading',
                'Cakung',
                'Pasar Minggu',
                'Jagakarsa',
                'Mampang Prapatan',
                'Pancoran',
                'Tebet',
                'Setiabudi',
                'Kebayoran Baru',
                'Kebayoran Lama',
                'Pesanggrahan',
                'Cilandak',
                'Ciputat',
                'Ciputat Timur',
                'Pamulang',
                'Pondok Aren',
                'Serpong',
                'Serpong Utara',
                'Setu',
                'Bekasi Barat',
                'Bekasi Timur',
                'Bekasi Selatan',
                'Bekasi Utara',
                'Medan Satria',
                'Rawalumbu',
                'Mustika Jaya',
                'Bantargebang',
                'Pondok Gede',
                'Jatiasih',
                'Jatisampurna',
                'Pondok Melati',
                'Cikarang Barat',
                'Cikarang Timur',
                'Cikarang Selatan',
                'Cikarang Utara',
                'Cikarang Pusat',
                'Karawang Barat',
                'Karawang Timur',
                'Telukjambe Timur',
                'Telukjambe Barat',
                'Klari',
                'Cikampek',
                'Purwakarta',
                'Wanayasa',
                'Plered',
                'Bojong',
                'Darangdan',
                'Sukatani',
                'Sukasari',
                'Maniis',
                'Tegalwaru',
                'Jatiluhur',
                'Babakancikao',
                'Campaka',
                'Bungursari',
                'Cibatu',
                'Cibinong',
                'Citeureup',
                'Gunung Putri',
                'Jonggol',
                'Cileungsi',
                'Klapanunggal',
                'Sukamakmur',
                'Cariu',
                'Tanjungsari',
                'Cisarua',
                'Megamendung',
                'Ciawi',
                'Caringin',
                'Cigombong',
                'Cijeruk',
                'Ciomas',
                'Dramaga',
                'Tamansari',
                'Tenjolaya',
                'Ciampea',
                'Cibungbulang',
                'Pamijahan',
                'Leuwiliang',
                'Leuwisadeng',
                'Nanggung',
                'Sukajaya',
                'Jasinga',
                'Tenjo',
                'Parung',
                'Ciseeng',
                'Gunung Sindur',
                'Rumpin',
                'Kemang',
                'Bojong Gede',
                'Tajur Halang',
                'Parung Panjang',
                'Cibadak',
                'Cikidang',
                'Cisolok',
                'Cikakak',
                'Pelabuhan Ratu',
                'Simpenan',
                'Warung Kiara',
                'Bantargadung',
                'Ciemas',
                'Ciracap',
                'Surade',
                'Cibitung',
                'Jampang Kulon',
                'Kalibunder',
                'Tegalbuleud',
                'Lengkong',
                'Pabuaran',
                'Parakansalak',
                'Parungkuda',
                'Cidahu',
                'Cicurug',
                'Cikembar',
                'Cibadak',
                'Cicantayan',
                'Caringin',
                'Nagrak',
                'Cisaat',
                'Kadudampit',
                'Sukabumi',
                'Sukaraja',
                'Kebonpedes',
                'Gunungguruh',
                'Cireunghas',
                'Gegerbitung',
                'Sukalarang',
                'Sukaraja',
                'Sukabumi',
                'Cikole',
                'Citamiang',
                'Gunung Puyuh',
                'Warudoyong',
                'Baros',
                'Lembursitu',
                'Cibeureum',
                'Cianjur',
                'Warungkondang',
                'Gekbrong',
                'Cugenang',
                'Pacet',
                'Cipanas',
                'Sukaresmi',
                'Cikalongkulon'
            ]),
            'realisasi' => $this->faker->randomFloat(2, 0, 1000000000),
            'realisasi_date' => $pastYear,
            'tgl_kirim' => $this->faker->dateTimeBetween($pastYear, '+30 days'),
            'status' => $this->faker->randomElement(['Diterima', 'Revisi', 'Draf']),
            'rincian' => $this->faker->paragraph(4),
            'photos' => [
                'example.jpg',
                'example.jpg',
                'example.jpg',
            ],
        ];
    }
}
