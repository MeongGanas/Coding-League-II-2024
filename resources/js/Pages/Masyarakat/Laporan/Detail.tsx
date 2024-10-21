import DetailCard from "@/Components/admin/dashboard/DetailCard";
import LaporanCard from "@/Components/masyarakat/card/LaporanCard";
import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import formatPrice from "@/lib/formatPrice";
import { Laporan, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import Markdown from "react-markdown";

export default function Detail({ auth: { user }, laporan, laporanLainnya }: PageProps<{ laporan: Laporan, laporanLainnya: Laporan[] }>) {
    return (
        <LayoutMasyarakat title="Detail Laporan" user={user}>
            <OtherWelcomeSection title={laporan.name} desc={`${laporan.mitra.perusahaan} - ${format(new Date(laporan.created_at), 'MMMM dd, y')}`} anotherDesc={<Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                {laporan.sektor.name}
            </Badge>} />

            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute -rotate-180 -z-10 left-0 bottom-0" />
                <div className="container py-20 px-5 space-y-5">
                    <Garis />
                    <div className="bg-[#F9FAFB]">
                        <img src={`/storage/${laporan.mitra.image}`} className="w-full max-w-screen-sm mx-auto" alt={laporan.name} />
                    </div>
                    <h2 className="font-extrabold text-2xl lg:text-3xl">Galeri</h2>
                    <div className="flex w-full overflow-auto gap-5 scroll-hidden">
                        {laporan.photos.map((photo, i) => (
                            <img src={`/storage/${photo}`} key={i} width={300} alt="example" />
                        ))}
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
                        <h2 className="font-extrabold text-2xl lg:text-3xl">Rincian Laporan</h2>
                        <Markdown className="space-y-4">{laporan.rincian}</Markdown>
                    </div>
                </div>
            </div>

            <div className="relative">
                <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="absolute -z-10 right-0 bottom-0" />
                <div className="container py-10 px-5 space-y-10">
                    <div className="space-y-5">
                        <Garis />
                        <h1 className="font-extrabold text-3xl lg:text-4xl">Laporan Lainnya</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {laporanLainnya && laporanLainnya.map((laporan) => (
                            <LaporanCard laporan={laporan} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button variant={"outline"} asChild className="hover:bg-primary hover:border-primary hover:text-white"><Link href="/laporan">Lihat semua laporan</Link></Button>
                    </div>
                </div>
            </div>
        </LayoutMasyarakat>
    );
}
