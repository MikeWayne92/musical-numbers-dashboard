
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopTrack {
  name: string;
  plays: number;
}

interface TopTracksChartProps {
  data: TopTrack[];
}

const TopTracksChart = ({ data }: TopTracksChartProps) => {
  return (
    <div className="neo-button p-5 h-[500px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Top Tracks</h3>
      <ScrollArea className="h-[430px]">
        <ResponsiveContainer width="100%" height={data.length * 50} minHeight={400}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 130, bottom: 5 }}>
            <XAxis 
              type="number" 
              stroke="#E5E5E5" 
              tickFormatter={(value) => value.toString()}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={120}
              tick={{ fill: '#E5E5E5', fontSize: 12 }}
              tickMargin={10}
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
              barSize={20}
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
      </ScrollArea>
    </div>
  );
};

export default TopTracksChart;
