import DetailCard from "@/Components/admin/dashboard/DetailCard";
import { DialogTerbit } from "@/Components/admin/dashboard/proyek/DialogTerbit";
import DataTableMitra from "@/Components/admin/dashboard/proyek/TabelProyekMitra";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BriefcaseBusiness, Plus } from "lucide-react";
import Markdown from "react-markdown";

export default function Detail({ auth: { user }, kegiatan }: PageProps<{ kegiatan: any }>) {
    return (
        <LayoutAdmin user={user}>
            <Head title="Detail Kegiatan" />
            <div className="bg-[url('/images/admin/dashboard_bg.png')] bg-cover bg-no-repeat bg-center w-full h-72 relative">
                <div className="h-full w-full bg-black/40 absolute top-0 left-0 flex items-center">
                    <div className="space-y-20 container px-5">
                        <div className="block sm:flex mb-10 sm:items-center sm:justify-between space-y-5 sm:space-y-0">
                            <BreadcrumbLinks
                                basePath="/admin"
                                textWhite={true}
                                pagePath="Kegiatan"
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
                                {kegiatan.name}
                            </h1>
                            <p className="text-white text-sm md:text-lg">
                                { format(new Date(kegiatan.created_at), "dd MMMM yyyy", {locale: id}) }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-10 px-5 space-y-5">
                <div className="bg-white border rounded-md p-6 space-y-5">
                    <img src={`/storage/${kegiatan.image}`} className="w-full h-96 object-cover rounded-md" />
                    <Markdown>{kegiatan.rincian}</Markdown>
                    <div className="flex gap-2">
                        <h1 className="text-neutral-500 font-semibold text-base">
                            Tags:
                        </h1>
                        {
                            kegiatan.tags.map((tag: string, index: number) => (
                                <Badge key={index} className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                                    {tag}
                                </Badge>
                            ))
                        }
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
