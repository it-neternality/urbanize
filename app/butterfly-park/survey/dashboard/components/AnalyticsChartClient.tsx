"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export const AnalyticsChartClient = ({
    chartData,
    category,
}: {
    chartData: Record<string, number>;
    category: string;
}) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current?.getContext("2d");
        if (ctx) {
            chartInstanceRef.current = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: Object.keys(chartData),
                    datasets: [
                        {
                            data: Object.values(chartData),
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: `התפלגות לפי ${getHebrewCategoryLabel(category)}`,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
    }, [chartData, category]);

    const getHebrewCategoryLabel = (category: string) => {
        const categoryLabels: Record<string, string> = {
            gender: "מגדר",
            address: "כתובת",
            sibiling: "סטטוס משפחתי",
            kupat_cholim: "קופת חולים",
        };
        return categoryLabels[category] || category;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-indigo-700 mb-4">{`התפלגות לפי ${getHebrewCategoryLabel(category)}`}</h2>
            <div className="relative h-64">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};
