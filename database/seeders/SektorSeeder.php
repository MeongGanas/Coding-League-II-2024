<?php

namespace Database\Seeders;

use App\Models\Sektor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SektorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // sosial, lingkungan, kesehatan, pendidikan, infrastruktur dan sanitasi lingkungan, sarana dan prasarana keagamaan

        $sektor = [
            "Sosial",
            "Lingkungan",
            "Kesehatan",
            "Pendidikan",
            "Infrastruktur dan Sanitasi Lingkungan",
            "Sarana dan Prasarana Keagamaan",
            "Penggunaan Sumber Energi Terbarukan"
        ];

        $found = false;
        foreach ($sektor as $s) {
            if (Sektor::where('name', $s)->first()) {
                $found = true;
                break;
            }
        }

        if ($found) {
            return;
        }

        $image = [
            "sektor_image/sosial.png",
            "sektor_image/lingkungan.png",
            "sektor_image/kesehatan.png",
            "sektor_image/pendidikan.png",
            "sektor_image/example.jpg",
            "sektor_image/example.jpg",
            "sektor_image/example.jpg"
        ];

        $deskripsi = [
            "CSR dalam lingkup sosial merupakan komitmen perusahaan untuk memberikan kontribusi positif bagi masyarakat di sekitarnya. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan kualitas hidup masyarakat, seperti program pendidikan, kesehatan, pemberdayaan ekonomi, dan pengentasan kemiskinan. Melalui CSR sosial, perusahaan tidak hanya memenuhi tanggung jawab sosialnya, tetapi juga membangun hubungan yang baik dengan masyarakat, meningkatkan reputasi perusahaan, dan menciptakan dampak sosial yang berkelanjutan. Kegiatan CSR sosial dapat berupa bantuan langsung, seperti donasi, atau program jangka panjang yang melibatkan partisipasi aktif masyarakat, seperti pelatihan keterampilan dan pengembangan komunitas.",
            "CSR dalam lingkup lingkungan merupakan komitmen perusahaan untuk melindungi dan melestarikan lingkungan hidup. Ini melibatkan berbagai kegiatan yang bertujuan mengurangi dampak negatif perusahaan terhadap lingkungan, seperti pengelolaan limbah, konservasi sumber daya alam, dan penghijauan. Melalui CSR lingkungan, perusahaan tidak hanya memenuhi tanggung jawab lingkungannya, tetapi juga membangun hubungan yang baik dengan pemangku kepentingan, meningkatkan reputasi perusahaan, dan menciptakan dampak lingkungan yang berkelanjutan. Kegiatan CSR lingkungan dapat berupa program internal, seperti pengelolaan limbah, atau program eksternal, seperti penanaman pohon dan kampanye lingkungan.",
            "CSR dalam lingkup kesehatan merupakan komitmen perusahaan untuk meningkatkan kesehatan dan kesejahteraan masyarakat di sekitarnya. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan akses masyarakat terhadap layanan kesehatan, seperti program imunisasi, pemeriksaan kesehatan, dan penyuluhan kesehatan. Melalui CSR kesehatan, perusahaan tidak hanya memenuhi tanggung jawab sosialnya, tetapi juga membangun hubungan yang baik dengan masyarakat, meningkatkan reputasi perusahaan, dan menciptakan dampak kesehatan yang berkelanjutan. Kegiatan CSR kesehatan dapat berupa bantuan langsung, seperti donasi, atau program jangka panjang yang melibatkan partisipasi aktif masyarakat, seperti pelatihan kesehatan dan penyuluhan gizi.",
            "CSR dalam lingkup pendidikan merupakan komitmen perusahaan untuk meningkatkan akses pendidikan dan kualitas pendidikan masyarakat di sekitarnya. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan akses masyarakat terhadap pendidikan, seperti program beasiswa, bantuan buku, dan renovasi sekolah. Melalui CSR pendidikan, perusahaan tidak hanya memenuhi tanggung jawab sosialnya, tetapi juga membangun hubungan yang baik dengan masyarakat, meningkatkan reputasi perusahaan, dan menciptakan dampak pendidikan yang berkelanjutan. Kegiatan CSR pendidikan dapat berupa bantuan langsung, seperti donasi, atau program jangka panjang yang melibatkan partisipasi aktif masyarakat, seperti pelatihan guru dan pengembangan kurikulum.",
            "CSR dalam lingkup infrastruktur dan sanitasi lingkungan merupakan komitmen perusahaan untuk meningkatkan akses masyarakat terhadap infrastruktur dan sanitasi yang layak. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan akses masyarakat terhadap infrastruktur dasar, seperti jalan, air bersih, dan sanitasi. Melalui CSR infrastruktur dan sanitasi lingkungan, perusahaan tidak hanya memenuhi tanggung jawab sosialnya, tetapi juga membangun hubungan yang baik dengan masyarakat, meningkatkan reputasi perusahaan, dan menciptakan dampak infrastruktur yang berkelanjutan. Kegiatan CSR infrastruktur dan sanitasi lingkungan dapat berupa bantuan langsung, seperti donasi, atau program jangka panjang yang melibatkan partisipasi aktif masyarakat, seperti pembangunan jalan dan penyediaan air bersih.",
            "CSR dalam lingkup sarana dan prasarana keagamaan merupakan komitmen perusahaan untuk meningkatkan akses masyarakat terhadap sarana dan prasarana keagamaan yang layak. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan akses masyarakat terhadap sarana dan prasarana keagamaan, seperti pembangunan masjid, gereja, dan pura. Melalui CSR sarana dan prasarana keagamaan, perusahaan tidak hanya memenuhi tanggung jawab sosialnya, tetapi juga membangun hubungan yang baik dengan masyarakat, meningkatkan reputasi perusahaan, dan menciptakan dampak keagamaan yang berkelanjutan. Kegiatan CSR sarana dan prasarana keagamaan dapat berupa bantuan langsung, seperti donasi, atau program jangka panjang yang melibatkan partisipasi aktif masyarakat, seperti pembangunan tempat ibadah dan penyediaan fasilitas keagamaan.",
            "CSR dalam lingkup penggunaan sumber energi terbarukan merupakan komitmen perusahaan untuk mengurangi dampak negatif penggunaan sumber energi konvensional terhadap lingkungan. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan penggunaan sumber energi terbarukan, seperti panel surya, turbin angin, dan energi biomassa. Melalui CSR penggunaan sumber energi terbarukan, perusahaan tidak hanya memenuhi tanggung jawab lingkungannya, tetapi juga membangun hubungan yang baik dengan pemangku kepentingan, meningkatkan reputasi perusahaan, dan menciptakan dampak lingkungan yang berkelanjutan. Kegiatan CSR penggunaan sumber energi terbarukan dapat berupa program internal, seperti penggunaan energi terbarukan di kantor, atau program eksternal, seperti pengembangan energi terbarukan di masyarakat."
        ];

        foreach ($sektor as $key => $s) {
            Sektor::create([
                'name' => $s,
                'image' => $image[$key],
                'deskripsi' => $deskripsi[$key]
            ]);
        }
    }
}
