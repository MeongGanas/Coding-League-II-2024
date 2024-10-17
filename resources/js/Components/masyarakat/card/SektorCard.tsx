import { Button } from "@/Components/ui/button";
import { Sektor } from "@/types";
import { Link } from "@inertiajs/react";

export default function SektorCard({ sektor }: { sektor: Sektor }) {
    return (
        <div className="bg-white">
            <img src={`/storage/${sektor.image}`} alt={sektor.name} />
            <div className="p-5 border space-y-4">
                <h1 className="font-bold text-xl md:text-2xl">{sektor.name}</h1>
                <div className="p-2 bg-[#F4F4F4] w-fit">
                    <h1 className="text-gray-600">Tersedia: {sektor.proyeks ? sektor.proyeks.length : 0}</h1>
                </div>
                <Button className="w-full hover:bg-red-700" asChild><Link href={`/sektor/${sektor.id}/detail`}>Lihat Detail</Link></Button>
            </div>
        </div>
    )
}