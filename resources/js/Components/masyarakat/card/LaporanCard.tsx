import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Link } from "@inertiajs/react";
import { User } from "lucide-react";

export default function LaporanCard() {
    return (
        <Link href="/">
            <div className="relative">
                <div className="absolute py-3 px-5 top-5 left-5 bg-primary text-white">
                    <h4 className="uppercase">27 Mar, 2024</h4>
                </div>
                <img src="/storage/example.jpg" alt="" />
            </div>
            <div className="p-5 border space-y-5">
                <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-primary">
                        <AvatarImage src={`/storage/example.jpg`} alt="user_image" />
                        <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                    </Avatar>
                    <h1 className="font-bold text-gray-600">
                        Andri Sapulalang
                    </h1>
                </div>
                <h1 className="font-bold text-xl md:text-2xl">Judul Kegiatan Terbaru.</h1>
                <p>Praesent viverra sapien congue aliquet viverra maecenas sed bibendum. Elementum risus accu...</p>
            </div>
        </Link>
    )
}