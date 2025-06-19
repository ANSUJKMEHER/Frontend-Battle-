
"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HighlightedKeyword } from "@/components/highlighted-keyword";
import { Button } from "@/components/ui/button";
import { Star, Briefcase, TrendingUp, PieChart } from "lucide-react";

export interface Settings {
  hoverDelay: number;
  insightsEnabled: boolean;
}

const initialSettings: Settings = {
  hoverDelay: 200,
  insightsEnabled: true,
};

const mainTextContent = "Create reports, forecasts, dashboards & consolidations";
const keywordsToHighlight = ["reports", "forecasts", "dashboards", "consolidations"];

// Helper for rendering text with highlighted keywords
const renderTextWithHighlights = (
  text: string,
  keywords: string[],
  HighlightComponent: React.FC<any>,
  currentSettings: Settings
) => {
  if (!currentSettings.insightsEnabled || keywords.length === 0) {
    return [<React.Fragment key="fulltext">{text}</React.Fragment>];
  }

  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  const regexPattern = `(${sortedKeywords.map(kw => kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`;
  const regex = new RegExp(regexPattern, 'gi');
  const parts = text.split(regex);
  let keyIndex = 0;

  return parts.map((part) => {
    const lowerPart = part.toLowerCase();
    const matchedKeyword = sortedKeywords.find(kw => kw.toLowerCase() === lowerPart);
    if (matchedKeyword) {
      return (
        <HighlightComponent
          key={`highlight-${keyIndex++}-${matchedKeyword}`}
          keyword={matchedKeyword}
          settings={currentSettings}
        >
          {part}
        </HighlightComponent>
      );
    }
    return <React.Fragment key={`text-${keyIndex++}`}>{part}</React.Fragment>;
  });
};

// Ratings data
const ratings = [
  { name: "Capterra", rating: "4.8", reviews: "rating on", icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> },
  { name: "G2", rating: "4.8", reviews: "rating on", icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> },
  { name: "Xero", rating: "350+", reviews: "reviews on", icon: <TrendingUp className="w-4 h-4 text-sky-400" /> },
  { name: "QuickBooks", rating: "550+", reviews: "reviews on", icon: <PieChart className="w-4 h-4 text-green-400" /> },
];

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const processedTitle = useMemo(() =>
    renderTextWithHighlights(
      mainTextContent,
      keywordsToHighlight,
      HighlightedKeyword,
      settings
    ), [settings]);

  return (
    <TooltipProvider key={settings.hoverDelay} delayDuration={settings.hoverDelay}>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[hsl(220,50%,10%)] via-[hsl(220,50%,15%)] to-[hsl(220,60%,20%)] text-foreground relative overflow-hidden">
        
        <Image src="https://placehold.co/400x300.png" alt="decorative background chart" data-ai-hint="financial chart" width={400} height={300} className="absolute top-1/4 left-[-50px] opacity-10 blur-md transform -rotate-12 pointer-events-none" />
        <Image src="https://placehold.co/300x450.png" alt="decorative background report" data-ai-hint="data report" width={300} height={450} className="absolute top-10 right-[-80px] opacity-10 blur-lg transform rotate-6 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl opacity-50 animate-pulse pointer-events-none" data-ai-hint="abstract circle"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-xl opacity-50 animate-pulse delay-500 pointer-events-none" data-ai-hint="gradient orb"></div>
        <div className="absolute top-20 left-1/2 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl opacity-30 animate-ping-slow pointer-events-none" data-ai-hint="dotted pattern"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/10 rounded-2xl blur-2xl opacity-40 transform rotate-45 animate-pulse-slow pointer-events-none" data-ai-hint="soft glow"></div>

        <nav className="w-full py-5 px-4 sm:px-8 md:px-16 z-10">
          <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-6 lg:gap-x-10 gap-y-2 text-sm text-slate-300">
            {ratings.map((item, index) => (
              <div key={index} className="flex items-center space-x-1.5">
                {item.icon}
                <span><strong>{item.rating}</strong> {item.reviews} <span className="font-semibold text-slate-100">{item.name}</span></span>
              </div>
            ))}
          </div>
        </nav>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            {processedTitle}
          </h1>
          <p className="text-xl sm:text-2xl mb-10 text-slate-200 flex items-center">
            <span role="img" aria-label="sparkles" className="mr-2 text-2xl">✨</span>
            Now with AI-insights
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Button
              size="lg"
              className="px-8 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform transition-transform hover:scale-105"
              aria-label="Start 14-day free trial"
            >
              Start 14-day free trial &gt;
            </Button>
            <Button
              variant="link"
              size="lg"
              className="text-accent hover:text-accent/80 font-semibold text-base group"
              aria-label="See what we do"
            >
              <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:rotate-[-5deg]" /> See what we do
            </Button>
          </div>
        </main>
        
         <footer className="py-6 text-center text-xs text-slate-400/70 border-t border-slate-200/10 mt-auto z-10">
          <p>&copy; {new Date().getFullYear()} AI Financial Tools Inc. All rights reserved.</p>
        </footer>
      </div>
    </TooltipProvider>
  );
}
