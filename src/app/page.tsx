
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { SettingsPanel } from "@/components/settings-panel";
import { HighlightedKeyword } from "@/components/highlighted-keyword";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Settings {
  hoverDelay: number;
  insightsEnabled: boolean;
}

const initialSettings: Settings = {
  hoverDelay: 250, 
  insightsEnabled: true,
};

const mainTextContent = 
  "Welcome to Insightful Hover, a demonstration of contextual information display. Our latest financial report indicates a 20% increase in user engagement. This report is crucial for understanding market trends. Furthermore, the annual_report highlights our yearly performance and strategic goals. We also focus on innovation, which drives our development, and customer_feedback helps us improve continuously.";

const keywordsToHighlight = ["report", "annual_report", "innovation", "user engagement", "customer_feedback", "market trends"];

const renderTextWithHighlights = (
  text: string,
  keywords: string[],
  HighlightComponent: React.FC<any>,
  fullText: string,
  currentSettings: Settings
) => {
  if (keywords.length === 0) { // No keywords to highlight, or insights disabled globally from settings
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
    if (matchedKeyword && currentSettings.insightsEnabled) { // Only highlight if insights enabled
      return (
        <HighlightComponent
          key={`highlight-${keyIndex++}-${matchedKeyword}`}
          keyword={matchedKeyword}
          fullText={fullText}
          settings={currentSettings}
        >
          {part}
        </HighlightComponent>
      );
    }
     if (matchedKeyword && !currentSettings.insightsEnabled) { // If insights disabled, show keyword differently or normally
        return <span key={`disabled-highlight-${keyIndex++}-${matchedKeyword}`} className="font-semibold text-primary/70">{part}</span>;
     }
    return <React.Fragment key={`text-${keyIndex++}`}>{part}</React.Fragment>;
  });
};

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const handleSettingsChange = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const processedText = useMemo(() => 
    renderTextWithHighlights(
      mainTextContent,
      keywordsToHighlight,
      HighlightedKeyword,
      mainTextContent,
      settings
    ), [settings]);

  return (
    // Key on TooltipProvider to re-initialize it when delayDuration changes
    <TooltipProvider key={settings.hoverDelay} delayDuration={settings.hoverDelay}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header onOpenSettings={() => setIsSettingsPanelOpen(true)} />
        <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl overflow-hidden rounded-lg border-2 border-primary/20">
              <CardHeader className="bg-primary/10 p-6">
                <CardTitle className="text-3xl font-headline text-center text-primary">
                  Explore Contextual Insights
                </CardTitle>
                <CardDescription className="text-center text-lg text-muted-foreground pt-2">
                  Hover over the <span className="font-semibold text-primary brightness-110">highlighted keywords</span> below to see AI-powered contextual information.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <p className="text-lg leading-relaxed text-foreground/90 p-6 border rounded-md bg-card shadow-inner">
                  {processedText}
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-auto">
          <p>&copy; {new Date().getFullYear()} Insightful Hover. Powered by AI.</p>
        </footer>
        <SettingsPanel
          isOpen={isSettingsPanelOpen}
          onOpenChange={setIsSettingsPanelOpen}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </TooltipProvider>
  );
}
