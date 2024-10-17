import KegiatanCard from "@/Components/masyarakat/card/KegiatanCard";
import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Link as LinkIcon, Twitter, TwitterIcon } from "lucide-react";

export default function KegiatanDetail({ auth: { user } }: PageProps) {
    return (
        <LayoutMasyarakat user={user} title="Kegiatan Detail">
            <OtherWelcomeSection title="Pemkab Cirebon Terima Bantuan PJU Tematik dari Bank BJB" desc="July 12, 2024" />
            <div className="container py-10 max-w-screen-sm mx-auto space-y-4">
                <div className="space-y-4 border-b pb-10">
                    <Garis />
                    <p className="text-gray-600">KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik.</p>

                    <p className="text-gray-600">KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik.</p>

                    <p className="text-gray-600">KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik. KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik.</p>

                    <div className="space-y-2">
                        <img src="/storage/example.jpg" alt="example" className="w-full rounded-md" />
                        <div className="flex items-center gap-1 text-gray-600">
                            <LinkIcon className="w-4 h-4" />
                            <h1>sumber gambar: </h1>
                            <Link href="/" className="underline">Gambar</Link>
                        </div>
                    </div>

                    <p className="text-gray-600">KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik.</p>

                    <p className="text-gray-600">KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik. KABUPATEN CIREBON — Pemerintah Kabupaten Cirebon menerima bantuan Corporate Social Responsibility (CSR) dari Bank BJB, berupa lampu penerangan jalan umum (PJU) tematik.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        Sosial
                    </Badge>
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        Bank BJB
                    </Badge>
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        CSR
                    </Badge>
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        Cirebon
                    </Badge>
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        Kabupaten Cirebon
                    </Badge>
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        Pemkab Cirebon
                    </Badge>
                    <Badge className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/90 text-black">
                        PJ Bupati Cirebon
                    </Badge>
                </div>
                <div className="flex justify-end text-gray-600 gap-3 items-center">
                    <h1>Bagikan kegiatan</h1>
                    <Button variant={"outline"} size={"icon"}><Facebook className="w-4 h-4" /></Button>
                    <Button variant={"outline"} size={"icon"}><TwitterIcon className="w-4 h-4" /></Button>
                    <Button variant={"outline"} size={"icon"}><Instagram className="w-4 h-4" /></Button>
                    <Button variant={"outline"} size={"icon"}><LinkIcon className="w-4 h-4" /></Button>
                </div>
            </div>
            <div className="container py-10 px-5 space-y-10">
                <div className="space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">Kegiatan Lainnya</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <KegiatanCard />
                    <KegiatanCard />
                    <KegiatanCard />
                </div>
                <div className="flex justify-center">
                    <Button variant={"outline"} asChild className="hover:bg-primary hover:border-primary hover:text-white"><Link href="/laporan">Lihat semua kegiatan</Link></Button>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}