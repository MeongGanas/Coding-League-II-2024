import { Button } from "@/Components/ui/button";
import Garis from "../Garis";
import { Link } from "@inertiajs/react";
import LaporanCard from "../card/LaporanCard";
import { Laporan } from "@/types";

export default function LaporanSection({ laporans }: { laporans: Laporan[] }) {
    return (
        <div className="container py-10 px-5 space-y-10">
            <div className="text-center flex flex-col items-center gap-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">Laporan Program <span className="block">Terbaru</span></h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {laporans && laporans.map(laporan => (
                    <LaporanCard laporan={laporan} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button variant={"outline"} asChild className="hover:bg-primary hover:border-primary hover:text-white"><Link href="/laporan">Lihat semua laporan program</Link></Button>
            </div>
        </div>
    )
}