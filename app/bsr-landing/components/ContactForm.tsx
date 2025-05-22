"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  useEffect(() => {
    const scriptId = 'turnstile-script-bsr-landing'; // Unique ID for this landing page's script
    if (document.getElementById(scriptId)) return; 

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    // It's generally fine to leave the script in the body once loaded.
    // Removing it on component unmount can be problematic if other components rely on it
    // or if the script itself manages its state globally.
    // return () => {
    //   const existingScript = document.getElementById(scriptId);
    //   if (existingScript && existingScript.parentElement === document.body) {
    //     document.body.removeChild(existingScript);
    //   }
    // };
  }, []);

  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "אנא הזן שם מלא.";
      isValid = false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "אנא הזן כתובת דוא\"ל תקינה.";
      isValid = false;
    }

    if (!formData.phone.trim() || !/^[0-9\s-]+$/.test(formData.phone)) {
      newErrors.phone = "אנא הזן מספר טלפון תקין.";
      isValid = false;
    }
    
    // Message is optional
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    if (validateForm()) {
      let turnstileResponse = null;
      // Attempt to get the response from the Turnstile widget within this form
      const turnstileWidgetElement = e.currentTarget.querySelector('.cf-turnstile');
      if (turnstileWidgetElement && (window as any).turnstile) {
        try {
            turnstileResponse = (window as any).turnstile.getResponse(turnstileWidgetElement.id);
        } catch (error) {
            console.warn("Error getting Turnstile response:", error);
        }
      }
      
      // Only require Turnstile verification if the site key is configured in environment variables
      if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileResponse) {
        setSubmitError("אנא השלם את אימות האבטחה (CAPTCHA).");
        // Optionally, try to reset the widget if it exists and failed.
        // if (turnstileWidgetElement && (window as any).turnstile) {
        //   (window as any).turnstile.reset(turnstileWidgetElement.id);
        // }
        return;
      }

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "", 
            subject: "טופס צור קשר - פנייה חדשה (BSR Landing)",
            text: `שם: ${formData.name}\nאימייל: ${formData.email}\nטלפון: ${formData.phone}\nהודעה: ${formData.message || "לא נמסרה הודעה"}`,
            'cf-turnstile-response': turnstileResponse, 
          }),
        });

        if (response.ok) {
          console.log("Email sent successfully");
          setIsSubmitted(true);
          setFormData({ name: "", email: "", phone: "", message: "" }); 
        } else {
          const errorData = await response.json();
          console.error("Failed to send email:", errorData);
          setSubmitError(errorData.message || "שליחת הטופס נכשלה. אנא נסה שנית.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setSubmitError("אירעה שגיאה בשליחת הטופס. אנא נסה שנית.");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""; 

  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-300 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-green-700">תודה רבה!</h3>
        <p className="text-green-600 mt-2">הפרטים שלך התקבלו ונציג יחזור אליך בהקדם.</p>
      </div>
    );
  }

  return (
    // Added unique IDs to form elements for better accessibility and testing
    <form onSubmit={handleSubmit} className="w-full bg-white/95 p-6 rounded-xl shadow-xl flex flex-col gap-4" dir="rtl" noValidate>
      <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center">השאירו פרטים לתיאום ביקור</h3>
      <div>
        <label htmlFor="bsrLandingContactName" className="sr-only">שם מלא</label>
        <input 
          type="text" 
          id="bsrLandingContactName" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="שם מלא"
          className={`w-full p-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 text-gray-900 bg-white`}
          required 
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="bsrLandingContactPhone" className="sr-only">טלפון</label>
        <input 
          type="tel" 
          id="bsrLandingContactPhone" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          placeholder="טלפון"
          className={`w-full p-3 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 text-gray-900 bg-white`}
          required 
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="bsrLandingContactEmail" className="sr-only">אימייל</label>
        <input 
          type="email" 
          id="bsrLandingContactEmail" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="אימייל"
          className={`w-full p-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 text-gray-900 bg-white`}
          required 
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="bsrLandingContactMessage" className="sr-only">הודעה (אופציונלי)</label>
        <textarea 
          id="bsrLandingContactMessage" 
          name="message" 
          rows={3} 
          value={formData.message} 
          onChange={handleChange} 
          placeholder="הודעה (אופציונלי)"
          className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 text-gray-900 bg-white"
        ></textarea>
      </div>
      
      {turnstileSiteKey && (
        // Assign a unique ID to this specific Turnstile widget for reliable targeting
        <div id={`cf-turnstile-widget-bsr-landing`} className="cf-turnstile flex justify-center" data-sitekey={turnstileSiteKey} data-theme="light"></div>
      )}
      {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
      >
        שלח פרטים
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">הפרטים שלך מאובטחים ולא יועברו לצד שלישי.</p>
    </form>
  );
}
