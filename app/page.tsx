import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <header className="p-4 md:p-6 bg-white shadow-sm">
                <div className="container mx-auto flex justify-center md:justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/urbanize-logo.png"
                            alt="Urbanize לוגו"
                            width={150}
                            height={50}
                            priority
                            className="h-auto"
                        />
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[70vh] w-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'url(&quot;data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)',
                }}></div>
                <div className="container mx-auto px-6 z-10 text-right">
                    <div className="mr-0 ml-auto">
                        <h1 className="text-4xl md:text-3xl font-bold text-white leading-tight">
                            נדל&apos;&apos;ן במקום שבו המיקום פוגש את הפוטנציאל
                        </h1>
                        <p className="mt-6 text-lg text-blue-100">
                            קבוצת אורבנייז – מתכננים, בונים ומנהלים נכסים במיקומים שמייצרים ערך אמיתי לאורך זמן
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 justify-end">
                            <a
                                href="#projects"
                                className="bg-white text-blue-900 px-8 py-3 rounded-md font-medium transition-all hover:bg-opacity-90"
                            >
                                הפרויקטים שלנו
                            </a>
                            <Link
                                href="/contact-us"
                                className="border border-white text-white px-8 py-3 rounded-md font-medium transition-all hover:bg-white hover:text-blue-900"
                            >
                                יצירת קשר
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-10 px-6">
                <a id="projects"></a>
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">הפרויקטים המובילים שלנו</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Project 1 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1">
                            <div className="h-48 relative">
                                <Image
                                    src="/butterfly/6911_01.jpg"
                                    alt="פארק הפרפרים"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 text-gray-800">פארק הפרפרים</h3>
                                <p className="text-gray-600 text-sm mb-2">מרכז הקניות והפנאי בשכונת רחובות הצעירה</p>
                                <p className="text-gray-600 text-sm mb-2">פרויקט יוקרתי המשלב מסחר, שירותים וחוויית בילוי במיקום אסטרטגי לצד פארק בלב השכונה</p>
                                <Link
                                    href="/butterfly-park"
                                    className="text-blue-700 font-medium hover:underline text-sm"
                                >
                                    לפרטים נוספים &larr;
                                </Link>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1">
                            <div className="h-48 relative">
                                <Image
                                    src="/bsr-rishonim/top-building.jpg"
                                    alt="BSR ראשונים"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 text-gray-800">BSR ראשונים</h3>
                                <p className="text-gray-600 text-sm mb-2">משרדים להשכרה/מכירה במגדל העסקים החדש והיוקרתי בראשל&quot;צ</p>
                                <Link
                                    href="/bsr-rishonim"
                                    className="text-blue-700 font-medium hover:underline text-sm"
                                >
                                    לפרטים נוספים &larr;
                                </Link>
                            </div>
                        </div>
                        {/* Project 3 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1">
                            <div className="h-48 relative">
                                <Image
                                    src="/havot11/front.png"
                                    alt="האבות 11 – ראשון לציון"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 text-gray-800">פרוייקט עבר - האבות 11 – ראשון לציון</h3>
                                <p className="text-gray-600 text-sm mb-2">בניין מגורים בוטיק בן 8 יח''ד, שתוכנן בקפידה על מגרש קטן-ממדים. הפרויקט משלב תכנון יצירתי עם ניצול חכם של שטח, תוך שמירה על איכות חיים גבוהה לדיירים.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Innovation Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">חדשנות בנדל״ן</h2>
                        <p className="text-lg text-gray-600 mb-10">
                            בכל פרויקט אנו משלבים טכנולוגיות מתקדמות, תכנון חכם ואדריכלות פורצת דרך,
                            כדי ליצור חוויית מגורים מודרנית המותאמת לצרכי העתיד.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4 mr-auto ml-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">טכנולוגיה חכמה</h3>
                                <p className="text-gray-600">
                                    פתרונות חדשניים המשתלבים בסביבת המגורים והמאפשרים שליטה מלאה ונוחות מירבית.
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4 mr-auto ml-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">קיימות ואקולוגיה</h3>
                                <p className="text-gray-600">
                                    שימוש בחומרים ותהליכים ידידותיים לסביבה ותכנון המאפשר חיסכון באנרגיה וניצול מיטבי של משאבים.
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4 mr-auto ml-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">עיצוב ארכיטקטוני</h3>
                                <p className="text-gray-600">
                                    תכנון ייחודי המשלב אסתטיקה מודרנית עם פונקציונליות מתקדמת ליצירת חללי מגורים איכותיים.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-10 px-6 mt-auto">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <Image
                                src="/urbanize-logo.png"
                                alt="Urbanize לוגו"
                                width={120}
                                height={40}
                                className="h-auto invert"
                            />
                            <p className="mt-4 text-blue-200">
                                מתכננים, בונים ומנהלים נכסים במיקומים שמייצרים ערך אמיתי לאורך זמן
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">פרויקטים</h3>
                            <ul className="space-y-2">
                                <li><Link href="/butterfly-park" className="text-blue-200 hover:text-white transition">פארק הפרפרים</Link></li>
                                <li><Link href="/bsr-rishonim" className="text-blue-200 hover:text-white transition">BSR ראשונים</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">קישורים מהירים</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-blue-200 hover:text-white transition">בית</Link></li>
                                <li><Link href="/" className="text-blue-200 hover:text-white transition">אודות</Link></li>
                                <li><Link href="/contact-us" className="text-blue-200 hover:text-white transition">יצירת קשר</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
                        <p>© כל הזכויות שמורות לאורבנייז {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}