"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { SurveyData, SurveyDataEntry } from "../types";
import { ScoresChartsClient } from "./ScoresChartsClient";

export const ScoresCharts = ({ data }: { data: SurveyData | null }) => {
    const categories = ["food", "shops", "services", "pleasure"];

    const categoryTitles: Record<string, string> = {
        food: "ניקוד כולל עבור מזון והסעדה",
        shops: "ניקוד כולל עבור חנויות",
        services: "ניקוד כולל עבור שירותים",
        pleasure: "ניקוד כולל עבור בילוי ופנאי",
    };

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [genderFilter, setGenderFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [addressFilter, setAddressFilter] = useState<string | null>(null);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    useEffect(() => {
        if (!data) return;

        const uniqueAddresses = new Set<string>();
        const uniqueStatuses = new Set<string>();
        Object.values(data).forEach((entry: SurveyDataEntry) => {
            if (entry.profile?.address) uniqueAddresses.add(entry.profile.address);
            if (entry.profile?.sibiling) uniqueStatuses.add(entry.profile.sibiling);
        });

        setAddresses(Array.from(uniqueAddresses).sort());
        setStatuses(Array.from(uniqueStatuses).sort());
    }, [data]);

    const applyFilters = useCallback((data: SurveyData) => {
        return Object.values(data).filter((entry: SurveyDataEntry) => {
            const matchesGender = genderFilter === "All" || entry.profile?.gender === genderFilter;
            const matchesStatus = !statusFilter.length || statusFilter.includes(entry.profile?.sibiling);
            const matchesAddress = !addressFilter || entry.profile?.address === addressFilter;
            return matchesGender && matchesStatus && matchesAddress;
        });
    }, [genderFilter, statusFilter, addressFilter]); // Wrapped applyFilters in useCallback

    const filteredData = useMemo(() => {
        if (!data) return {};

        const filteredEntries = applyFilters(data);
        return filteredEntries.reduce((acc: Record<string, number>, entry: SurveyDataEntry) => {
            const categoryRatings = entry[activeCategory];
            if (categoryRatings && typeof categoryRatings === "object") {
                Object.entries(categoryRatings).forEach(([key, value]) => {
                    const numericValue = parseFloat(value as string);
                    if (!isNaN(numericValue)) {
                        acc[key] = (acc[key] || 0) + numericValue;
                    }
                });
            }
            return acc;
        }, {});
    }, [data, activeCategory, applyFilters]);

    return (
        <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-6 md:w-[12%]">
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
                                {/* Add gender options dynamically */}
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
            <div className="md:w-[88%] bg-white p-6 rounded-lg shadow-md">
                <ScoresChartsClient
                    activeCategory={activeCategory}
                    categoryTitles={categoryTitles}
                    filteredData={filteredData}
                />
            </div>
        </div>
    );
};
