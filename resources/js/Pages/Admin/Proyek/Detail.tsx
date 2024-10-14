import DetailCard from "@/Components/admin/dashboard/DetailCard";
import { DialogTerbit } from "@/Components/admin/dashboard/proyek/DialogTerbit";
import DataTableMitra from "@/Components/admin/dashboard/proyek/TabelProyekMitra";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import { PageProps, Proyek } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { format } from "date-fns";
import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Detail({ auth: { user }, proyek }: PageProps<{ proyek: Proyek }>) {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const terbitkan = () => {
        setIsSubmitted(true)

        const promise = axios.post(`/admin/proyek/${proyek.id}`, {
            _method: "PATCH"
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsSubmitted(false)
                window.location.replace(`/admin/proyek/${proyek.id}`)
                return "Terbitkan Proyek Success"
            },
            error: (err) => {
                console.log(err.response.data)
                setIsSubmitted(false)
                return err?.response.data.message || "Something went wrong"
            }
        })
    }

    return (
        <LayoutAdmin user={user}>
            <Head title="Detail Proyek" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <BreadcrumbLinks basePath="/admin" pagePath="Detail" />
                </div>
                <h1 className="text-3xl font-bold">Detail Proyek</h1>
                <div className="bg-white rounded-md p-6 space-y-4 border">
                    <div className="flex gap-2">
                        {proyek.status === "terbit" ? (
                            <Badge className="text-success bg-success-bg hover:bg-success-bg">
                                Terbit
                            </Badge>
                        ) : (
                            <Badge className="text-[#B54708] bg-[#FFFAEB] hover:bg-[#FFFAEB]">
                                Draf
                            </Badge>
                        )}
                        <Badge className="text-[#344054] bg-[#F2F4F7] hover:bg-[#F2F4F7]">
                            Social
                        </Badge>
                    </div>
                    <div className="flex pb-5 mb-5 border-b gap-4">
                        <div className="rounded-full p-3 h-fit bg-primary-bg text-primary">
                            <BriefcaseBusiness className="w-5 h-5" />
                        </div>
                        <h1 className="font-bold text-xl sm:text-2xl">
                            {proyek.name}
                        </h1>
                    </div>
                    <div className="w-full">
                        <div className="overflow-x-auto flex gap-4 scroll-hidden">
                            <img src={`/storage/${proyek.image}`} width={500} className="mx-auto" alt={proyek.name} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <DetailCard
                            title="Tanggal"
                            content={`${format(proyek.tgl_awal, 'dd MMMM Y')} - ${proyek.tgl_akhir ? format(proyek.tgl_akhir, 'dd MMMM Y') : "Tidak ditentukan"}`}
                        />
                        <DetailCard
                            title="Kecamatan"
                            content={`Kec. ${proyek.kecamatan.toLowerCase()
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Rincian Laporan</h1>
                        <div className="space-y-4">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Non error ab cum sapiente
                                beatae nam, magnam quod distinctio rem assumenda
                                consectetur quidem? Ducimus dolorum quo repellat
                                delectus sed consequuntur dicta esse dolorem
                                consectetur eum mollitia, accusantium neque
                                natus quisquam suscipit, molestiae harum. Facere
                                tenetur ullam aperiam suscipit minus quia fugiat
                                quisquam doloribus repellendus quas in
                                molestiae, nemo earum distinctio. Perferendis
                                excepturi neque est dolorem nam delectus
                                distinctio corrupti nemo voluptas quam
                                repudiandae provident, repellendus laborum,
                                asperiores quos maiores libero. Blanditiis iste
                                impedit sequi hic eius molestias facere
                                repellendus ad est iure, voluptate nostrum
                                cumque aspernatur praesentium explicabo omnis
                                sunt veniam?
                            </p>
                        </div>
                    </div>
                    {proyek.status === "terbit" && (
                        <div className="border-t pt-5">
                            <h1 className="font-bold text-2xl mb-4">
                                Mitra Yang Berpartisipasi
                            </h1>
                            <DataTableMitra />
                        </div>
                    )}
                </div>
                {proyek.status === "draf" && (
                    <div className="bg-white rounded-md p-6 border">
                        <div className="block sm:flex space-y-3 sm:space-y-0 sm:w-fit sm:mx-auto gap-5">
                            <DialogTerbit terbitkan={terbitkan} isSubmitted={isSubmitted} />
                        </div>
                    </div>
                )}
            </div>
        </LayoutAdmin>
    );
}