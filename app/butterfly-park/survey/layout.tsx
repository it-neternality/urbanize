import './globals.css';
import './survey.css';

export const metadata = {
    title: 'סקר פארק הפרפרים',
    description: 'סקר עבור פארק הפרפרים שבו תוכלו לדרג את החנויות הנדרשות',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function SurveyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="he" dir="rtl" style={{ margin: 0, padding: 0 }}>
            <head>
                <style>{`
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        max-width: 100%;
                        overflow-x: hidden;
                    }
                    
                    body {
                        position: relative;
                    }
                    
                    .survey-layout {
                        width: 100%;
                        max-width: 100vw;
                        overflow-x: hidden;
                    }
                `}</style>
            </head>
            <body>
                <div className="survey-layout mobile-full-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}
