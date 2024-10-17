import { PersentaseTotalCSR, PersentaseTotalKecamatan, PersentaseTotalMitra } from "@/Components/admin/dashboard/chart/PersentaseTotal";
import TotalRealisasiCSR from "@/Components/admin/dashboard/chart/TotalRealisasiCSR";
import Garis from "../Garis";

export default function RealisasiProyekPublik() {
    return (
        <div className="container space-y-5 py-10 px-5">
            <Garis />
            <h1 className="font-extrabold text-3xl lg:text-4xl">Realisasi <span className="block">Proyek CSR</span></h1>
            <div className="py-6 px-10 space-y-5 bg-[#F9F9FB] lg:space-y-0 rounded-sm grid gap-5 grid-cols-1 lg:grid-cols-2">
                <PersentaseTotalCSR />
                <TotalRealisasiCSR />
            </div>
            <div className="py-6 px-10 space-y-5 bg-[#F9F9FB] lg:space-y-0 rounded-sm grid gap-5 grid-cols-1 lg:grid-cols-2">
                <PersentaseTotalMitra />
                <PersentaseTotalKecamatan />
            </div>
        </div>
    );
}
