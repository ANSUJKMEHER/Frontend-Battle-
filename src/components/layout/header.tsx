
"use client";

import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react"; 

interface HeaderProps {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-screen-2xl px-4 md:px-6">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 mr-2 text-primary stroke-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            <circle cx="12" cy="7" r="1.5" className="fill-accent stroke-accent"/>
            <circle cx="7" cy="9.5" r="1" className="fill-accent stroke-accent opacity-80"/>
            <circle cx="17" cy="9.5" r="1" className="fill-accent stroke-accent opacity-80"/>
          </svg>
          <h1 className="text-2xl font-bold text-foreground font-headline">Insightful Hover</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onOpenSettings} aria-label="Open settings">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
