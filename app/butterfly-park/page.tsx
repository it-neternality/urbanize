import Image from "next/image";
import Link from "next/link";

export default function ButterflyPark() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <header className="p-4 md:p-6 bg-white shadow-sm">
                <div className="container mx-auto flex justify-center md:justify-between items-center">
                    <Link href="/butterfly-park" className="flex items-center">
                        <Image
                            src="/butterfly/butterfly-logo.png"
                            alt="פארק הפרפרים לוגו"
                            width={180}
                            height={60}
                            priority
                            className="h-auto"
                        />
                    </Link>
                </div>
            </header>

            {/* Hero Banner */}
            <div className="relative h-[60vh] flex items-center justify-center md:bg-gradient-to-b from-orange-100 to-yellow-100">
                <div className="absolute inset-0 bg-white opacity-20"></div>
                <div className="container mx-auto px-6 z-10 flex md:flex-row flex-col items-center">
                    {/* Text Content */}
                    <div className="md:w-1/2 p-4 text-center md:text-right flex flex-col items-center md:items-end">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mb-4 hidden md:block">פארק הפרפרים</h1>
                        <p className="text-2xl text-gray-800 max-w-3xl">מרכז הקניות והפנאי בשכונת רחובות הצעירה</p>
                        <p className="text-lg text-gray-600 mt-4">מקום שבו הקהילה נפגשת, המשפחה נהנית, והחברים מבלים יחד.</p>
                    </div>
                    {/* Image */}
                    <div className="relative z-10 rounded-xl hover:scale-120 transition-transform duration-500 md:ml-auto overflow-hidden">
                        <Image
                            src="/butterfly/family-shopping-bags.png"
                            alt="פארק הפרפרים"
                            width={600}
                            height={300}
                            style={{
                                objectFit: 'contain',
                                maskImage: 'radial-gradient(ellipse, black 10%, transparent 70%)',
                                WebkitMaskImage: 'radial-gradient(ellipse, black 10%, transparent 70%)'
                            }}
                            className="mx-auto"
                            priority
                        />
                    </div>
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
                            <h2 className="text-3xl font-bold mb-6 text-black flex items-center justify-start whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                מרכז החיים של השכונה – מסחר, קהילה ופנאי בלב הפארק
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                פארק הפרפרים הוא מרכז מסחרי ייחודי, המהווה חלק אינטגרלי בפארק המרכזי של שכונת רחובות הצעירה.
                                <br /><br />
                                הוא משתלב בטבעיות לצד מדשאות רחבות, מתקני משחקים ופינות ישיבה – ומציע חוויית בילוי, קניות ופנאי במרחק הליכה מהבית.
                                <br /><br />
                                <ul className="list-disc pr-5">
                                    <li>בית קפה עם אווירה</li>
                                    <li>גלידה איכותית</li>
                                    <li>מאפים טריים</li>
                                    <li>סופר שכונתי</li>
                                    <li>פיצרייה</li>
                                    <li>חנויות נוחות</li>
                                    <li>סטודיו כושר</li>
                                    <li>מרפאות ושירותים נוספים</li>
                                </ul>
                                <br />
                                מרכז שמשרת את צרכי היומיום של התושבים – וגם מזמין אותם להישאר, להיפגש, וליהנות.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Survey Section */}
            <section className="py-16 px-6 bg-blue-50 text-center relative overflow-hidden">
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
            <section className="py-20 bg-gradient-to-b from-blue-100 to-blue-200 text-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-blue-400 rounded-full opacity-10 transform -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 transform translate-x-16 translate-y-16"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-3 ">צור קשר</h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Contact Info Card */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                                <a
                                    href="https://maps.google.com/?q=רחוב+חזון+איש+5,+רחובות,+ישראל"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-600/30 rounded-lg p-3 group"
                                >
                                    <div className="mx-4 p-2 bg-blue-600/30 rounded-full group-hover:bg-yellow-400 group-hover:text-blue-800 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">כתובת:</p>
                                        <p className="text-blue-800 group-hover:text-black">רחוב חזון איש 5, רחובות</p>
                                    </div>
                                </a>
                                <a
                                    href="tel:035045041"
                                    className="flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-600/30 rounded-lg p-3 group"
                                >
                                    <div className="mx-4 p-2 bg-blue-600/30 rounded-full group-hover:bg-yellow-400 group-hover:text-blue-800 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">טלפון:</p>
                                        <p className="text-blue-800 group-hover:text-black">03-504-504-1</p>
                                    </div>
                                </a>
                            </div>

                            {/* Contact Form Button */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 flex flex-col justify-center items-center text-center">
                                <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-yellow-400 text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">יש לך שאלה?</h3>
                                <p className="text-blue-800 mb-6">
                                    נשמח לשמוע ממך ולענות על כל שאלה או הצעה!
                                </p>
                                <Link
                                    href="/butterfly-park/contact-us"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                                >
                                    <span>טופס יצירת קשר</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-2 md:py-4 text-center text-sm md:text-base">
                <p>© כל הזכויות שמורות {new Date().getFullYear()}</p>
            </footer>
        </div >
    );
}
