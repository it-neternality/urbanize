"use client";

import { useState } from "react";

export const DashboardLogin = ({ onLogin }: { onLogin: () => void }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (username === "stats" && password === "urbanize") {
            onLogin();
        } else {
            setError("Invalid credentials");
        }
    };

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
                        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500 bg-gray-50 ltr"
                        dir="ltr"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500 bg-gray-50 ltr"
                        dir="ltr"
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
};
