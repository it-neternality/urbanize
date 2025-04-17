import Image from "next/image";
import Link from "next/link";

export default function ButterflyPark() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <header className="p-4 md:p-6 bg-white shadow-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/butterfly-park" className="flex items-center">
                        <Image
                            src="/butterfly/butterfly logo.png"
                            alt="פארק הפרפרים לוגו"
                            width={180}
                            height={60}
                            priority
                            className="h-auto"
                        />
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/butterfly-park" className="font-medium text-blue-700 hover:text-blue-900 transition">פארק הפרפרים</Link>
                        <Link href="/bsr-rishonim" className="font-medium text-gray-700 hover:text-gray-900 transition">BSR ראשונים</Link>
                        <Link href="/" className="font-medium text-gray-700 hover:text-gray-900 transition">בית</Link>
                    </nav>
                    <button className="md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Hero Banner */}
            <div className="relative h-[50vh] bg-blue-800 flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }}></div>
                <div className="container mx-auto px-6 z-10 text-center">
                    <Image
                        src="/butterfly/shopping-bag.png"
                        alt="shopping bag"
                        width={96}
                        height={96}
                        className="mx-auto mb-4"
                    />

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">פארק הפרפרים</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">מרכז הקניות והפנאי בשכונת רחובות הצעירה</p>

                </div>
            </div>

            {/* Project Details */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-lg shadow-lg overflow-hidden">
                            <Image
                                src="/butterfly/6911_04-highres.jpg"
                                alt="פארק הפרפרים - הדמיית חוץ"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold mb-6 text-black flex items-center justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                אודות הפרויקט
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                <span className="inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    מקום המפגש של הקהילה, המשפחה והחברים.
                                </span>
                                <br />
                                <span className="inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    לוותר על הרכב ולבלות עם הילדים אחה"צ ממש מתחת לביתך.
                                </span>
                                <br />
                                <span className="inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    גלידה, פיצה ומאפים מפנקים בזמן הבילוי בפארק.
                                </span>
                                <br />
                                <span className="inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    בית הקפה לשבת בו עם השכנים בשישי בבוקר.
                                </span>
                                <br />
                                <span className="inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    הסופר מרקט השכונתי.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Survey Section */}
            <section className="py-16 px-6 bg-blue-50 text-center relative overflow-hidden" style={{
                backgroundImage: 'url("/butterfly/survey-background.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-80 z-0"></div>
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col items-center text-right animate-fade-in">
                        <div className="w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-yellow-400 text-yellow-600 shadow-lg animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-extrabold text-blue-900 mb-6">מוזמנים להשפיע!</h2>
                        <p className="text-lg text-blue-800 max-w-3xl mx-auto mb-6 leading-relaxed">
                            על מנת לייצר תמהיל חנויות ושירותים שיתאים בדיוק לצרכים,
                            בחרנו לשתף אתכם בתכנון המרכז.
                        </p>
                        <p className="text-lg text-blue-800 max-w-3xl mx-auto mb-6 leading-relaxed">
                            בפעם הראשונה בישראל, התושבים הם אלה שייצרו את החוויה והדינמיקה המסחרית אורבנית שלהם, כל השירותים והחנויות שהמשפחה שלכם צריכה והכל מתחת לבית!
                        </p>
                        <Link
                            href="/butterfly-park/survey"
                            className="bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:bg-blue-800 flex items-center justify-center animate-pulse"
                        >
                            סקר תושבים
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-300 rounded-full opacity-50 animate-spin-slow"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-300 rounded-full opacity-30 animate-spin-slow"></div>
            </section>

            {/* Features */}
            <section className="py-16 px-6 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">יתרונות מרכז הקניות</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-right">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-700">מגוון חנויות ושירותים</h3>
                            <p className="text-gray-500 leading-relaxed">
                                מבחר גדול של חנויות, בתי קפה ומסעדות במקום אחד.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-right">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-50 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
                                    <rect x="2" y="2" width="20" height="20" rx="3" ry="3" fill="#3B82F6" />
                                    <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold">
                                        P
                                    </text>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-700">חווית קנייה נוחה</h3>
                            <p className="text-gray-500 leading-relaxed">
                                חניה בשפע, גישה נוחה, ושירותים מגוונים לרווחת הקונים.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-right">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke="red" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 10 6 10s6-4.75 6-10c0-3.314-2.686-6-6-6z" />
                                    <circle cx="12" cy="8" r="2" fill="white" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-700">מיקום מרכזי</h3>
                            <p className="text-gray-500 leading-relaxed">
                                נגישות קלה לכל תושבי השכונה והסביבה.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">גלריית הדמיות</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="col-span-1 md:col-span-2 relative h-80 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/butterfly/6911_05-highres.jpg"
                                alt="פארק הפרפרים - הדמיית פנים"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="h-80 relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/butterfly/6911_04-highres.jpg"
                                alt="פארק הפרפרים - הדמיית חוץ נוספת"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="h-64 relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/butterfly/6911_01.jpg"
                                alt="פארק הפרפרים - מבט נוסף"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="h-64 relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/butterfly/6911_02.jpg"
                                alt="פארק הפרפרים - הדמיית פיתוח"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="h-64 bg-blue-500 rounded-lg"></div>
                    </div>
                    <div className="text-center mt-10">
                        <button className="bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all hover:bg-blue-800">
                            לגלריה המלאה
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-16 px-6 bg-blue-700 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">צור קשר</h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                        נשמח לשמוע מכם! לחצו על הקישור למעבר לטופס יצירת קשר.
                    </p>
                    <Link
                        href="/butterfly-park/contact-us"
                        className="bg-white text-blue-700 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block"
                    >
                        לטופס יצירת קשר
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-10 px-6 mt-auto">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <Image
                                src="/butterfly/Urbanize Properties Logo.png"
                                alt="Urbanize Properties לוגו"
                                width={120}
                                height={40}
                                className="h-auto invert"
                            />
                            <p className="mt-4 text-blue-200">
                                חברת נדל״ן מובילה המתמחה בפרויקטים חדשניים וטכנולוגיים.
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
                                <li><a href="/butterfly-park/contact-us" className="text-blue-200 hover:text-white transition">יצירת קשר</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
                        <p>© כל הזכויות שמורות לאורבנייז {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}
