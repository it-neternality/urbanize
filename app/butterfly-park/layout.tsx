// Dynamically merge classes from RootLayout with ButterflyParkLayout
import { Geist, Geist_Mono } from "next/font/google";
import "./butterfly.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function ButterflyParkLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link rel="manifest" href="/butterfly/site.webmanifest" />
                <link rel="icon" type="image/png" sizes="32x32" href="/butterfly/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/butterfly/favicon-16x16.png" />
                <link rel="apple-touch-icon" href="/butterfly/apple-touch-icon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="פארק הפרפרים - חוויה ייחודית של טבע, יופי ושלווה בלב העיר. בואו לגלות את עולמם הקסום של הפרפרים." />
                <meta name="keywords" content="פארק הפרפרים, פרפרים, טבע, בילוי, משפחה, חוויה, יופי, שלווה" />
                <meta name="author" content="Urbanize" />
                <meta property="og:title" content="פארק הפרפרים" />
                <meta property="og:description" content="חוויה ייחודית של טבע, יופי ושלווה בלב העיר. בואו לגלות את עולמם הקסום של הפרפרים." />
                <meta property="og:image" content="/butterfly/butterfly-logo.png" />
                <meta property="og:url" content="https://yourwebsite.com/butterfly-park" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="פארק הפרפרים" />
                <meta name="twitter:description" content="חוויה ייחודית של טבע, יופי ושלווה בלב העיר. בואו לגלות את עולמם הקסום של הפרפרים." />
                <meta name="twitter:image" content="/butterfly/butterfly-logo.png" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} butterfly-park antialiased`}>
                {children}
            </body>
        </html>
    );
}
