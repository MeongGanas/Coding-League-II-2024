import { RealisasiSektor } from "@/types";
import {
    PersentaseTotalCSR,
    PersentaseTotalKecamatan,
    PersentaseTotalMitra,
    TotalRealisasiCSR,
} from "./chart/PersentaseTotal";

export default function RealisasiProyek({ realisasi }: { realisasi: any }) {
    console.log(realisasi);
    return (
        <div className="w-full mt-5">
            <h1 className="font-bold text-2xl py-5">Realisasi Proyek CSR</h1>
            <div className="py-6 px-10 space-y-5 lg:space-y-0 border border-[#E4E4E4] bg-white rounded-xl grid gap-5 grid-cols-1 lg:grid-cols-2">
                <PersentaseTotalCSR data={realisasi.dataCSR} />
                <TotalRealisasiCSR data={realisasi.dataCSR} />
                <PersentaseTotalMitra data={realisasi.persenTotalMitra} />
                <PersentaseTotalKecamatan data={realisasi.persenTotalKecamatan} />
            </div>
        </div>
    );
}
