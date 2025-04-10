import Image from "next/image";
import Link from "next/link";

export default function BsrRishonim() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="p-4 md:p-6 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
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
          <nav className="hidden md:flex space-x-6">
            <Link href="/butterfly-park" className="font-medium text-gray-700 hover:text-gray-900 transition">פארק הפרפרים</Link>
            <Link href="/bsr-rishonim" className="font-medium text-blue-700 hover:text-blue-900 transition">BSR ראשונים</Link>
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
      <div className="relative h-[50vh] bg-gradient-to-r from-blue-900 to-purple-800 flex items-center">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        <div className="container mx-auto px-6 z-10 text-right">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">BSR ראשונים</h1>
          <p className="text-xl text-blue-100 max-w-2xl mr-auto">מגדל יוקרתי חדשני המשלב טכנולוגיה, אדריכלות מודרנית ואיכות חיים</p>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-right">
              <h2 className="text-3xl font-bold mb-6">אודות הפרויקט</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                BSR ראשונים הוא מגדל יוקרה חדשני המציע חווית מגורים ברמה גבוהה. הפרויקט ממוקם באזור מרכזי עם נגישות מעולה לצירי תחבורה ראשיים, 
                מרכזי תרבות, מסחר ובילוי.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                המגדל מציע דירות במגוון גדלים החל מדירות 3 חדרים ועד פנטהאוזים יוקרתיים, כולם מתוכננים בסטנדרט גבוה עם חומרי גמר איכותיים. 
                הדיירים נהנים ממרפסות מרווחות, נוף פנורמי, ומגוון שירותים ייחודיים לדיירי המגדל.
              </p>
              <div className="flex space-x-4 justify-end">
                <button className="bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-all hover:bg-purple-800">
                  יצירת קשר
                </button>
                <button className="border border-purple-700 text-purple-700 px-6 py-3 rounded-md font-medium transition-all hover:bg-purple-50">
                  צפה במפרט
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-purple-700 h-[400px] rounded-lg shadow-lg"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">יתרונות המגדל</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-right">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-6 mr-auto ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">עיצוב יוקרתי</h3>
              <p className="text-gray-600">
                אדריכלות מודרנית עם דגש על חומרים איכותיים ועיצוב פנים ייחודי.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-right">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-6 mr-auto ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">טכנולוגיה חכמה</h3>
              <p className="text-gray-600">
                מערכות בית חכם מתקדמות ומעליות מהירות עם זיהוי דיירים.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-right">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-6 mr-auto ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">נוף פנורמי</h3>
              <p className="text-gray-600">
                נוף מרהיב מכל דירה וחלונות גדולים המאפשרים תאורה טבעית.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-right">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-6 mr-auto ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">שירותים לדיירים</h3>
              <p className="text-gray-600">
                לובי מפואר עם שירותי קבלה, חדר כושר, חדרי אירוח ומועדון דיירים.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">תכניות הדירות</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="aspect-video bg-purple-200 mb-4 rounded"></div>
              <h3 className="text-xl font-bold mb-2">דירת 3 חדרים</h3>
              <p className="text-gray-600 mb-3">80-90 מ״ר עם מרפסת 12 מ״ר</p>
              <button className="text-purple-700 font-medium hover:text-purple-900">
                לפרטים נוספים &larr;
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="aspect-video bg-purple-300 mb-4 rounded"></div>
              <h3 className="text-xl font-bold mb-2">דירת 4 חדרים</h3>
              <p className="text-gray-600 mb-3">105-115 מ״ר עם מרפסת 15 מ״ר</p>
              <button className="text-purple-700 font-medium hover:text-purple-900">
                לפרטים נוספים &larr;
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="aspect-video bg-purple-400 mb-4 rounded"></div>
              <h3 className="text-xl font-bold mb-2">פנטהאוז</h3>
              <p className="text-gray-600 mb-3">150-200 מ״ר עם מרפסת 40 מ״ר</p>
              <button className="text-purple-700 font-medium hover:text-purple-900">
                לפרטים נוספים &larr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">גלריית הדמיות</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-purple-900 rounded-lg"></div>
            <div className="aspect-square bg-purple-800 rounded-lg"></div>
            <div className="aspect-square bg-purple-700 rounded-lg"></div>
            <div className="aspect-square bg-purple-600 rounded-lg"></div>
            <div className="aspect-square bg-purple-500 rounded-lg md:col-span-2"></div>
          </div>
          <div className="text-center mt-10">
            <button className="bg-purple-700 text-white px-8 py-3 rounded-md font-medium transition-all hover:bg-purple-800">
              לגלריה המלאה
            </button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">מיקום</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              BSR ראשונים ממוקם באזור אסטרטגי המציע גישה נוחה לכבישים ראשיים, 
              תחבורה ציבורית, מרכזי קניות, בתי ספר ופארקים
            </p>
          </div>
          <div className="bg-gray-300 h-[400px] rounded-lg shadow-lg">
            {/* Map placeholder */}
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-600 font-medium">מפה אינטראקטיבית</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">מעוניינים לשמוע עוד?</h2>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-8">
            השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על BSR ראשונים
          </p>
          <button className="bg-white text-purple-700 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block">
            צור קשר עכשיו
          </button>
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
                <li><Link href="/" className="text-blue-200 hover:text-white transition">יצירת קשר</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">צור קשר</h3>
              <p className="text-blue-200 mb-2">רחוב הטכנולוגיה 10, תל אביב</p>
              <p className="text-blue-200 mb-2">טלפון: 03-1234567</p>
              <p className="text-blue-200">דוא״ל: info@urbanize.co.il</p>
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
