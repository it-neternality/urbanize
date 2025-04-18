export const metadata = {
    title: "פארק הפרפרים | אורבנייז",
    description: "גלו את פרויקטי הנדל'ן החדשניים והמתקדמים בפארק הפרפרים של אורבנייז.",
};

export default function ButterflyParkLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link rel="icon" href="/butterfly/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" href="/butterfly/favicon-16x16.png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/butterfly/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
