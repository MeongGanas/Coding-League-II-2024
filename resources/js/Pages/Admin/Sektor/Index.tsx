import DataTableSektor from "@/Components/admin/dashboard/table/TabelSektor";
import SearchForm from "@/Components/admin/Search";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function Index() {
    return (
        <LayoutAdmin>
            <Head title="Sektor" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Sektor</h1>
                    <Button asChild className="hover:bg-red-700">
                        <Link
                            href="/admin/sektor/create"
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Buat Sektor Baru
                        </Link>
                    </Button>
                </div>
                <SearchForm />
                <DataTableSektor />
            </div>
        </LayoutAdmin>
    );
}
