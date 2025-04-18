import Link from "next/link";

export default function ModelD() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
            <section className="py-16 px-6 bg-white">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-12">דגם D - קומה 7</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <img src="/bsr-rishonim/D7.jpg" alt="Model D" className="rounded-lg shadow-lg" />
                        <img src="/bsr-rishonim/floor-plan.jpg" alt="Floor Plan" className="rounded-lg shadow-lg" />
                    </div>
                    <p className="text-gray-600 mt-6">177 מ"ר | נוף פתוח דרום</p>
                    <p className="text-gray-600">למכירה: 11,990 ₪ למ"ר</p>
                    <p className="text-gray-600">להשכרה: 58 ₪ למ"ר (מעטפת)</p>
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">מעוניינים לשמוע עוד?</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על דגם D
                    </p>
                    <Link href="/bsr-rishonim/contact-us">
                        <button className="bg-white text-gray-800 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block">
                            צור קשר עכשיו
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
