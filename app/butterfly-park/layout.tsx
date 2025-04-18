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
                <link rel="apple-touch-icon" href="/butterfly/apple-touch-icon.png" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} butterfly-park antialiased`}>
                {children}
            </body>
        </html>
    );
}
