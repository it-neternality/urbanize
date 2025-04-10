import Image from "next/image";

export const ThankYou = ({ onGoToHome }: { onGoToHome: () => void }) => {
    return (
        <div className="text-center py-20">
            <Image
                src="/urbanize-logo.png"
                alt="Urbanize Logo"
                width={150}
                height={50}
                priority
                className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-indigo-900 mb-4">תודה רבה!</h1>
            <p className="text-lg text-gray-700 mb-8">
                תודה שהקדשתם מזמנכם למלא את הסקר. דעתכם חשובה לנו מאוד!
            </p>
            <button
                onClick={onGoToHome}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
                חזרה לדף הבית
            </button>
        </div>
    );
};
