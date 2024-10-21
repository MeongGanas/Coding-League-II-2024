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
    // const springProyek = useSpring({ number: counts.countProyek || 0, from: { number: 0 }, delay: 400 });
    // const springProyekRealized = useSpring({ number: counts.countProyekRealized || 0, from: { number: 0 }, delay: 400  });
    // const springMitra = useSpring({ number: counts.countMitra || 0, from: { number: 0 }, delay: 400  });
    // const parsedDana = parseFloat(counts.countTotalDanaRealized);
    // const springDana = useSpring({ number: parsedDana || 0, from: { number: 0 }, delay: 400  });

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

            {/* <div className="container py-10 px-5 space-y-10">
                <div className="text-center flex flex-col items-center gap-5">
                    <Garis />
                    <h1 className="font-extrabold text-3xl lg:text-4xl">
                        Data Statistik
                    </h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                        <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">
                            <animated.span>
                                {springProyek.number.to((n) => n.toFixed(0))}
                            </animated.span>
                        </h1>
                        <p className="text-lg md:text-xl">Total Proyek CSR</p>
                    </div>
                    <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                        <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">
                            <animated.span>
                                {springProyekRealized.number.to((n) =>
                                    n.toFixed(0)
                                )}
                            </animated.span>
                        </h1>
                        <p className="text-lg md:text-xl">Proyek Terealisasi</p>
                    </div>
                    <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                        <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">
                            <animated.span>
                                {springMitra.number.to((n) => n.toFixed(0))}
                            </animated.span>
                        </h1>
                        <p className="text-lg md:text-xl">Mitra Bergabung</p>
                    </div>
                    <div className="border-l-2 border-l-[#FFC3C0] space-y-2 px-5">
                        <h1 className="font-extrabold text-3xl lg:text-5xl text-primary-darker">
                            <animated.span>
                                {springDana.number.to((n) => prettyMoney(n))}
                            </animated.span>
                        </h1>
                        <p className="text-lg md:text-xl">Dana Realisasi CSR</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
