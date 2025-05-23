import Header from "../components/Header";
import Image from 'next/image';

export default function ModelD() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
            <Header />

            <section className="py-8 px-6 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-extrabold mb-4">דגם D - קומה 7</h1>
                    <p className="text-gray-700 text-lg">177 מ&quot;ר | נוף פתוח דרום</p>
                    <p className="text-gray-700 text-lg">למכירה: 12,400 ₪ למ&quot;ר</p>
                    <p className="text-gray-700 text-lg">להשכרה: 60 ₪ למ&quot;ר (מעטפת)</p>
                    <div className="mt-6">
                        <a href="/bsr-rishonim/model-g" className="text-blue-600 text-lg font-bold underline hover:text-blue-800 transition-all">
                            רוצים לראות את דגם G? לחצו כאן
                        </a>
                    </div>
                </div>
            </section>
            <section className="py-20 px-8 bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 justify-items-center">
                        <Image src="/bsr-rishonim/D7.jpg" alt="Model D" width={1200} height={800} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/floor-plan.jpg" alt="Floor Plan" width={1200} height={800} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/birdeye-view-to-sea.jpg" alt="Bird's Eye View" width={1200} height={800} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/look-from-balcony.jpg" alt="View from Balcony" width={1200} height={800} className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            <section className="py-20 px-8 bg-gray-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-6 whitespace-nowrap">מעוניינים לשמוע עוד?</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על דגם D
                    </p>
                    <a href="/bsr-rishonim/contact-us" className="bg-white text-gray-800 px-6 py-2 rounded-md font-medium transition-all hover:bg-gray-100 inline-block text-sm md:text-base">
                        צור קשר עכשיו
                    </a>
                </div>
            </section>

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
        </div >
    );
}
