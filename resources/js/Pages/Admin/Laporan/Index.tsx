import DataTableLaporan from "@/Components/admin/dashboard/TabelLaporan";
import CategoryButton from "@/Components/admin/FilterButton";
import SearchForm from "@/Components/admin/Search";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head, Link } from "@inertiajs/react";

export default function Index() {
    return (
        <LayoutAdmin>
            <Head title="Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <BreadcrumbLinks basePath="/admin" />
                <h1 className="text-3xl font-bold">Laporan Mitra</h1>
                <div className="flex items-center gap-3">
                    <CategoryButton category="semua" />
                    <CategoryButton category="diterima" />
                    <CategoryButton category="revisi" />
                    <CategoryButton category="ditolak" />
                </div>
                <SelectAndDownload tahun={true} kuartal={true} />
                <SearchForm />
                <DataTableLaporan />
            </div>
        </LayoutAdmin>
    );
}
