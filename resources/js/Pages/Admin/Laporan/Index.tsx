import DataTableLaporan from "@/Components/admin/dashboard/table/TabelLaporan";
import CategoryButton from "@/Components/admin/FilterButton";
import SearchForm from "@/Components/admin/Search";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { LaporanProps, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth: { user }, laporans, possibleYear, notifications }: PageProps<{ laporans: LaporanProps, possibleYear: any, notifications: any }>) {
    return (
        <LayoutAdmin user={user} notifications={notifications}>
            <Head title="Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
                </div>
                <h1 className="text-3xl font-bold">Laporan Mitra</h1>
                <div className="flex items-center gap-3">
                    <CategoryButton allLink="/admin/laporan" category="semua" active="semua" />
                    <CategoryButton allLink="/admin/laporan" category="diterima" active="diterima" />
                    <CategoryButton allLink="/admin/laporan" category="revisi" active="revisi" />
                    <CategoryButton allLink="/admin/laporan" category="ditolak" active="ditolak" />
                </div>
                <SelectAndDownload tahun={true} tahunOptions={possibleYear} kuartal={true} menu="laporan" />
                <SearchForm />
                <DataTableLaporan laporans={laporans} />
            </div>
        </LayoutAdmin>
    );
}
