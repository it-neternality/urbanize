import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script';
import './landing-styles.css'; // Import local Tailwind CSS for this landing page

export const metadata = {
    title: "משרדים יוקרתיים למכירה | ב.ס.ר ראשונים - הזדמנות נדירה",
    description: "הזדמנות נדירה לרכישת משרדים יוקרתיים במגדל העסקים החדש בראשון לציון. מיקום מושלם, נגישות מעולה וכניסה מיידית.",
};

export default function BsrLandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="he" dir="rtl">
            <head>
                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                  {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-XXXXXX');
                  `}
                </Script>
                <link rel="icon" href="/bsr-rishonim/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" href="/bsr-rishonim/favicon-16x16.png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/bsr-rishonim/android-chrome-192x192.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="הזדמנות נדירה לרכישת משרדים יוקרתיים במגדל העסקים החדש בראשון לציון. מיקום מושלם, נגישות מעולה וכניסה מיידית." />
                <meta name="keywords" content="משרדים למכירה, משרדים להשכרה, ראשון לציון, ב.ס.ר ראשונים, מגדל עסקים, נוף לים, עיצוב מפואר, כניסה מיידית, נגישות מעולה" />
                <meta name="author" content="Urbanize" />
                <meta property="og:title" content="משרדים יוקרתיים למכירה | ב.ס.ר ראשונים - הזדמנות נדירה" />
                <meta property="og:description" content="הזדמנות נדירה לרכישת משרדים יוקרתיים במגדל העסקים החדש בראשון לציון. מיקום מושלם, נגישות מעולה וכניסה מיידית." />
                <meta property="og:image" content="/bsr-rishonim/wide-building.jpg" />
                <meta property="og:url" content="https://urbanize.co.il/bsr-landing" />
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
