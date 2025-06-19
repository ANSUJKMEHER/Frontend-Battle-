
"use client";

import { useState, useEffect } from "react";
import { generateContextualInsights } from "@/ai/flows/generate-contextual-insights";
import { Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface HoverCardContentProps {
  keyword: string;
  fullText: string;
  isVisible: boolean; 
}

export function HoverCardContent({ keyword, fullText, isVisible }: HoverCardContentProps) {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isVisible || !keyword || !fullText) {
      setInsights(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isActive = true; 

    const fetchInsights = async () => {
      setIsLoading(true);
      setError(null);
      setInsights(null); // Clear previous insights
      try {
        const result = await generateContextualInsights({ text: fullText, keyword });
        if (isActive) {
          setInsights(result.insights);
        }
      } catch (err) {
        if (isActive) {
          console.error("Failed to generate insights:", err);
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
          setError(`Insights for "${keyword}" unavailable.`);
          // Avoid flooding toasts for potentially many keywords, could be configurable
          // toast({
          //   title: "Error",
          //   description: `Could not fetch insights for "${keyword}". Details: ${errorMessage}`,
          //   variant: "destructive",
          // });
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchInsights();
    
    return () => {
      isActive = false; 
    };
  }, [keyword, fullText, toast, isVisible]);

  if (!isVisible) return null; 

  return (
    <div className={cn(
        "w-64 p-3 text-sm bg-popover text-popover-foreground rounded-md shadow-xl border",
        "transition-opacity duration-200 ease-in-out", // Using ShadCN default transition
         (isLoading || error || insights) ? "opacity-100" : "opacity-0"
      )}
      role="status"
      aria-live="polite"
    >
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 min-h-[80px]">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading insights...</p>
        </div>
      )}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center space-y-1 text-destructive min-h-[80px] p-2">
          <AlertTriangle className="h-5 w-5 mb-1" />
          <p className="text-center font-medium">Error</p>
          <p className="text-xs text-center">{error}</p>
        </div>
      )}
      {!isLoading && !error && insights && (
        <div className="space-y-1.5 min-h-[80px]">
          <h4 className="font-semibold text-foreground">Insights for "{keyword}"</h4>
          <p className="text-xs text-muted-foreground whitespace-pre-wrap break-words">{insights}</p>
        </div>
      )}
      {!isLoading && !error && !insights && (
         <div className="flex items-center justify-center min-h-[80px]">
          <p className="text-muted-foreground text-xs">No insights found for "{keyword}".</p>
        </div>
      )}
    </div>
  );
}
