"use client";

import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { firebaseConfig } from "../surveyConfig";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("raw");

    const pieChartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        const session = localStorage.getItem("dashboard_session");
        if (session === "authenticated") {
            setAuthenticated(true);
            fetchData();
        }
    }, []);

    const handleLogin = () => {
        if (username === "stats" && password === "urbanize") {
            setAuthenticated(true);
            localStorage.setItem("dashboard_session", "authenticated");
            fetchData();
        } else {
            setError("Invalid credentials");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            await signInAnonymously(auth);

            const db = getDatabase(app);
            const snapshot = await get(ref(db));
            if (snapshot.exists()) {
                setData(snapshot.val());
            } else {
                setData({});
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderChart = (category: string) => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy existing chart instance
        }

        const chartData = data
            ? Object.values(data).reduce((acc: Record<string, number>, entry: any) => {
                const value = entry.profile[category];
                if (value) acc[value] = (acc[value] || 0) + 1;
                return acc;
            }, {})
            : {};

        const ctx = pieChartRef.current?.getContext("2d");
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
                },
            });
        }
    };

    if (!authenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Login</h2>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Survey Dashboard</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
                </div>
            ) : (
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
                    {activeTab === "raw" && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold text-indigo-700 mb-4">Raw Data</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-200">
                                    <thead className="bg-indigo-100">
                                        <tr>
                                            <th className="border border-gray-300 p-3 text-indigo-700">First Name</th>
                                            <th className="border border-gray-300 p-3 text-indigo-700">Last Name</th>
                                            <th className="border border-gray-300 p-3 text-indigo-700">Address</th>
                                            <th className="border border-gray-300 p-3 text-indigo-700">Gender</th>
                                            <th className="border border-gray-300 p-3 text-indigo-700">Sibling</th>
                                            <th className="border border-gray-300 p-3 text-indigo-700">Kupat Cholim</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            Object.values(data).map((entry: any, index) => (
                                                <tr key={index} className="hover:bg-indigo-50">
                                                    <td className="border border-gray-300 p-3 text-gray-700">{entry.profile.fname}</td>
                                                    <td className="border border-gray-300 p-3 text-gray-700">{entry.profile.lname}</td>
                                                    <td className="border border-gray-300 p-3 text-gray-700">{entry.profile.address}</td>
                                                    <td className="border border-gray-300 p-3 text-gray-700">{entry.profile.gender}</td>
                                                    <td className="border border-gray-300 p-3 text-gray-700">{entry.profile.sibiling}</td>
                                                    <td className="border border-gray-300 p-3 text-gray-700">{entry.profile.kupat_cholim}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab !== "raw" && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold text-indigo-700 mb-4 capitalize">{`Analytics: ${activeTab}`}</h2>
                            <canvas ref={pieChartRef}></canvas>
                            {renderChart(activeTab)}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
