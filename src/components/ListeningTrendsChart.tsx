
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DailyListening {
  date: string;
  minutes: number;
}

interface ListeningTrendsChartProps {
  data: DailyListening[];
}

const ListeningTrendsChart = ({ data }: ListeningTrendsChartProps) => {
  return (
    <div className="neo-button p-5 h-[400px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Listening Trends</h3>
      <ScrollArea className="h-[330px]">
        <ResponsiveContainer width="100%" height={350} minWidth={data.length * 5}>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <defs>
              <linearGradient id="listenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#047857" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="#E5E5E5"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              tick={{ fill: '#E5E5E5', fontSize: 11 }}
              tickMargin={10}
              height={50}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#E5E5E5"
              tickFormatter={(minutes) => `${Math.floor(minutes / 60)}h`}
              tick={{ fill: '#E5E5E5', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F4C3A',
                border: '1px solid #10B981',
                borderRadius: '8px',
                color: '#E5E5E5'
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
              stroke="#10B981"
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
