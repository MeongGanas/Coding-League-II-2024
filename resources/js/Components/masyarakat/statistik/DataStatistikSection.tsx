import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import Garis from "../Garis";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DownloadButtons from "@/Components/admin/DownloadButtons";
import { Statistik } from "@/types";
import { prettyMoney } from "@/lib/formatPrice";

export default function DataStatistikSection({ statistik }: { statistik: Statistik }) {


    return (
        <div className="container py-10 px-5 space-y-10">
            <div className="text-center flex flex-col items-center gap-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">Data Statistik</h1>
            </div>
            <div
                className={`grid grid-cols-2 md:grid-cols-5 gap-4`}
            >
                <Select>
                    <SelectTrigger className="w-full col-span-2">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full col-span-2">
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
                <div className="grid grid-cols-2 gap-4">
                    <DownloadButtons menu={"statistik"} />
                </div>
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
                        prettyMoney(statistik.dana_realisasi)
                    }</h1>
                    <p className="text-lg md:text-xl">Dana Realisasi CSR</p>
                </div>
            </div>
        </div>
    )
}
