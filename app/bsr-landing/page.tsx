import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ExternalLink } from 'lucide-react'; // Assuming lucide-react for icons
import ContactForm from '@/app/bsr-landing/components/ContactForm'; // Import the new ContactForm using absolute path

const stats = [
  { value: '65,000', label: 'מ"ר שטחי משרדים' },
  { value: '470+', label: 'מקומות חניה' },
  { value: '1,000,000+', label: 'אוכלוסייה בטווח 10 ק"מ' },
  { value: '34', label: 'קומות' },
];

export default function BsrLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section - New Structure */}
      <section className="relative w-full min-h-screen flex items-stretch bg-black">
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

        {/* Content Panel - Positioned on the right for RTL */}
        {/* On mobile, this panel will likely be at the top or take full width below a smaller image portion */}
        <div className="relative z-10 w-full md:w-2/5 lg:w-1/3 bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100 flex flex-col justify-center p-6 sm:p-8 lg:p-12 shadow-2xl min-h-full ml-auto">
          {/* Logo or Project Title - Optional, G-City has a prominent logo */}
          {/* <Image src="/your-logo-white.png" alt="BSR Logo" width={150} height={50} className="mb-8" /> */}
          
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">
            ב.ס.ר ראשונים
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-6">
            מגדל העסקים החדש והיוקרתי
          </p>
          
          <div className="mb-6 border-t border-gray-700 pt-6">
            <p className="text-lg text-gray-300 mb-4">
              מיקום מנצח | נוף לים | עיצוב מפואר | שמירה
              <br />
              מרכז מסחרי בקומת הקרקע
            </p>
            <ul className="space-y-2 text-gray-300 list-inside list-disc marker:text-blue-500 mb-8 text-right pl-1">
              <li>נגישות מושלמת - על רכבת משה דיין והמחלף ל 431/איילון</li>
              <li>מאוכלס כעת - כניסה מיידית</li>
              <li>יותר שטח נטו בפחות כסף</li>
              <li>בהזדמנות לפני שהשוק מתיישר עם מחירי בניין G הסמוך</li>
            </ul>
          </div>
          
          <div className="mt-auto w-full">
            <ContactForm /> 
          </div>
          
          <p className="text-xs text-gray-500 mt-6 text-center">
            *ההדמיות להמחשה בלבד. כפוף לתנאי החברה.
          </p>
        </div>
      </section>

      {/* Stats Section - Refined Styling */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm sm:text-md text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why BSR Section - Incorporating birdeye-view-to-sea.jpg */}
      <section className="relative py-16 sm:py-24 bg-gray-800 text-white">
        <div className="absolute inset-0 opacity-30"> {/* Increased opacity for better visibility of text */}
          <Image
            src="/bsr-rishonim/birdeye-view-to-sea.jpg"
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

      {/* Location Section - Updated with LocationMap.png and Google Maps Link */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">מיקום מושלם לעסק שלכם</h2> {/* Increased margin-bottom */}
          <div className="flex flex-col md:flex-row gap-10 items-center"> {/* Increased gap */}
            <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image 
                src="/bsr-rishonim/LocationMap.png" 
                alt="מפת מיקום של מגדל ב.ס.ר ראשונים"
                width={600}
                height={450}
                layout="responsive"
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 w-full text-right">
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

      {/* Gallery/Project Highlights - Example, can be expanded */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">הצצה אל הפרויקט</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              src: "/bsr-rishonim/lobby.jpg",
              alt: "לובי מפואר במגדל ב.ס.ר ראשונים",
              title: "לובי כניסה מרשים"
            }, {
              src: "/bsr-rishonim/office-view.jpg",
              alt: "נוף ממשרד במגדל ב.ס.ר ראשונים",
              title: "משרדים עם נוף לים"
            }, {
              src: "/bsr-rishonim/building-exterior-angle.jpg",
              alt: "מבט חיצוני על מגדל ב.ס.ר ראשונים",
              title: "ארכיטקטורה מודרנית"
            }].map((image) => (
              <div key={image.src} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-w-4 aspect-h-3">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white drop-shadow-md">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action - Optional, as form is in hero */}
      {/* Consider if a second CTA is needed or if the hero form is sufficient */}
      {/* Example: 
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">מוכנים לשדרג את העסק שלכם?</h2>
          <p className="text-xl mb-8">אל תחכו שההזדמנות תחלוף. צרו קשר עוד היום לתיאום ביקור במגדל ב.ס.ר ראשונים וגלו את הפוטנציאל.</p>
          <Link href="#contact-form-section-if-you-add-one-or-top" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition">
            דברו איתנו
          </Link>
        </div>
      </section>
      */}
      
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
          <p className="text-gray-400 text-sm mb-2">
            אלטלנה 1, ראשון לציון
          </p>
          <p className="text-gray-400 text-sm">
            לפרטים נוספים והצעות מחיר: <a href="tel:+972500000000" className="hover:text-blue-300">050-0000000</a> | <a href="mailto:sales@urbanize.co.il" className="hover:text-blue-300">sales@urbanize.co.il</a>
          </p>
          <div className="mt-8 text-gray-500 text-xs">
            <p> {new Date().getFullYear()} ב.ס.ר ראשונים. כל הזכויות שמורות לאורבניז אופיס.</p>
            <p className="mt-1">המידע וההדמיות באתר להמחשה בלבד וניתנים לשינויים. ט.ל.ח.</p>
            {/* Optional: Links to privacy policy, terms, etc. */}
            {/* <div className="mt-2 space-x-3">
              <Link href="/privacy-policy" className="hover:text-gray-300">מדיניות פרטיות</Link>
              <span>|</span>
              <Link href="/terms-of-use" className="hover:text-gray-300">תנאי שימוש</Link>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
