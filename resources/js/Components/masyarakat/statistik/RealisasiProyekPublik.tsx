import { PersentaseTotalCSR, PersentaseTotalKecamatan, PersentaseTotalMitra, TotalRealisasiCSR } from "@/Components/admin/dashboard/chart/PersentaseTotal";
import Garis from "../Garis";
import { Realisasi } from "@/types";

export default function RealisasiProyekPublik({ realisasi }: { realisasi: Realisasi }) {
    console.log(realisasi);
    return (
        <div className="container space-y-5 py-10 px-5">
            <Garis />
            <h1 className="font-extrabold text-3xl lg:text-4xl">Realisasi <span className="block">Proyek CSR</span></h1>
            <div className="py-6 px-10 space-y-5 bg-[#F9F9FB] lg:space-y-0 rounded-sm grid gap-5 grid-cols-1 lg:grid-cols-2">
                <PersentaseTotalCSR data={realisasi.dataCSR} />
                <TotalRealisasiCSR data={realisasi.dataCSR} />
            </div>
            <div className="py-6 px-10 space-y-5 bg-[#F9F9FB] lg:space-y-0 rounded-sm grid gap-5 grid-cols-1 lg:grid-cols-2">
                <PersentaseTotalMitra data={realisasi.persenTotalMitra} />
                <PersentaseTotalKecamatan data={realisasi.persenTotalKecamatan} />
            </div>
        </div>
    );
}
