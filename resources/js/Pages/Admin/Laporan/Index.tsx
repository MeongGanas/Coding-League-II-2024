import DataTableLaporan from "@/Components/admin/dashboard/table/TabelLaporan";
import CategoryButton from "@/Components/admin/FilterButton";
import SearchForm from "@/Components/admin/Search";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth: { user }, laporans }: PageProps<{ laporans: any }>) {
    return (
        <LayoutAdmin user={user}>
            <Head title="Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
                </div>
                <h1 className="text-3xl font-bold">Laporan Mitra</h1>
                <div className="flex items-center gap-3">
                    <CategoryButton category="semua" active="semua" />
                    <CategoryButton category="diterima" active="diterima"/>
                    <CategoryButton category="revisi" active="revisi" />
                    <CategoryButton category="ditolak" active="ditolak" />
                </div>
                <SelectAndDownload tahun={true} kuartal={true} />
                <SearchForm />
                <DataTableLaporan laporans={laporans}/>
            </div>
        </LayoutAdmin>
    );
}
