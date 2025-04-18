import Header from "./components/Header";
import BuildingShowcase from "./components/BuildingShowcase";
import Gallery from "./components/Gallery";
import OfficeDetails from "./components/OfficeDetails";
import Link from "next/link";

export default function BsrRishonim() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 relative font-sans text-gray-800">
            <Header />
            <BuildingShowcase />
            <Gallery />
            {/* Office Details */}
            <OfficeDetails />

            {/* CTA Section */}
            <section className="py-16 px-6 bg-gray-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">מעוניינים לשמוע עוד?</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על ב.ס.ר ראשונים
                    </p>
                    <Link href="/bsr-rishonim/contact-us">
                        <button className="bg-white text-gray-800 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block">
                            צור קשר עכשיו
                        </button>
                    </Link>
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
