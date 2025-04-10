import { RatingItem, RatingOption, RatingStep } from "../types";

interface RatingFormProps {
    step: RatingStep;
    formData: Record<string, number>;
    onRatingChange: (category: string, itemKey: string, rating: number) => void;
    error: string;
    warning: string;
    success: boolean;
}

export const RatingForm = ({
    step,
    formData,
    onRatingChange,
    error,
    warning,
    success
}: RatingFormProps) => {
    // Rating options
    const ratingOptions: RatingOption[] = [
        { value: 0, label: 'כלל לא' },
        { value: 1, label: 'מועטה' },
        { value: 2, label: 'בינונית' },
        { value: 3, label: 'רבה' },
        { value: 4, label: 'רבה מאוד' },
        { value: 5, label: 'ממש חובה' }
    ];

    // Calculate current sum of ratings
    const ratingSum = step.items.reduce((sum, item) => sum + (formData[item.key] || 0), 0);

    return (
        <div>
            <div className="mb-8 text-center relative">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-purple-200 rounded-full opacity-30 blur-xl"></div>

                <div className="inline-block py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg mb-2 text-white">
                    <div className="text-2xl font-bold mb-1">
                        {step.title}
                        <span className="mr-4 relative">
                            <span className={error ? "text-red-200 font-mono" : warning ? "text-amber-200 font-mono" : "text-green-200 font-mono"}>
                                {ratingSum}
                            </span>
                            <span className="text-white opacity-80 font-normal">/</span>
                            <span className="text-white opacity-80 font-normal">{step.maxPoints}</span>
                        </span>
                    </div>
                    <p className="text-white opacity-90">{step.description}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-indigo-100 rounded-full opacity-40"></div>

                <div className="space-y-6 relative z-10">
                    {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="transition-all duration-300 hover:bg-indigo-50 rounded-lg p-4">
                            <div className="flex flex-wrap items-center">
                                <div className="w-full md:w-1/3 mb-2 md:mb-0 flex items-center">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-800 mr-3 font-bold">
                                        {itemIndex + 1}
                                    </span>
                                    <span className="text-lg font-medium text-gray-800">{item.label}</span>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <div className="flex flex-wrap gap-2">
                                        {ratingOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => onRatingChange(step.category, item.key, option.value)}
                                                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${(formData[item.key] || 0) === option.value
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
                                                    }`}
                                            >
                                                <span className="relative z-10 font-medium">
                                                    {option.value} - {option.label}
                                                </span>
                                                {(formData[item.key] || 0) === option.value && (
                                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-50 border-r-4 border-red-500 rounded-md shadow-md">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-red-800 font-medium">{error}</span>
                    </div>
                </div>
            )}

            {warning && !error && (
                <div className="mt-6 p-4 bg-amber-50 border-r-4 border-amber-500 rounded-md shadow-md">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-amber-800 font-medium">{warning}</span>
                    </div>
                </div>
            )}

            {success && !error && !warning && (
                <div className="mt-6 p-4 bg-green-50 border-r-4 border-green-500 rounded-md shadow-md">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-800 font-medium">מצוין! כל הנקודות חולקו בצורה תקינה</span>
                    </div>
                </div>
            )}
        </div>
    );
};
