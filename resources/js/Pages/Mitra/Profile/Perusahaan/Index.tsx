import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Button } from "@/Components/ui/button";
import LayoutMitra from "@/Layouts/LayoutMitra";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Mail, MapPin, Pencil, Phone } from "lucide-react";

export default function Detail({ auth: { user }, notifications }: PageProps<{ notifications: any }>) {
    return (
        <LayoutMitra user={user} notifications={notifications}>
            <Head title="Profile" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/mitra" pagePath="Profile" />
                </div>
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Profil Mitra</h1>
                    <div className="flex items-center gap-4">
                        <Button
                            asChild
                            className="hover:bg-red-700 font-semibold"
                        >
                            <Link
                                href={`/mitra/perusahaan/${user.mitra.id}/edit`}
                                className="flex gap-2 items-center"
                            >
                                <Pencil className="w-4 h-4" />
                                Ubah Profil
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="bg-white border rounded-md py-10 px-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="w-full flex items-center md:pr-10">
                            {user.mitra.image ? (
                                <div className="bg-neutral-100 w-full overflow-hidden rounded-md">
                                    <img src={`/storage/${user.mitra.image}`} className="w-full" alt="perusahaan_image" />
                                </div>

                            ) : (
                                <div className="bg-neutral-100 w-full h-72 rounded-md"></div>
                            )}
                        </div>
                        <div className="w-full md-w-1/2 flex items-center">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h1 className="font-bold text-2xl">
                                        {user.mitra.name}
                                    </h1>
                                    <p className="font-semibold">
                                        {user.mitra.perusahaan}
                                    </p>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2">
                                        <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span>{user.mitra.email}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <span>{user.mitra.no_telepon ?? '-'}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span>{user.mitra.alamat ?? '-'}</span>
                                    </li>
                                </ul>
                                <p>
                                    {user.mitra.deskripsi}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutMitra>
    );
}
