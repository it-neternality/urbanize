import Image from "next/image";

export const ThankYou = ({ onGoToHome }: { onGoToHome: () => void }) => {
    return (
        <div className="text-center py-10 md:py-20">
            <Image
                src="/urbanize-logo.png"
                alt="Urbanize Logo"
                width={120}
                height={40}
                priority
                className="mx-auto mb-4 md:mb-6"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2 md:mb-4">תודה רבה!</h1>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 px-4">
                תודה שהקדשתם מזמנכם למלא את הסקר. דעתכם חשובה לנו מאוד!
            </p>
            <button
                onClick={onGoToHome}
                className="px-5 py-2 md:px-6 md:py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
                חזרה לדף הבית
            </button>
        </div>
    );
};
