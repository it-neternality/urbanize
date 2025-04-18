import Link from "next/link";

export default function HeroSection() {
    return (
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
    );
}
