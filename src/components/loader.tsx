
"use client";

import { useEffect, useState, useRef } from 'react';
// import Image from 'next/image'; // Image component is no longer needed
import { Progress } from "@/components/ui/progress";

export function AppLoader() {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 200); // Update progress every 200ms

    return () => clearInterval(interval);
  }, []);

  const handleRippleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!loaderRef.current) return;

    const loaderElement = loaderRef.current;
    const ripple = document.createElement('span');
    
    const rect = loaderElement.getBoundingClientRect();
    const rippleSize = 60; // Initial diameter of the ripple

    ripple.style.width = `${rippleSize}px`;
    ripple.style.height = `${rippleSize}px`;
    // Position ripple's center at the click point relative to the loader element
    ripple.style.left = `${event.clientX - rect.left - rippleSize / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - rippleSize / 2}px`;
    
    ripple.classList.add('loader-ripple'); // Use a new class for loader-specific ripples
    loaderElement.appendChild(ripple);

    // Remove the ripple element after the animation completes
    setTimeout(() => {
      ripple.remove();
    }, 800); // Must match the animation duration in globals.css
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-gray-100 overflow-hidden cursor-pointer" // Changed background to light gray, removed text-white
      onClick={handleRippleClick}
      aria-label="Loading screen with interactive background"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRippleClick(e as any);}}
    >
      {/* Background Image removed */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-6 bg-black/60 rounded-xl shadow-2xl">
          <p className="text-xl sm:text-2xl font-semibold mb-4 text-center text-white">Welcome to Insightful</p> {/* Ensured text is white */}
          <Progress value={progress} className="w-full h-2 [&>div]:bg-slate-400 bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
