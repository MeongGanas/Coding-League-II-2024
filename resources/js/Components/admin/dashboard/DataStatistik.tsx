import formatPrice, { prettyMoney } from "@/lib/formatPrice";

import { useSpring, animated } from '@react-spring/web';
import { BadgeCheck, LayoutPanelLeft } from "lucide-react";
import { useEffect } from "react";

export default function DataStatistik({ counts }: { counts: any }) {
    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl py-5">Data Statistik</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
                <CardProyekCSR count={counts.countProyek || 0}/>
                <CardProyekTerealisasi count={counts.countProyekRealized || 0}/>
                <CardMitra count={counts.countMitra || 0} />
                <CardDana count={counts.countTotalDanaRealized} />
            </div>
        </div>
    );
}

function CardProyekCSR({ count }: { count: number }) {
    const props = useSpring({
        from: { number: 0 },
        to: { number: count },
        delay: 400
    });

    return (
        <div className="w-full p-6 rounded-xl bg-[#F95016] space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary-bg border-4 border-white">
                    <LayoutPanelLeft className="text-[#F95016] w-5 h-5" />
                </div>
                <h1 className="text-white text-lg">Total Proyek CSR</h1>
            </div>
            <div className="bg-white/30 rounded-xl p-4 border border-white/50">
                <h1 className="font-bold text-lg text-white">
                    <animated.span>{props.number.to(n => n.toFixed(0))}</animated.span>
                </h1>
            </div>
        </div>
    );
}

function CardProyekTerealisasi({ count }: { count: number }) {
    const props = useSpring({
        from: { number: 0 },
        to: { number: count },
        delay: 400
    });

    return (
        <div className="w-full p-6 rounded-xl bg-[#7A5AF8] space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#EBE9FE] border-4 border-white">
                    <BadgeCheck className="text-[#7A5AF8] w-5 h-5" />
                </div>
                <h1 className="text-white text-lg">Proyek Terealisasi</h1>
            </div>
            <div className="bg-white/30 rounded-xl p-4 border border-white/50">
                <h1 className="font-bold text-lg text-white">
                    <animated.span>{props.number.to(n => n.toFixed(0))}</animated.span>
                </h1>
            </div>
        </div>
    );
}

function CardMitra({ count }: { count: number }) {
    const props = useSpring({
        from: { number: 0 },
        to: { number: count },
        delay: 400
    });

    return (
        <div className="w-full p-6 rounded-xl bg-[#2C5586] space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#E7EEF7] border-4 border-white">
                    <LayoutPanelLeft className="text-[#2C5586] w-5 h-5" />
                </div>
                <h1 className="text-white text-lg">Mitra Bergabung</h1>
            </div>
            <div className="bg-white/30 rounded-xl p-4 border border-white/50">
                <h1 className="font-bold text-lg text-white">
                    <animated.span>{props.number.to(n => n.toFixed(0))}</animated.span>
                </h1>
            </div>
        </div>
    );
}

function CardDana({ count }: { count: string}) {
    const parsedCount = parseFloat(count);
    const props = useSpring({
        from: { number: 0 },
        to: { number: parsedCount },
        delay: 400,
        config: {
            duration: 1500
        }
    });

    return (
        <div className="w-full p-6 rounded-xl bg-success space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-success-bg border-4 border-white">
                    <LayoutPanelLeft className="text-success w-5 h-5" />
                </div>
                <h1 className="text-white text-lg">Total dana realisasi CSR</h1>
            </div>
            <div className="bg-white/30 rounded-xl p-4 border border-white/50">
                <h1 className="font-bold text-lg text-white text-nowrap overflow-hidden text-ellipsis">
                    <animated.span>
                        {props.number.to(n => formatPrice(n))}
                    </animated.span>
                </h1>
            </div>
        </div>
    );
}
