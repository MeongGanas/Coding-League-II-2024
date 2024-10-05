import {
    DialogRevisi,
    DialogTerima,
    DialogTolak,
} from "@/Components/admin/dashboard/laporan/DialogAction";
import BreadcrumbLinks from "@/Components/all/BreadcrumbLinks";
import { Badge } from "@/Components/ui/badge";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import formatPrice from "@/lib/formatPrice";
import { Head } from "@inertiajs/react";
import { BriefcaseBusiness } from "lucide-react";

export default function Detail() {
    return (
        <LayoutAdmin>
            <Head title="Detail Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <BreadcrumbLinks basePath="/admin" />
                <h1 className="text-3xl font-bold">Detail Laporan</h1>
                <div className="bg-white rounded-md p-6 space-y-4">
                    <Badge className="text-[#344054] bg-[#F2F4F7] hover:bg-[#F2F4F7]">
                        Social
                    </Badge>
                    <div className="flex pb-5 mb-5 border-b gap-4">
                        <div className="rounded-full p-3 h-fit bg-primary-bg text-primary">
                            <BriefcaseBusiness className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="font-bold text-xl sm:text-2xl">
                                Laporan pengadaan perkakas masak untuk desa
                            </h1>
                            <div className="block space-y-1 sm:flex sm:gap-4 sm:space-y-0">
                                <p className="text-sm sm:text-base font-semibold">
                                    PT Mitra berbakti sekali
                                </p>
                                <p className="text-sm sm:text-base font-semibold">
                                    1 July 2024
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="overflow-x-auto flex gap-4 scroll-hidden">
                            <div className="min-w-96 h-60 rounded-md bg-neutral-300"></div>
                            <div className="min-w-96 h-60 rounded-md bg-neutral-300"></div>
                            <div className="min-w-96 h-60 rounded-md bg-neutral-300"></div>
                            <div className="min-w-96 h-60 rounded-md bg-neutral-300"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="bg-primary-bg p-6 rounded-md border-l-[5px] border-l-primary flex flex-col justify-center">
                            <h3>Realisasi</h3>
                            <h1 className="text-xl font-bold">
                                {formatPrice(10000000)}
                            </h1>
                        </div>
                        <div className="bg-primary-bg p-6 rounded-md border-l-[5px] border-l-primary flex flex-col justify-center">
                            <h3>Nama Proyek</h3>
                            <h1 className="text-xl font-bold">
                                Pengadaan sarana keterampilan Olahan Pangan
                            </h1>
                        </div>
                        <div className="bg-primary-bg p-6 rounded-md border-l-[5px] border-l-primary flex flex-col justify-center">
                            <h3>Kecamatan</h3>
                            <h1 className="text-xl font-bold">
                                Kec. Karangwareng
                            </h1>
                        </div>
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
                </div>
                <div className="bg-white rounded-md p-6">
                    <div className="block sm:flex space-y-3 sm:space-y-0 sm:w-fit sm:mx-auto gap-5">
                        <DialogTolak />
                        <DialogRevisi />
                        <DialogTerima />
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
