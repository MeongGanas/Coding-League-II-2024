import DataTableMitra from "@/Components/admin/dashboard/proyek/TabelProyekMitra";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps, Sektor } from "@/types";
import { Head } from "@inertiajs/react";

export default function Detail({ auth: { user }, sektor, notifications }: PageProps<{ sektor: Sektor, notifications: any }>) {
    return (
        <LayoutAdmin user={user} notifications={notifications}>
            <Head title="Detail Sektor" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Detail" />
                </div>
                <h1 className="text-3xl font-bold">Detail Sektor</h1>
                <div className="bg-white rounded-md p-6 space-y-4 border">
                    <Badge className="text-[#344054] bg-[#F2F4F7] hover:bg-[#F2F4F7]">
                        {sektor.name}
                    </Badge>
                    <div className="w-full">
                        <img src={`/storage/${sektor.image}`} width={500} alt={`Sektor ${sektor.name}`} className="rounded-md mx-auto" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Deskripsi Sektor</h1>
                        <div className="space-y-4">
                            <p>{sektor.deskripsi}</p>
                        </div>
                    </div>
                    <div className="border-t pt-5">
                        <h1 className="font-bold text-2xl mb-4">
                            Mitra Yang Berpartisipasi
                        </h1>
                        {/* TODO */}
                        {/* <DataTableMitra /> */}
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
