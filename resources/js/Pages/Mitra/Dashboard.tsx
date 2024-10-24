import DataStatistik from "@/Components/mitra/DataStatistik";
import RealisasiProyek from "@/Components/mitra/RealisasiProyek";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import { Head, Link } from "@inertiajs/react";
import { Counts, LaporanProps, PageProps, Realisasi } from "@/types";
import WelcomeMitra from "@/Components/mitra/WelcomeMitra";
import LayoutMitra from "@/Layouts/LayoutMitra";
import DataTableLaporanMitra from "@/Components/mitra/TabelLaporan";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import SearchForm from "@/Components/admin/Search";

export default function Dashboard({ auth: { user }, counts, realisasi, filters, laporans, notifications }: PageProps<{ counts: Counts, realisasi: Realisasi, filters: any, laporans: LaporanProps, notifications: any }>) {
    return (
        <LayoutMitra user={user} notifications={notifications}>
            <Head title="Dashboard Mitra" />

            <WelcomeMitra />

            <div className="container py-10 px-5">
                <SelectAndDownload
                    menu="dashboard"
                    tahunOptions={filters.tahun}
                    tahun={true}
                    kuartal={true}
                />
                <DataStatistik counts={counts} />
                <RealisasiProyek realisasi={realisasi} />
            </div>

            <div className="container px-5 pb-10 space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Data Statistik</h1>
                    <Button asChild className="hover:bg-red-700"><Link href="/mitra/laporan/create" className="flex items-center gap-1"><Plus className="w-4 h-4" />Buat Laporan Baru</Link></Button>
                </div>
                <SearchForm />
                <DataTableLaporanMitra laporans={laporans} />
            </div>
        </LayoutMitra>
    );
}
