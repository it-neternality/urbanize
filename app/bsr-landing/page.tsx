'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Sun, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import GlowingText from './components/GlowingText';
import ImageCarousel from './components/ImageCarousel';

// Mobile View
const MobileView = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      // Show button when scrolling up or at top, hide when scrolling down
      setShowScrollButton(position <= 100 || position < scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className="block md:hidden w-full">
      <div className="relative w-full" style={{ height: '50vh' }}>
        <div className="absolute top-4 left-4 z-20">
          <div className={`p-2 rounded-lg ${currentSlide === 2 ? 'bg-white/50' : 'bg-white/10'}`}>
            <Image 
              src="/bsr-rishonim/urbanize-office-logo.png" 
              alt="Urbanize Office Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
        </div>
        <ImageCarousel onSlideChange={setCurrentSlide} />
        <div className="absolute inset-0 bg-black/50 z-1"></div>
      </div>
      
      <div className="relative z-10 w-full bg-gradient-to-b from-slate-900 to-gray-800 text-gray-100 p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-3">
            ב.ס.ר ראשונים
          </h1>
          <p className="text-lg font-semibold text-blue-400 mb-6">
            מגדל העסקים החדש והיוקרתי
          </p>
          
          <div className="flex justify-center items-center mb-6">
            <p className="text-white text-sm flex items-center">
              <MapPin className="h-5 w-5 ml-2 text-blue-500" />
              מיקום מנצח
              <Sun className="h-5 w-5 mr-2 ml-4 text-yellow-500" />
              נוף לים
            </p>
          </div>
          
          <GlowingText />
        </div>
        
        <div className="border-t border-gray-700 pt-6 mb-6">
          <div className="text-right">
            <ul className="space-y-3 text-gray-300 list-outside list-disc pr-5">
              <li>יותר שטח נטו בפחות כסף</li>
              <li>לפני שהשוק מתיישר עם מחירי בניין G-City הסמוך</li>
            </ul>
          </div>
        </div>
        
        <div className="w-full" ref={formRef}>
          <ContactForm />
        </div>
        
        <p className="text-xs text-gray-500 mt-6 text-center">
          *ההדמיות להמחשה בלבד. כפוף לתנאי החברה.
        </p>
      </div>

      {/* Scroll to form button */}
      <button 
        onClick={scrollToForm}
        style={{
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? 'auto' : 'none',
          transition: 'opacity 300ms ease-in-out',
        }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600/70 hover:bg-blue-700/70 text-white font-bold py-3 px-6 rounded-full shadow-lg z-50 flex items-center justify-center w-[90%] transition-all duration-300"
      >
        להשארת פרטים
        <ChevronDown className="mr-2 h-5 w-5" />
      </button>
    </div>
  );
}

// Desktop View
const DesktopView = () => (
  <div className="hidden md:flex w-full min-h-screen">
    {/* Left side - Carousel */}
    <div className="w-2/3 relative">
      <div className="fixed top-0 left-0 w-2/3 h-full">
        <ImageCarousel />
        <div className="absolute inset-0 bg-black/50 z-1"></div>
      </div>
    </div>
    
    {/* Right side - Content */}
    <div className="w-1/3 bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100 p-8 lg:p-12 shadow-2xl z-10 ml-auto">
      <div className="text-right mb-8">
        <h1 className="text-5xl font-extrabold mb-3">
          ב.ס.ר ראשונים
        </h1>
        <p className="text-3xl font-semibold text-blue-400 mb-6">
          מגדל העסקים החדש והיוקרתי
        </p>
        
        <div className="flex items-center justify-end mb-6">
          <p className="text-white text-sm flex items-center">
            <MapPin className="h-5 w-5 ml-2 text-blue-500" />
            מיקום מנצח
            <Sun className="h-5 w-5 mr-2 ml-4 text-yellow-500" />
            נוף לים
          </p>
        </div>
        
        <GlowingText />
      </div>
      
      <div className="border-t border-gray-700 pt-6 mb-8">
        <div className="text-right">
          <ul className="space-y-3 text-gray-300 list-outside list-disc pr-5">
            <li>יותר שטח נטו בפחות כסף</li>
            <li>לפני שהשוק מתיישר עם מחירי בניין G-City הסמוך</li>
          </ul>
        </div>
      </div>
      
      <div className="w-full">
        <ContactForm />
      </div>
      
      <p className="text-xs text-gray-500 mt-6 text-center">
        *ההדמיות להמחשה בלבד. כפוף לתנאי החברה.
      </p>
    </div>
  </div>
);

export default function BsrLandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-[#000e26] text-gray-800 font-sans overflow-x-hidden">
      <MobileView />
      <DesktopView />
    </div>
  );
}
