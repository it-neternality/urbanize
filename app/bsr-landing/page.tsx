import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ExternalLink, Sun } from 'lucide-react'; // Assuming lucide-react for icons
import ContactForm from './components/ContactForm'; // Import the new ContactForm using absolute path
import GlowingText from './components/GlowingText'; // Import the GlowingText component

export default function BsrLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section - New Structure */}
      <section className="relative w-full min-h-screen flex items-stretch" style={{ backgroundColor: '#000e26' }}>
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 pr-[33%]">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/bsr-rishonim/highres-building-with-logo.jpg"
                alt="מגדל ב.ס.ר ראשונים - רקע דרמטי"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Optional: Dark overlay for better text contrast if the image is too bright */}
          <div className="absolute inset-0 bg-black/50 z-1"></div> 
        </div>

        <div className="relative z-10 w-full md:w-2/5 lg:w-1/3 bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100 flex flex-col justify-center p-6 sm:p-8 lg:p-12 shadow-2xl min-h-full ml-auto">
          {/* Building Image - Hidden on desktop */}
          <div className="mb-6 w-full relative md:hidden" style={{ height: '300px' }}>
            <Image 
              src="/bsr-rishonim/highres-building-with-logo.jpg" 
              alt="מגדל ב.ס.ר ראשונים" 
              fill
              className="object-cover rounded-lg shadow-lg"
              style={{
                objectPosition: 'center 30%'
              }}
              priority
            />
          </div>
          <div className="text-center md:text-right mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">
              ב.ס.ר ראשונים
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-blue-400 mb-6 leading-tight md:text-3xl">
              מגדל העסקים החדש והיוקרתי
            </p>
            
            <div className="flex justify-center md:justify-start">
              <p className="hidden md:block text-white text-sm flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-blue-500" />
                &nbsp;מיקום מנצח
                <Sun className="h-5 w-5 mr-3 text-yellow-500" />
                &nbsp;נוף לים
              </p>

              <GlowingText />
            </div>
          </div>
          
          <div className="mb-6 border-t border-gray-700 pt-6">
            <div className="text-right">
              <ul className="space-y-3 text-gray-300 list-outside list-disc pr-5 mb-8 text-right">
                <li className="leading-relaxed">נגישות מושלמת - על רכבת משה דיין והמחלף ל 431/איילון</li>
                <li className="leading-relaxed">מאוכלס כעת - כניסה מיידית</li>
                <li className="leading-relaxed">יותר שטח נטו בפחות כסף</li>
                <li className="leading-relaxed">בהזדמנות לפני שהשוק מתיישר עם מחירי בניין G הסמוך</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-auto w-full">
            <ContactForm /> 
          </div>
          
          <p className="text-xs text-gray-500 mt-6 text-center">
            *ההדמיות להמחשה בלבד. כפוף לתנאי החברה.
          </p>
        </div>
      </section>

      {/* Why BSR Section - Incorporating look-from-balcony.jpg - Hidden on mobile */}
      <section className="hidden md:block relative py-16 sm:py-24 bg-gray-800 text-white">
        <div className="absolute inset-0 opacity-30"> {/* Increased opacity for better visibility of text */}
          <Image
            src="/bsr-rishonim/look-from-balcony.jpg"
            alt="נוף ממעוף הציפור למגדל ב.ס.ר ראשונים והים"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-300">למה לבחור בב.ס.ר ראשונים?</h2>
          <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
            מגדל ב.ס.ר ראשונים מציע שילוב ייחודי של יוקרה, מיקום אסטרטגי וסביבת עבודה מתקדמת, המותאמת לעסקים המחפשים את הטוב ביותר.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-gray-200">
            <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">מיקום פרימיום</h3>
              <p>בלב אזור העסקים המתפתח של ראשון לציון, עם נגישות מהירה לצירי תנועה ראשיים ותחבורה ציבורית.</p>
            </div>
            <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">עיצוב ותכנון</h3>
              <p>סטנדרטים גבוהים של עיצוב ארכיטקטוני, חללים מרווחים ומוארים ונוף פנורמי עוצר נשימה.</p>
            </div>
            <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">סביבה עסקית תומכת</h3>
              <p>מרכז מסחרי בקומת הקרקע, לובי מפואר ושירותי שמירה 24/7 לבטחון ושקט נפשי.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section - Updated with LocationMap.png and Google Maps Link - Hidden on mobile */}
      <section className="hidden md:block py-16 sm:py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">מיקום מושלם לעסק שלכם</h2>
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="lg:w-3/4 w-full rounded-xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300">
              <div className="relative w-full h-[400px] lg:h-[550px]">
                <Image 
                  src="/bsr-rishonim/LocationMap.png" 
                  alt="מפת מיקום של מגדל ב.ס.ר ראשונים"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                />
              </div>
            </div>
            <div className="lg:w-1/3 w-full text-right bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-blue-700">נגישות אופטימלית מכל מקום</h3> {/* Increased font size */}
              <p className="mb-5 text-gray-700 leading-relaxed"> {/* Increased line-height and margin */}
                מגדל ב.ס.ר ראשונים ממוקם אסטרטגית באזור העסקים החדש של מערב ראשון לציון, על ציר משה דיין ובסמיכות למחלף כביש 431 ונתיבי איילון. המיקום מבטיח גישה נוחה ברכב פרטי ובתחבורה ציבורית, כולל קרבה לתחנת רכבת משה דיין.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                <strong>כתובת:</strong> אלטלנה 1, ראשון לציון
              </p>
              <Link href="https://www.google.com/maps/search/?api=1&query=%D7%90%D7%9C%D7%98%D7%9C%D7%A0%D7%94+1,+%D7%A8%D7%90%D7%A9%D7%95%D7%9F+%D7%9C%D7%A6%D7%99%D7%95%D7%9F" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-base">
                <MapPin size={22} />
                הצג מפה בגוגל
                <ExternalLink size={20} className="opacity-80" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Assuming layout.tsx handles the main footer, or add specific one if needed */}
      <footer className="bg-gray-900 text-white py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/bsr-landing">
            <Image 
              src="/bsr-rishonim/urbanize-office-logo-white.png" // Assuming you have a white version of logo
              alt="Urbanize Office Logo"
              width={150}
              height={50}
              className="h-auto mb-6 mx-auto cursor-pointer"
            />
          </Link>
          <div className="mt-8 text-gray-500 text-xs">
            <p> {new Date().getFullYear()} ב.ס.ר ראשונים. כל הזכויות שמורות לאורבניז אופיס.</p>
            <p className="mt-1">המידע וההדמיות באתר להמחשה בלבד וניתנים לשינויים. ט.ל.ח.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
