import { Button } from "@/Components/ui/button";
import Garis from "../Garis";
import KegiatanCard from "../card/KegiatanCard";
import { Link } from "@inertiajs/react";
import { Kegiatan } from "@/types";

export default function KegiatanSection({ kegiatans }: { kegiatans: Kegiatan[] }) {
    return (
        <div className="container py-10 px-5 space-y-10">
            <div className="text-center flex flex-col items-center gap-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">Kegiatan Terbaru</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* <KegiatanCard /> */
                    kegiatans.map((kegiatan, index) => (
                        <KegiatanCard key={index} kegiatan={kegiatan} />
                    ))
                }
            </div>
            <div className="flex justify-center">
                <Button variant={"outline"} asChild className="hover:bg-primary hover:border-primary hover:text-white"><Link href="/kegiatan">Lihat semua kegiatan</Link></Button>
            </div>
        </div>
    )
}
