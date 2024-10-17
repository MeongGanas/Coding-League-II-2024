import SearchForm from "@/Components/admin/Search";
import KegiatanCard from "@/Components/masyarakat/card/KegiatanCard";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Kegiatan, PageProps } from "@/types";
import { useState } from "react";

export default function KegiatanPage({ auth: { user }, kegiatans }: PageProps<{ kegiatans: Kegiatan[] }>) {
    const [currentMax, setCurrentMax] = useState(8)
    const [kegiatanData, setKegiatanData] = useState(kegiatans.slice(0, currentMax));

    const muatLebihBanyak = () => {
        setKegiatanData(kegiatans.slice(0, currentMax + 8))
        setCurrentMax(currentMax + 8)
    }

    const muatLebihSedikit = () => {
        setKegiatanData(kegiatans.slice(0, currentMax - 8))
        setCurrentMax(currentMax - 8)
    }

    return (
        <LayoutMasyarakat user={user} title="Kegiatan">
            <OtherWelcomeSection title="Kegiatan" desc="Kegiatan terkini dari CSR Kabupaten Cirebon" />
            <div className="relative">
                <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="absolute left-0 bottom-0" />
                <div className="container py-10 px-5 space-y-5">
                    <div
                        className={`grid grid-cols-2 md:grid-cols-4 gap-4`}
                    >
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter Berdasarkan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="terbaru">Terbaru</SelectItem>
                                    <SelectItem value="terlama">Terlama</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-full col-span-3">
                            <SearchForm />
                        </div>
                    </div>

                    {kegiatans ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {kegiatanData.map((kegiatan) => (
                                <KegiatanCard kegiatan={kegiatan} />
                            ))}
                        </div>
                    ) : (
                        <h1 className="text-center">Belum ada data proyek</h1>
                    )}

                    <div className="flex justify-center">
                        {(currentMax === kegiatans.length || currentMax > kegiatans.length) && currentMax > 8 ? (
                            <Button variant={"outline"} type="button" onClick={muatLebihSedikit} className="hover:bg-primary hover:border-primary hover:text-white">Muat lebih sedikit</Button>
                        ) : (
                            <Button variant={"outline"} type="button" onClick={muatLebihBanyak} className="hover:bg-primary hover:border-primary hover:text-white">Muat lebih banyak</Button>
                        )}
                    </div>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}