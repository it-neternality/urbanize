"use client";

import { useEffect } from 'react';

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/butterfly-park/survey/survey.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div className="survey-page">
            {children}
        </div>
    );
}
