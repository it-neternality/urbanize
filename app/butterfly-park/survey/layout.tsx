"use client";

import './globals.css';
import './survey.css';

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="survey-page overflow-x-hidden">
            <head>
                <link rel="icon" href="/butterfly/favicon.ico" />
            </head>
            {children}
        </div>
    );
}
