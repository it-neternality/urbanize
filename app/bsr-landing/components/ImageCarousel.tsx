'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/bsr-rishonim/lp-1.png',
  '/bsr-rishonim/lp-2.png',
  '/bsr-rishonim/lp-3.png',
  '/bsr-rishonim/lp-4.png',
];

interface ImageCarouselProps {
  onSlideChange?: (index: number) => void;
}

export default function ImageCarousel({ onSlideChange }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    
    // Notify parent component about the slide change
    if (onSlideChange) {
      onSlideChange(nextIndex);
    }
    
    // Reset animation state after transition
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      setIsAnimating(false);
    });
  }, [currentIndex, onSlideChange]);

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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };


  // Wrap event handlers in useCallback to prevent unnecessary re-renders
  const handleMouseMoveCallback = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    setDragOffset(offset);
  }, [isDragging, dragStartX]);

  const handleMouseUpCallback = useCallback(() => {
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [dragOffset, prevSlide, nextSlide]);

  // Effect for mouse drag events
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveCallback);
      window.addEventListener('mouseup', handleMouseUpCallback, { once: true });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveCallback);
      window.removeEventListener('mouseup', handleMouseUpCallback);
    };
  }, [isDragging, handleMouseMoveCallback, handleMouseUpCallback]);

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
      ref={containerRef}
      className="relative w-screen h-full cursor-grab active:cursor-grabbing"
      style={{
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        maxWidth: '100vw',
        width: '100vw',
        marginTop: '-1px',
        top: 0,
        transform: `translateX(${dragOffset}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'z-10' : 'z-0'
            }`}
            style={{
              transform: getTransform(index),
              opacity: index === currentIndex ? 1 : 0,
              transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
          >
            <div className="w-full h-full relative">
              <div className="w-full h-full flex items-center justify-center bg-black">
                <Image
                  src={image}
                  alt={`מגדל ב.ס.ר ראשונים - תמונה ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-auto h-auto max-w-full max-h-full object-scale-down"
                  priority={index === 0}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Hidden on mobile, shown on md screens and up */}
      <AnimatePresence>
        <motion.button 
          onClick={prevSlide}
          className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
          aria-label="Previous slide"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-8 w-8" strokeWidth={2.5} />
        </motion.button>
        <motion.button 
          onClick={nextSlide}
          className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
          aria-label="Next slide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="h-8 w-8" strokeWidth={2.5} />
        </motion.button>
      </AnimatePresence>

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
