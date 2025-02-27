
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TopTrack {
  name: string;
  plays: number;
}

interface TopTracksChartProps {
  data: TopTrack[];
}

const TopTracksChart = ({ data }: TopTracksChartProps) => {
  return (
    <div className="neo-button p-6 h-[500px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum">
      <h3 className="text-lg font-semibold mb-4 text-emerald-400">Top Tracks</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
          <XAxis type="number" stroke="#E5E5E5" />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={110}
            tick={{ fill: '#E5E5E5', fontSize: 12 }}
            interval={0}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0F4C3A', 
              border: '1px solid #10B981',
              borderRadius: '8px',
              color: '#E5E5E5'
            }}
          />
          <Bar 
            dataKey="plays" 
            fill="url(#colorGradient)" 
            radius={[0, 4, 4, 0]}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopTracksChart;
