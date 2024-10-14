import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DownloadButtons from "./DownloadButtons";
import { Sektor } from "@/types";

export default function SelectAndDownload({
    tahun,
    kuartal,
    sektor,
    mitra,
    sektors
}: {
    tahun?: boolean;
    kuartal?: boolean;
    sektor?: boolean;
    mitra?: boolean;
    sektors?: Sektor[];
}) {
    let filter = "";

    return (
        <div
            className={`grid grid-cols-2 md:grid-cols-4 ${tahun && kuartal && sektor && mitra
                ? "xl:grid-cols-6"
                : "xl:grid-cols-4"
                } gap-4 items-center`}
        >
            {tahun && (
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            {kuartal && (
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kuartal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">
                                Kuartal 1 (Januari, Februari, Maret)
                            </SelectItem>
                            <SelectItem value="2">
                                Kuartal 2 (April, Mei, Juni)
                            </SelectItem>
                            <SelectItem value="3">
                                Kuartal 3 (Juli, Agustus, September)
                            </SelectItem>
                            <SelectItem value="4">
                                Kuartal 4 (Oktober, November, Desember)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            {sektor && (
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Sektor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="semua" defaultChecked>Semua Sektor</SelectItem>
                            {sektors && sektors.map(sektor => (
                                <SelectItem value={sektor.id.toString()} key={sektor.id}>{sektor.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            {mitra && (
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Mitra" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="semua">Semua Mitra</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Button
                    className="bg-primary border-primary hover:bg-red-700"
                    type="submit"
                >
                    Terapkan Filter
                </Button>
                <DownloadButtons />
            </div>
        </div>
    );
}
