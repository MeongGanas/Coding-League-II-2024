import SearchForm from "@/Components/admin/Search";
import Garis from "../Garis";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import ProyekCard from "../card/ProyekCard";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { Proyek, Sektor } from "@/types";

export default function ProyekListSection({
    proyeks,
    sektors,
}: {
    proyeks: Proyek[];
    sektors: Sektor[];
}) {
    const [currentMax, setCurrentMax] = useState(8);
    const [proyekData, setProyekData] = useState(proyeks.slice(0, currentMax));

    const params = new URLSearchParams(window.location.search);
    const sektor = params.get("sektor") as string;
    const [selectedSektor, setSelectedSektor] = useState(sektor || "semua");

    const handleFilterSektor = (value: string) => {
        if (value === "semua") {
            params.delete("sektor");
        } else {
            params.set("sektor", value);
        }

        window.location.replace(
            `${window.location.pathname}?${params.toString()}`
        );
    };

    const muatLebihBanyak = () => {
        setProyekData(proyeks.slice(0, currentMax + 8));
        setCurrentMax(currentMax + 8);
    };

    const muatLebihSedikit = () => {
        setProyekData(proyeks.slice(0, currentMax - 8));
        setCurrentMax(currentMax - 8);
    };

    return (
        <div className="relative">
            <img
                src="/images/masyarakat/hiasan.png"
                width={150}
                alt="hiasan"
                className="absolute left-0 bottom-0 -rotate-180 -z-10"
            />
            <div className="container py-20 px-5 space-y-10">
                <div className="space-y-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">
                        Proyek Tersedia
                    </h1>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}>
                        <Select
                            onValueChange={handleFilterSektor}
                            value={selectedSektor}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter sektor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="semua">
                                        Semua sektor CSR
                                    </SelectItem>
                                    {sektors.map((sektor) => (
                                        <SelectItem
                                            value={sektor.id.toString()}
                                            key={sektor.id}
                                        >
                                            {sektor.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-full col-span-3">
                            <SearchForm />
                        </div>
                    </div>
                </div>

                {proyeks ? (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {proyekData.map((proyek) => (
                            <ProyekCard proyek={proyek} key={proyek.id} />
                        ))}
                    </div>
                ) : (
                    <h1 className="text-center">Belum ada data proyek</h1>
                )}

                <div className="flex justify-center">
                    {proyeks.length === 0 ? (
                        <h1>Belum ada proyek tersedia</h1>
                    ) : (currentMax === proyeks.length ||
                        currentMax > proyeks.length) &&
                        currentMax > 8 ? (
                        <Button
                            variant={"outline"}
                            type="button"
                            onClick={muatLebihSedikit}
                            className="hover:bg-primary hover:border-primary hover:text-white"
                        >
                            Muat lebih sedikit
                        </Button>
                    ) : (
                        <Button
                            variant={"outline"}
                            type="button"
                            onClick={muatLebihBanyak}
                            className="hover:bg-primary hover:border-primary hover:text-white"
                        >
                            Muat lebih banyak
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
