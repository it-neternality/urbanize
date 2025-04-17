"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { TooltipItem } from "chart.js";

Chart.register(ChartDataLabels);

export const ScoresChartsClient = ({
    activeCategory,
    categoryTitles,
    filteredData,
}: {
    activeCategory: string;
    categoryTitles: Record<string, string>;
    filteredData: Record<string, number>;
}) => {
    const barChartRef = useRef<HTMLCanvasElement | null>(null);
    const pieChartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const barCtx = barChartRef.current?.getContext("2d");
        const pieCtx = pieChartRef.current?.getContext("2d");
        if (!barCtx || !pieCtx) return;

        const labels = Object.keys(filteredData);
        const scores = Object.values(filteredData);
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FF5733", "#33FF57"];

        const barChart = new Chart(barCtx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: categoryTitles[activeCategory],
                        data: scores,
                        backgroundColor: colors.slice(0, labels.length),
                        borderColor: colors.slice(0, labels.length),
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: categoryTitles[activeCategory],
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: TooltipItem<"bar">) => {
                                if (typeof context.raw === "number") {
                                    return `${context.raw.toLocaleString()} נקודות`;
                                }
                                return "";
                            },
                        },
                    },
                    datalabels: {
                        display: true,
                        color: "#000",
                        anchor: "end",
                        align: "top",
                        formatter: (value: number) => value.toLocaleString(),
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "פריטים",
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "ניקוד כולל",
                        },
                        ticks: {
                            callback: function (value) {
                                return Number(value).toLocaleString();
                            },
                        },
                    },
                },
            },
        });

        const pieChart = new Chart(pieCtx, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        data: scores,
                        backgroundColor: colors.slice(0, labels.length),
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `התפלגות ניקוד עבור ${categoryTitles[activeCategory]}`,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        return () => {
            barChart.destroy();
            pieChart.destroy();
        };
    }, [activeCategory, categoryTitles, filteredData]);

    return (
        <div>
            <div className="relative h-96 mb-6">
                <canvas ref={barChartRef}></canvas>
            </div>
            <div className="relative h-64">
                <canvas ref={pieChartRef}></canvas>
            </div>
        </div>
    );
};
