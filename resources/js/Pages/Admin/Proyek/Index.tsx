import DataTableProyek from "@/Components/admin/dashboard/TabelProyek";
import CategoryButton from "@/Components/admin/FilterButton";
import SearchForm from "@/Components/admin/Search";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function Index() {
    return (
        <LayoutAdmin>
            <Head title="Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <BreadcrumbLinks basePath="/admin" />
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Proyek</h1>
                    <Button asChild className="hover:bg-red-700">
                        <Link
                            href="/admin/proyek/create"
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Proyek Baru
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <CategoryButton category="semua" />
                    <CategoryButton category="terbit" />
                    <CategoryButton category="draf" />
                </div>
                <SelectAndDownload tahun={true} sektor={true} />
                <SearchForm />
                <DataTableProyek />
            </div>
        </LayoutAdmin>
    );
}
