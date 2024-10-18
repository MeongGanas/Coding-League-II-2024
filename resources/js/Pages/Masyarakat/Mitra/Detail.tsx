import DetailCard from "@/Components/admin/dashboard/DetailCard";
import LaporanCard from "@/Components/masyarakat/card/LaporanCard";
import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import formatPrice from "@/lib/formatPrice";
import { Laporan, Mitra, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";

export default function Detail({ auth: { user }, mitra }: PageProps<{ mitra: Mitra }>) {
    console.log(mitra)
    return (
        <LayoutMasyarakat title="Detail Laporan" user={user}>
            <OtherWelcomeSection title={`${mitra.name ?? ""} - ${mitra.perusahaan}`} desc={`${mitra.perusahaan} - ${mitra.email} - ${mitra.no_telepon}`} anotherDesc={<p className="lg:text-lg text-light">
                {mitra.alamat}
            </p>} />

            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute -rotate-180 -z-10 left-0 bottom-0" />
                <div className="container py-20 px-5 space-y-5">
                    <Garis />
                    <div className="bg-[#F9FAFB]">
                        <img src={`/storage/${mitra.image}`} className="w-full max-w-screen-sm mx-auto" alt={mitra.name ?? "image"} />
                    </div>
                    <p>{mitra.deskripsi}</p>
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
                        {mitra.laporan && mitra.laporan.map((laporan) => (
                            <LaporanCard withMitraImage={false} laporan={laporan} />
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
