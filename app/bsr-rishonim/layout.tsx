import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./bsr.css";
export const metadata = {
    title: "משרדים יוקרתיים למכירה ולהשכרה בראשון לציון | ב.ס.ר ראשונים",
    description: "הזדמנות נדירה להצטרף למגדל העסקים החדש והיוקרתי בראשון לציון. משרדים עם נוף לים, עיצוב מפואר ומיקום מנצח. למכירה ולהשכרה.",
};

export default function BsrRishonimLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link rel="icon" href="/bsr-rishonim/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" href="/bsr-rishonim/favicon-16x16.png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/bsr-rishonim/android-chrome-192x192.png" />
                <link rel="manifest" href="/bsr-rishonim.webmanifest" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="הזדמנות נדירה להצטרף למגדל העסקים החדש והיוקרתי בראשון לציון. משרדים עם נוף לים, עיצוב מפואר ומיקום מנצח. למכירה ולהשכרה." />
                <meta name="keywords" content="משרדים למכירה, משרדים להשכרה, ראשון לציון, ב.ס.ר ראשונים, מגדל עסקים, נוף לים, עיצוב מפואר" />
                <meta name="author" content="Urbanize" />
                <meta property="og:title" content="משרדים יוקרתיים למכירה ולהשכרה בראשון לציון | ב.ס.ר ראשונים" />
                <meta property="og:description" content="הזדמנות נדירה להצטרף למגדל העסקים החדש והיוקרתי בראשון לציון. משרדים עם נוף לים, עיצוב מפואר ומיקום מנצח. למכירה ולהשכרה." />
                <meta property="og:image" content="/bsr-rishonim/highres-building.jpg" />
                <meta property="og:url" content="https://urbanize.co.il/bsr-rishonim" />
                <meta property="og:homepage" content="https://urbanize.co.il" />
                <meta property="og:facebook" content="https://www.facebook.com/UrbanizeProperties" />
                <meta name="twitter:card" content="summary_large_image" />
            </head>
            <body className="font-sans text-gray-800 bg-gray-100">
                <SpeedInsights />
                <Analytics />
                {children}
            </body>
        </html>
    );
}
