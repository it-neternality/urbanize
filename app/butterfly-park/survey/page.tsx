"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, push, update } from "firebase/database";

// Custom Alert Component
const CustomAlert = ({ message, title, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden animate-[slideUp_0.3s_ease-out]">
                <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <h3 className="text-lg font-bold">{title || "הודעה"}</h3>
                </div>
                <div className="p-6 text-right">
                    <p className="text-gray-800">{message}</p>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                        אישור
                    </button>
                </div>
            </div>
        </div>
    );
};

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqWug5VeDWY972KKkQf5FgTccnqGDIT4o",
    authDomain: "rehovot-poll.firebaseapp.com",
    databaseURL: "https://rehovot-poll.firebaseio.com",
    projectId: "rehovot-poll",
    storageBucket: "rehovot-poll.appspot.com",
    messagingSenderId: "939148001003",
    appId: "1:939148001003:web:3d797a740fc5cb146048ae",
    measurementId: "G-21KV3FNQDK"
};

export default function ButterflyParkSurvey() {
    // State for multi-step form
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
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
    const [fieldErrors, setFieldErrors] = useState({});

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

    // Show custom alert instead of JavaScript alert
    const showAlert = (message, title = "הודעה") => {
        setAlertMessage(message);
        setAlertTitle(title);
        setAlertOpen(true);
    };

    // Close custom alert
    const closeAlert = () => {
        setAlertOpen(false);
    };

    // Survey data for each step
    const surveySteps = [
        // Profile step
        {
            title: "פרטים אישיים",
            description: "ראשית, חשוב לנו להכיר אתכם. ענו על שאלון ההכרות הקצר הבא:",
            category: "profile",
            introText: "לראשונה בישראל, התושבים משתתפים בבחירת השירותים והחנויות במרכז המסחרי!",
            progress: 20,
            fields: [
                {
                    title: "* שם ושם משפחה",
                    inputs: [
                        { key: "fname", type: "text", label: "שם פרטי", required: true },
                        { key: "lname", type: "text", label: "שם משפחה", required: true },
                        {
                            key: "gender",
                            type: "radio",
                            label: "מגדר",
                            required: false,
                            options: ['זכר', 'נקבה']
                        }
                    ]
                },
                {
                    title: "* כתובת מגורים וטלפון",
                    inputs: [
                        {
                            key: "address",
                            type: "select",
                            label: "כתובת",
                            required: true,
                            options: [
                                'חזון איש',
                                'הרב גרז זבולון',
                                'הרב יעקב מזרחי',
                                'דרך ששת הימים',
                                'משולם סרנגה',
                                'אמנון ותמר',
                                'שמשון צור',
                                'דובנוב',
                                'אחר'
                            ]
                        },
                        { key: "address_number", type: "number", label: "מספר בית", required: true },
                        { key: "phone", type: "number", label: "טלפון", required: true },
                        {
                            key: "phone_prefix",
                            type: "select",
                            label: "קידומת",
                            required: true,
                            options: ['050', '051', '052', '053', '054', '055', '058']
                        }
                    ]
                },
                {
                    title: "הרכב התא המשפחתי",
                    inputs: [
                        {
                            key: "sibiling",
                            type: "select",
                            label: "סטטוס",
                            required: false,
                            options: [
                                'רווק/רווקה',
                                'נשוי/אה ללא ילדים',
                                'הורים לילד/ים בגיל הרך',
                                'הורים לילדים צעירים עד כיתה ו',
                                'הורים לילדים בוגרים',
                                'גרוש/גרושה או אלמן/אלמנה'
                            ]
                        },
                        {
                            key: "kupat_cholim",
                            type: "select",
                            label: "* קופת חולים",
                            required: true,
                            options: [
                                'שירותי בריאות כללית',
                                'מכבי שירותי בריאות',
                                'קופת חולים מאוחדת',
                                'לאומית שירותי בריאות',
                                'חיל הרפואה'
                            ]
                        }
                    ]
                }
            ]
        },
        // Food and restaurants 
        {
            title: "מזון והסעדה",
            description: "נא לדרג עד כמה נחוץ לדעתך",
            category: "food",
            progress: 20,
            ratingType: true,
            items: [
                { key: "supermarket", label: "סופרמרקט", rating: 0 },
                { key: "coffeeshop", label: "בית קפה", rating: 0 },
                { key: "pizza", label: "פיצריה", rating: 0 },
                { key: "icecream", label: "גלידריה", rating: 0 },
                { key: "fastfood", label: "מזון מהיר אחר", rating: 0 },
                { key: "bakery", label: "מאפיה/קונדיטוריה", rating: 0 },
                { key: "deli", label: "מעדנייה וסלטים", rating: 0 },
                { key: "spices", label: "פיצוחים ותבלינים", rating: 0 }
            ],
            maxPoints: 28 // 8 items * 3.5 points average
        },
        // Shops
        {
            title: "חנויות",
            description: "נא לדרג עד כמה נחוץ לדעתך",
            category: "shops",
            progress: 20,
            ratingType: true,
            items: [
                { key: "kiosk", label: "קיוסק", rating: 0 },
                { key: "cellular", label: "סלולר ומחשבים", rating: 0 },
                { key: "homedepot", label: "כלי עבודה/טמבור", rating: 0 },
                { key: "optics", label: "אופטיקה", rating: 0 },
                { key: "kidsfashion", label: "חנות בגדי ילדים", rating: 0 },
                { key: "officedepot", label: "ספרים וכלי כתיבה", rating: 0 },
                { key: "toys", label: "צעצועים ומתנות", rating: 0 }
            ],
            maxPoints: 25 // 7 items * 3.5 points average
        },
        // Services
        {
            title: "שירותים",
            description: "מעולה! זוהי הקטגוריה הלפני אחרונה",
            category: "services",
            progress: 20,
            ratingType: true,
            items: [
                { key: "hmo", label: "קופת חולים", rating: 0 },
                { key: "clinic", label: "מרפאת רופאים", rating: 0 },
                { key: "pharm", label: "בית מרקחת/פארם", rating: 0 },
                { key: "vet", label: "וטרינר", rating: 0 },
                { key: "atm", label: "כספומט", rating: 0 },
                { key: "laundry", label: "מכבסה וניקוי יבש", rating: 0 },
                { key: "barber", label: "מספרה", rating: 0 },
                { key: "cosmetics", label: "מכון יופי/קוסמטיקה", rating: 0 },
                { key: "kindergarden", label: "מעון ילדים/פעוטון", rating: 0 }
            ],
            maxPoints: 32 // 9 items * 3.5 points average
        },
        // Entertainment
        {
            title: "בילוי ופנאי",
            description: "כל הכבוד! זוהי הקטגוריה האחרונה לדרג",
            category: "pleasure",
            progress: 20,
            ratingType: true,
            items: [
                { key: "studio", label: "סטודיו לריקוד", rating: 0 },
                { key: "judo", label: "ג'ודו/קפוארה/ספורט", rating: 0 },
                { key: "technology", label: "מרכז לימוד מחשבים", rating: 0 },
                { key: "gym", label: "חדר כושר/פילאטיס", rating: 0 },
                { key: "jimboree", label: "משחקיה / ג'ימבורי", rating: 0 },
                { key: "kidsactivities", label: "פעילות ילדים אחרת", rating: 0 }
            ],
            maxPoints: 21 // 6 items * 3.5 points average
        },
        // Comments
        {
            title: "רעיונות נוספים",
            description: "תודה רבה! סייעתם רבות לתכנון המרכז לפי רצונכם. אנא לחצו \"שלח\" לסיום",
            category: "other",
            progress: 0,
            commentType: true
        }
    ];

    // Rating options
    const ratingOptions = [
        { value: 0, label: 'כלל לא' },
        { value: 1, label: 'מועטה' },
        { value: 2, label: 'בינונית' },
        { value: 3, label: 'רבה' },
        { value: 4, label: 'רבה מאוד' },
        { value: 5, label: 'ממש חובה' }
    ];

    // Firebase app state
    const [firebaseApp, setFirebaseApp] = useState(null);
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

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
    const handleProfileInputChange = (field, key, value) => {
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
    const handleOtherAddress = (value) => {
        setFormData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                other_address: value
            }
        }));
    };

    // Handle rating changes
    const handleRatingChange = (category, itemKey, rating) => {
        // Update the form data with the new rating
        setFormData(prevData => {
            const updatedCategory = {
                ...prevData[category],
                [itemKey]: rating
            };

            return {
                ...prevData,
                [category]: updatedCategory
            };
        });

        // Update the surveySteps state to reflect the changes in the UI
        const stepIndex = surveySteps.findIndex(step => step.category === category);
        if (stepIndex !== -1) {
            const updatedItems = surveySteps[stepIndex].items.map(item => {
                if (item.key === itemKey) {
                    return { ...item, rating };
                }
                return item;
            });

            const updatedStep = {
                ...surveySteps[stepIndex],
                items: updatedItems
            };

            const updatedSteps = [...surveySteps];
            updatedSteps[stepIndex] = updatedStep;

            // Calculate the sum of ratings
            const ratingSum = updatedItems.reduce((sum, item) => sum + (item.rating || 0), 0);

            // Check if the sum exceeds the limit
            if (ratingSum > updatedStep.maxPoints) {
                setError(`חרגת בנקודות, בשביל להמשיך נא חלק מקסימום (${updatedStep.maxPoints}) נקודות`);
                setWarning("");
                setSuccess(false);
            } else if (ratingSum < updatedStep.maxPoints) {
                setError("");
                if (updatedStep.maxPoints - ratingSum === 1) {
                    setWarning("נותרה עוד נקודה אחת לחלק בין העסקים בקטגוריה");
                } else {
                    setWarning(`לרשותך עוד ${updatedStep.maxPoints - ratingSum} נקודות לחלק בין העסקים בקטגוריה`);
                }
                setSuccess(false);
            } else {
                setError("");
                setWarning("");
                setSuccess(true);
            }
        }
    };

    // Handle comments change
    const handleCommentsChange = (value) => {
        setFormData(prevData => ({
            ...prevData,
            other: {
                ...prevData.other,
                comments: value
            }
        }));
    };

    // Calculate current sum of ratings for a step
    const calculateRatingSum = (step) => {
        const category = step.category;
        let sum = 0;

        step.items?.forEach(item => {
            const rating = formData[category][item.key] || 0;
            sum += rating;
        });

        return sum;
    };

    // Validate current step
    const validateStep = () => {
        const currentStepData = surveySteps[currentStep];

        // Validate profile step
        if (currentStep === 0) {
            let isValid = true;
            let errorMessage = "";
            const errors = {};

            currentStepData.fields.forEach(field => {
                field.inputs.forEach(input => {
                    if (input.required && !formData.profile[input.key]) {
                        isValid = false;
                        errorMessage += `שדה ${input.label} ריק!\n`;
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
        if (currentStepData.ratingType) {
            const sum = calculateRatingSum(currentStepData);
            return sum === currentStepData.maxPoints;
        }

        return true;
    };

    // Helper function to validate phone number
    const validatePhoneNumber = (prefix, number) => {
        if (!prefix || !number) {
            return { isValid: false, message: "יש להזין מספר טלפון וקידומת" };
        }

        // Remove any non-digit characters
        const digits = number.replace(/\D/g, '');

        // Israeli mobile numbers should be 7 digits after the prefix
        if (digits.length !== 7) {
            return {
                isValid: false,
                message: `מספר הטלפון צריך להכיל 7 ספרות (הזנת ${digits.length} ספרות)`
            };
        }

        return { isValid: true, message: "" };
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
        if (!firebaseInitialized) {
            showAlert("מערכת הטפסים אינה זמינה כרגע, אנא נסו שוב מאוחר יותר", "שגיאה");
            return;
        }

        setSubmitting(true);

        try {
            const db = getDatabase(firebaseApp);
            const newPostRef = ref(db);

            // Prepare data for submission
            const submissionData = {};

            // Process profile data
            submissionData.profile = { ...formData.profile };

            // Process rating data for each category
            ['food', 'shops', 'services', 'pleasure'].forEach(category => {
                submissionData[category] = {};
                const stepData = surveySteps.find(step => step.category === category);

                stepData.items.forEach(item => {
                    const rating = formData[category][item.key] || 0;
                    if (rating > 0) {
                        submissionData[category][item.key] = rating;
                    }
                });
            });

            // Add comments
            submissionData.other = {
                comments: formData.other.comments || ""
            };

            // Push data to Firebase
            const newKey = push(newPostRef, submissionData).key;
            setPollKey(newKey);

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
                        onClick={goToHome}
                        className="mx-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        חזרה לאתר הבית
                    </button>
                </div>
            );
        }

        if (step.category === 'profile') {
            return (
                <div className="space-y-8">
                    {step.introText && (
                        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full transform -translate-x-10 translate-y-10"></div>
                            <p className="text-xl font-medium text-indigo-900 relative z-10">{step.introText}</p>
                        </div>
                    )}

                    {step.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-500 transition-all duration-300 hover:shadow-xl">
                            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 text-indigo-800 flex items-center">
                                {fieldIndex === 0 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                                {fieldIndex === 1 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                )}
                                {fieldIndex === 2 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                )}
                                {fieldIndex === 3 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )}
                                {field.title}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {field.inputs.map((input, inputIndex) => (
                                    <div key={inputIndex} className={input.key === 'address_number' ? 'md:col-span-1' : ''}>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            {input.label} {input.required && <span className="text-red-500">*</span>}
                                        </label>

                                        {input.type === 'text' && (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={formData.profile[input.key] || ''}
                                                    onChange={(e) => handleProfileInputChange(field.title, input.key, e.target.value)}
                                                    className={`w-full px-4 py-3 bg-white border-2 ${fieldErrors[input.key] ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm text-lg font-medium text-indigo-900`}
                                                    required={input.required}
                                                />
                                                {fieldErrors[input.key] && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        {fieldErrors[input.key]}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {input.type === 'number' && (
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={formData.profile[input.key] || ''}
                                                    onChange={(e) => handleProfileInputChange(field.title, input.key, e.target.value)}
                                                    className={`w-full px-4 py-3 bg-white border-2 ${fieldErrors[input.key] ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm text-lg font-medium text-indigo-900`}
                                                    required={input.required}
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                    </svg>
                                                </div>
                                                {fieldErrors[input.key] && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        {fieldErrors[input.key]}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {input.type === 'select' && (
                                            <div>
                                                <select
                                                    value={formData.profile[input.key] || ''}
                                                    onChange={(e) => handleProfileInputChange(field.title, input.key, e.target.value)}
                                                    className={`w-full px-4 py-3 bg-white border ${fieldErrors[input.key] ? 'border-red-500' : 'border-indigo-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none shadow-sm text-gray-800`}
                                                    required={input.required}
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366F1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'left 1rem center',
                                                        backgroundSize: '1.5em 1.5em',
                                                        paddingRight: '3rem'
                                                    }}
                                                >
                                                    <option value="">{input.label}</option>
                                                    {input.options.map((option, optionIndex) => (
                                                        <option key={optionIndex} value={option}>{option}</option>
                                                    ))}
                                                </select>

                                                {input.key === 'address' && formData.profile[input.key] === 'אחר' && (
                                                    <input
                                                        type="text"
                                                        value={formData.profile.other_address || ''}
                                                        onChange={(e) => handleOtherAddress(e.target.value)}
                                                        placeholder="נא להזין כתובת"
                                                        className="w-full mt-3 px-4 py-3 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {/* Unified Phone Input */}
                                        {input.key === 'phone' && (
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {input.label} {input.required && <span className="text-red-500">*</span>}
                                                </label>
                                                <div className={`relative bg-white rounded-lg shadow-md overflow-hidden border-2 ${fieldErrors['phone'] || fieldErrors['phone_prefix'] ? 'border-red-500' : 'border-indigo-300 hover:border-indigo-500'} transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500`}>
                                                    <div className="flex items-stretch">
                                                        <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 px-3 text-white font-medium">
                                                            <select
                                                                value={formData.profile.phone_prefix || ''}
                                                                onChange={(e) => handleProfileInputChange(input.label, 'phone_prefix', e.target.value)}
                                                                className="bg-transparent appearance-none focus:outline-none text-white font-medium w-16"
                                                                style={{
                                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                                    backgroundRepeat: 'no-repeat',
                                                                    backgroundPosition: 'left 0.1rem center',
                                                                    backgroundSize: '0.8em 0.8em',
                                                                    paddingRight: '1rem'
                                                                }}
                                                                required={input.required}
                                                            >
                                                                <option value="" disabled>קוד</option>
                                                                {['050', '051', '052', '053', '054', '055', '058'].map((prefix) => (
                                                                    <option key={prefix} value={prefix}>{prefix}</option>
                                                                ))}
                                                            </select>
                                                            <span className="mx-1 text-white font-bold">-</span>
                                                        </div>
                                                        <input
                                                            type="tel"
                                                            inputMode="numeric"
                                                            pattern="[0-9]*"
                                                            maxLength="7"
                                                            value={formData.profile.phone || ''}
                                                            onChange={(e) => handleProfileInputChange(input.label, 'phone', e.target.value)}
                                                            className="flex-1 py-3 px-4 text-lg font-medium text-indigo-900 bg-white border-none outline-none"
                                                            placeholder="מספר טלפון"
                                                            required={input.required}
                                                        />
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(fieldErrors['phone'] || fieldErrors['phone_prefix']) && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        נא להזין את מספר הטלפון המלא
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Enhanced Gender Selection - Smaller Version */}
                                        {input.key === 'gender' && (
                                            <div>
                                                <div className="flex rounded-lg overflow-hidden shadow-sm" style={{ width: "140px" }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleProfileInputChange(field.title, input.key, 'זכר')}
                                                        className={`flex-1 py-2 px-2 text-center cursor-pointer transition-all duration-300 text-sm ${formData.profile[input.key] === 'זכר'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                                            }`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-auto mb-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="7" r="4"></circle>
                                                            <path d="M12 11v8"></path>
                                                            <path d="M9 18h6"></path>
                                                        </svg>
                                                        זכר
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleProfileInputChange(field.title, input.key, 'נקבה')}
                                                        className={`flex-1 py-2 px-2 text-center cursor-pointer transition-all duration-300 text-sm ${formData.profile[input.key] === 'נקבה'
                                                            ? 'bg-pink-600 text-white'
                                                            : 'bg-pink-500 text-white hover:bg-pink-600'
                                                            }`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-auto mb-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="8" r="4"></circle>
                                                            <path d="M12 20v-8"></path>
                                                            <path d="M8 14l8 0"></path>
                                                        </svg>
                                                        נקבה
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (step.ratingType) {
            const ratingSum = calculateRatingSum(step);

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
                                                        onClick={() => handleRatingChange(step.category, item.key, option.value)}
                                                        className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${(formData[step.category][item.key] || 0) === option.value
                                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
                                                            }`}
                                                    >
                                                        <span className="relative z-10 font-medium">
                                                            {option.value} - {option.label}
                                                        </span>
                                                        {(formData[step.category][item.key] || 0) === option.value && (
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
        }

        if (step.commentType) {
            return (
                <div>
                    <div className="mb-8 text-center relative">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-green-200 rounded-full opacity-30 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-xl"></div>

                        <div className="inline-block py-3 px-6 bg-gradient-to-r from-indigo-600 to-green-600 rounded-xl shadow-lg mb-2">
                            <h2 className="text-2xl font-bold mb-1 text-white">{step.title}</h2>
                            <p className="text-white opacity-90">{step.description}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-green-500 to-blue-500"></div>
                        <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-green-100 rounded-full opacity-40"></div>

                        <textarea
                            value={formData.other.comments || ''}
                            onChange={(e) => handleCommentsChange(e.target.value)}
                            rows={8}
                            placeholder="נשמח לקבל הצעות או רעיונות נוספים (תוכלו גם להציע שם למרכז)"
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none shadow-inner text-lg relative z-10"
                            style={{ direction: "rtl" }}
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white" dir="rtl">
            {/* Header */}
            <header className="p-4 md:p-6 bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
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
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/butterfly-park" className="font-medium text-blue-700 hover:text-blue-900 transition transform hover:scale-105">פארק הפרפרים</Link>
                        <Link href="/bsr-rishonim" className="font-medium text-gray-700 hover:text-gray-900 transition transform hover:scale-105">BSR ראשונים</Link>
                        <Link href="/" className="font-medium text-gray-700 hover:text-gray-900 transition transform hover:scale-105">בית</Link>
                    </nav>
                    <button className="md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
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
