"use client";

import { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const analyticsCategories = [
    { key: "gender", label: "מגדר" },
    { key: "address", label: "כתובת" },
    { key: "sibiling", label: "סטטוס משפחתי" },
    { key: "kupat_cholim", label: "קופת חולים" },
];

const categoryLabels: Record<string, string> = {
    gender: "מגדר",
    address: "כתובת",
    sibiling: "סטטוס משפחתי",
    kupat_cholim: "קופת חולים",
};

export const AnalyticsCharts = ({ data }: { data: Record<string, Record<string, unknown>> | null }) => {
    const [activeCategory, setActiveCategory] = useState(analyticsCategories[0].key);
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!data) return;
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        const chartData = Object.values(data).reduce((acc: Record<string, number>, entry: Record<string, unknown>) => {
            const profile = entry.profile as Record<string, string> | undefined;
            const value = profile?.[activeCategory];
            if (value) acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
        const ctx = chartRef.current?.getContext("2d");
        if (ctx) {
            chartInstanceRef.current = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: Object.keys(chartData),
                    datasets: [
                        {
                            data: Object.values(chartData),
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                                "#FF5733",
                                "#33FF57",
                            ],
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: `התפלגות לפי ${categoryLabels[activeCategory]}`,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
    }, [data, activeCategory]);

    return (
        <div className="flex flex-row gap-6">
            {/* Sidebar */}
            <div className="flex flex-col gap-6 md:w-[12%]">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">קטגוריות</h3>
                    <div className="flex flex-col gap-2">
                        {analyticsCategories.map((cat) => (
                            <button
                                key={cat.key}
                                className={`px-4 py-2 rounded ${activeCategory === cat.key ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                                onClick={() => setActiveCategory(cat.key)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="md:w-[88%] bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-sm text-gray-600">
                    סך הכל {data ? Object.values(data).length : 0} תגובות
                </div>
                <div className="mb-4 text-sm text-gray-600">
                    מוצגות {data ? Object.values(data).filter((entry: Record<string, unknown>) => {
                        const profile = entry.profile as Record<string, string> | undefined;
                        const value = profile?.[activeCategory];
                        return value !== undefined && value !== null && value !== '';
                    }).length : 0} תגובות לאחר סינון
                </div>
                <h3 className="text-lg font-bold text-indigo-700 mb-4">{`התפלגות לפי ${categoryLabels[activeCategory]}`}</h3>
                <div className="relative h-96">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};
