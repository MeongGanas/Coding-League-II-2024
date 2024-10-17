import { Button } from "@/Components/ui/button";
import { Proyek } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

export default function ProyekCard({ proyek }: { proyek: Proyek }) {
    return (
        <Link href={`/program/${proyek.id}/proyek`} className="bg-white">
            <img src={`/storage/${proyek.image}`} alt={proyek.name} />
            <div className="p-5 border space-y-4">
                <h1 className="font-bold text-xl md:text-2xl">{proyek.name}</h1>
                <div className="p-2 bg-[#F4F4F4]">
                    <h1 className="text-gray-600 flex items-center gap-2"><MapPin className="w-5 h-5" />{proyek.kecamatan}</h1>
                </div>
                <div className="p-2 bg-[#F4F4F4]">
                    <h1 className="text-gray-600">{proyek.sektor.name}</h1>
                </div>
                <div className="p-2 bg-[#F4F4F4]">
                    <h1 className="text-gray-600">Tgl. Berakhir: {proyek.tgl_akhir ? format(new Date(proyek.tgl_akhir), 'MMMM dd, y') : "-"}</h1>
                </div>
            </div>
        </Link>
    )
}