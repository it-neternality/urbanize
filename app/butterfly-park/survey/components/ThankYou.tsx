interface ThankYouProps {
    onGoToHome: () => void;
}

export const ThankYou = ({ onGoToHome }: ThankYouProps) => {
    return (
        <div className="col text-center py-10">
            <div className="relative mb-12">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>

                <div className="mx-auto relative z-10 w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mb-10 border-t-4 border-indigo-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
                <div className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2 w-40 h-40 bg-green-100 rounded-full opacity-20"></div>

                <div className="text-center direction-rtl mb-8 relative z-10">
                    <h2 className="text-3xl font-bold mb-4 text-indigo-900">תודה רבה על השתתפותך בסקר!</h2>
                    <p className="text-xl text-gray-700">דעתך בהחלט חשובה לנו ותסייע לנו לתכנן את פארק הפרפרים בצורה מיטבית</p>
                </div>

                <div className="text-center direction-rtl mb-8">
                    <img
                        src="https://static.wixstatic.com/media/498050_6d6e831eaceb4e9eb98e77d7d021376d~mv2.jpeg"
                        alt="Thank You"
                        className="max-w-md mx-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            <button
                onClick={onGoToHome}
                className="mx-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                חזרה לאתר הבית
            </button>
        </div>
    );
};
