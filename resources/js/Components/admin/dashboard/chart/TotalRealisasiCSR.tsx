import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import formatPrice from "@/lib/formatPrice";
import { RealisasiSektor } from "@/types";

const chartData = [
    { sektor: "sosial", total: 100000, fill: "#28A0F6" },
    { sektor: "lingkungan", total: 200000, fill: "#4E5BA6" },
    { sektor: "kesehatan", total: 123000, fill: "#7A5AF8" },
    { sektor: "pendidikan", total: 120012, fill: "#EE46BC" },
    { sektor: "infrastruktur dan lingkungan", total: 120210, fill: "#B42121" },
    {
        sektor: "sarana dan prasarana keagamaan",
        total: 123123,
        fill: "#F95016",
    },
    { sektor: "lainnya", total: 123232, fill: "#FAC515" },
];

const chartConfig = {
    total_realisasi: {
        label: "Total",
    },
    sosial: {
        label: "Sosial",
        color: "#28A0F6",
    },
    lingkungan: {
        label: "Lingkungan",
        color: "#4E5BA6",
    },
    kesehatan: {
        label: "Kesehatan",
        color: "#7A5AF8",
    },
    pendidikan: {
        label: "Pendidikan",
        color: "#EE46BC",
    },
    "infrastruktur dan lingkungan": {
        label: "Infrastruktur dan Lingkungan",
        color: "#B42121",
    },
    "sarana dan prasarana keagamaan": {
        label: "Sarana dan Prasarana Keagamaan",
        color: "#F95016",
    },
    lainnya: {
        label: "Lainnya",
        color: "#FAC515",
    },
} satisfies ChartConfig;

export default function TotalRealisasiCSR({ realisasi_per_sektor }: { realisasi_per_sektor: RealisasiSektor[] }) {
    return (
        <div className="space-y-5">
            <h1 className="font-bold text-xl">
                Persentase total realisasi berdasarkan sektor CSR
            </h1>
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={realisasi_per_sektor}
                    layout="vertical"
                    margin={{
                        right: 16,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="sektor"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        hide
                    />
                    <XAxis dataKey="total_realisasi" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="total_realisasi"
                        layout="vertical"
                        fill="var(--chart-1)"
                        radius={0}
                    >
                        <LabelList
                            dataKey="sektor"
                            position="insideLeft"
                            offset={8}
                            className="capitalize fill-white"
                            fontSize={12}
                            formatter={(value: string) => {
                                return value + ":";
                            }}
                        />
                        <LabelList
                            dataKey="total_realisasi"
                            position="insideRight"
                            offset={8}
                            className="fill-white"
                            fontSize={12}
                            formatter={(value: number) => {
                                return formatPrice(value);
                            }}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    );
}
