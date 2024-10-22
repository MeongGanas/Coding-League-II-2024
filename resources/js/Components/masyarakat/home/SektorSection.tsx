import { ChevronRight } from "lucide-react";
import Garis from "../Garis";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Sektor } from "@/types";

export default function SektorSection(
    { sektors }: { sektors: Sektor[] }
) {
    const [active, setActive] = useState({
        name: sektors[0].name,
        id: sektors[0].id
    })


    return (
        <div className="bg-[#101828] px-5 py-20 relative text-white">
            <img src="/images/masyarakat/hiasan_2.png" width={150} alt="hiasan" className="absolute right-0 top-0" />
            <div className="container space-y-10">
                <div className="space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Sektor CSR</h1>
                    <p>Bidang sektor CSR Kabupaten Cirebon yang tersedia</p>
                </div>
                <div className="grid lg:grid-cols-2 space-y-10 lg:space-y-0">
                    <div className="pl-5">
                        <ul className="w-full">
                            {
                                sektors.map((sektor, index) => (
                                    <li key={index} className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl ${active.name === sektor.name ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`}
                                        onClick={() => {
                                            setActive({ name: sektor.name, id: sektor.id });
                                        }}
                                    >
                                        {sektor.name} <ChevronRight className="ml-[20px] w-5 h-5" />
                                    </li>
                                ))
                            }
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl ${active.name === "apalah" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`}>
                                <Link href="/sektor" className="flex items-center justify-between w-full">
                                    Lainnya <ChevronRight className="w-5 h-5" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="w-[300px] h-60 bg-primary-darker"></div>
                            <img src={`/storage/${sektors.find(sektor => sektor.name === active.name)?.image || "sektor_image/example.jpg"
                                }`} className="absolute -top-20 h-72 left-10 object-cover aspect-video" alt="gambar" />
                        </div>
                        <p>{
                            sektors.find(sektor => sektor.name === active.name)?.deskripsi
                        }</p>
                        <div className="flex gap-5 ">
                            {/* TODO #button1 kalau udah cocok ini dua button hapusmi ini komen dan done ki di trello*/}
                            <Button asChild className="hover:bg-red-700"><Link href={`/sektor?sektor=${active.id}`}>Lihat program tersedia</Link></Button>
                            <Button asChild variant={"outline"} className="bg-transparent hover:bg-primary hover:text-white hover:border-primary"><Link href={`/sektor/${active.id}/detail?proyekcsr`}>Lihat realisasi program</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
