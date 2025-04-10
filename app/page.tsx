import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        <div className="container mx-auto px-6 z-10 text-right">
          <div className="max-w-2xl mr-0 ml-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              חדשנות נדל״ן <br />עם מחשבה על העתיד
            </h1>
            <p className="mt-6 text-lg text-blue-100">
              אורבנייז מובילה את עולם הנדל״ן לעתיד חדש עם פרויקטים חדשניים ויוצאי דופן.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-end">
              <Link 
                href="/butterfly-park"
                className="bg-white text-blue-900 px-8 py-3 rounded-md font-medium transition-all hover:bg-opacity-90"
              >
                לגלות פרויקטים
              </Link>
              <button className="border border-white text-white px-8 py-3 rounded-md font-medium transition-all hover:bg-white hover:bg-opacity-10">
                יצירת קשר
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">הפרויקטים המובילים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
              <div className="h-48 relative">
                <Image 
                  src="/butterfly/6911_01.jpg"
                  alt="פארק הפרפרים"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">פארק הפרפרים</h3>
                <p className="text-gray-600 mb-4">פרויקט יוקרתי המשלב מגורים, מסחר וטכנולוגיה מתקדמת במיקום מרכזי.</p>
                <Link 
                  href="/butterfly-park" 
                  className="text-blue-700 font-medium hover:underline"
                >
                  לפרטים נוספים &larr;
                </Link>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
              <div className="h-48 bg-blue-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">BSR ראשונים</h3>
                <p className="text-gray-600 mb-4">מגדל מגורים חדשני עם חללים משותפים חכמים ונוף פנורמי מרהיב.</p>
                <Link 
                  href="/bsr-rishonim" 
                  className="text-blue-700 font-medium hover:underline"
                >
                  לפרטים נוספים &larr;
                </Link>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
              <div className="h-48 bg-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">פרויקט עתידי</h3>
                <p className="text-gray-600 mb-4">מתחם חדשני במרכז העיר המשלב חדשנות אדריכלית וטכנולוגיות מתקדמות.</p>
                <button className="text-blue-700 font-medium hover:underline">
                  בקרוב &larr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">חדשנות בנדל״ן</h2>
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
                <h3 className="text-xl font-bold mb-2">טכנולוגיה חכמה</h3>
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
                <h3 className="text-xl font-bold mb-2">קיימות ואקולוגיה</h3>
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
                <h3 className="text-xl font-bold mb-2">עיצוב ארכיטקטוני</h3>
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