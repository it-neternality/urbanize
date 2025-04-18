"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import Head from "next/head";

// Import components
import { CustomAlert } from "./components/CustomAlert";
import ProfileForm from "./components/ProfileForm";
import { RatingForm } from "./components/RatingForm";
import { CommentsForm } from "./components/CommentsForm";
import { ThankYou } from "./components/ThankYou";

// Import survey configuration and types
import { firebaseConfig, surveySteps } from "./surveyConfig";
import { FormData, RatingStep, SurveyStep } from "./types"; // Import SurveyStep type

// Type guard to check if a step has items
function hasItems(step: SurveyStep): step is RatingStep {
    return (step as RatingStep).items !== undefined;
}

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
        food: (() => {
            const foodStep = surveySteps.find(step => step.category === 'food');
            return foodStep && hasItems(foodStep) ? foodStep.items.reduce((acc, item) => {
                acc[item.key] = 0;
                return acc;
            }, {} as Record<string, number>) : {};
        })(),
        shops: (() => {
            const shopsStep = surveySteps.find(step => step.category === 'shops');
            return shopsStep && hasItems(shopsStep) ? shopsStep.items.reduce((acc, item) => {
                acc[item.key] = 0;
                return acc;
            }, {} as Record<string, number>) : {};
        })(),
        services: (() => {
            const servicesStep = surveySteps.find(step => step.category === 'services');
            return servicesStep && hasItems(servicesStep) ? servicesStep.items.reduce((acc, item) => {
                acc[item.key] = 0;
                return acc;
            }, {} as Record<string, number>) : {};
        })(),
        pleasure: (() => {
            const pleasureStep = surveySteps.find(step => step.category === 'pleasure');
            return pleasureStep && hasItems(pleasureStep) ? pleasureStep.items.reduce((acc, item) => {
                acc[item.key] = 0;
                return acc;
            }, {} as Record<string, number>) : {};
        })(),
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
            setCurrentStep(prev => {
                const newStep = prev + 1;

                // Recalculate success state for the new step
                const currentStepData = surveySteps[newStep];
                if ('ratingType' in currentStepData && currentStepData.ratingType && 'items' in currentStepData && 'maxPoints' in currentStepData) {
                    const sum = calculateRatingSum(currentStepData);
                    setSuccess(sum === currentStepData.maxPoints);
                } else {
                    setSuccess(false);
                }

                return newStep;
            });
            setError("");
            setWarning("");
            window.scrollTo(0, 0);
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => {
                const newStep = prev - 1;

                // Recalculate success state for the new step
                const currentStepData = surveySteps[newStep];
                if ('ratingType' in currentStepData && currentStepData.ratingType && 'items' in currentStepData && 'maxPoints' in currentStepData) {
                    const sum = calculateRatingSum(currentStepData);
                    setSuccess(sum === currentStepData.maxPoints);
                } else {
                    setSuccess(false);
                }

                return newStep;
            });
            setError("");
            setWarning("");
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
            const submissionData: Record<string, Record<string, number | string>> = {};

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

    // Add state for fetched data
    const [showDebugData, setShowDebugData] = useState(false);

    // Function to copy data to clipboard
    const copyDataToClipboard = () => {
        if (showDebugData) {
            navigator.clipboard.writeText(JSON.stringify(showDebugData, null, 2))
                .then(() => {
                    showAlert("הנתונים הועתקו ללוח", "הצלחה");
                })
                .catch(err => {
                    console.error("Failed to copy data: ", err);
                    showAlert("שגיאה בהעתקת הנתונים", "שגיאה");
                });
        }
    };

    // Function to download data as JSON file
    const downloadDataAsJson = () => {
        if (showDebugData) {
            const dataStr = JSON.stringify(showDebugData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'survey-data.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    // Render form based on current step
    const renderForm = () => {
        const step = surveySteps[currentStep];

        if (formSubmitted) {
            return <ThankYou onGoToHome={goToHome} />;
        }

        if (step.category === 'profile' && 'fields' in step) {
            return (
                <div className="space-y-6 md:space-y-8">
                    {step.introText && (
                        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-md text-center mb-6 md:mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full transform -translate-x-10 translate-y-10"></div>
                            <p className="text-base md:text-xl font-medium text-indigo-900 relative z-10">{step.introText}</p>
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
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <title>סקר פארק הפרפרים</title>
            </Head>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-white" dir="rtl">
                {/* Custom Alert Component */}
                <CustomAlert
                    message={alertMessage}
                    title={alertTitle}
                    isOpen={alertOpen}
                    onClose={closeAlert}
                />

                {/* Debug Data Modal */}
                {showDebugData && (
                    <div className="custom-alert-overlay animate-fade-in">
                        <div className="custom-alert-container max-w-4xl w-full animate-slide-up mx-4">
                            <div className="custom-alert-header flex justify-between items-center">
                                <h3 className="text-lg font-medium">נתוני הסקר</h3>
                                <button
                                    onClick={() => setShowDebugData(false)}
                                    className="text-white hover:text-gray-200"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="custom-alert-content overflow-auto max-h-[70vh]">
                                <div className="flex space-x-2 space-x-reverse mb-4">
                                    <button
                                        onClick={copyDataToClipboard}
                                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                                    >
                                        העתק ללוח
                                    </button>
                                    <button
                                        onClick={downloadDataAsJson}
                                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                                    >
                                        הורד כקובץ JSON
                                    </button>
                                </div>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-left text-xs md:text-sm max-h-[50vh] rtl:text-right" dir="ltr">
                                    {JSON.stringify(showDebugData, null, 2)}
                                </pre>
                            </div>
                            <div className="custom-alert-footer">
                                <button
                                    onClick={() => setShowDebugData(false)}
                                    className="custom-alert-button"
                                >
                                    סגור
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header - Simplified with only logo */}
                <header className="p-3 md:p-6 bg-white shadow-md sticky top-0 z-50 mobile-compact-header">
                    <div className="container mx-auto flex justify-center items-center">
                        <Link href="/butterfly-park">
                            <Image
                                src="/butterfly/butterfly-logo.png"
                                alt="לוגו פארק הפרפרים"
                                width={100}
                                height={33}
                                priority
                                className="h-auto"
                            />
                        </Link>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-grow mobile-full-width">
                    <div className="container mx-auto py-4 md:py-10 px-2 md:px-4 max-w-4xl mobile-compact-padding">
                        <div className="mb-4 md:mb-10">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-2xl z-0"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl z-0"></div>
                            <div className="text-center relative z-10">
                                <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-indigo-900 relative inline-block">
                                    סקר פארק הפרפרים
                                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform -rotate-1"></div>
                                </h1>
                                <p className="text-sm md:text-lg text-gray-700 mt-4 md:mt-6 mx-auto max-w-2xl leading-relaxed px-2 md:px-0">
                                    נשמח אם תקדישו שתי דקות מזמנכם למענה על סקר קצר בו תדרגו את החנויות הכי נחוצות לדעתכם במרכז.
                                    <br className="hidden md:block" />בכל קטגוריה יש מכסת נקודות לחלק בין אותן חנויות.
                                </p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-4 md:mb-10">
                            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="absolute top-0 right-0 h-full bg-gradient-to-l from-blue-500 to-purple-500 transition-all duration-500"
                                    style={{ width: `${currentStep === surveySteps.length - 1 ? 100 : totalProgress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600 font-medium px-1">
                                <span>התחלה</span>
                                <span className="bg-indigo-100 px-2 md:px-3 py-1 rounded-full text-indigo-800">{Math.round(currentStep === surveySteps.length - 1 ? 100 : totalProgress)}%</span>
                                <span>סיום</span>
                            </div>
                        </div>

                        {/* Form content */}
                        <div className="mb-4 md:mb-8 mobile-full-width mobile-no-padding">
                            {renderForm()}
                        </div>

                        {/* Navigation buttons */}
                        {!formSubmitted && (
                            <div className="flex justify-between mt-6 md:mt-8 pb-6 md:pb-0">
                                {currentStep > 0 ? (
                                    <button
                                        onClick={handlePrevStep}
                                        className="relative group px-4 py-2 rounded-md font-semibold transition-colors duration-200 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                                    >
                                        הקודם
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {currentStep < surveySteps.length - 1 ? (
                                    <button
                                        onClick={handleNextStep}
                                        disabled={currentStep === 0 ? Object.values(fieldErrors).length > 0 : !success}
                                        className={`relative group px-4 py-2 rounded-md font-semibold transition-colors duration-200
                                            ${currentStep === 0 && Object.values(fieldErrors).length > 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : currentStep !== 0 && !success
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                                            }`}
                                    >
                                        הבא
                                        {currentStep === 0 && Object.values(fieldErrors).length > 0 && (
                                            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                יש למלא את כל השדות המסומנים בכוכבית
                                            </span>
                                        )}
                                        {currentStep !== 0 && !success && (
                                            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                עדיין נותרו נקודות לחלוקה
                                            </span>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        className={`relative group px-4 py-2 rounded-md font-semibold transition-colors duration-200
                                            ${submitting
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                                            }`}
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
                        {currentStep === 0 && (
                            <div className="mt-8 text-center">
                                <Link
                                    href="/butterfly-park/survey/dashboard"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center shadow-md transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                    </svg>
                                    צפייה בנתוני הסקר
                                </Link>
                            </div>
                        )}
                    </div >
                </main >

                {/* Footer */}
                < footer className="bg-blue-900 text-white py-2 md:py-4 text-center text-sm md:text-base" >
                    <p>© כל הזכויות שמורות {new Date().getFullYear()}</p>
                </footer >
            </div >
        </>
    );
}
