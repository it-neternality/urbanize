"use client";

import { useState } from "react";
import { RawDataTable } from "./RawDataTable";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { ScoresCharts } from "./ScoresCharts";

export const DashboardTabs = ({ data }: { data: Record<string, Record<string, unknown>> | null }) => {
    const [activeTab, setActiveTab] = useState("raw");

    return (
        <>
            <div className="flex justify-center mb-6">
                <nav className="flex space-x-4">
                    {[{ key: "raw", label: "נתונים גולמיים" }, { key: "analytics", label: "אנליטיקה" }, { key: "scores", label: "ניקוד" }].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-md font-medium ${activeTab === tab.key
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            {activeTab === "raw" && <RawDataTable data={data} />}
            {activeTab === "analytics" && <AnalyticsCharts data={data} />}
            {activeTab === "scores" && <ScoresCharts data={data} />}
        </>
    );
};
