import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/butterfly/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/butterfly/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/butterfly/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/butterfly/favicon.ico" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
