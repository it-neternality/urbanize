"use client";

import { useState } from "react";
import { RawDataTable } from "./RawDataTable";
import { AnalyticsChart } from "./AnalyticsChart";

export const DashboardTabs = ({ data }: { data: Record<string, any> | null }) => {
    const [activeTab, setActiveTab] = useState("raw");

    return (
        <>
            <div className="flex justify-center mb-6">
                <nav className="flex space-x-4">
                    {["raw", "gender", "address", "sibiling", "kupat_cholim"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md font-medium ${activeTab === tab
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {tab === "raw" && "Raw Data"}
                            {tab === "gender" && "By Gender"}
                            {tab === "address" && "By Address"}
                            {tab === "sibiling" && "By Sibling"}
                            {tab === "kupat_cholim" && "By Kupat Cholim"}
                        </button>
                    ))}
                </nav>
            </div>
            {activeTab === "raw" ? <RawDataTable data={data} /> : <AnalyticsChart data={data} category={activeTab} />}
        </>
    );
};
