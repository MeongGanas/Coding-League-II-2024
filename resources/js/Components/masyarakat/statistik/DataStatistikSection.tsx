import SelectAndDownload from "@/Components/admin/SelectAndDownload";
import Garis from "../Garis";
import { Counts } from "@/types";
import { prettyMoney } from "@/lib/formatPrice";
import { useSpring, animated } from "@react-spring/web";
import StatistikHome from "../home/DataStatistikSection";


export default function DataStatistikSection({
    counts,
    possibleYear,
}: {
    counts: Counts;
    possibleYear: any;
}) {

    return (
        <div className="container py-10 px-5 space-y-10">
            <div className="text-center flex flex-col items-center gap-5">
                <Garis />
                <h1 className="font-extrabold text-3xl lg:text-4xl">
                    Data Statistik
                </h1>
            </div>

            <SelectAndDownload
                kuartal={true}
                menu="statistik"
                tahun={true}
                tahunOptions={possibleYear}
            />

            <StatistikHome counts={counts} />
        </div>
    );
}
