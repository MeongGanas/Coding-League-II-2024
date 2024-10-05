import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Pie,
    PieChart,
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

const chartData = [
    { sektor: "sosial", total: 100000, fill: "#28A0F6" },
    { sektor: "lingkungan", total: 200000, fill: "#4E5BA6" },
    { sektor: "kesehatan", total: 123000, fill: "#7A5AF8" },
    { sektor: "pendidikan", total: 120012, fill: "#EE46BC" },
    {
        sektor: "infrastruktur dan lingkungan",
        total: 120210,
        fill: "#B42121",
    },
    {
        sektor: "sarana dan prasarana keagamaan",
        total: 123123,
        fill: "#F95016",
    },
    { sektor: "lainnya", total: 123232, fill: "#FAC515" },
];

const chartConfig = {
    total: {
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

export function PersentaseTotalCSR() {
    const chartData = [
        { sektor: "sosial", visitors: 275, fill: "#28A0F6" },
        { sektor: "lingkungan", visitors: 200, fill: "#4E5BA6" },
        { sektor: "kesehatan", visitors: 187, fill: "#7A5AF8" },
        { sektor: "pendidikan", visitors: 173, fill: "#EE46BC" },
        {
            sektor: "infrastruktur dan lingkungan",
            visitors: 90,
            fill: "#B42121",
        },
        {
            sektor: "sarana dan prasarana keagamaan",
            visitors: 90,
            fill: "#F95016",
        },
        { sektor: "lainnya", visitors: 90, fill: "#FAC515" },
    ];

    const chartConfig = {
        visitors: {
            label: "Visitors",
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

    return (
        <div className="space-y-5">
            <h1 className="font-bold text-xl">
                Persentase total realisasi berdasarkan sektor CSR
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="sektor"
                        />
                    </PieChart>
                </ChartContainer>
                <ul className="w-full space-y-3">
                    {chartData.map((data, i) => (
                        <li className="flex items-center gap-2" key={i}>
                            <div
                                className={`w-3 h-3 rounded-full`}
                                style={{
                                    backgroundColor: `hsl(var(--chart-${
                                        i + 1
                                    }))`,
                                }}
                            ></div>
                            <h1>
                                {data.sektor}: {data.visitors}
                            </h1>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function PersentaseTotalMitra() {
    return (
        <div className="space-y-5">
            <h1 className="font-bold text-xl">
                Persentase total realisasi berdasarkan Mitra
            </h1>
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
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
                    <XAxis dataKey="total" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="total"
                        layout="vertical"
                        fill="var(--color-desktop)"
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
                            dataKey="total"
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

export function PersentaseTotalKecamatan() {
    return (
        <div className="space-y-5">
            <h1 className="font-bold text-xl">
                Persentase total realisasi berdasarkan Kecamatan
            </h1>
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
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
                    <XAxis dataKey="total" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="total"
                        layout="vertical"
                        fill="var(--color-desktop)"
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
                            dataKey="total"
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
