import React, { useRef, useEffect, useCallback } from 'react';
import { RatingStep } from '../types';

export interface RatingFormProps {
    step: RatingStep;
    formData: Record<string, number>;
    onRatingChange: (category: string, itemKey: string, rating: number) => void;
    error: string;
    warning: string;
    success: boolean;
}

export const RatingForm: React.FC<RatingFormProps> = ({
    step,
    formData,
    onRatingChange,
    error,
    warning,
    success
}) => {
    // Calculate current sum of ratings
    const ratingSum = step.items.reduce((sum, item) => sum + (formData[item.key] || 0), 0);
    const pointsLeft = step.maxPoints - ratingSum;

    // Refs for all sliders to manage touch events
    const sliderRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const isScrolling = useRef(false);
    const touchStartY = useRef(0);

    // Fix for the ref callback TypeScript error
    const setSliderRef = useCallback((el: HTMLInputElement | null, key: string) => {
        sliderRefs.current[key] = el;
    }, []);

    // Effect to set up touch event listeners for the page
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            isScrolling.current = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = Math.abs(touchY - touchStartY.current);

            // If vertical movement is detected, assume scrolling
            if (deltaY > 10) {
                isScrolling.current = true;

                // Disable all sliders temporarily
                Object.values(sliderRefs.current).forEach(slider => {
                    if (slider) slider.disabled = true;
                });

                // Clear previous timeout
                if (scrollTimeout) clearTimeout(scrollTimeout);

                // Re-enable sliders after scrolling stops
                scrollTimeout = setTimeout(() => {
                    Object.values(sliderRefs.current).forEach(slider => {
                        if (slider) slider.disabled = false;
                    });
                    isScrolling.current = false;
                }, 500);
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, []);

    // RTL slider value transformation
    const transformToRtl = (value: number, max: number = 5) => max - value;
    const transformFromRtl = (value: number, max: number = 5) => max - value;

    const handleSliderChange = (category: string, itemKey: string, displayValue: number) => {
        // Transform the displayed RTL value back to the actual value
        const actualValue = transformFromRtl(displayValue);
        onRatingChange(category, itemKey, actualValue);
    };

    return (
        <div className="has-fixed-footer">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                {/* Right column with fixed title (desktop) */}
                <div className="md:col-span-1 md:sticky md:top-24 mb-4 md:mb-0">
                    <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-6 border-r-4 border-indigo-500">
                        <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-indigo-900">{step.title}</h2>
                        <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-6">{step.description}</p>
                        <div className="py-2 md:py-3 pr-4 pl-4 md:pr-6 md:pl-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg md:rounded-xl shadow-lg text-white w-full">
                            <div className="font-bold flex items-center justify-between">
                                <span className="text-xl md:text-2xl font-extrabold text-indigo-100 text-left flex-1 ml-4 md:ml-8">
                                    {ratingSum}/{step.maxPoints}
                                </span>
                                <span className="text-right flex-1 pl-2 md:pl-4">נקודות</span>
                            </div>
                        </div>

                        {/* Display validation messages */}
                        <div className="hidden md:block">
                            {error && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            {warning && (
                                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-sm">
                                    {warning}
                                </div>
                            )}

                            {success && (
                                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 flex items-center text-sm">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    חלוקת הנקודות הושלמה בהצלחה!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Left column with ratings items */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-6 border-t-4 border-indigo-500">
                        {step.items.map((item, itemIndex) => {
                            // Transform the actual value to RTL display value
                            const displayValue = transformToRtl(formData[item.key] || 0);

                            return (
                                <div key={itemIndex} className="mb-4 md:mb-6">
                                    <div className="flex items-center justify-between mb-1 md:mb-2">
                                        <span className="text-base md:text-lg font-medium text-gray-800">{item.label}</span>
                                        <span className="text-indigo-600 font-bold">{formData[item.key] || 0}</span>
                                    </div>
                                    <div
                                        className={`relative slider-container ${isScrolling.current ? 'scrolling' : ''}`}
                                    >
                                        <input
                                            ref={(el) => setSliderRef(el, item.key)}
                                            type="range"
                                            min="0"
                                            max="5"
                                            step="1"
                                            value={displayValue}
                                            onChange={(e) => handleSliderChange(step.category, item.key, parseInt(e.target.value, 10))}
                                            className={`w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 transition-colors duration-300 rtl-slider ${formData[item.key] === 0 ? 'bg-green-50' :
                                                formData[item.key] === 1 ? 'bg-green-100' :
                                                    formData[item.key] === 2 ? 'bg-green-200' :
                                                        formData[item.key] === 3 ? 'bg-green-300' :
                                                            formData[item.key] === 4 ? 'bg-green-400' :
                                                                'bg-green-500'
                                                }`}
                                            style={{ direction: 'rtl' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Fixed footer on mobile showing current score */}
            <div className="fixed-score-footer">
                <div className="fixed-score-content">
                    <div className="fixed-score-number" style={{ color: pointsLeft > 0 ? 'red' : pointsLeft < 0 ? 'orange' : 'green' }}>
                        {ratingSum}/{step.maxPoints} נקודות
                    </div>
                    {!success && (
                        <div className="fixed-score-message" style={{ color: pointsLeft > 0 ? 'red' : pointsLeft < 0 ? 'orange' : 'green' }}>
                            {pointsLeft > 0
                                ? `נותרו עוד ${pointsLeft} נקודות לחלק`
                                : pointsLeft < 0
                                    ? `חרגת ב-${Math.abs(pointsLeft)} נקודות`
                                    : "כל הנקודות חולקו בהצלחה!"
                            }
                        </div>
                    )}
                    {success && (
                        <div className="fixed-score-message bg-green-500 text-white flex items-center justify-center">
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            הושלם בהצלחה
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
