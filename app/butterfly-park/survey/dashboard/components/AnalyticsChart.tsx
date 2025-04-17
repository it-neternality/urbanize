"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export const AnalyticsChart = ({ data, category }: { data: Record<string, any> | null; category: string }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const chartData = data
            ? Object.values(data).reduce((acc: Record<string, number>, entry: any) => {
                const value = entry.profile[category];
                if (value) acc[value] = (acc[value] || 0) + 1;
                return acc;
            }, {})
            : {};

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
                            text: `Distribution by ${category}`,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
    }, [data, category]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-indigo-700 mb-4 capitalize">{`Analytics: ${category}`}</h2>
            <div className="relative h-64">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};
