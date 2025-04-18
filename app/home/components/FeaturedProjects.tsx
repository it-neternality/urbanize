import Image from "next/image";
import Link from "next/link";

export default function FeaturedProjects() {
    return (
        <section className="py-10 px-6">
            <a id="projects"></a>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">הפרויקטים המובילים שלנו</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Project 1 */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1">
                        <Link href="/butterfly-park">
                            <div className="h-48 relative">
                                <Image
                                    src="/butterfly/6911_01.jpg"
                                    alt="פארק הפרפרים"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </Link>
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
                        <Link href="/bsr-rishonim">
                            <div className="h-48 relative">
                                <Image
                                    src="/bsr-rishonim/top-building.jpg"
                                    alt="BSR ראשונים"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </Link>
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
                        <Link href="#">
                            <div className="h-48 relative">
                                <Image
                                    src="/havot11/front.png"
                                    alt="האבות 11 – ראשון לציון"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-1 text-gray-800">פרוייקט עבר - האבות 11 – ראשון לציון</h3>
                            <p className="text-gray-600 text-sm mb-2">בניין מגורים בוטיק בן 8 יח&apos;&apos;ד, שתוכנן בקפידה על מגרש קטן-ממדים. הפרויקט משלב תכנון יצירתי עם ניצול חכם של שטח, תוך שמירה על איכות חיים גבוהה לדיירים.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
