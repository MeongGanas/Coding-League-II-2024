import DataTableKegiatan from "@/Components/admin/dashboard/table/TabelKegiatan";
import CategoryButton from "@/Components/admin/FilterButton";
import SearchForm from "@/Components/admin/Search";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function Index({ auth: { user }, kegiatans, notifications }: PageProps<{ kegiatans: any, notifications: any }>) {
    return (
        <LayoutAdmin user={user} notifications={notifications}>
            <Head title="Kegiatan" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Kegiatan</h1>
                    <Button asChild className="hover:bg-red-700">
                        <Link
                            href="/admin/kegiatan/create"
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Kegiatan Baru
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <CategoryButton allLink="/admin/kegiatan" category="semua" active="semua" />
                    <CategoryButton allLink="/admin/kegiatan" category="terbit" active="terbit" />
                    <CategoryButton allLink="/admin/kegiatan" category="draf" active="draf" />
                </div>
                <SearchForm />
                <DataTableKegiatan kegiatans={kegiatans} />
            </div>
        </LayoutAdmin>
    );
}
