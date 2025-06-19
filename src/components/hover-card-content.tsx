
"use client";

import { Settings, ChevronUp, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { cn } from "@/lib/utils";

// Placeholder data
const incomeChartData = [
  { name: 'Feb', value: 200 }, { name: 'Mar', value: 350 }, { name: 'Apr', value: 150 },
  { name: 'May', value: 450 }, { name: 'Jun', value: 250 }, { name: 'Jul', value: 500 },
  { name: 'Aug', value: 300 }, { name: 'Sep', value: 220 }, { name: 'Oct', value: -50 },
  { name: 'Nov', value: 400 }, { name: 'Dec', value: 600 }, { name: 'Jan', value: 300 },
].map(item => ({ ...item, value: item.value * 100 })); // Scale for display

const expensesChartData = [
  { name: 'Insurance', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Wages', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Rent', value: 300, color: 'hsl(var(--chart-3))' },
  { name: 'Legal Expenses', value: 200, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 278, color: 'hsl(var(--chart-5))' },
];
const PIE_COLORS = expensesChartData.map(entry => entry.color);


interface HoverCardContentProps {
  keyword: string;
  isVisible: boolean;
}

export function HoverCardContent({ keyword, isVisible }: HoverCardContentProps) {
  if (!isVisible) return null;

  let cardContent = null;

  switch (keyword.toLowerCase()) {
    case 'reports':
      cardContent = (
        <div className="w-72 bg-card text-card-foreground rounded-lg shadow-xl border p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-card-foreground">Total income</h4>
            <Settings className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </div>
          <div className="flex items-baseline mb-1">
            <p className="text-2xl font-bold text-foreground mr-2">$426.8K</p>
            <div className="flex items-center text-xs" style={{ color: 'hsl(140, 60%, 50%)' }}> {/* Green for positive */}
              <TrendingUp className="w-3 h-3 mr-0.5" /> 36.5%
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">$672.5K total last year</p>
          <div style={{ width: '100%', height: 100 }}>
            <ResponsiveContainer>
              <BarChart data={incomeChartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="hsl(var(--muted-foreground))" />
                <YAxis hide={true} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '0.375rem', fontSize: '0.75rem', padding: '0.25rem 0.5rem', boxShadow: 'var(--tw-shadow)' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '500', marginBottom: '0.25rem', display: 'block' }}
                  cursor={{ fill: 'hsl(var(--accent))', fillOpacity: 0.2 }}
                  formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, undefined]}
                />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {incomeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value >= 0 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2">
            <ChevronUp className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
        </div>
      );
      break;
    case 'dashboards':
      cardContent = (
        <div className="w-72 bg-card text-card-foreground rounded-lg shadow-xl border p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-card-foreground">Expenses</h4>
            <Settings className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </div>
          <p className="text-2xl font-bold text-foreground mb-3">$56.2K</p>
          <div className="flex">
            <div style={{ width: '50%', height: 120 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={expensesChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="hsl(var(--card))" 
                    strokeWidth={2}
                  >
                    {expensesChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                   <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '0.375rem', fontSize: '0.75rem', padding: '0.25rem 0.5rem', boxShadow: 'var(--tw-shadow)' }}
                    itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                    labelStyle={{ display: 'none' }} 
                    formatter={(value: number, name: string) => [value, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 pl-4 flex flex-col justify-center text-xs space-y-1.5">
              {expensesChartData.map((entry) => (
                <div key={entry.name} className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2 shrink-0" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-muted-foreground flex-grow">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      break;
    case 'forecasts':
    case 'consolidations':
      cardContent = (
        <div className="w-72 bg-card text-card-foreground rounded-lg shadow-xl border p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-card-foreground">Cash</h4>
            <Settings className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </div>
           <div className="flex items-baseline mb-1">
            <p className="text-2xl font-bold text-foreground mr-2">$288,721</p>
            <div className="flex items-center text-xs" style={{ color: 'hsl(140, 60%, 50%)' }}> {/* Green for positive */}
              <TrendingUp className="w-3 h-3 mr-0.5" /> 202.9%
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">$95,319 prior last year</p>
          <div className="h-[100px] flex items-center justify-center text-muted-foreground text-xs">
            {/* Placeholder for potential content */}
          </div>
           <div className="flex justify-center mt-2">
            <ChevronUp className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
        </div>
      );
      break;
    default:
      cardContent = (
        <div className="w-64 p-3 text-sm bg-popover text-popover-foreground rounded-md shadow-xl border">
          <h4 className="font-semibold text-foreground">Insights for "{keyword}"</h4>
          <p className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
            Detailed information and statistics about "{keyword}" would appear here. This section can be powered by AI to provide contextual data.
          </p>
        </div>
      );
  }

  return (
    <div
      className={cn(
        "transition-opacity duration-200 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      role="status"
      aria-live="polite"
    >
      {cardContent}
    </div>
  );
}
