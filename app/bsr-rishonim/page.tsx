import Image from "next/image";
import Link from "next/link";

export default function BsrRishonim() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="p-4 md:p-6 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/bsr-rishonim/urbanize-office-logo.png"
                            alt="Urbanize לוגו"
                            width={150}
                            height={50}
                            priority
                            className="h-auto"
                        />
                    </Link>
                </div>
            </header>

            {/* Building Showcase */}
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

            {/* Office Details */}
            <section className="py-16 px-6 bg-white">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">מה יש לנו להציע</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-2">דגם D</h3>
                            <p className="text-gray-600 mb-3">177 מ"ר | נוף פתוח דרום</p>
                            <p className="text-gray-600 mb-3">למכירה: 11,990 ₪ למ"ר</p>
                            <p className="text-gray-600 mb-3">להשכרה: 58 ₪ למ"ר (מעטפת)</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-2">דגם G</h3>
                            <p className="text-gray-600 mb-3">140 מ"ר + 13 מ"ר מרפסת | נוף לים ולשקיעה</p>
                            <p className="text-gray-600 mb-3">למכירה: 11,990 ₪ למ"ר</p>
                            <p className="text-gray-600 mb-3">להשכרה: 58 ₪ למ"ר (מעטפת)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-gray-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">מעוניינים לשמוע עוד?</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על BSR ראשונים
                    </p>
                    <button className="bg-white text-gray-800 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block">
                        צור קשר עכשיו
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-10 px-6 mt-auto">
                <div className="container mx-auto text-center">
                    <p>© כל הזכויות שמורות לאורבנייז {new Date().getFullYear()}</p>
                    <p className="mt-4">
                        <a href="https://www.facebook.com/profile.php?id=61574839536479" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            בקרו אותנו בפייסבוק
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
