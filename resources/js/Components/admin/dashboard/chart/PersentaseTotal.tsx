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
import { useEffect, useRef, useState } from "react";
import { DataCSR, PersenTotalKecamatan, PersenTotalMitra } from "@/types";

const possibleColor = [
    "#28A0F6",
    "#4E5BA6",
    "#7A5AF8",
    "#EE46BC",
    "#B42121",
    "#F95016",
    "#FAC515",
];

const getChartData = (data: any, key: any, category: string) => {
    return data.map((item: any, index: number) => {
        return {
            [category]: item[category],
            total: item[key],
            fill: possibleColor[index],
        };
    });
};

const getChartConfig = (data: any) => {
    return data.reduce((acc: any, item: any, index: number) => {
        acc[item.sektor] = {
            label: item.sektor,
            color: possibleColor[index],
        };
        return acc;
    }, {});
};

const CustomLabel = (props: any) => {
    const {
        x,
        y,
        value,
        index,
        width,
        height,
        formatter,
        position,
        hiddenText,
        persistent,
    } = props;
    const isLow = position === "left";
    const labelX = isLow ? x + 8 : x + width - 8;
    const labelY = y + height / 2 + 4.5;
    const content = formatter ? formatter(value, index) : value;

    const [textWidth, setTextWidth] = useState(0);
    const textRef = useRef<SVGTextElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const context = document.createElement("canvas").getContext("2d");
            if (context) {
                context.font = getComputedStyle(textRef.current).font;
                const content = formatter ? formatter(value, index) : value;
                const metrics = context.measureText(content);
                setTextWidth(metrics.width);
            }
        }
    }, [value, formatter, index]);

    return (
        <text
            ref={textRef}
            x={labelX}
            y={labelY}
            fill="white"
            fontSize={12}
            textAnchor={isLow ? "start" : "end"}
            className="fill-white text-[0.8rem]"
        >
            {textWidth + 20 > width ? hiddenText || "" : content}
        </text>
    );
};

function noData() {
    return (
        <div className="w-full h-[250px] flex items-center justify-center">
            <p>Data tidak ditemukan</p>
        </div>
    );
}

function barChart({
    chartData,
    chartConfig,
    type,
    key,
    tooltipFormatter,
    labelFormatter,
}: {
    chartData: any[any];
    chartConfig: any;
    type: string;
    key: string;
    tooltipFormatter: (value: any, name: any) => string;
    labelFormatter: (value: any, index: number) => string;
}) {
    const height = chartData.length * 80;
    return (
        <ChartContainer
            config={chartConfig}
            style={{ height: `${height}px` }}
            className="min-h-[200px] max-h-[450px] w-full"
        >
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
                    dataKey={key}
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide
                />
                <XAxis dataKey="total" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            formatter={tooltipFormatter}
                        />
                    }
                />
                <Bar
                    dataKey="total"
                    layout="vertical"
                    fill="var(--color-desktop)"
                    radius={0}
                    barSize={60}
                >
                    <LabelList
                        dataKey="total"
                        content={
                            <CustomLabel
                                hiddenText="..."
                                formatter={labelFormatter}
                            />
                        }
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}

export function PersentaseTotalCSR({ data }: { data: DataCSR[] }) {
    const chartData = getChartData(data, "total", "sektor");
    const chartConfig = getChartConfig(data);
    return (
        <div className="space-y-5">
            <h1
                className={`font-bold text-xl ${
                    data.length === 0 ? "text-center" : null
                }`}
            >
                Persentase total realisasi berdasarkan sektor CSR
            </h1>
            {chartData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        indicator="line"
                                        formatter={(value: any, name: any) => {
                                            return `${formatPrice(value)}`;
                                        }}
                                    />
                                }
                            />
                            <Pie
                                data={chartData}
                                dataKey="total"
                                nameKey="sektor"
                            />
                        </PieChart>
                    </ChartContainer>
                    <ul className="w-full space-y-3">
                        {data.map((item: any, index: number) => (
                            <li className="flex items-center gap-2" key={index}>
                                <div
                                    className={`w-3 h-3 rounded-full aspect-square`}
                                    style={{
                                        backgroundColor: possibleColor[index],
                                    }}
                                ></div>
                                <h1>
                                    {item.sektor}: {item.count}
                                </h1>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                noData()
            )}
        </div>
    );
}

export function TotalRealisasiCSR({ data }: { data: DataCSR[] }) {
    const chartData = getChartData(data, "total", "sektor");
    const chartConfig = getChartConfig(data);

    return (
        <div className="space-y-5">
            <h1
                className={`font-bold text-xl ${
                    data.length === 0 ? "text-center" : null
                }`}
            >
                Persentase total realisasi berdasarkan sektor CSR
            </h1>
            {chartData.length > 0
                ? barChart({
                      chartData,
                      chartConfig,
                      type: "sektor",
                      key: "sektor",
                      tooltipFormatter: (value, name) => {
                          return `${formatPrice(value)}`;
                      },
                      labelFormatter: (value, index) => {
                          return `${chartData[index]["sektor"]} ${formatPrice(
                              value
                          )}`;
                      },
                  })
                : noData()}
        </div>
    );
}

export function PersentaseTotalMitra({ data }: { data: PersenTotalMitra[] }) {
    const chartData = getChartData(data, "total", "mitra");
    const chartConfig = getChartConfig(data);

    return (
        <div className="space-y-5">
            <h1
                className={`font-bold text-xl ${
                    data.length === 0 ? "text-center" : null
                }`}
            >
                Persentase total realisasi berdasarkan Mitra
            </h1>
            {chartData.length > 0
                ? barChart({
                      chartData,
                      chartConfig,
                      type: "mitra",
                      key: "mitra",
                      tooltipFormatter: (value, name) => {
                          return `${formatPrice(value)}`;
                      },
                      labelFormatter: (value, index) => {
                          return `${chartData[index]["mitra"]} ${formatPrice(
                              value
                          )}`;
                      },
                  })
                : noData()}
        </div>
    );
}

export function PersentaseTotalKecamatan({
    data,
}: {
    data: PersenTotalKecamatan[];
}) {
    const chartData = getChartData(data, "total", "kecamatan");
    const chartConfig = getChartConfig(data);
    return (
        <div className="space-y-5 w-full">
            <h1
                className={`font-bold text-xl ${
                    data.length === 0 ? "text-center" : null
                }`}
            >
                Persentase total realisasi berdasarkan Kecamatan
            </h1>
            {chartData.length > 0
                ? barChart({
                      chartData,
                      chartConfig,
                      type: "kecamatan",
                      key: "kecamatan",
                      tooltipFormatter: (value, name) => {
                          return `${formatPrice(value)}`;
                      },
                      labelFormatter: (value, index) => {
                          return `${
                              chartData[index]["kecamatan"]
                          } ${formatPrice(value)}`;
                      },
                  })
                : noData()}
        </div>
    );
}
