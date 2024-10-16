import { ChevronRight } from "lucide-react";
import Garis from "../Garis";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function SektorSection() {
    const [active, setActive] = useState('sosial')

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
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl ${active === "sosial" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`}>
                                Sosial <ChevronRight className="w-5 h-5" />
                            </li>
                            <li className={`w-full max-w-[400px] p-5 flex border-l-4 justify-between cursor-pointer hover:bg-white/10 hover:border-l-[#FF5D56] transition-colors items-center text-lg md:text-xl ${active === "apalah" ? "bg-white/10 border-l-[#FF5D56] font-bold" : "border-l-white/10"}`}>
                                <Link href="/sektor" className="flex items-center justify-between w-full">
                                    Lainnya <ChevronRight className="w-5 h-5" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-5">
                        <div className="relative">
                            <div className="w-[300px] h-60 bg-primary-darker"></div>
                            <img src="/storage/example.jpg" width={300} className="absolute top-0 left-10" alt="gambar" />
                        </div>
                        <p>CSR dalam lingkup sosial merupakan komitmen perusahaan untuk memberikan kontribusi positif bagi masyarakat di sekitarnya. Ini melibatkan berbagai kegiatan yang bertujuan meningkatkan kualitas hidup masyarakat, seperti program pendidikan, kesehatan, pemberdayaan ekonomi, dan pengentasan kemiskinan. Melalui CSR sosial, perusahaan tidak hanya memenuhi tanggung jawab sosialnya, tetapi juga membangun hubungan yang baik dengan masyarakat, meningkatkan reputasi perusahaan, dan menciptakan dampak sosial yang berkelanjutan. Kegiatan CSR sosial dapat berupa bantuan langsung, seperti donasi, atau program jangka panjang yang melibatkan partisipasi aktif masyarakat, seperti pelatihan keterampilan dan pengembangan komunitas.</p>
                        <div className="flex gap-5">
                            <Button asChild className="hover:bg-red-700"><Link href="/">Lihat program tersedia</Link></Button>
                            <Button asChild variant={"outline"} className="bg-transparent hover:bg-primary hover:text-white hover:border-primary"><Link href="/">Lihat program tersedia</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}