"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, ChangeEvent } from "react";

export default function ContactUs() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({ name: "", email: "", message: "" });

    const validateForm = () => {
        const newErrors = { name: "", email: "", message: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "אנא הזן שם מלא.";
            isValid = false;
        }

        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "אנא הזן כתובת דוא\"ל תקינה.";
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = "אנא הזן הודעה.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit the form
            console.log("Form submitted", formData);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            <header className="p-4 md:p-6 bg-white shadow-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <Image
                        src="/butterfly/butterfly logo.png"
                        alt="Urbanize Properties לוגו"
                        width={120}
                        height={40}
                        className="h-auto"
                    />
                </div>
            </header>

            <section className="py-16 px-6 bg-blue-700 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6" style={{ direction: "rtl" }}>צור קשר</h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8" style={{ direction: "rtl" }}>
                        נשמח לשמוע מכם! מלאו את הטופס ונחזור אליכם בהקדם.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white text-blue-700 p-8 rounded-lg shadow-lg max-w-lg mx-auto space-y-6"
                    >
                        <div className="text-right">
                            <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ direction: "rtl" }}>
                                שם מלא
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1" style={{ direction: "rtl" }}>{errors.name}</p>}
                        </div>

                        <div className="text-right">
                            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ direction: "rtl" }}>
                                דוא&quot;ל
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1" style={{ direction: "rtl" }}>{errors.email}</p>}
                        </div>

                        <div className="text-right">
                            <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ direction: "rtl" }}>
                                הודעה
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm mt-1" style={{ direction: "rtl" }}>{errors.message}</p>}
                        </div>
                        <div className="text-right">
                            {turnstileSiteKey && (
                                <div
                                    className="cf-turnstile"
                                    data-sitekey={turnstileSiteKey}
                                    data-theme="light"
                                ></div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-800 transition-colors font-bold text-lg"
                        >
                            שלח
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-2 md:py-4 text-center text-sm md:text-base">
                <p>© כל הזכויות שמורות {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
