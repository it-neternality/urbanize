"use client";
import { useState } from "react";
import Image from "next/image";

export default function OfficeDetails() {
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setZoomLevel((prevZoom) => Math.min(Math.max(prevZoom + e.deltaY * -0.001, 1), 5));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        setPosition({ x: e.clientX - startDrag.x, y: e.clientY - startDrag.y });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <section className="py-16 px-6 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">מה יש לנו להציע</h2>
                <div className="flex flex-wrap justify-center gap-12 items-stretch md:flex-row flex-col">
                    <div className="bg-[#f4adb3] p-6 rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 flex-1 max-w-md mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2 text-black">דגם D</h3>
                        <p className="text-black mb-3">177 מ&quot;ר | נוף פתוח דרום | קומה 7</p>
                        <p className="text-black mb-3">למכירה: 11,990 ₪ למ&quot;ר</p>
                        <p className="text-black mb-3">להשכרה: 58 ₪ למ&quot;ר (מעטפת)</p>
                        <a href="/bsr-rishonim/model-d" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-md">פרטים נוספים</a>
                    </div>
                    <div className="bg-[#d5699b] p-6 rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 flex-1 max-w-md">
                        <h3 className="text-xl font-bold mb-2 text-black">דגם G</h3>
                        <p className="text-black mb-3">140 מ&quot;ר + 13 מ&quot;ר מרפסת | נוף לים ולשקיעה | קומה 7</p>
                        <p className="text-black mb-3">למכירה: 11,990 ₪ למ&quot;ר</p>
                        <p className="text-black mb-3">להשכרה: 58 ₪ למ&quot;ר (מעטפת)</p>
                        <a href="/bsr-rishonim/model-g" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-md">פרטים נוספים</a>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="relative mx-auto w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg cursor-pointer" onClick={() => setModalImage("/bsr-rishonim/floor-plan.jpg")}>
                        <Image
                            src="/bsr-rishonim/floor-plan.jpg"
                            alt="Floor Plan"
                            width={800}
                            height={600}
                            className="transition-transform duration-300 ease-in-out"
                        />
                    </div>
                </div>
                {modalImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.8] backdrop-blur-sm" onClick={() => setModalImage(null)}>
                        <div
                            className="relative max-w-6xl max-h-screen overflow-hidden cursor-grab active:cursor-grabbing"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={handleWheel}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            <button
                                onClick={() => setModalImage(null)}
                                className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div
                                className="relative"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                                    transformOrigin: "center",
                                }}
                            >
                                <Image
                                    src={modalImage}
                                    alt="Full Size Floor Plan"
                                    width={3840}
                                    height={2160}
                                    style={{ objectFit: "contain" }}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
