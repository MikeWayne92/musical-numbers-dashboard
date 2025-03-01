
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
    <div className="neo-button p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-5 chart-title">Top Tracks</h3>
      <ScrollArea className="h-[430px]">
        <ResponsiveContainer width="100%" height={data.length * 50} minHeight={400}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 130, bottom: 5 }}>
            <XAxis 
              type="number" 
              stroke="rgb(var(--chart-text))" 
              tickFormatter={(value) => value.toString()}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={120}
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
              tickMargin={10}
              interval={0}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(var(--chart-bg-from), 0.8)', 
                border: '1px solid rgb(var(--chart-accent))',
                borderRadius: '8px',
                color: 'rgb(var(--chart-text))'
              }}
              formatter={(value: number) => [`${value} plays`, "Plays"]}
            />
            <Bar 
              dataKey="plays" 
              fill="url(#colorGradient)" 
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(var(--chart-accent))" />
                  <stop offset="100%" stopColor="rgba(var(--chart-border), 1)" />
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
