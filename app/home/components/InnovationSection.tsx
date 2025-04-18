export default function InnovationSection() {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">חדשנות בנדל״ן</h2>
                    <p className="text-lg text-gray-600 mb-10">
                        בכל פרויקט אנו משלבים טכנולוגיות מתקדמות, תכנון חכם ואדריכלות פורצת דרך,
                        כדי ליצור חוויית מגורים מודרנית המותאמת לצרכי העתיד.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4 mr-auto ml-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">טכנולוגיה חכמה</h3>
                            <p className="text-gray-600">
                                פתרונות חדשניים המשתלבים בסביבת המגורים והמאפשרים שליטה מלאה ונוחות מירבית.
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4 mr-auto ml-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">קיימות ואקולוגיה</h3>
                            <p className="text-gray-600">
                                שימוש בחומרים ותהליכים ידידותיים לסביבה ותכנון המאפשר חיסכון באנרגיה וניצול מיטבי של משאבים.
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4 mr-auto ml-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">עיצוב ארכיטקטוני</h3>
                            <p className="text-gray-600">
                                תכנון ייחודי המשלב אסתטיקה מודרנית עם פונקציונליות מתקדמת ליצירת חללי מגורים איכותיים.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
