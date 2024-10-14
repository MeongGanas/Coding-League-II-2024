import DataTableProyek from "@/Components/admin/dashboard/table/TabelProyek";
import CategoryButton from "@/Components/admin/FilterButton";
import SearchForm from "@/Components/admin/Search";
import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps, ProyekProps, Sektor } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function Index({ auth: { user }, proyeks, sektors }: PageProps<{ proyeks: ProyekProps, sektors: Sektor[] }>) {
    return (
        <LayoutAdmin user={user}>
            <Head title="Proyek" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
                </div>
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
                    <CategoryButton category="semua" active="semua" />
                    <CategoryButton category="terbit" active="terbit" />
                    <CategoryButton category="draf" active="draf" />
                </div>
                <SelectAndDownload tahun={true} sektor={true} sektors={sektors} />
                <SearchForm />
                <DataTableProyek proyeks={proyeks} />
            </div>
        </LayoutAdmin>
    );
}
