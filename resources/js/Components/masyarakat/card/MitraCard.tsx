
import { Mitra } from "@/types";
import { Link } from "@inertiajs/react";

export default function MitraCard({ mitra }: { mitra: Mitra }) {
    return (
        <Link href={`/mitra/${mitra.id}/detail`} className="bg-white">
            <div className="bg-[#F9FAFB]">
                <img src={`/storage/${mitra.image}`} alt={mitra.name ? mitra.name : "image"} />
            </div>
            <div className="p-5 border">
                <h1 className="font-bold text-xl md:text-2xl">{mitra.name}</h1>
            </div>
        </Link>
    )
}