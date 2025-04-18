import Image from "next/image";

export default function BuildingShowcase() {
    return (
        <section className="relative h-screen flex items-center justify-center bg-gray-200">
            <Image
                src="/bsr-rishonim/highres-building.jpg"
                alt="BSR Rishonim Building"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                className="absolute inset-0 z-0"
            />
            <div className="relative z-10 text-center px-6">
                <div className="inline-block bg-white/[0.75] p-6 rounded-md">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-800 font-sans">מגדל העסקים החדש והיוקרתי</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 font-light">
                        מיקום מנצח | נוף לים | עיצוב מפואר | שמירה
                    </p>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 font-light">
                        מרכז מסחרי בקומת הקרקע
                    </p>
                </div>
            </div>
        </section>
    );
}
