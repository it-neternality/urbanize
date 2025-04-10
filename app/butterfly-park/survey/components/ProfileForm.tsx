import { FieldGroup, InputField, ProfileData } from "../types";

interface ProfileFormProps {
    fields: FieldGroup[];
    profileData: ProfileData;
    fieldErrors: Record<string, string>;
    onInputChange: (field: string, key: string, value: string) => void;
    onOtherAddressChange: (value: string) => void;
}

const ProfileForm = ({
    fields,
    profileData,
    fieldErrors,
    onInputChange,
    onOtherAddressChange
}: ProfileFormProps) => {
    return (
        <div className="space-y-4 md:space-y-8 mobile-full-width">
            {fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="survey-card">
                    <h3 className="survey-card-title text-lg md:text-xl mb-4 md:mb-6">
                        {fieldIndex === 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )}
                        {fieldIndex === 1 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        )}
                        {fieldIndex === 2 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}
                        {field.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                        {field.inputs.map((input, inputIndex) => (
                            <div key={inputIndex} className={input.key === 'address_number' ? 'md:col-span-1' : ''}>
                                {renderInput(field, input, profileData, fieldErrors, onInputChange, onOtherAddressChange)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper function to render the appropriate input type
const renderInput = (
    field: FieldGroup,
    input: InputField,
    profileData: ProfileData,
    fieldErrors: Record<string, string>,
    onInputChange: (field: string, key: string, value: string) => void,
    onOtherAddressChange: (value: string) => void
) => {
    // Check if this is a phone field that should be handled differently
    if (input.key === 'phone') {
        return renderPhoneInput(input, profileData, fieldErrors, onInputChange);
    }

    // Gender selection buttons
    if (input.key === 'gender') {
        return renderGenderInput(field, input, profileData, fieldErrors, onInputChange);
    }

    // Text input
    if (input.type === 'text') {
        return (
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                    {input.label} {input.required && <span className="text-red-500">*</span>}
                </label>
                <input
                    type="text"
                    value={profileData[input.key as keyof ProfileData] || ''}
                    onChange={(e) => onInputChange(field.title, input.key, e.target.value)}
                    className={`w-full px-4 py-3 bg-white border-2 ${fieldErrors[input.key] ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm text-lg font-medium text-indigo-900 text-right`}
                    required={input.required}
                    dir="rtl"
                    placeholder={input.label}
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
        );
    }

    // Number input
    if (input.type === 'number') {
        return (
            <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                    {input.label} {input.required && <span className="text-red-500">*</span>}
                </label>
                <input
                    type="number"
                    value={profileData[input.key as keyof ProfileData] || ''}
                    onChange={(e) => onInputChange(field.title, input.key, e.target.value)}
                    className={`w-full px-4 py-3 bg-white border-2 ${fieldErrors[input.key] ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm text-lg font-medium text-indigo-900 text-right`}
                    required={input.required}
                    dir="rtl"
                    placeholder={input.label}
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
        );
    }

    // Select input
    if (input.type === 'select' && input.options) {
        return (
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                    {input.label} {input.required && <span className="text-red-500">*</span>}
                </label>
                <select
                    value={profileData[input.key as keyof ProfileData] || ''}
                    onChange={(e) => onInputChange(field.title, input.key, e.target.value)}
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

                {input.key === 'address' && profileData.address === 'אחר' && (
                    <input
                        type="text"
                        value={profileData.other_address || ''}
                        onChange={(e) => onOtherAddressChange(e.target.value)}
                        placeholder="נא להזין כתובת"
                        className="w-full mt-3 px-4 py-3 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                    />
                )}
            </div>
        );
    }

    return null;
};

// Render gender selection buttons with improved visuals
const renderGenderInput = (
    field: FieldGroup,
    input: InputField,
    profileData: ProfileData,
    fieldErrors: Record<string, string>,
    onInputChange: (field: string, key: string, value: string) => void
) => {
    const nothingSelected = !profileData.gender;
    const showError = nothingSelected && input.required && fieldErrors[input.key];

    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
                {input.label} {input.required && <span className="text-red-500">*</span>}
            </label>
            <div className={`flex rounded-lg overflow-hidden border-2 ${showError ? 'border-red-300' : nothingSelected ? 'border-gray-300' : 'border-transparent'
                }`} style={{ width: "200px" }}>
                <button
                    type="button"
                    onClick={() => onInputChange(field.title, input.key, 'זכר')}
                    className={`relative flex-1 py-3 px-3 text-center cursor-pointer transition-all duration-300 text-sm ${profileData.gender === 'זכר'
                        ? 'bg-blue-600 text-white font-medium shadow-inner scale-105'
                        : nothingSelected
                            ? 'bg-white text-gray-500 hover:bg-blue-50 border-r border-gray-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-blue-50 border-r border-gray-200'
                        }`}
                >
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mx-auto mb-1 ${profileData.gender === 'זכר' ? 'text-white' : 'text-blue-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="7" r="4"></circle>
                            <path d="M12 11v8"></path>
                            <path d="M9 18h6"></path>
                        </svg>
                        <span className={profileData.gender === 'זכר' ? 'font-bold' : ''}>זכר</span>
                    </div>
                    {profileData.gender === 'זכר' && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => onInputChange(field.title, input.key, 'נקבה')}
                    className={`relative flex-1 py-3 px-3 text-center cursor-pointer transition-all duration-300 text-sm ${profileData.gender === 'נקבה'
                        ? 'bg-pink-600 text-white font-medium shadow-inner scale-105'
                        : nothingSelected
                            ? 'bg-white text-gray-500 hover:bg-pink-50'
                            : 'bg-gray-100 text-gray-500 hover:bg-pink-50'
                        }`}
                >
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mx-auto mb-1 ${profileData.gender === 'נקבה' ? 'text-white' : 'text-pink-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M12 20v-8"></path>
                            <path d="M8 14l8 0"></path>
                        </svg>
                        <span className={profileData.gender === 'נקבה' ? 'font-bold' : ''}>נקבה</span>
                    </div>
                    {profileData.gender === 'נקבה' && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                        </span>
                    )}
                </button>
            </div>
            {showError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    יש לבחור מגדר
                </p>
            )}
        </div>
    );
};

// Export the ProfileForm component as the default export
export default ProfileForm;

// Render the phone input with dropdown for prefix
const renderPhoneInput = (
    input: InputField,
    profileData: ProfileData,
    fieldErrors: Record<string, string>,
    onInputChange: (field: string, key: string, value: string) => void
) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
                {input.label} {input.required && <span className="text-red-500">*</span>}
            </label>
            <div className={`relative bg-white rounded-lg shadow-md overflow-hidden border-2 ${fieldErrors['phone'] || fieldErrors['phone_prefix']
                ? 'border-red-500'
                : 'border-indigo-300 hover:border-indigo-500'
                } transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500`}
            >
                <div className="flex items-stretch">
                    <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 px-3 text-white font-medium">
                        <select
                            value={profileData.phone_prefix || ''}
                            onChange={(e) => onInputChange(input.label, 'phone_prefix', e.target.value)}
                            className="bg-transparent appearance-none focus:outline-none text-white font-medium w-16"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'left 0.1rem center',
                                backgroundSize: '0.8em 0.8em',
                                paddingRight: '1rem',
                                color: 'white'
                            }}
                            required={input.required}
                        >
                            <option value="" disabled style={{ color: 'black', fontWeight: 'bold' }}>קוד</option>
                            {['050', '051', '052', '053', '054', '055', '058'].map((prefix) => (
                                <option key={prefix} value={prefix} style={{ color: 'black', fontWeight: 'bold' }}>{prefix}</option>
                            ))}
                        </select>
                        <span className="mx-1 text-white font-bold">-</span>
                    </div>
                    <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={7}
                        value={profileData.phone || ''}
                        onChange={(e) => onInputChange(input.label, 'phone', e.target.value)}
                        className="flex-1 py-3 px-4 text-lg font-medium text-indigo-900 bg-white border-none outline-none text-right"
                        placeholder="מספר טלפון"
                        required={input.required}
                        dir="rtl"
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
    );
};
