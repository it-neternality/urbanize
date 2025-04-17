"use client";

import { useState, useEffect } from "react";
import { DashboardLogin } from "./components/DashboardLogin";
import { DashboardTabs } from "./components/DashboardTabs";
import { fetchSurveyData } from "./utils/fetchSurveyData";

export default function Dashboard() {
    const [authenticated, setAuthenticated] = useState(false);
    const [data, setData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem("dashboard_session");
        if (session === "authenticated") {
            setAuthenticated(true);
            loadData();
        }
    }, []);

    const handleLogin = async () => {
        setAuthenticated(true);
        localStorage.setItem("dashboard_session", "authenticated");
        await loadData();
    };

    const loadData = async () => {
        setLoading(true);
        const surveyData = await fetchSurveyData();
        setData(surveyData);
        setLoading(false);
    };

    if (!authenticated) {
        return <DashboardLogin onLogin={handleLogin} />;
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Survey Dashboard</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
                </div>
            ) : (
                <DashboardTabs data={data} />
            )}
        </div>
    );
}
