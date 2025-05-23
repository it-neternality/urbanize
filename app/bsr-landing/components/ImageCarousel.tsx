'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/bsr-rishonim/lp-1.png',
  '/bsr-rishonim/lp-2.png',
  '/bsr-rishonim/lp-3.png',
  '/bsr-rishonim/lp-4.png',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const goToSlide = useCallback((newIndex: number) => {
    const nextIndex = newIndex < 0 
      ? images.length - 1 
      : newIndex >= images.length 
        ? 0 
        : newIndex;
    
    setDirection(nextIndex > currentIndex ? 'right' : 'left');
    setCurrentIndex(nextIndex);
    setIsAnimating(true);
    
    // Reset animation state after transition
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      setIsAnimating(false);
    });
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    } else if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    timerRef.current = timer;
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentIndex, nextSlide]);

  // Calculate the transform based on direction
  const getTransform = (index: number) => {
    if (index === currentIndex) return 'translateX(0)';
    if (isAnimating) {
      return direction === 'right' 
        ? 'translateX(100%)' 
        : 'translateX(-100%)';
    }
    return 'translateX(0)';
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'z-10' : 'z-0'
            }`}
            style={{
              transform: getTransform(index),
              opacity: index === currentIndex ? 1 : 0,
              transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
            }}
          >
            <Image
              src={image}
              alt={`מגדל ב.ס.ר ראשונים - תמונה ${index + 1}`}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
