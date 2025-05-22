"use client";
import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
    const [modalImage, setModalImage] = useState<string | null>(null);

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">גלריה</h2>

                <div className="flex flex-wrap gap-6 lg:flex-nowrap">
                    {["/bsr-rishonim/wide-building.jpg", "/bsr-rishonim/streetview.jpg", "/bsr-rishonim/look-from-balcony.jpg"].map((src, index) => (
                        <div key={index} className="relative w-full sm:w-1/2 lg:w-1/3">
                            <button onClick={() => setModalImage(src)} className="block w-full h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image
                                    src={src}
                                    alt={`BSR Rishonim Gallery ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="object-cover"
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {modalImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.8] backdrop-blur-sm" onClick={() => setModalImage(null)}>
                        <div className="relative max-w-4xl max-h-screen" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setModalImage(null)}
                                className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="animate-fade-in">
                                <Image
                                    src={modalImage}
                                    alt="Full Size Image"
                                    width={1920}
                                    height={1080}
                                    style={{ objectFit: 'contain' }}
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
