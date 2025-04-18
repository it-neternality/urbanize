import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./home.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Urbanize | נדל״ן מתקדם",
    description: "חברת נדל״ן מובילה עם פרויקטים חדשניים",
    keywords: 'נדל"ן, פרויקטים חדשניים, חברת נדל"ן, אורבנייז',
    authors: [{ name: "Urbanize" }],
    viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Urbanize | נדל״ן מתקדם" />
                <meta property="og:description" content="חברת נדל״ן מובילה עם פרויקטים חדשניים" />
                <meta property="og:image" content="/urbanize-logo.png" />
                <meta property="og:url" content="https://urbanize.co.il" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="he_IL" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SpeedInsights />
                <Analytics />
                {children}
            </body>
        </html>
    );
}
