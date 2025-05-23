'use client';

import React, { useEffect, useState } from 'react';

export default function GlowingText() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerClasses = [
    'md:hidden',
    'inline-block',
    'px-4',
    'py-2',
    'rounded-lg',
    'bg-gradient-to-r',
    'from-blue-900/70',
    'to-blue-800/70',
    'backdrop-blur-sm',
    'border',
    'border-blue-500/30',
    'shadow-lg',
    'transition-all',
    'duration-700',
    isVisible ? 'opacity-100' : 'opacity-0',
    isVisible ? 'translate-y-0' : 'translate-y-2'
  ].join(' ');

  return (
    <div className="md:hidden flex justify-center w-full">
      <div className={containerClasses}>
        <div className="flex items-center">
          <span className="ml-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-white font-bold text-sm relative z-10">
            משרדים אחרונים למכירה!
          </span>
        </div>
      </div>
    </div>
  );
}
