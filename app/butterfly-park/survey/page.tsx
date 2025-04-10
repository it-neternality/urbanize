"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";

// Import components
import { CustomAlert } from "./components/CustomAlert";
import ProfileForm from "./components/ProfileForm";
import { RatingForm } from "./components/RatingForm";
import { CommentsForm } from "./components/CommentsForm";
import { ThankYou } from "./components/ThankYou";

// Import survey configuration and types
import { firebaseConfig, surveySteps } from "./surveyConfig";
import { FormData, SurveyStep, ProfileStep, RatingStep, CommentStep } from "./types";

export default function ButterflyParkSurvey() {
    // State for multi-step form
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        profile: {
            fname: "",
            lname: "",
            address: "",
            address_number: "",
            phone: "",
            phone_prefix: "",
            gender: "",
            sibiling: "",
            kupat_cholim: "",
            other_address: ""
        },
        food: {},
        shops: {},
        services: {},
        pleasure: {},
        other: {
            comments: ""
        }
    });

    // State to track field-specific validation errors
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Progress tracking
    const [totalProgress, setTotalProgress] = useState(0);

    // Form submission state
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form validation states
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");
    const [success, setSuccess] = useState(false);

    // Custom alert state
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    // Firebase app state
    const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    // Show custom alert instead of JavaScript alert
    const showAlert = (message: string, title = "הודעה") => {
        setAlertMessage(message);
        setAlertTitle(title);
        setAlertOpen(true);
    };

    // Close custom alert
    const closeAlert = () => {
        setAlertOpen(false);
    };

    // Initialize Firebase
    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            setFirebaseApp(app);

            // Initialize Firebase Analytics only in browser environment
            if (typeof window !== 'undefined') {
                getAnalytics(app);
            }

            // Sign in anonymously
            const auth = getAuth(app);
            signInAnonymously(auth)
                .then(() => {
                    setFirebaseInitialized(true);
                    console.log("Firebase initialized successfully");
                })
                .catch((error) => {
                    console.error("Firebase auth error:", error);
                });
        } catch (error) {
            console.error("Firebase initialization error:", error);
        }
    }, []);

    // Update total progress
    useEffect(() => {
        const completedSteps = currentStep;
        const totalSteps = surveySteps.length;
        const progress = Math.round((completedSteps / totalSteps) * 100);
        setTotalProgress(progress);
    }, [currentStep]);

    // Handle profile input change
    const handleProfileInputChange = (field: string, key: string, value: string) => {
        // Clear error for this field when user types in it
        if (fieldErrors[key]) {
            setFieldErrors(prev => {
                const updated = { ...prev };
                delete updated[key];
                return updated;
            });
        }

        setFormData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                [key]: value
            }
        }));
    };

    // Handle other address input when 'אחר' is selected
    const handleOtherAddress = (value: string) => {
        setFormData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                other_address: value
            }
        }));
    };

    // Handle rating changes
    const handleRatingChange = (category: string, itemKey: string, rating: number) => {
        // Update the form data with the new rating
        setFormData(prevData => {
            const updatedCategory = {
                ...prevData[category as keyof FormData] as Record<string, number>,
                [itemKey]: rating
            };

            return {
                ...prevData,
                [category]: updatedCategory
            };
        });

        // Find the current rating step
        const stepIndex = surveySteps.findIndex(step => step.category === category);
        if (stepIndex !== -1) {
            const currentStep = surveySteps[stepIndex];

            if ('items' in currentStep && 'maxPoints' in currentStep) {
                // Calculate the sum of ratings for this category
                const ratings = { ...formData[category as keyof FormData] as Record<string, number>, [itemKey]: rating };
                const ratingSum = currentStep.items.reduce((sum, item) => sum + (ratings[item.key] || 0), 0);

                // Check if the sum exceeds the limit
                if (ratingSum > currentStep.maxPoints) {
                    setError(`חרגת בנקודות, בשביל להמשיך נא חלק מקסימום (${currentStep.maxPoints}) נקודות`);
                    setWarning("");
                    setSuccess(false);
                } else if (ratingSum < currentStep.maxPoints) {
                    setError("");
                    if (currentStep.maxPoints - ratingSum === 1) {
                        setWarning("נותרה עוד נקודה אחת לחלק בין העסקים בקטגוריה");
                    } else {
                        setWarning(`לרשותך עוד ${currentStep.maxPoints - ratingSum} נקודות לחלק בין העסקים בקטגוריה`);
                    }
                    setSuccess(false);
                } else {
                    setError("");
                    setWarning("");
                    setSuccess(true);
                }
            }
        }
    };

    // Handle comments change
    const handleCommentsChange = (value: string) => {
        setFormData(prevData => ({
            ...prevData,
            other: {
                ...prevData.other,
                comments: value
            }
        }));
    };

    // Calculate current sum of ratings for a step
    const calculateRatingSum = (step: RatingStep) => {
        const category = step.category;
        let sum = 0;

        step.items.forEach(item => {
            const rating = (formData[category as keyof FormData] as Record<string, number>)[item.key] || 0;
            sum += rating;
        });

        return sum;
    };

    // Validate current step
    const validateStep = () => {
        const currentStepData = surveySteps[currentStep];

        // Validate profile step
        if (currentStepData.category === 'profile' && 'fields' in currentStepData) {
            let isValid = true;
            const errors: Record<string, string> = {};

            currentStepData.fields.forEach(field => {
                field.inputs.forEach(input => {
                    if (input.required && !formData.profile[input.key as keyof typeof formData.profile]) {
                        isValid = false;
                        errors[input.key] = `שדה ${input.label} ריק!`;
                    }
                });
            });

            setFieldErrors(errors);

            if (!isValid) {
                // Show a general alert message if there are any errors
                showAlert("יש למלא את כל השדות המסומנים בכוכבית (*)", "שגיאה");
                return false;
            }

            return true;
        }

        // Validate rating steps
        if ('ratingType' in currentStepData && currentStepData.ratingType && 'items' in currentStepData && 'maxPoints' in currentStepData) {
            const sum = calculateRatingSum(currentStepData);
            return sum === currentStepData.maxPoints;
        }

        return true;
    };

    // Handle next step
    const handleNextStep = () => {
        if (validateStep()) {
            if (currentStep < surveySteps.length - 1) {
                setCurrentStep(prev => prev + 1);
                setError("");
                setWarning("");
                setSuccess(false);
                window.scrollTo(0, 0);
            }
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setError("");
            setWarning("");
            setSuccess(false);
            window.scrollTo(0, 0);
        }
    };

    // Handle submit form to Firebase
    const handleSubmit = async () => {
        if (!firebaseInitialized || !firebaseApp) {
            showAlert("מערכת הטפסים אינה זמינה כרגע, אנא נסו שוב מאוחר יותר", "שגיאה");
            return;
        }

        setSubmitting(true);

        try {
            const db = getDatabase(firebaseApp);
            const newPostRef = ref(db);

            // Prepare data for submission
            const submissionData: Record<string, any> = {};

            // Process profile data
            submissionData.profile = { ...formData.profile };

            // Process rating data for each category
            ['food', 'shops', 'services', 'pleasure'].forEach(category => {
                submissionData[category] = {};
                const stepData = surveySteps.find(step => step.category === category);

                if (stepData && 'items' in stepData) {
                    const ratings = formData[category as keyof FormData] as Record<string, number>;

                    stepData.items.forEach(item => {
                        const rating = ratings[item.key] || 0;
                        if (rating > 0) {
                            submissionData[category][item.key] = rating;
                        }
                    });
                }
            });

            // Add comments
            submissionData.other = {
                comments: formData.other.comments || ""
            };

            // Push data to Firebase
            push(newPostRef, submissionData);

            // Success
            setFormSubmitted(true);
            setSubmitting(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            showAlert("אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר.", "שגיאה");
            setSubmitting(false);
        }
    };

    const goToHome = () => {
        window.location.href = "https://www.urbanize.co.il";
    };

    // Render form based on current step
    const renderForm = () => {
        const step = surveySteps[currentStep];

        if (formSubmitted) {
            return <ThankYou onGoToHome={goToHome} />;
        }

        if (step.category === 'profile' && 'fields' in step) {
            return (
                <div className="space-y-8">
                    {step.introText && (
                        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full transform -translate-x-10 translate-y-10"></div>
                            <p className="text-xl font-medium text-indigo-900 relative z-10">{step.introText}</p>
                        </div>
                    )}

                    <ProfileForm
                        fields={step.fields}
                        profileData={formData.profile}
                        fieldErrors={fieldErrors}
                        onInputChange={handleProfileInputChange}
                        onOtherAddressChange={handleOtherAddress}
                    />
                </div>
            );
        }

        if ('ratingType' in step && step.ratingType) {
            const categoryData = formData[step.category as keyof FormData] as Record<string, number>;

            return (
                <RatingForm
                    step={step}
                    formData={categoryData}
                    onRatingChange={handleRatingChange}
                    error={error}
                    warning={warning}
                    success={success}
                />
            );
        }

        if (step.category === 'other' && 'commentType' in step && step.commentType) {
            return (
                <CommentsForm
                    step={step}
                    comments={formData.other.comments}
                    onCommentsChange={handleCommentsChange}
                />
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white" dir="rtl">
            {/* Custom Alert Component */}
            <CustomAlert
                message={alertMessage}
                title={alertTitle}
                isOpen={alertOpen}
                onClose={closeAlert}
            />

            {/* Header - Simplified with only logo */}
            <header className="p-4 md:p-6 bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-center items-center">
                    <Link href="/">
                        <Image
                            src="/urbanize-logo.png"
                            alt="Urbanize לוגו"
                            width={150}
                            height={50}
                            priority
                            className="h-auto"
                        />
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow">
                <div className="container mx-auto py-10 px-4 max-w-4xl">
                    <div className="mb-10 relative">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-2xl z-0"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl z-0"></div>
                        <div className="text-center relative z-10">
                            <h1 className="text-4xl font-bold mb-3 text-indigo-900 relative inline-block">
                                סקר פארק הפרפרים
                                <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform -rotate-1"></div>
                            </h1>
                            <p className="text-lg text-gray-700 mt-6 mx-auto max-w-2xl leading-relaxed">
                                נשמח אם תקדישו שתי דקות מזמנכם למענה על סקר קצר בו תדרגו את החנויות הכי נחוצות לדעתכם במרכז.
                                <br />בכל קטגוריה יש מכסת נקודות לחלק בין אותן חנויות.
                            </p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-10">
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                style={{ width: `${totalProgress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-600 font-medium px-1">
                            <span>התחלה</span>
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-800">{Math.round(totalProgress)}%</span>
                            <span>סיום</span>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="mb-8">
                        {renderForm()}
                    </div>

                    {/* Navigation buttons */}
                    {!formSubmitted && (
                        <div className="flex justify-between mt-8">
                            {currentStep > 0 ? (
                                <button
                                    onClick={handlePrevStep}
                                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    הקודם
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {currentStep < surveySteps.length - 1 ? (
                                <button
                                    onClick={handleNextStep}
                                    disabled={currentStep === 0 ? false : error !== ""}
                                    className={`px-6 py-2 rounded-md ${error
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        } transition-colors`}
                                >
                                    הבא
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                    {submitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            שולח...
                                        </span>
                                    ) : (
                                        'שלח'
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-8 px-4 mt-auto">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <Image
                                src="/urbanize-logo.png"
                                alt="Urbanize לוגו"
                                width={120}
                                height={40}
                                className="h-auto invert"
                            />
                            <p className="mt-4 text-blue-200">
                                חברת נדל״ן מובילה המתמחה בפרויקטים חדשניים וטכנולוגיים.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">פרויקטים</h3>
                            <ul className="space-y-2">
                                <li><Link href="/butterfly-park" className="text-blue-200 hover:text-white transition">פארק הפרפרים</Link></li>
                                <li><Link href="/bsr-rishonim" className="text-blue-200 hover:text-white transition">BSR ראשונים</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">קישורים מהירים</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-blue-200 hover:text-white transition">בית</Link></li>
                                <li><Link href="/" className="text-blue-200 hover:text-white transition">אודות</Link></li>
                                <li><Link href="/" className="text-blue-200 hover:text-white transition">יצירת קשר</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">צור קשר</h3>
                            <p className="text-blue-200 mb-2">רחוב הטכנולוגיה 10, תל אביב</p>
                            <p className="text-blue-200 mb-2">טלפון: 03-1234567</p>
                            <p className="text-blue-200">דוא״ל: info@urbanize.co.il</p>
                        </div>
                    </div>
                    <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
                        <p>© כל הזכויות שמורות לאורבנייז {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
