import { Statistik } from "@/types";
import Garis from "../Garis";
import { prettyMoney } from "@/lib/formatPrice";

export default function DataStatistikSection({ statistik }: { statistik: Statistik }) {

    return (
        <div className="container py-10 px-5 space-y-10">
            <div className="text-center flex flex-col items-center gap-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">Data Statistik</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                    <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">{
                        statistik.total_proyek || 0
                    }</h1>
                    <p className="text-lg md:text-xl">Total Proyek CSR</p>
                </div>
                <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                    <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">{
                        statistik.proyek_terealisasi || 0
                    }</h1>
                    <p className="text-lg md:text-xl">Proyek Terealisasi</p>
                </div>
                <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                    <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">{
                        statistik.mitra_bergabung || 0
                    }</h1>
                    <p className="text-lg md:text-xl">Mitra Bergabung</p>
                </div>
                <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                    <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">{
                        // Rp200T+
                        prettyMoney(statistik.dana_realisasi)
                    }</h1>
                    <p className="text-lg md:text-xl">Dana Realisasi CSR</p>
                </div>
            </div>
        </div>
    )
}
