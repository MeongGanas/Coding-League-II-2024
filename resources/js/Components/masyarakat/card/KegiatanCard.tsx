import { Link } from "@inertiajs/react";

export default function KegiatanCard() {
    return (
        <Link href="/kegiatan/1/detail">
            <div className="relative">
                <div className="absolute py-3 px-5 top-5 left-5 bg-primary text-white">
                    <h4 className="uppercase">27 Mar, 2024</h4>
                </div>
                <img src="/storage/example.jpg" alt="" />
            </div>
            <div className="p-5 border space-y-5">
                <h1 className="font-bold text-xl md:text-2xl">Judul Kegiatan Terbaru.</h1>
                <p>Praesent viverra sapien congue aliquet viverra maecenas sed bibendum. Elementum risus accu...</p>
            </div>
        </Link>
    )
}