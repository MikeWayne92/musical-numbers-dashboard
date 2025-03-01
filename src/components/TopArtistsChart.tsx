
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopArtist {
  name: string;
  plays: number;
}

interface TopArtistsChartProps {
  data: TopArtist[];
}

const COLORS = [
  '#10B981', '#047857', '#059669', '#34D399', '#065F46', 
  '#0D9488', '#14B8A6', '#0F766E', '#0E7490', '#0891B2'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#E5E5E5" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {percent > 0.05 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
    </text>
  );
};

const TopArtistsChart = ({ data }: TopArtistsChartProps) => {
  const [filterCount, setFilterCount] = useState<number>(10);
  const filteredData = data.slice(0, filterCount);

  return (
    <div className="neo-button p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Top Artists</h3>
      <p className="chart-subtitle">Artists you've listened to the most</p>
      
      <div className="mb-4 flex items-center">
        <label htmlFor="artistCount" className="text-sm mr-3 text-platinum">Show top:</label>
        <select 
          id="artistCount" 
          className="bg-emerald-800/40 border border-emerald-700/30 text-platinum rounded p-1 text-sm"
          value={filterCount}
          onChange={(e) => setFilterCount(Number(e.target.value))}
        >
          <option value="5">5 artists</option>
          <option value="10">10 artists</option>
          <option value="15">15 artists</option>
        </select>
      </div>
      
      <ScrollArea className="h-[400px]">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="plays"
              nameKey="name"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(0)} plays`, "Plays"]}
              contentStyle={{
                backgroundColor: 'rgba(var(--chart-bg-from), 0.8)',
                border: '1px solid rgb(var(--chart-accent))',
                borderRadius: '8px',
                color: 'rgb(var(--chart-text))'
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{
                paddingLeft: "10px",
                fontSize: "12px",
                color: "rgb(var(--chart-text))"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default TopArtistsChart;
