"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
                        subject: "טופס צור קשר - פנייה חדשה מאתר אורבניז",
                        text: `שם: ${formData.name}\nאימייל: ${formData.email}\nהודעה: ${formData.message}`,
                    }),
                });

                if (response.ok) {
                    console.log("Email sent successfully");
                    setIsSubmitted(true);
                } else {
                    console.error("Failed to send email");
                }
            } catch (error) {
                console.error("Error sending email:", error);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            <section className="flex-grow py-8 px-6 bg-gradient-to-b from-white-100 to-blue-200 text-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-blue-400 rounded-full opacity-10 transform -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 transform translate-x-16 translate-y-16"></div>
                <div className="container mx-auto text-center relative z-10">
                    <Image
                        src="/urbanize-logo.png"
                        alt="Urbanize Properties לוגו"
                        width={120}
                        height={40}
                        className="h-auto mb-6 mx-auto"
                        onClick={() => window.location.href = '/'}
                        style={{ cursor: 'pointer' }}
                    />
                    <h2 className="text-3xl font-bold mb-6" style={{ direction: "rtl" }}>צור קשר</h2>
                    <p className="text-blue-800 text-lg max-w-2xl mx-auto mb-8" style={{ direction: "rtl" }}>
                        נשמח לשמוע מכם! מלאו את הטופס ונחזור אליכם בהקדם.
                    </p>
                    {isSubmitted ? (
                        <div className="text-blue-700 p-4 rounded-lg max-w-sm mx-auto space-y-4">
                            <p className="text-lg font-bold" style={{ direction: "rtl" }}>
                                תודה! פנייתך נשלחה בהצלחה. נחזור אליך בהקדם האפשרי.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="text-blue-700 p-4 rounded-lg max-w-sm mx-auto space-y-4"
                            noValidate
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
                                    className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-blue-500"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
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
                                    className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-blue-500"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
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
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.message ? "border-red-500" : "border-blue-500"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1" style={{ direction: "rtl" }}>{errors.message}</p>}
                            </div>

                            <div className="text-center">
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
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition-colors font-bold text-lg"
                            >
                                שלח
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-2 md:py-4 text-center text-sm md:text-base mt-auto">
                <p>© כל הזכויות שמורות {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
