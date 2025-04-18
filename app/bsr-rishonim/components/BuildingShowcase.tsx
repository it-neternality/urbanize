"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function BuildingShowcase() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check on initial render
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section className="relative bg-gray-200">
            {isMobile ? (
                <div className="flex flex-col items-center justify-center h-auto">
                    <Image
                        src="/bsr-rishonim/highres-building.jpg"
                        alt="BSR Rishonim Building"
                        width={600} // Set explicit width for mobile
                        height={400} // Set explicit height for mobile
                        className="relative w-full h-auto"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                    />
                    <div className="relative z-10 text-center px-6 mt-4">
                        <div className="inline-block">
                            <h1 className="text-4xl font-extrabold mb-4 text-gray-800 font-sans">ב.ס.ר ראשונים</h1>
                            <h1 className="text-2xl font-extrabold mb-4 text-gray-800 font-sans">מגדל העסקים החדש והיוקרתי</h1>
                            <p className="text-xl max-w-3xl mx-auto text-gray-700 font-light">
                                מיקום מנצח | נוף לים | עיצוב מפואר
                            </p>
                            <p className="text-xl max-w-3xl mx-auto text-gray-700 font-light mb-3">
                                שמירה | מרכז מסחרי בקומת הקרקע
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative h-screen flex items-center justify-center">
                    <Image
                        src="/bsr-rishonim/highres-building.jpg"
                        alt="BSR Rishonim Building"
                        fill
                        className="absolute inset-0 z-0"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                    />
                    <div className="relative z-10 text-center px-6">
                        <div className="inline-block bg-white/[0.75] p-6 rounded-md">
                            <h1 className="text-6xl font-extrabold mb-4 text-gray-800 font-sans">ב.ס.ר ראשונים</h1>
                            <h1 className="text-6xl font-extrabold mb-4 text-gray-800 font-sans">מגדל העסקים החדש והיוקרתי</h1>
                            <p className="text-2xl max-w-3xl mx-auto text-gray-700 font-light">
                                מיקום מנצח | נוף לים | עיצוב מפואר | שמירה
                            </p>
                            <p className="text-2xl max-w-3xl mx-auto text-gray-700 font-light">
                                מרכז מסחרי בקומת הקרקע
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
