import { RealisasiSektor } from "@/types";
import {
    PersentaseTotalCSR,
    PersentaseTotalKecamatan,
    PersentaseTotalMitra,
} from "./chart/PersentaseTotal";
import TotalRealisasiCSR from "./chart/TotalRealisasiCSR";

export default function RealisasiProyek({ realisasi_per_sektor }: { realisasi_per_sektor: RealisasiSektor[] }) {
    return (
        <div className="w-full mt-5">
            <h1 className="font-bold text-2xl py-5">Realisasi Proyek CSR</h1>
            <div className="py-6 px-10 space-y-5 lg:space-y-0 border border-[#E4E4E4] bg-white rounded-xl grid gap-5 grid-cols-1 lg:grid-cols-2">
                <PersentaseTotalCSR realisasi_per_sektor={realisasi_per_sektor} />
                <TotalRealisasiCSR realisasi_per_sektor={realisasi_per_sektor} />
                <PersentaseTotalMitra />
                <PersentaseTotalKecamatan />
            </div>
        </div>
    );
}
