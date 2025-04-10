import { RatingStep } from "../types";

interface RatingFormProps {
    step: RatingStep;
    formData: Record<string, number>;
    onRatingChange: (category: string, itemKey: string, rating: number) => void;
}

export const RatingForm = ({
    step,
    formData,
    onRatingChange
}: RatingFormProps) => {
    // Calculate current sum of ratings
    const ratingSum = step.items.reduce((sum, item) => sum + (formData[item.key] || 0), 0);

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Right column with fixed title (desktop) */}
            <div className="md:col-span-1 md:sticky md:top-24">
                <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-indigo-500">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-900">{step.title}</h2>
                    <p className="text-gray-700 mb-6">{step.description}</p>
                    <div className="inline-block py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg text-white">
                        <div className="text-xl font-bold flex items-center justify-between">
                            <span className="ml-8 text-2xl font-extrabold text-indigo-100 text-left flex-1">
                                {ratingSum}/{step.maxPoints}
                            </span>
                            <span className="text-right flex-1 pl-4">נקודות</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left column with ratings items */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500">
                    {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-medium text-gray-800">{item.label}</span>
                                <span className="text-indigo-600 font-bold">{formData[item.key] || 0}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="1"
                                value={formData[item.key] || 0}
                                onChange={(e) => onRatingChange(step.category, item.key, parseInt(e.target.value, 10))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 transition-colors duration-300 ${formData[item.key] === 0 ? 'bg-green-50' : // Light green for 0
                                        formData[item.key] === 1 ? 'bg-green-100' : // Slightly darker green for 1
                                            formData[item.key] === 2 ? 'bg-green-200' : // Medium green for 2
                                                formData[item.key] === 3 ? 'bg-green-300' : // Darker green for 3
                                                    formData[item.key] === 4 ? 'bg-green-400' : // Even darker green for 4
                                                        'bg-green-500' // Dark green for 5
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
