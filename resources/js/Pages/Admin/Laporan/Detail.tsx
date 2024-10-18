// TODO, aktifkan fitur tolak, terima, dan revisi (kalau revisi, akan jadi draf lagi setelah diedit oleh mitra)
// LAST LEFT HERE

import DetailCard from "@/Components/admin/dashboard/DetailCard";
import {
    DialogRevisi,
    DialogTerima,
    DialogTolak,
} from "@/Components/admin/dashboard/laporan/DialogAction";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import formatPrice from "@/lib/formatPrice";
import { Laporan, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BriefcaseBusiness } from "lucide-react";

const status: { [key: string]: string }= {
    'Diterima': "bg-success-bg text-success hover:bg-success-bg",
    'Revisi': "bg-warning-bg text-warning hover:bg-warning-bg",
    'Ditolak': "bg-error-bg text-error hover:bg-error-bg",
}

export default function Detail({ auth: { user }, laporan }: PageProps<{ laporan: Laporan }>) {
    return (
        <LayoutAdmin user={user}>
            <Head title="Detail Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Detail" />
                </div>
                <h1 className="text-3xl font-bold">Detail Laporan</h1>
                <div className="bg-white rounded-md p-6 space-y-4 border">
                    {['Diterima', 'Revisi', 'Ditolak'].includes(laporan.status) &&
                        <Badge className={status[laporan.status]}>
                            {laporan.status}
                        </Badge>
                    }
                    <Badge className="text-[#344054] bg-[#F2F4F7] hover:bg-[#F2F4F7]">
                        Social
                    </Badge>
                    <div className="flex pb-5 mb-5 border-b gap-4">
                        <div className="rounded-full p-3 h-fit bg-primary-bg text-primary">
                            <BriefcaseBusiness className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="font-bold text-xl sm:text-2xl">
                                {laporan.name}
                            </h1>
                            <div className="block space-y-1 sm:flex sm:gap-4 sm:space-y-0">
                                <p className="text-sm sm:text-base font-semibold">
                                    {laporan.mitra.perusahaan}
                                </p>
                                <p className="text-sm sm:text-base font-semibold">
                                    {format(new Date(laporan.created_at), "dd MMMM yyyy", { locale: id })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="overflow-x-auto flex gap-4 scroll-hidden">
                            {
                                laporan.photos.map((photo: string, index: number) => (
                                    <img key={index} src={`/storage/${photo}`} className="min-w-96 h-60 rounded-md bg-neutral-300" />
                                ))
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <DetailCard
                            title="Realisasi"
                            content={
                                formatPrice(laporan.realisasi) || "Belum ada"
                            }
                        />
                        <DetailCard
                            title="Nama Proyek"
                            content={laporan.proyek_name}
                        />
                        <DetailCard
                            title="Kecamatan"
                            content={`Kec ${laporan.lokasi}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Rincian Laporan</h1>
                        <div className="space-y-4" dangerouslySetInnerHTML={{ __html: laporan.rincian }}>
                        </div>
                    </div>
                </div>
                {
                    !['Ditolak', 'Diterima', 'Revisi'].includes(laporan.status) &&
                    <div className="bg-white rounded-md p-6 border">
                        <div className="block sm:flex space-y-3 sm:space-y-0 sm:w-fit sm:mx-auto gap-5">
                            <DialogTolak />
                            <DialogRevisi />
                            <DialogTerima />
                        </div>
                    </div>
                }
            </div>
        </LayoutAdmin>
    );
}
