
"use client"

import React, { useState, useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const initialChartData = [
  { metric: "Time Saved (hrs/mo)", Insightful: 40, CompetitorA: 20, CompetitorB: 15, OtherCompetitor: 10 },
  { metric: "Accuracy Increase (%)", Insightful: 15, CompetitorA: 8, CompetitorB: 5, OtherCompetitor: 3 },
  { metric: "Cost Reduction (%)", Insightful: 25, CompetitorA: 10, CompetitorB: 7, OtherCompetitor: 5 },
  { metric: "User Satisfaction (Score)", Insightful: 4.8, CompetitorA: 4.2, CompetitorB: 3.9, OtherCompetitor: 3.5 },
];

const initialChartConfig = {
  Insightful: {
    label: "Insightful",
    color: "hsl(var(--chart-1))",
  },
  CompetitorA: {
    label: "Competitor A",
    color: "hsl(var(--chart-2))",
  },
  CompetitorB: {
    label: "Competitor B",
    color: "hsl(var(--chart-3))",
  },
  OtherCompetitor: {
    label: "Anonymous Tool X",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig;

export function ComparisonChart() {
  const [activeCompetitors, setActiveCompetitors] = useState({
    CompetitorA: true,
    CompetitorB: true,
    OtherCompetitor: false, // Initially hidden
  });
  const [chartConfig, setChartConfig] = useState(initialChartConfig);

  const handleCompetitorToggle = (competitorKey: keyof typeof activeCompetitors) => {
    setActiveCompetitors(prev => ({
      ...prev,
      [competitorKey]: !prev[competitorKey],
    }));
  };
  
  const displayedCompetitors = useMemo(() => {
    return (Object.keys(initialChartConfig) as Array<keyof typeof initialChartConfig>).filter(key => key === 'Insightful' || activeCompetitors[key as keyof typeof activeCompetitors]);
  }, [activeCompetitors]);

  const filteredChartData = useMemo(() => {
    return initialChartData.map(dataPoint => {
      const filteredPoint: { metric: string; [key: string]: number | string } = { metric: dataPoint.metric };
      displayedCompetitors.forEach(comp => {
        filteredPoint[comp] = dataPoint[comp as keyof typeof dataPoint];
      });
      return filteredPoint;
    });
  }, [displayedCompetitors]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
        <CardDescription>Comparing Insightful with leading competitors across key performance indicators.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap items-center gap-4 sm:gap-6">
          <p className="font-medium text-sm text-muted-foreground">Filter Competitors:</p>
          {(Object.keys(activeCompetitors) as Array<keyof typeof activeCompetitors>).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`filter-${key}`}
                checked={activeCompetitors[key]}
                onCheckedChange={() => handleCompetitorToggle(key)}
                aria-labelledby={`label-filter-${key}`}
              />
              <Label htmlFor={`filter-${key}`} id={`label-filter-${key}`} className="text-sm font-normal">
                {initialChartConfig[key]?.label || key}
              </Label>
            </div>
          ))}
        </div>

        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredChartData}
                margin={{
                  top: 20,
                  right: 0,
                  left: -20, // Adjust to prevent Y-axis label cutoff
                  bottom: 5,
                }}
                accessibilityLayer
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="metric"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 18)}...` : value}
                />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                
                {/* Always render Insightful bar */}
                <Bar dataKey="Insightful" fill="var(--color-Insightful)" radius={[4, 4, 0, 0]} />
                
                {/* Conditionally render competitor bars */}
                {activeCompetitors.CompetitorA && (
                  <Bar dataKey="CompetitorA" fill="var(--color-CompetitorA)" radius={[4, 4, 0, 0]} />
                )}
                {activeCompetitors.CompetitorB && (
                  <Bar dataKey="CompetitorB" fill="var(--color-CompetitorB)" radius={[4, 4, 0, 0]} />
                )}
                {activeCompetitors.OtherCompetitor && (
                  <Bar dataKey="OtherCompetitor" fill="var(--color-OtherCompetitor)" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

