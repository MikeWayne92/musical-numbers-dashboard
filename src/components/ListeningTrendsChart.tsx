
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subMonths, isAfter } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DailyListening {
  date: string;
  minutes: number;
}

interface ListeningTrendsChartProps {
  data: DailyListening[];
}

const ListeningTrendsChart = ({ data }: ListeningTrendsChartProps) => {
  const [timeRange, setTimeRange] = useState<string>("all");
  
  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    if (timeRange === "all") return true;
    if (timeRange === "month") return isAfter(itemDate, subMonths(new Date(), 1));
    if (timeRange === "three_months") return isAfter(itemDate, subMonths(new Date(), 3));
    if (timeRange === "six_months") return isAfter(itemDate, subMonths(new Date(), 6));
    return true;
  });

  return (
    <div className="neo-button p-5 h-[400px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Listening Trends</h3>
      <p className="chart-subtitle">Your daily listening habits over time</p>
      
      <div className="mb-4 flex items-center">
        <label htmlFor="timeRange" className="text-sm mr-3 text-platinum">Time period:</label>
        <select 
          id="timeRange" 
          className="bg-emerald-800/40 border border-emerald-700/30 text-platinum rounded p-1 text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="all">All time</option>
          <option value="month">Last month</option>
          <option value="three_months">Last 3 months</option>
          <option value="six_months">Last 6 months</option>
        </select>
      </div>
      
      <ScrollArea className="h-[310px]">
        <ResponsiveContainer width="100%" height={310} minWidth={filteredData.length * 5}>
          <AreaChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <defs>
              <linearGradient id="listenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(var(--chart-accent))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgb(var(--chart-border))" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="rgb(var(--chart-text))"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 11 }}
              tickMargin={10}
              height={50}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="rgb(var(--chart-text))"
              tickFormatter={(minutes) => `${Math.floor(minutes / 60)}h`}
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(var(--chart-bg-from), 0.8)',
                border: '1px solid rgb(var(--chart-accent))',
                borderRadius: '8px',
                color: 'rgb(var(--chart-text))'
              }}
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              formatter={(value: number) => {
                const hours = Math.floor(value / 60);
                const mins = Math.round(value % 60);
                return [`${hours}h ${mins}m`, 'Listening Time'];
              }}
            />
            <Area 
              type="monotone" 
              dataKey="minutes" 
              stroke="rgb(var(--chart-accent))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#listenGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default ListeningTrendsChart;
