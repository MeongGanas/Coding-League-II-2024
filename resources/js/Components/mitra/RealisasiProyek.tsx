import { PersentaseTotalCSR, PersentaseTotalKecamatan, PersentaseTotalMitra, TotalRealisasiCSR } from "../admin/dashboard/chart/PersentaseTotal";

export default function RealisasiProyek({ realisasi }: { realisasi: any }) {
    return (
        <div className="w-full mt-5">
            <h1 className="font-bold text-2xl py-5">Realisasi Proyek CSR</h1>
            <div className="py-6 px-10 space-y-5 lg:space-y-0 border border-[#E4E4E4] bg-white rounded-xl grid gap-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                    <PersentaseTotalCSR data={realisasi.dataCSR} />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <TotalRealisasiCSR data={realisasi.dataCSR} />
                </div>
                <div className="col-span-2">
                    <PersentaseTotalKecamatan data={realisasi.persenTotalKecamatan} />
                </div>
            </div>
        </div>
    );
}
