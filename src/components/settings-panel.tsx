
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import type { Settings } from '@/app/page'; 

interface SettingsPanelProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
}

export function SettingsPanel({
  isOpen,
  onOpenChange,
  settings,
  onSettingsChange,
}: SettingsPanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-card">
        <SheetHeader>
          <SheetTitle className="font-headline text-primary">Settings</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Customize your Insightful Hover experience.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="hoverDelay" className="text-left text-foreground">
              Hover Card Delay (ms)
            </Label>
            <Input
              id="hoverDelay"
              type="number"
              value={settings.hoverDelay}
              onChange={(e) =>
                onSettingsChange({ hoverDelay: parseInt(e.target.value, 10) || 0 })
              }
              className="col-span-3"
              min="0"
              step="50"
            />
            <p className="text-sm text-muted-foreground">
              Time to wait before showing the card on hover.
            </p>
          </div>
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 shadow-sm bg-background">
            <Label htmlFor="insightsEnabled" className="flex flex-col space-y-1">
              <span className="text-foreground">Enable Hover Insights</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Show contextual information when hovering over keywords.
              </span>
            </Label>
            <Switch
              id="insightsEnabled"
              checked={settings.insightsEnabled}
              onCheckedChange={(checked) =>
                onSettingsChange({ insightsEnabled: checked })
              }
              aria-label="Enable or disable hover insights"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
