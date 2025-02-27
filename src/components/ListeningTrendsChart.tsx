
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface DailyListening {
  date: string;
  minutes: number;
}

interface ListeningTrendsChartProps {
  data: DailyListening[];
}

const ListeningTrendsChart = ({ data }: ListeningTrendsChartProps) => {
  return (
    <div className="neo-button p-6 h-[400px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum">
      <h3 className="text-lg font-semibold mb-4 text-emerald-400">Listening Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          />
          <YAxis 
            stroke="#E5E5E5"
            tickFormatter={(minutes) => `${Math.round(minutes / 60)}h`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F4C3A',
              border: '1px solid #10B981',
              borderRadius: '8px',
              color: '#E5E5E5'
            }}
            labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            formatter={(value: number) => [`${Math.round(value / 60)}h ${value % 60}m`, 'Listening Time']}
          />
          <Area 
            type="monotone" 
            dataKey="minutes" 
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#listenGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ListeningTrendsChart;
