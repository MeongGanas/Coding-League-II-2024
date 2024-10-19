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

const possibleColor = [
    "#28A0F6",
    "#4E5BA6",
    "#7A5AF8",
    "#EE46BC",
    "#B42121",
    "#F95016",
    "#FAC515",
]

const getChartData = (data: any, key: any) => {
    return data.map((item: any, index: number) => {
        return {
            sektor: item.sektor,
            total: item[key],
            fill: possibleColor[index]
        }
    })
}

const getChartConfig = (data: any) => {
    return data.reduce((acc: any, item: any, index: number) => {
        acc[item.sektor] = {
            label: item.sektor,
            color: possibleColor[index],
        };
        return acc;
    }, {});
}


const CustomLabel = (props: any) => {
    const { x, y, value, index, width, height, formatter, position, hiddenText, persistent } = props;
    const isLow = position === "left";
    const isBarLong = width > 300;
    const labelX = isLow ? x + 8 : x + width - 8;
    const labelY = y + height / 2 + 4.5;
    const content = formatter ? formatter(value, index) : value
    return (
        <text
            x={labelX}
            y={labelY}
            fill="white"
            fontSize={12}
            textAnchor={isLow ? "start" : "end"}
            className="fill-white"
        >
            {
                isBarLong
                    ? content
                    : hiddenText || ""
            }
        </text>
    );
};

export function PersentaseTotalCSR({ data }: { data: any }) {
    const chartData = getChartData(data, "count");
    const chartConfig = getChartConfig(data);

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
                            dataKey="total"
                            nameKey="sektor"
                        />
                    </PieChart>
                </ChartContainer>
                <ul className="w-full space-y-3">
                    {
                        data.map((item: any, index: number) => (
                            <li className="flex items-center gap-2" key={index}>
                                <div
                                    className={`w-3 h-3 rounded-full aspect-square`}
                                    style={{
                                        backgroundColor: possibleColor[index]
                                    }}
                                ></div>
                                <h1>
                                    {item.sektor}: {item.count}
                                </h1>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}



export function TotalRealisasiCSR({ data }: { data: any }) {
    let chartData = getChartData(data, "total");

    console.log(chartData);
    const chartConfig = getChartConfig(data);



    return (
        <div className="space-y-5">
            <h1 className="font-bold text-xl">
                Persentase total realisasi berdasarkan sektor CSR
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
                            dataKey="total"
                            content={<CustomLabel
                                hiddenText="..."
                                formatter={
                                    (value: number, index: number) => `${chartData[index]['sektor']} ${formatPrice(value)}`
                                } />
                            }
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
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
