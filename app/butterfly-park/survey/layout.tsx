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
        <div className="survey-layout mobile-full-screen">
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
                
                /* Larger number labels for sliders */
                .slider-labels {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 8px;
                    font-weight: 500;
                }
                
                .slider-labels span {
                    font-size: 16px;
                    color: #4B5563;
                }
                
                @media (max-width: 768px) {
                    .slider-labels span {
                        font-size: 18px;
                        font-weight: 600;
                    }
                }
            `}</style>
            {children}
        </div>
    );
}
