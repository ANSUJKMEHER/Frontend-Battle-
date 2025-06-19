
"use client";

import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HoverCardContent } from "./hover-card-content";
import type { Settings } from '@/app/page'; 

interface HighlightedKeywordProps {
  keyword: string;
  children: React.ReactNode;
  fullText: string;
  settings: Settings;
}

export function HighlightedKeyword({
  keyword,
  children,
  fullText,
  settings,
}: HighlightedKeywordProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  if (!settings.insightsEnabled) {
    return <span className="font-semibold text-primary brightness-110">{children}</span>;
  }

  return (
    <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <TooltipTrigger asChild>
        <span className="font-semibold text-primary brightness-110 cursor-pointer hover:underline decoration-accent decoration-2 underline-offset-2 transition-all hover:text-accent">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        className="p-0 bg-transparent border-none shadow-none max-w-xs w-auto"
      >
        {/* HoverCardContent handles its own visibility based on isTooltipOpen */}
        <HoverCardContent keyword={keyword} fullText={fullText} isVisible={isTooltipOpen} />
      </TooltipContent>
    </Tooltip>
  );
}
