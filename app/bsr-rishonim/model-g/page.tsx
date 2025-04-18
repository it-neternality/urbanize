import Header from "../components/Header";
import Image from 'next/image';

export default function ModelG() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
            <Header />

            <section className="py-8 px-6 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-extrabold mb-4">דגם G - קומה 7</h1>
                    <p className="text-gray-700 text-lg">140 מ&quot;ר + 13 מ&quot;ר מרפסת | נוף לים ולשקיעה</p>
                    <p className="text-gray-700 text-lg">למכירה: 11,990 ₪ למ&quot;ר</p>
                    <p className="text-gray-700 text-lg">להשכרה: 58 ₪ למ&quot;ר (מעטפת)</p>
                    <div className="mt-6">
                        <a href="/bsr-rishonim/model-d" className="text-blue-600 text-lg font-bold underline hover:text-blue-800 transition-all">
                            רוצים לראות את דגם D? לחצו כאן
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-20 px-8 bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Image src="/bsr-rishonim/G7-1.jpg" alt="Model G - Image 1" width={500} height={300} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/G7-2.jpg" alt="Model G - Image 2" width={500} height={300} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/floor-plan.jpg" alt="Floor Plan" width={500} height={300} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/birdeye-2buildings.jpg" alt="Bird's Eye View" width={500} height={300} className="rounded-lg shadow-lg" />
                        <Image src="/bsr-rishonim/look-from-balcony.jpg" alt="View from Balcony" width={500} height={300} className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            <section className="py-20 px-8 bg-gray-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-6">מעוניינים לשמוע עוד?</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על דגם G
                    </p>
                    <a href="/bsr-rishonim/contact-us" className="bg-white text-gray-800 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block">
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
        </div>
    );
}
