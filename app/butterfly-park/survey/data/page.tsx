"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import Head from "next/head";

// Import survey configuration
import { firebaseConfig, surveySteps } from "../surveyConfig";

// Import CustomAlert
import { CustomAlert } from "../components/CustomAlert";

// Type for survey response
interface SurveyResponse {
    profile: {
        fname: string;
        lname: string;
        address: string;
        address_number: string;
        phone: string;
        phone_prefix: string;
        gender: string;
        sibiling: string;
        kupat_cholim: string;
        other_address: string;
    };
    food: Record<string, number>;
    shops: Record<string, number>;
    services: Record<string, number>;
    pleasure: Record<string, number>;
    other: {
        comments: string;
    };
}

export default function SurveyDataPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Record<string, SurveyResponse> | null>(null);
    const [error, setError] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    // Custom alert state
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    // Show custom alert
    const showAlert = (message: string, title = "הודעה") => {
        setAlertMessage(message);
        setAlertTitle(title);
        setAlertOpen(true);
    };

    // Close custom alert
    const closeAlert = () => {
        setAlertOpen(false);
    };

    // Active tab for category view
    const [activeTab, setActiveTab] = useState("profile");

    // Filter and search
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Record<string, SurveyResponse> | null>(null);

    // Sort state
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'ascending' | 'descending';
    } | null>(null);

    // Stats
    const [stats, setStats] = useState<Record<string, any>>({});

    // Handle authentication
    const handleAuthenticate = () => {
        // Super simple authentication - replace with proper auth in production
        if (password === "urbanize123") {
            setAuthenticated(true);
            localStorage.setItem("survey_data_auth", "true");
            fetchData();
        } else {
            showAlert("סיסמה שגויה", "שגיאה");
        }
    };

    // Check for authentication on mount
    useEffect(() => {
        const isAuth = localStorage.getItem("survey_data_auth") === "true";
        if (isAuth) {
            setAuthenticated(true);
            fetchData();
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch data from Firebase
    const fetchData = async () => {
        setLoading(true);
        try {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);

            // Sign in anonymously
            await signInAnonymously(auth);

            const db = getDatabase(app);
            const dataRef = ref(db);

            // Get data from Firebase
            const snapshot = await get(dataRef);

            if (snapshot.exists()) {
                const surveyData = snapshot.val();
                setData(surveyData);
                setFilteredData(surveyData);
                calculateStats(surveyData);
            } else {
                setError("אין נתוני סקר זמינים");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("שגיאה בטעינת הנתונים");
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics from survey data
    const calculateStats = (surveyData: Record<string, SurveyResponse>) => {
        // Count total responses
        const totalResponses = Object.keys(surveyData).length;

        // Gender distribution
        const genderCounts: Record<string, number> = {};

        // Category score totals
        const foodScores: Record<string, number> = {};
        const shopsScores: Record<string, number> = {};
        const servicesScores: Record<string, number> = {};
        const pleasureScores: Record<string, number> = {};

        // Process each response
        Object.values(surveyData).forEach(response => {
            // Count genders
            const gender = response.profile.gender;
            genderCounts[gender] = (genderCounts[gender] || 0) + 1;

            // Sum category scores
            Object.entries(response.food).forEach(([key, value]) => {
                foodScores[key] = (foodScores[key] || 0) + value;
            });

            Object.entries(response.shops).forEach(([key, value]) => {
                shopsScores[key] = (shopsScores[key] || 0) + value;
            });

            Object.entries(response.services).forEach(([key, value]) => {
                servicesScores[key] = (servicesScores[key] || 0) + value;
            });

            Object.entries(response.pleasure).forEach(([key, value]) => {
                pleasureScores[key] = (pleasureScores[key] || 0) + value;
            });
        });

        setStats({
            totalResponses,
            genderCounts,
            foodScores,
            shopsScores,
            servicesScores,
            pleasureScores
        });
    };

    // Handle search
    useEffect(() => {
        if (!data) return;

        if (searchTerm.trim() === "") {
            setFilteredData(data);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = Object.entries(data).reduce((acc, [key, value]) => {
            // Search in profile data
            const matchesProfile =
                value.profile.fname.toLowerCase().includes(term) ||
                value.profile.lname.toLowerCase().includes(term) ||
                value.profile.address.toLowerCase().includes(term) ||
                value.profile.phone.includes(term);

            // Search in comments
            const matchesComments = value.other.comments.toLowerCase().includes(term);

            if (matchesProfile || matchesComments) {
                acc[key] = value;
            }

            return acc;
        }, {} as Record<string, SurveyResponse>);

        setFilteredData(filtered);
    }, [searchTerm, data]);

    // Handle sorting
    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';

        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        setSortConfig({ key, direction });
    };

    // Apply sorting to filtered data
    useEffect(() => {
        if (!filteredData || !sortConfig) return;

        const sortedData = { ...filteredData };
        const entries = Object.entries(sortedData);

        // Sort entries based on sortConfig
        entries.sort((a, b) => {
            // Handle different sort fields
            if (sortConfig.key.startsWith('profile.')) {
                const field = sortConfig.key.split('.')[1];
                // Fix the TypeScript error by using bracket notation and type assertions
                const valueA = a[1].profile[field as keyof typeof a[1]['profile']] || '';
                const valueB = b[1].profile[field as keyof typeof b[1]['profile']] || '';

                if (sortConfig.direction === 'ascending') {
                    return String(valueA).localeCompare(String(valueB));
                } else {
                    return String(valueB).localeCompare(String(valueA));
                }
            }

            return 0;
        });

        // Convert sorted entries back to object
        const sortedObject = entries.reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {} as Record<string, SurveyResponse>);

        setFilteredData(sortedObject);
    }, [sortConfig]);

    // Function to download data as CSV
    const downloadCSV = () => {
        if (!filteredData) return;

        // Prepare CSV header
        let csvContent = "ID,שם פרטי,שם משפחה,כתובת,מספר בית,טלפון,מגדר,אחים ואחיות,קופת חולים,הערות\n";

        // Add rows
        Object.entries(filteredData).forEach(([id, response]) => {
            const row = [
                id,
                response.profile.fname,
                response.profile.lname,
                response.profile.address,
                response.profile.address_number,
                `${response.profile.phone_prefix}${response.profile.phone}`,
                response.profile.gender === 'male' ? 'זכר' : 'נקבה',
                response.profile.sibiling,
                response.profile.kupat_cholim,
                response.other.comments.replace(/,/g, ';').replace(/\n/g, ' ')
            ];

            csvContent += row.join(",") + "\n";
        });

        // Create and download the CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'survey_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Get item name from key
    const getItemName = (category: string, key: string) => {
        const step = surveySteps.find(s => s.category === category);
        if (step && 'items' in step) {
            const item = step.items.find(i => i.key === key);
            return item ? item.label : key;
        }
        return key;
    };

    // Render authentication form
    if (!authenticated) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white" dir="rtl">
                <CustomAlert
                    message={alertMessage}
                    title={alertTitle}
                    isOpen={alertOpen}
                    onClose={closeAlert}
                />

                <header className="p-3 md:p-6 bg-white shadow-md">
                    <div className="container mx-auto flex justify-center items-center">
                        <Link href="/">
                            <Image
                                src="/urbanize-logo.png"
                                alt="Urbanize לוגו"
                                width={100}
                                height={33}
                                priority
                                className="h-auto"
                            />
                        </Link>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">גישה לנתוני הסקר</h2>
                        <p className="mb-6 text-gray-700 text-center">אנא הזן סיסמה כדי לצפות בנתוני הסקר</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="password">סיסמה</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                onClick={handleAuthenticate}
                                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                כניסה
                            </button>

                            <div className="text-center">
                                <Link href="/butterfly-park/survey" className="text-indigo-600 hover:text-indigo-800">
                                    חזרה לסקר
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-blue-900 text-white py-2 md:py-4 text-center text-sm md:text-base">
                    <p>© כל הזכויות שמורות {new Date().getFullYear()}</p>
                </footer>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50" dir="rtl">
            <CustomAlert
                message={alertMessage}
                title={alertTitle}
                isOpen={alertOpen}
                onClose={closeAlert}
            />

            <header className="p-3 md:p-6 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/butterfly-park/survey" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        חזרה לסקר
                    </Link>

                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-indigo-900">נתוני סקר פארק הפרפרים</h1>
                    </div>

                    <Image
                        src="/urbanize-logo.png"
                        alt="Urbanize לוגו"
                        width={100}
                        height={33}
                        priority
                        className="h-auto"
                    />
                </div>
            </header>

            <main className="flex-grow container mx-auto py-6 px-4">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-md">
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Stats cards */}
                        {stats.totalResponses && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="text-gray-500 text-sm font-medium">סה"כ תשובות</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.totalResponses}</p>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="text-gray-500 text-sm font-medium">חנות אוכל מובילה</h3>
                                    <p className="text-xl font-bold text-indigo-600">
                                        {Object.entries(stats.foodScores).sort((a, b) => b[1] - a[1])[0]?.[0]
                                            ? getItemName('food', Object.entries(stats.foodScores).sort((a, b) => b[1] - a[1])[0][0])
                                            : 'אין נתונים'}
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="text-gray-500 text-sm font-medium">חנות מובילה</h3>
                                    <p className="text-xl font-bold text-indigo-600">
                                        {Object.entries(stats.shopsScores).sort((a, b) => b[1] - a[1])[0]?.[0]
                                            ? getItemName('shops', Object.entries(stats.shopsScores).sort((a, b) => b[1] - a[1])[0][0])
                                            : 'אין נתונים'}
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="text-gray-500 text-sm font-medium">שירות מוביל</h3>
                                    <p className="text-xl font-bold text-indigo-600">
                                        {Object.entries(stats.servicesScores).sort((a, b) => b[1] - a[1])[0]?.[0]
                                            ? getItemName('services', Object.entries(stats.servicesScores).sort((a, b) => b[1] - a[1])[0][0])
                                            : 'אין נתונים'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action bar */}
                        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1 w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="חיפוש לפי שם, כתובת או טלפון..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex space-x-2 space-x-reverse">
                                <button
                                    onClick={downloadCSV}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    הורד CSV
                                </button>

                                <button
                                    onClick={fetchData}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    רענן נתונים
                                </button>
                            </div>
                        </div>

                        {/* Tab navigation */}
                        <div className="mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px space-x-8 space-x-reverse overflow-x-auto pb-2">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "profile"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        פרטים אישיים
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("food")}
                                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "food"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        חנויות מזון
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("shops")}
                                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "shops"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        חנויות אחרות
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("services")}
                                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "services"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        שירותים
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("pleasure")}
                                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "pleasure"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        פנאי והנאה
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("comments")}
                                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "comments"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                    >
                                        הערות
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Data table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            {filteredData && Object.keys(filteredData).length > 0 ? (
                                <div className="overflow-x-auto">
                                    {activeTab === "profile" && (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                        onClick={() => requestSort('profile.fname')}
                                                    >
                                                        שם פרטי
                                                        {sortConfig?.key === 'profile.fname' && (
                                                            <span className="mr-1">
                                                                {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                                            </span>
                                                        )}
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                        onClick={() => requestSort('profile.lname')}
                                                    >
                                                        שם משפחה
                                                        {sortConfig?.key === 'profile.lname' && (
                                                            <span className="mr-1">
                                                                {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                                            </span>
                                                        )}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        כתובת
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        טלפון
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        מגדר
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        קופת חולים
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(filteredData).map(([id, response]) => (
                                                    <tr key={id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {response.profile.fname}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {response.profile.lname}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {response.profile.address} {response.profile.address_number}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {response.profile.phone_prefix}{response.profile.phone}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {response.profile.gender === 'male' ? 'זכר' : 'נקבה'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {response.profile.kupat_cholim}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {activeTab === "food" && (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        שם
                                                    </th>
                                                    {surveySteps.find(s => s.category === 'food') && 'items' in (surveySteps.find(s => s.category === 'food') || {}) &&
                                                        (surveySteps.find(s => s.category === 'food') as any).items.map((item: any) => (
                                                            <th key={item.key} scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                {item.label}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(filteredData).map(([id, response]) => (
                                                    <tr key={id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {response.profile.fname} {response.profile.lname}
                                                        </td>
                                                        {surveySteps.find(s => s.category === 'food') && 'items' in (surveySteps.find(s => s.category === 'food') || {}) &&
                                                            (surveySteps.find(s => s.category === 'food') as any).items.map((item: any) => (
                                                                <td key={item.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {response.food[item.key] || 0}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {/* Similar tables for other categories (shops, services, pleasure) */}
                                    {activeTab === "shops" && (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        שם
                                                    </th>
                                                    {surveySteps.find(s => s.category === 'shops') && 'items' in (surveySteps.find(s => s.category === 'shops') || {}) &&
                                                        (surveySteps.find(s => s.category === 'shops') as any).items.map((item: any) => (
                                                            <th key={item.key} scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                {item.label}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(filteredData).map(([id, response]) => (
                                                    <tr key={id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {response.profile.fname} {response.profile.lname}
                                                        </td>
                                                        {surveySteps.find(s => s.category === 'shops') && 'items' in (surveySteps.find(s => s.category === 'shops') || {}) &&
                                                            (surveySteps.find(s => s.category === 'shops') as any).items.map((item: any) => (
                                                                <td key={item.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {response.shops[item.key] || 0}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {activeTab === "services" && (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        שם
                                                    </th>
                                                    {surveySteps.find(s => s.category === 'services') && 'items' in (surveySteps.find(s => s.category === 'services') || {}) &&
                                                        (surveySteps.find(s => s.category === 'services') as any).items.map((item: any) => (
                                                            <th key={item.key} scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                {item.label}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(filteredData).map(([id, response]) => (
                                                    <tr key={id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {response.profile.fname} {response.profile.lname}
                                                        </td>
                                                        {surveySteps.find(s => s.category === 'services') && 'items' in (surveySteps.find(s => s.category === 'services') || {}) &&
                                                            (surveySteps.find(s => s.category === 'services') as any).items.map((item: any) => (
                                                                <td key={item.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {response.services[item.key] || 0}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {activeTab === "pleasure" && (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        שם
                                                    </th>
                                                    {surveySteps.find(s => s.category === 'pleasure') && 'items' in (surveySteps.find(s => s.category === 'pleasure') || {}) &&
                                                        (surveySteps.find(s => s.category === 'pleasure') as any).items.map((item: any) => (
                                                            <th key={item.key} scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                {item.label}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(filteredData).map(([id, response]) => (
                                                    <tr key={id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {response.profile.fname} {response.profile.lname}
                                                        </td>
                                                        {surveySteps.find(s => s.category === 'pleasure') && 'items' in (surveySteps.find(s => s.category === 'pleasure') || {}) &&
                                                            (surveySteps.find(s => s.category === 'pleasure') as any).items.map((item: any) => (
                                                                <td key={item.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {response.pleasure[item.key] || 0}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {activeTab === "comments" && (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        שם
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        הערות
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(filteredData).map(([id, response]) => (
                                                    <tr key={id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {response.profile.fname} {response.profile.lname}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {response.other.comments || "אין הערות"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 mb-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">אין נתונים להצגה</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>

            <footer className="bg-blue-900 text-white py-2 md:py-4 text-center text-sm md:text-base">
                <p>© כל הזכויות שמורות {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
