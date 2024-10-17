import SearchForm from "@/Components/admin/Search";
import KegiatanCard from "@/Components/masyarakat/card/KegiatanCard";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps } from "@/types";

export default function Kegiatan({ auth: { user } }: PageProps) {
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

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                        <KegiatanCard />
                        <KegiatanCard />
                        <KegiatanCard />
                        <KegiatanCard />
                        <KegiatanCard />
                        <KegiatanCard />
                        <KegiatanCard />
                        <KegiatanCard />
                    </div>

                    <div className="flex justify-center">
                        <Button variant={"outline"}>Muat lebih banyak</Button>
                    </div>
                </div>
            </div>
        </LayoutMasyarakat>
    )
}