import { Kegiatan } from "@/types";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";

export default function KegiatanCard({ kegiatan }: { kegiatan: Kegiatan }) {
    return (
        <Link href={`/kegiatan/${kegiatan.id}/detail`}>
            <div className="relative">
                <div className="absolute py-3 px-5 top-5 left-5 bg-primary text-white">
                    <h4 className="uppercase">{format(new Date(kegiatan.tgl_terbit), 'dd MMMM, y')}</h4>
                </div>
                <img src={`/storage/${kegiatan.image}`} alt={kegiatan.name} />
            </div>
            <div className="p-5 border space-y-5">
                <h1 className="font-bold text-xl md:text-2xl">{kegiatan.name}</h1>
                <p>{kegiatan.deskripsi.split(' ').slice(0, 10).join(' ')}...</p>
            </div>
        </Link>
    )
}