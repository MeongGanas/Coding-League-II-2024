import { DialogNonaktifkan } from "@/Components/admin/dashboard/mitra/DialogAction";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Mail, MapPin, Pencil, Phone } from "lucide-react";

const statusClass = {
    'Aktif': "bg-success-bg text-success",
    'Non-Aktif': "bg-success-bg text-success",
    'Pengajuan': "bg-warning-bg text-warning",
};
const statusText = {
    'Aktif': "Terverifikasi",
    'Non-Aktif': "Terverifikasi",
    'Pengajuan': "Pengajuan",
};

export default function Detail({ auth: { user }, mitra }: PageProps<{ mitra: any }>) {
    const isTerverifikasi = true;
    return (
        <LayoutAdmin user={user}>
            <Head title="Detail Mitra" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Detail" />
                </div>
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Profil Mitra</h1>
                    <div className="flex items-center gap-4">
                        <Button
                            type="submit"
                            className="hover:bg-red-700 font-semibold"
                        >
                            <Link
                                href="/admin/mitra/1/edit"
                                className="flex gap-2 items-center"
                            >
                                <Pencil className="w-4 h-4" />
                                Ubah Profil
                            </Link>
                        </Button>
                        {isTerverifikasi && <DialogNonaktifkan />}
                    </div>
                </div>
                <div className="bg-white border rounded-md py-10 px-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="w-full md:pr-10">
                            <img src={`/storage/${mitra.image}`} alt="mitra" className="w-full h-72 object-cover rounded-md" />
                        </div>
                        <div className="w-full md-w-1/2 space-y-4">
                            <div className="space-y-2">
                                <div className="flex gap-4 items-center">
                                    <h1 className="font-bold text-2xl">
                                        {mitra.name}
                                    </h1>
                                    <Badge className={statusClass[mitra.status]}>
                                        {statusText[mitra.status]}
                                    </Badge>
                                </div>
                                <p className="font-semibold">
                                    {mitra.perusahaan}
                                </p>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span>{mitra.email}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <span>{mitra.no_telepon ?? '-'}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span>{mitra.alamat ?? '-'}</span>
                                </li>
                            </ul>
                            <p>
                                {mitra.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
