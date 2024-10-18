import SearchForm from "@/Components/admin/Search";
import MitraCard from "@/Components/masyarakat/card/MitraCard";
import Garis from "@/Components/masyarakat/Garis";
import OtherWelcomeSection from "@/Components/masyarakat/OtherWelcomeSection";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { Mitra, PageProps } from "@/types";
import { useState } from "react";

export default function MitraPage({ auth: { user }, mitras }: PageProps<{ mitras: Mitra[] }>) {
    const params = new URLSearchParams(window.location.search);
    const sortall = params.get("sortall") as string
    const [selectedValue, setSelectedValue] = useState(sortall || "terbanyak");

    const handleFilterChange = (value: string) => {
        if (value === "terbanyak") {
            params.delete("sortall");
        } else if (value === "tersedikit") {
            params.set("sortall", "tersedikit");
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        )
    }

    return (
        <LayoutMasyarakat user={user} title="Mitra">
            <OtherWelcomeSection title="Mitra" desc="Mitra CSR Kabupaten Cirebon" />
            <div className="relative">
                <img src="/images/masyarakat/hiasan.png" width={150} alt="hiasan" className="absolute -rotate-180 -z-10 left-0 bottom-0" />
                <div className="container py-10 px-5 space-y-10">
                    <div className="flex justify-center w-full">
                        <Garis />
                    </div>
                    <div
                        className={`grid grid-cols-2 md:grid-cols-4 gap-4`}
                    >
                        <Select onValueChange={handleFilterChange} value={selectedValue}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sortir" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="terbanyak">Terbanyak</SelectItem>
                                    <SelectItem value="tersedikit">Tersedikit</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-full col-span-2 md:col-span-3">
                            <SearchForm />
                        </div>
                    </div>

                    {mitras ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {mitras.map((mitra) => (
                                <MitraCard mitra={mitra} />
                            ))}
                        </div>
                    ) : (
                        <h1 className="text-center">Belum ada data mitra yang bergabung</h1>
                    )}
                </div>
            </div>
        </LayoutMasyarakat>
    )
}