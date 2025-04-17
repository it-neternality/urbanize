"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { surveySteps } from "../../surveyConfig";
import { SurveyData, SurveyDataEntry } from "../types";

Chart.register(ChartDataLabels);

export const ScoresCharts = ({ data }: { data: SurveyData | null }) => {
    const categories = ["food", "shops", "services", "pleasure"];
    const [activeCategory, setActiveCategory] = useState(categories[0]); // State for active tab
    const [genderFilter, setGenderFilter] = useState<string>("All"); // Gender filter with "All" as default
    const [statusFilter, setStatusFilter] = useState<string[]>([]); // Status filter (multiselect)
    const [addressFilter, setAddressFilter] = useState<string | null>(null); // Address filter
    const [addresses, setAddresses] = useState<string[]>([]); // Dynamic address options
    const [statuses, setStatuses] = useState<string[]>([]); // Dynamic family status options

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

    const applyFilters = (data: SurveyData) => {
        return Object.values(data).filter((entry: SurveyDataEntry) => {
            const matchesGender = genderFilter === "All" || entry.profile?.gender === genderFilter;
            const matchesStatus = !statusFilter.length || statusFilter.includes(entry.profile?.sibiling);
            const matchesAddress = !addressFilter || entry.profile?.address === addressFilter;
            return matchesGender && matchesStatus && matchesAddress;
        });
    };

    useEffect(() => {
        if (!data) return;

        // Extract unique addresses and statuses from the data
        const uniqueAddresses = new Set<string>();
        const uniqueStatuses = new Set<string>();
        Object.values(data).forEach((entry: any) => {
            if (entry.profile?.address) uniqueAddresses.add(entry.profile.address);
            if (entry.profile?.sibiling) uniqueStatuses.add(entry.profile.sibiling);
        });

        setAddresses(Array.from(uniqueAddresses).sort());
        setStatuses(Array.from(uniqueStatuses).sort());
    }, [data]);

    useEffect(() => {
        if (!data) return;

        const filteredData = applyFilters(data); // Apply filters to the data
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
        const categoryData = filteredData.reduce((acc: Record<string, number>, entry: any) => {
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
    }, [data, activeCategory, genderFilter, statusFilter, addressFilter]);

    // Extract gender options from surveyConfig (surveySteps)
    const genderOptions = useMemo(() => {
        const profileStep = surveySteps.find((step) => step.category === "profile");
        if (!profileStep) return [];
        // Try to find the gender field in the profile step
        const genderField =
            profileStep.fields?.find((field) =>
                field.inputs?.some((input) => input.key === "gender")
            );
        if (!genderField) return [];
        const genderInput = genderField.inputs?.find((input) => input.key === "gender");
        if (!genderInput) return [];
        return genderInput.options || [];
    }, []);

    // Calculate total and filtered rows
    const totalRows = data ? Object.values(data).length : 0;
    const filteredRows = data ? applyFilters(data).length : 0;

    return (
        <div className="flex flex-row gap-6">
            {/* Sidebar: Filters + Sub-category Tabs (make much smaller, e.g. 12%) */}
            <div className="flex flex-col gap-6 md:w-[12%]">
                {/* Filters */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">סינון</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <select
                                value={genderFilter}
                                onChange={(e) => setGenderFilter(e.target.value)}
                                className="border border-gray-300 rounded-md p-3 bg-white text-gray-700"
                            >
                                <option value="All">כל המגדרים</option>
                                {genderOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <select
                                multiple
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(Array.from(e.target.selectedOptions, (option) => option.value))
                                }
                                className="border border-gray-300 rounded-md p-3 bg-white text-gray-700"
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={addressFilter || ""}
                                onChange={(e) => setAddressFilter(e.target.value || null)}
                                className="border border-gray-300 rounded-md p-3 bg-white text-gray-700"
                            >
                                <option value="">בחר כתובת</option>
                                {addresses.map((address) => (
                                    <option key={address} value={address}>
                                        {address}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* Sub-category Tabs */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">קטגוריות</h3>
                    <div className="flex flex-col gap-2">
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
                </div>
            </div>
            {/* Main Content: Charts (make larger, e.g. 88%) */}
            <div className="md:w-[88%] bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-sm text-gray-600">
                    סך הכל {totalRows} תגובות, מוצגות {filteredRows} לאחר סינון
                </div>
                <h3 className="text-lg font-bold text-indigo-700 mb-4">{categoryTitles[activeCategory]}</h3>
                <div className="relative h-96 mb-6">
                    <canvas ref={(el) => { barChartRefs.current[categories.indexOf(activeCategory)] = el; }}></canvas>
                </div>
                <div className="relative h-64">
                    <canvas ref={(el) => { pieChartRefs.current[categories.indexOf(activeCategory)] = el; }}></canvas>
                </div>
            </div>
        </div>
    );
};
