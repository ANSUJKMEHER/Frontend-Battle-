
"use client";

import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

export function AppLoader() {
  const [progress, setProgress] = useState(0);

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

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4">
        <p className="text-xl sm:text-2xl font-semibold mb-4 text-center">Welcome to Insightful</p>
        <Progress value={progress} className="w-full h-2 [&>div]:bg-slate-400 bg-slate-700" />
      </div>
    </div>
  );
}
