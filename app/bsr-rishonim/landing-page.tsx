export default function BsrRishonimLandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-gradient-to-r from-blue-900 to-purple-800 flex items-center">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'url("/bsr-rishonim/highres-building.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}></div>
                <div className="container mx-auto px-6 z-10 text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">משרדים יוקרתיים למכירה ולהשכרה</h1>
                    <p className="text-2xl text-blue-100 max-w-3xl mx-auto">
                        הזדמנות נדירה להצטרף למגדל העסקים החדש והיוקרתי בראשון לציון
                    </p>
                    <button className="mt-6 bg-white text-purple-700 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100">
                        צור קשר עכשיו
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">יתרונות המגדל</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-3">מיקום מנצח</h3>
                            <p className="text-gray-600">צמוד לתחנת רכבת משה דיין וצירי תנועה מרכזיים</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-3">נוף לים</h3>
                            <p className="text-gray-600">משרדים עם נוף פתוח לים ולשקיעה</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-3">עיצוב מפואר</h3>
                            <p className="text-gray-600">מגדל יוקרתי עם לובי מפואר ושמירה 24/7</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-3">מרכז מסחרי</h3>
                            <p className="text-gray-600">חנויות, מסעדות ובתי קפה בקומת הקרקע</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Details */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">המשרדים שלנו</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-2">דגם D</h3>
                            <p className="text-gray-600 mb-3">177 מ"ר | נוף פתוח דרום</p>
                            <p className="text-gray-600 mb-3">למכירה: 11,990 ₪ למ"ר</p>
                            <p className="text-gray-600 mb-3">להשכרה: 58 ₪ למ"ר (מעטפת)</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-2">דגם G</h3>
                            <p className="text-gray-600 mb-3">140 מ"ר + 13 מ"ר מרפסת | נוף לים ולשקיעה</p>
                            <p className="text-gray-600 mb-3">למכירה: 11,990 ₪ למ"ר</p>
                            <p className="text-gray-600 mb-3">להשכרה: 58 ₪ למ"ר (מעטפת)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">מעוניינים לשמוע עוד?</h2>
                    <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-8">
                        השאירו פרטים ונחזור אליכם בהקדם עם מידע מפורט על BSR ראשונים
                    </p>
                    <button className="bg-white text-purple-700 px-8 py-3 rounded-md font-medium transition-all hover:bg-gray-100 inline-block">
                        צור קשר עכשיו
                    </button>
                </div>
            </section>
        </div>
    );
}
