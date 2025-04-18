"use client";

import { useEffect } from 'react';
import './globals.css';
import './survey.css';

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/butterfly/favicon.ico';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div className="survey-page overflow-x-hidden">
            {children}
        </div>
    );
}
