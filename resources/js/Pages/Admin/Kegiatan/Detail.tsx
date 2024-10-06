import DetailCard from "@/Components/admin/dashboard/DetailCard";
import { DialogTerbit } from "@/Components/admin/dashboard/proyek/DialogTerbit";
import DataTableMitra from "@/Components/admin/dashboard/proyek/TabelProyekMitra";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head, Link } from "@inertiajs/react";
import { BriefcaseBusiness, Plus } from "lucide-react";

export default function Detail() {
    const isTerbit = false;

    return (
        <LayoutAdmin>
            <Head title="Detail Kegiatan" />
            <div className="bg-[url('/images/admin/dashboard_bg.png')] bg-cover bg-no-repeat bg-center w-full h-72 relative">
                <div className="h-full w-full bg-black/40 absolute top-0 left-0 flex items-center">
                    <div className="space-y-20 container px-5">
                        <div className="block sm:flex mb-10 sm:items-center sm:justify-between space-y-5 sm:space-y-0">
                            <BreadcrumbLinks
                                basePath="/admin"
                                textWhite={true}
                            />
                            <Button asChild className="hover:bg-red-700">
                                <Link
                                    href="/admin/proyek/create"
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Buat Kegiatan Baru
                                </Link>
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                Pemkab Cirebon Terima Bantuan PJU Tematik dari
                                Bank BJB
                            </h1>
                            <p className="text-white text-sm md:text-lg">
                                July 12, 2024
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-10 px-5 space-y-5">
                <div className="bg-white border rounded-md p-6 space-y-5">
                    <p>
                        KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon
                        menerima bantuan Corporate Social Responsibility (CSR)
                        dari Bank BJB, berupa lampu penerangan jalan umum (PJU)
                        tematik. Penyerahan bantuan ini dihadiri langsung oleh
                        Penjabat (Pj) Bupati Cirebon, Drs H Wahyu Mijaya SH MSi
                        di Pendopo Bupati Cirebon, Jumat (12/7/2024). “Kami
                        berterima kasih kepada Bank BJB yang telah memberikan
                        PJU untuk dipasang di beberapa titik di wilayah Sumber,
                        Kabupaten Cirebon,” ujar Wahyu. Ia menjelaskan, bahwa
                        pemasangan PJU di kawasan Sumber, yang dekat dengan
                        kantor pemerintahan, tidak hanya akan memperindah
                        lingkungan, tetapi juga dapat meningkatkan keselamatan
                        masyarakat. Langkah ini, menurut Wahyu, merupakan bagian
                        dari upaya untuk menciptakan ruang publik yang lebih
                        aman dan nyaman. Dengan penerangan yang baik, warga
                        dapat beraktivitas dengan tenang, terutama di malam
                        hari.
                    </p>
                    <div className="bg-neutral-400 w-full max-w-screen-sm h-72 rounded-md mx-auto"></div>
                    <p>
                        “Inisiatif ini menjadi langkah strategis bagi Kabupaten
                        Cirebon, dalam meningkatkan kualitas infrastruktur dan
                        pelayanan publik,” tambahnya. Pemasangan PJU tematik ini
                        ditargetkan mulai dilaksanakan pada Agustus 2024. Wahyu
                        berharap, fasilitas tersebut memberikan dampak positif
                        bagi masyarakat. “Kami sudah berkomitmen dalam
                        menciptakan lingkungan yang lebih aman dan nyaman bagi
                        masyarakat,” katanya. Kepala Dinas Perhubungan Kabupaten
                        Cirebon, Hilman Firmansyah ST menjelaskan, bahwa PJU
                        artistik ini akan dipasang di 33 titik setelah dilakukan
                        survei dan pengecekan. Ia mengungkapkan, bahwa saat ini,
                        Kabupaten Cirebon masih kekurangan PJU. Dari total
                        kebutuhan sekitar 32 ribu titik, baru 16 ribu titik yang
                        terpasang. Hilman menekankan pentingnya upaya
                        terus-menerus untuk memenuhi kebutuhan ini, termasuk
                        mengajak instansi lain, baik dari pemerintah maupun
                        pihak swasta, untuk menyediakan CSR. “Kalau lihat
                        eksisting jalan itu kurang lebih 32 ribu titik,
                        kekurangannya masih banyak. Idealnya melakukan
                        kolaborasi seperti itu,” ujar Hilman. (DISKOMINFO)
                    </p>
                    <div className="flex gap-2">
                        <h1 className="text-neutral-500 font-semibold text-base">
                            Tags:
                        </h1>
                        <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                            Bank BJB
                        </Badge>
                        <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                            Cirebon
                        </Badge>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
