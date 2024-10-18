import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Laporan } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { User } from "lucide-react";

export default function LaporanCard({laporan}: {laporan: any[any]}) {
    return (
        <Link href={`/laporan/${laporan.id}/detail`}>
            <div className="relative">
                <div className="absolute py-3 px-5 top-5 left-5 bg-primary text-white">
                    <h4 className="uppercase">
                        {
                            format(new Date(laporan.tgl_kirim), 'dd MMMM, y', { locale: id })
                        }
                    </h4>
                </div>
                <img src={`/storage/${laporan.photos[0]}`} alt={`${laporan.photos[0]}`} />
            </div>
            <div className="p-5 border space-y-5">
                <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-primary">
                        <AvatarImage className="

                        object-center object-cover
                        " src={`/storage/${laporan.mitra.image}`} alt={`${laporan.mitra.name}`} />
                        <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                    </Avatar>
                    <h1 className="font-bold text-gray-600">
                        {
                            laporan.mitra.name
                        }
                    </h1>
                </div>
                <h1 className="font-bold text-xl md:text-2xl">{
                        laporan.name
                    }</h1>
                <p>{
                        laporan.rincian?.split(' ').slice(0, 10).join(' ') + '...'
                }</p>
            </div>
        </Link>
    )
}
