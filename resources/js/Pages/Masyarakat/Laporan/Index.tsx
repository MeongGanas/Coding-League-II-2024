import SearchForm from "@/Components/admin/Search";
import LaporanCard from "@/Components/masyarakat/card/LaporanCard";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Laporan, PageProps } from "@/types";
import { useState } from "react";

export default function LaporanPage({ auth: { user }, laporans }: PageProps<{ laporans: Laporan[] }>) {
    const [currentMax, setCurrentMax] = useState(8)
    const [laporanData, setLaporanData] = useState(laporans.slice(0, currentMax));

    const muatLebihBanyak = () => {
        setLaporanData(laporans.slice(0, currentMax + 8))
        setCurrentMax(currentMax + 8)
    }

    const muatLebihSedikit = () => {
        setLaporanData(laporans.slice(0, currentMax - 8))
        setCurrentMax(currentMax - 8)
    }

    return (
        <LayoutMasyarakat user={user} title="Laporan">
            <OtherWelcomeSection title="Laporan" desc="Laporan terkini dari CSR Kabupaten Cirebon" />
            <div className="relative">
                <img src="/images/masyarakat/hiasan_3.png" width={150} alt="hiasan" className="absolute left-0 bottom-0" />
                <div className="container py-10 px-5 space-y-5">
                    <div
                        className={`grid grid-cols-2 md:grid-cols-5 gap-4`}
                    >
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Urutkan berdasarkan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="terbaru">Terbaru</SelectItem>
                                    <SelectItem value="terlama">Terlama</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter mitra" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="semua">Semua mitra</SelectItem>
                                    <SelectItem value="terlama">Terlama</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-full col-span-2 md:col-span-3">
                            <SearchForm />
                        </div>
                    </div>

                    {laporans ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {laporanData.map((laporan) => (
                                <LaporanCard laporan={laporan} />
                            ))}
                        </div>
                    ) : (
                        <h1 className="text-center">Belum ada data proyek</h1>
                    )}

                    <div className="flex justify-center">
                        {(currentMax === laporans.length || currentMax > laporans.length) && currentMax > 8 ? (
                            <Button variant={"outline"} disabled={laporans.length <= 8} type="button" onClick={muatLebihSedikit} className="hover:bg-primary hover:border-primary hover:text-white">Muat lebih sedikit</Button>
                        ) : (
                            <Button variant={"outline"} disabled={laporans.length <= 8} type="button" onClick={muatLebihBanyak} className="hover:bg-primary hover:border-primary hover:text-white">Muat lebih banyak</Button>
                        )}
                    </div>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}