import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
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
    );
}
