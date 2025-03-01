
import React, { useState } from 'react';
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
  const [filterCount, setFilterCount] = useState<number>(10);
  const filteredData = data.slice(0, filterCount);

  return (
    <div className="neo-button p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Top Tracks</h3>
      <p className="chart-subtitle">Your most played songs based on frequency</p>
      
      <div className="mb-4 flex items-center">
        <label htmlFor="trackCount" className="text-sm mr-3 text-platinum">Show top:</label>
        <select 
          id="trackCount" 
          className="bg-emerald-800/40 border border-emerald-700/30 text-platinum rounded p-1 text-sm"
          value={filterCount}
          onChange={(e) => setFilterCount(Number(e.target.value))}
        >
          <option value="5">5 tracks</option>
          <option value="10">10 tracks</option>
          <option value="15">15 tracks</option>
          <option value="20">20 tracks</option>
        </select>
      </div>
      
      <ScrollArea className="h-[400px]">
        <ResponsiveContainer width="100%" height={filteredData.length * 50} minHeight={400}>
          <BarChart data={filteredData} layout="vertical" margin={{ top: 5, right: 30, left: 130, bottom: 5 }}>
            <XAxis 
              type="number" 
              stroke="rgb(var(--chart-text))" 
              tickFormatter={(value) => value.toFixed(0)}
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
              formatter={(value: number) => [`${value.toFixed(0)} plays`, "Plays"]}
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
