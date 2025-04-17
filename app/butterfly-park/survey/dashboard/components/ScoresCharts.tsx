"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { surveySteps } from "../../surveyConfig";

export const ScoresCharts = ({ data }: { data: Record<string, any> | null }) => {
    const categories = ["food", "shops", "services", "pleasure"];
    const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const chartInstances = useRef<(Chart | null)[]>([]);

    const getHebrewLabel = (category: string, key: string) => {
        const step = surveySteps.find((step) => step.category === category);
        if (step && "items" in step) {
            const item = step.items.find((item) => item.key === key);
            return item ? item.label : key;
        }
        return key;
    };

    useEffect(() => {
        if (!data) return;

        categories.forEach((category, index) => {
            const chartRef = chartRefs.current[index];
            if (!chartRef) return;

            const ctx = chartRef.getContext("2d");
            if (!ctx) return;

            // Destroy existing chart instance if it exists
            if (chartInstances.current[index]) {
                chartInstances.current[index]?.destroy();
            }

            const categoryData = Object.values(data).reduce((acc: Record<string, number>, entry: any) => {
                const categoryRatings = entry[category];
                if (categoryRatings) {
                    Object.entries(categoryRatings).forEach(([key, value]) => {
                        acc[key] = (acc[key] || 0) + (value as number);
                    });
                }
                return acc;
            }, {});

            // Create a new bar chart instance
            chartInstances.current[index] = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Object.keys(categoryData).map((key) => getHebrewLabel(category, key)),
                    datasets: [
                        {
                            label: `ניקוד עבור ${category}`,
                            data: Object.values(categoryData),
                            backgroundColor: "#36A2EB",
                            borderColor: "#1E88E5",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: `ניקוד עבור ${category}`,
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
                        },
                    },
                },
            });
        });

        // Cleanup function to destroy all chart instances
        return () => {
            chartInstances.current.forEach((chart) => chart?.destroy());
        };
    }, [data]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-indigo-700 mb-4">{`ניקוד עבור ${category}`}</h3>
                    <div className="relative h-64">
                        <canvas ref={(el) => (chartRefs.current[index] = el)}></canvas>
                    </div>
                </div>
            ))}
        </div>
    );
};
