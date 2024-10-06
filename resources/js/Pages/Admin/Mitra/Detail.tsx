import { DialogNonaktifkan } from "@/Components/admin/dashboard/mitra/DialogAction";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { Head, Link } from "@inertiajs/react";
import { Mail, MapPin, Pencil, Phone, Plus, Power } from "lucide-react";

export default function Detail() {
    const isTerverifikasi = true;

    return (
        <LayoutAdmin>
            <Head title="Detail Mitra" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" />
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
                            <div className="w-full h-72 bg-neutral-300 rounded-md"></div>
                        </div>
                        <div className="w-full md-w-1/2 space-y-4">
                            <div className="space-y-2">
                                <div className="flex gap-4 items-center">
                                    <h1 className="font-bold text-2xl">
                                        Nama Mitra
                                    </h1>
                                    <Badge className="text-success bg-success-bg hover:bg-success-bg">
                                        Terverifikasi
                                    </Badge>
                                </div>
                                <p className="font-semibold">
                                    PT Mitra Sejahtera Bersama
                                </p>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span>info@gmail.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <span>0821 #### ###</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="p-2 border-4 text-primary bg-[#FFDDDC] rounded-full border-primary-bg">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span>Jl. Lorem ipsum dolor sit amet</span>
                                </li>
                            </ul>
                            <p>
                                Maksud pemerintah kabupaten dalam Corporate
                                Social Responsibility (CSR) adalah untuk
                                menciptakan sinergi yang kuat antara pemerintah,
                                perusahaan, dan masyarakat. Tujuan utama dari
                                upaya ini adalah untuk mendorong pembangunan
                                berkelanjutan di wilayah kabupaten. Dengan
                                melibatkan perusahaan dalam program CSR,
                                diharapkan dapat tercipta solusi komprehensif
                                bagi berbagai permasalahan sosial dan
                                lingkungan, sehingga kesejahteraan masyarakat
                                dapat meningkat secara signifikan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
