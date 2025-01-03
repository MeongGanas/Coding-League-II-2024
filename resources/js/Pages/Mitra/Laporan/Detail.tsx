import DetailCard from "@/Components/admin/dashboard/DetailCard";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Badge } from "@/Components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import LayoutMitra from "@/Layouts/LayoutMitra";
import formatPrice from "@/lib/formatPrice";
import { toCapitalize } from "@/lib/toCapitalize";
import { Laporan, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BriefcaseBusiness, Home, Pencil, Trash2, TriangleAlert } from "lucide-react";
import Markdown from "react-markdown";

export default function Detail({ auth: { user }, laporan, notifications }: PageProps<{ laporan: Laporan, notifications: any }>) {
    return (
        <LayoutMitra user={user} notifications={notifications}>
            <Head title="Detail Laporan" />
            <div className="container py-10 px-5 space-y-5">
                <div className="mb-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/mitra/dashboard`}>
                                    <Home
                                        className="w-5 h-5"
                                    />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href="/mitra/dashboard"
                                        className="capitalize"
                                    >
                                        Laporan
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="bg-primary-bg capitalize text-primary py-1 px-2 rounded-md font-bold">
                                    Detail Laporan
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <h1 className="text-3xl font-bold">Detail Laporan</h1>
                <div className="bg-white rounded-md p-6 space-y-4 border">
                    {laporan.status === "Ditolak" && (
                        <div className="p-5 rounded-md border border-[#FEC84B] bg-[#FFFCF5] text-[#B54708] flex gap-3">
                            <TriangleAlert className="h-5 w-5" />
                            <div>
                                <AlertTitle>Laporan ditolak!</AlertTitle>
                                <AlertDescription>
                                    {laporan.pesan}
                                </AlertDescription>
                            </div>
                        </div>
                    )}
                    {laporan.status === "Revisi" && (
                        <div className="p-5 rounded-md border border-[#FEC84B] bg-[#FFFCF5] text-[#B54708] flex gap-3">
                            <TriangleAlert className="h-5 w-5" />
                            <div>
                                <AlertTitle>Laporan perlu direvisi!</AlertTitle>
                                <AlertDescription>
                                    {laporan.pesan}
                                </AlertDescription>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <Badge className="text-[#344054] bg-[#F2F4F7] hover:bg-[#F2F4F7]">
                            {laporan.sektor.name}
                        </Badge>
                    </div>
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
                                    {format(new Date(laporan.created_at), "dd MMMM yyyy", { locale: id })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="overflow-x-auto flex gap-4 scroll-hidden">
                            {
                                laporan.photos.map((photo: string, index: number) => (
                                    <img key={index} src={`/storage/${photo}`} className="flex-basis-1/4 min-w-[23rem] h-60 rounded-md bg-neutral-300 object-scale-down" />
                                ))
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
                        <DetailCard
                            title="Realisasi"
                            content={
                                formatPrice(laporan.realisasi) || "Belum ada"
                            }
                        />
                        <DetailCard
                            title="Nama Proyek"
                            content={laporan.proyek.name}
                        />
                        <DetailCard
                            title="Kecamatan"
                            content={`Kec. ${toCapitalize(laporan.lokasi)}`}
                        />
                        <DetailCard
                            title="Tanggal Realisasi"
                            content={`${format(new Date(laporan.realisasi_date), "dd MMMM yyyy", { locale: id })}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Rincian Laporan</h1>
                        <Markdown className="space-y-4">{laporan.rincian}</Markdown>
                    </div>
                </div>
                {
                    ['Ditolak', 'Revisi', 'Draf'].includes(laporan.status) &&
                    <div className="bg-white rounded-md p-6 border">
                        <div className="block sm:flex space-y-3 sm:space-y-0 sm:w-fit sm:mx-auto gap-5">
                            <Button asChild variant={"outline"}><Link href={route('laporan.delete', laporan.id)} method="delete" className="flex items-center gap-2"><Trash2 className="w-5 h-5" />Hapus Laporan</Link></Button>
                            <Button asChild className="hover:bg-red-700"><Link href={`/mitra/laporan/${laporan.id}/edit`} className="flex items-center gap-2"><Pencil className="w-5 h-5" />Revisi Laporan</Link></Button>
                        </div>
                    </div>
                }
            </div>
        </LayoutMitra>
    );
}
