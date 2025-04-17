"use client";

import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { surveySteps } from "../../surveyConfig";

Chart.register(ChartDataLabels);

export const ScoresCharts = ({ data }: { data: Record<string, any> | null }) => {
    const categories = ["food", "shops", "services", "pleasure"];
    const [activeCategory, setActiveCategory] = useState(categories[0]); // State for active tab
    const barChartRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const pieChartRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const barChartInstances = useRef<(Chart | null)[]>([]);
    const pieChartInstances = useRef<(Chart | null)[]>([]);

    const categoryTitles: Record<string, string> = {
        food: "ניקוד כולל עבור מזון והסעדה",
        shops: "ניקוד כולל עבור חנויות",
        services: "ניקוד כולל עבור שירותים",
        pleasure: "ניקוד כולל עבור בילוי ופנאי",
    };

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

        const index = categories.indexOf(activeCategory);
        const barChartRef = barChartRefs.current[index];
        const pieChartRef = pieChartRefs.current[index];
        if (!barChartRef || !pieChartRef) return;

        const barCtx = barChartRef.getContext("2d");
        const pieCtx = pieChartRef.getContext("2d");
        if (!barCtx || !pieCtx) return;

        // Destroy existing chart instances if they exist
        if (barChartInstances.current[index]) {
            barChartInstances.current[index]?.destroy();
        }
        if (pieChartInstances.current[index]) {
            pieChartInstances.current[index]?.destroy();
        }

        // Calculate total scores for each item in the category
        const categoryData = Object.values(data).reduce((acc: Record<string, number>, entry: any) => {
            const categoryRatings = entry[activeCategory];
            if (categoryRatings && typeof categoryRatings === "object") {
                Object.entries(categoryRatings).forEach(([key, value]) => {
                    const numericValue = parseFloat(value as string); // Ensure the value is numeric
                    if (!isNaN(numericValue)) {
                        acc[key] = (acc[key] || 0) + numericValue;
                    }
                });
            }
            return acc;
        }, {});

        const labels = Object.keys(categoryData).map((key) => getHebrewLabel(activeCategory, key));
        const scores = Object.values(categoryData);
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FF5733", "#33FF57"];

        // Create a new bar chart instance
        barChartInstances.current[index] = new Chart(barCtx, {
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
                            label: (context) => `${context.raw.toLocaleString()} נקודות`,
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
                                return Number(value).toLocaleString(); // Format numbers with commas
                            },
                        },
                    },
                },
            },
        });

        // Create a new pie chart instance
        pieChartInstances.current[index] = new Chart(pieCtx, {
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
            barChartInstances.current[index]?.destroy();
            pieChartInstances.current[index]?.destroy();
        };
    }, [data, activeCategory]);

    return (
        <div>
            {/* Sub-menu for tabs */}
            <div className="flex space-x-4 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded ${activeCategory === category ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {categoryTitles[category]}
                    </button>
                ))}
            </div>

            {/* Charts for the active category */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-indigo-700 mb-4">{categoryTitles[activeCategory]}</h3>
                <div className="relative h-96 mb-6">
                    <canvas ref={(el) => (barChartRefs.current[categories.indexOf(activeCategory)] = el)}></canvas>
                </div>
                <div className="relative h-64">
                    <canvas ref={(el) => (pieChartRefs.current[categories.indexOf(activeCategory)] = el)}></canvas>
                </div>
            </div>
        </div>
    );
};
